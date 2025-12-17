# MHX Player

## Just play in order

A minimalist music player built with Electron that automatically plays your music files in sequential order. Perfect for albums, playlists, or any collection of numbered audio files.

## Features

- **Sequential Playback**: Automatically plays MP3 files in order based on their numbered prefixes (e.g., `001.Song.mp3`, `002.Song.mp3`)
- **Folder Management**: Add multiple music folders and the player will scan and organize all MP3 files
- **Album Art Display**: Extracts and displays album artwork embedded in MP3 files
- **System Tray Integration**: Minimize to system tray and control playback without keeping the window open
- **Media Keys Support**: Use your keyboard's media control keys (play/pause, next, previous) to control playback
- **Global Keyboard Shortcuts**:
  - `Space` - Play/Pause
  - `Ctrl/Cmd + Left` - Previous track
  - `Ctrl/Cmd + Right` - Next track
  - `Ctrl/Cmd + Up/Down` - Volume control
  - `Ctrl/Cmd + M` - Mute/Unmute
  - `Ctrl/Cmd + O` - Add music folder
- **Volume Control**: Adjustable volume slider with mute functionality
- **Playlist View**: See all loaded tracks in a scrollable playlist with current track highlighting
- **Progress Tracking**: Visual progress bar with time display (current time and duration)
- **Auto-play**: Automatically starts playing the first track when folders are added
- **Settings Panel**: Easy access to folder management and display preferences
- **Cross-platform**: Works on macOS, Windows, and Linux
- **Minimalist UI**: Clean, dark-themed interface designed for focus-free music listening

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm start
   ```

## Usage

1. Click the settings button (⚙️) in the top right
2. Click "Add Music Folder" to select folders containing your MP3 files
3. The player will automatically scan and organize files by their number prefix
4. Music will start playing automatically, or click the play button to begin
5. Use the controls to navigate, adjust volume, and manage playback

## Building

To build the application for distribution:

```bash
npm run build
```

This will create platform-specific installers in the `dist` folder.

## Requirements

- Node.js
- npm
- Electron

## Releases

### Latest Version: v1.0.1

Download the latest release for your platform:
- **macOS (Apple Silicon)**: [MHX Player-1.0.0-arm64.dmg](dist/MHX%20Player-1.0.0-arm64.dmg)

See [CHANGELOG.md](CHANGELOG.md) for full release history and details.

## Roadmap

Future features under consideration:
- [ ] Shuffle mode (optional)
- [ ] Repeat modes (track, playlist)
- [ ] More audio format support (FLAC, WAV, OGG)
- [ ] Equalizer
- [ ] Playlist import/export
- [ ] Windows and Linux builds

## License

MIT
