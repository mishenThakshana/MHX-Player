const {
  app,
  BrowserWindow,
  Menu,
  Tray,
  dialog,
  ipcMain,
  shell,
  globalShortcut,
} = require("electron");
const path = require("path");
const fs = require("fs");
const mm = require("music-metadata");

let mainWindow;
let tray = null;
let isQuitting = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 680,
    minWidth: 320,
    minHeight: 500,
    backgroundColor: "#000000",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: fs.existsSync(path.join(__dirname, "icon.png"))
      ? path.join(__dirname, "icon.png")
      : undefined,
    show: false,
    autoHideMenuBar: false,
  });

  mainWindow.loadFile("index.html");

  // Show window when ready
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Handle window close
  mainWindow.on("close", (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
      return false;
    }
  });

  // Create system tray
  createTray();

  // Create menu
  createMenu();

  // Setup media keys (for keyboard media controls)
  setupMediaKeys();
}

function createTray() {
  const { nativeImage } = require("electron");

  let trayIcon;
  const iconPath = path.join(__dirname, "icon.png");

  // Try to load icon.png if it exists
  if (fs.existsSync(iconPath)) {
    trayIcon = nativeImage.createFromPath(iconPath);
    const size = process.platform === "darwin" ? 22 : 16;
    if (!trayIcon.isEmpty()) {
      trayIcon = trayIcon.resize({ width: size, height: size });
    }
  }

  // Create tray - will work even without icon (may show as blank on some systems)
  try {
    if (trayIcon && !trayIcon.isEmpty()) {
      tray = new Tray(trayIcon);
    } else {
      // Create with empty icon - tray will still function
      tray = new Tray(nativeImage.createEmpty());
    }
  } catch (e) {
    console.error("Error creating tray:", e);
    // Fallback: create with empty icon
    tray = new Tray(nativeImage.createEmpty());
  }

  // Update tray menu function
  const updateTrayMenu = () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Show Player",
        click: () => {
          mainWindow.show();
        },
      },
      { type: "separator" },
      {
        label: "Play/Pause",
        accelerator: "Space",
        click: () => {
          mainWindow.webContents.send("tray-play-pause");
        },
      },
      {
        label: "Next",
        accelerator: "CmdOrCtrl+Right",
        click: () => {
          mainWindow.webContents.send("tray-next");
        },
      },
      {
        label: "Previous",
        accelerator: "CmdOrCtrl+Left",
        click: () => {
          mainWindow.webContents.send("tray-previous");
        },
      },
      { type: "separator" },
      {
        label: "Volume Up",
        accelerator: "CmdOrCtrl+Up",
        click: () => {
          mainWindow.webContents.send("tray-volume-up");
        },
      },
      {
        label: "Volume Down",
        accelerator: "CmdOrCtrl+Down",
        click: () => {
          mainWindow.webContents.send("tray-volume-down");
        },
      },
      {
        label: "Mute/Unmute",
        accelerator: "CmdOrCtrl+M",
        click: () => {
          mainWindow.webContents.send("tray-mute");
        },
      },
      { type: "separator" },
      {
        label: "Add Music Folder",
        accelerator: "CmdOrCtrl+O",
        click: async () => {
          const result = await dialog.showOpenDialog(mainWindow, {
            properties: ["openDirectory", "multiSelections"],
          });
          if (!result.canceled) {
            mainWindow.webContents.send("add-folders", result.filePaths);
          }
        },
      },
      { type: "separator" },
      {
        label: "Quit",
        accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
        click: () => {
          isQuitting = true;
          app.quit();
        },
      },
    ]);

    tray.setContextMenu(contextMenu);
  };

  updateTrayMenu();
  tray.setToolTip("MHX Player");

  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function createMenu() {
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "Add Music Folder",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ["openDirectory", "multiSelections"],
            });
            if (!result.canceled) {
              mainWindow.webContents.send("add-folders", result.filePaths);
            }
          },
        },
        { type: "separator" },
        {
          label: "Quit",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            isQuitting = true;
            app.quit();
          },
        },
      ],
    },
    {
      label: "Playback",
      submenu: [
        {
          label: "Play/Pause",
          accelerator: "Space",
          click: () => {
            mainWindow.webContents.send("tray-play-pause");
          },
        },
        {
          label: "Next",
          accelerator: "CmdOrCtrl+Right",
          click: () => {
            mainWindow.webContents.send("tray-next");
          },
        },
        {
          label: "Previous",
          accelerator: "CmdOrCtrl+Left",
          click: () => {
            mainWindow.webContents.send("tray-previous");
          },
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Toggle Developer Tools",
          accelerator: process.platform === "darwin" ? "Alt+Cmd+I" : "Ctrl+Shift+I",
          click: (item, focusedWindow) => {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          },
        },
      ],
    },
  ];

  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC handlers
ipcMain.handle("select-folders", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory", "multiSelections"],
  });
  return result.canceled ? [] : result.filePaths;
});

ipcMain.handle("scan-folder", async (event, folderPath) => {
  try {
    const files = fs.readdirSync(folderPath);
    const mp3Files = files
      .filter((file) => file.toLowerCase().endsWith(".mp3"))
      .map((file) => {
        const fullPath = path.join(folderPath, file);
        const match = file.match(/^(\d+)\./);
        const number = match ? parseInt(match[1]) : 999;
        return {
          path: fullPath,
          name: file,
          number: number,
        };
      })
      .sort((a, b) => a.number - b.number)
      .map((item) => item.path);
    return mp3Files;
  } catch (error) {
    console.error("Error scanning folder:", error);
    return [];
  }
});

ipcMain.handle("get-album-art", async (event, filePath) => {
  try {
    const metadata = await mm.parseFile(filePath);
    if (metadata.common.picture && metadata.common.picture.length > 0) {
      const picture = metadata.common.picture[0];
      // Convert Buffer to Array for IPC serialization
      const dataArray = Array.from(picture.data);
      return {
        data: dataArray,
        format: picture.format,
      };
    }
    return null;
  } catch (error) {
    console.error("Error extracting album art:", error);
    return null;
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    } else {
      mainWindow.show();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  isQuitting = true;
  // Unregister all shortcuts
  globalShortcut.unregisterAll();
});

function setupMediaKeys() {
  // Register media key shortcuts
  // Media play/pause
  globalShortcut.register("MediaPlayPause", () => {
    if (mainWindow) {
      mainWindow.webContents.send("tray-play-pause");
    }
  });

  // Media next track
  globalShortcut.register("MediaNextTrack", () => {
    if (mainWindow) {
      mainWindow.webContents.send("tray-next");
    }
  });

  // Media previous track
  globalShortcut.register("MediaPreviousTrack", () => {
    if (mainWindow) {
      mainWindow.webContents.send("tray-previous");
    }
  });

  // Media stop (pause)
  globalShortcut.register("MediaStop", () => {
    if (mainWindow) {
      mainWindow.webContents.send("tray-play-pause");
    }
  });
}
