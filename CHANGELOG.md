# Changelog

All notable changes to MHX Player will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-12-17

### Fixed
- Minor stability improvements
- Bug fixes and performance optimizations

## [1.0.0] - 2024-12-17

### Added
- **Sequential Playback**: Automatically plays MP3 files in order based on numbered prefixes (e.g., `001.Song.mp3`, `002.Song.mp3`)
- **Folder Management**: Add multiple music folders with automatic scanning and organization
- **Album Art Display**: Extracts and displays album artwork embedded in MP3 files
- **System Tray Integration**: Minimize to system tray and control playback in background
- **Media Keys Support**: Hardware media control keys (play/pause, next, previous)
- **Global Keyboard Shortcuts**:
  - `Space` - Play/Pause
  - `Ctrl/Cmd + Left` - Previous track
  - `Ctrl/Cmd + Right` - Next track
  - `Ctrl/Cmd + Up/Down` - Volume control
  - `Ctrl/Cmd + M` - Mute/Unmute
  - `Ctrl/Cmd + O` - Add music folder
- **Volume Control**: Adjustable slider with mute functionality and persistent settings
- **Playlist View**: Scrollable playlist with current track highlighting
- **Progress Tracking**: Visual progress bar with time display
- **Auto-play**: Automatically starts playing when folders are added
- **Settings Panel**: Easy folder management and display preferences
- **Cross-platform Support**: Works on macOS, Windows, and Linux
- **Minimalist Dark UI**: Clean interface designed for distraction-free listening

### Technical
- Built with Electron 27.0.0
- Uses music-metadata for album art extraction
- Supports MP3 file format
- Local storage for user preferences (folders, volume, album art toggle)

---

## Release Notes

### v1.0.1
A maintenance release with stability improvements and minor bug fixes.

### v1.0.0
The initial release of MHX Player — a minimalist music player that "just plays in order." Perfect for albums and numbered playlists where you want sequential playback without shuffle or complex playlist management.

[1.0.1]: https://github.com/yourusername/mhx-player/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/yourusername/mhx-player/releases/tag/v1.0.0

