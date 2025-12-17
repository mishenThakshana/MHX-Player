# Release Guide

This document outlines the release process for MHX Player.

## Version Numbering

MHX Player follows [Semantic Versioning](https://semver.org/):
- **MAJOR** (X.0.0): Breaking changes or major feature overhauls
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes and minor improvements

## Creating a New Release

### 1. Update Version Number

Update the version in `package.json`:

```json
{
  "version": "X.X.X"
}
```

### 2. Update Changelog

Add release notes to `CHANGELOG.md` following the Keep a Changelog format:

```markdown
## [X.X.X] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Fixed
- Bug fixes

### Removed
- Removed features
```

### 3. Build the Application

Run the build command for your target platforms:

```bash
# Build for all configured platforms
npm run build

# The built files will be in the dist/ folder:
# - macOS: MHX Player-X.X.X-arm64.dmg
# - Windows: MHX Player Setup X.X.X.exe (when configured)
# - Linux: MHX Player-X.X.X.AppImage (when configured)
```

### 4. Test the Build

Before releasing, test the built application:
- [ ] Application launches correctly
- [ ] Music folders can be added
- [ ] Playback controls work (play, pause, next, previous)
- [ ] Volume controls work
- [ ] Album art displays correctly
- [ ] System tray integration works
- [ ] Media keys work
- [ ] Settings persist after restart

### 5. Create Git Tag

```bash
git add .
git commit -m "Release vX.X.X"
git tag -a vX.X.X -m "Release vX.X.X"
git push origin main --tags
```

### 6. Create GitHub Release (if using GitHub)

1. Go to Releases → New Release
2. Select the version tag
3. Add release title: `MHX Player vX.X.X`
4. Copy release notes from CHANGELOG.md
5. Upload built files from `dist/` folder
6. Publish release

## Build Configuration

The build is configured in `package.json`:

```json
{
  "build": {
    "appId": "com.mhx.player",
    "productName": "MHX Player",
    "mac": {
      "category": "public.app-category.music",
      "target": "dmg"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

## Platform-Specific Notes

### macOS
- Requires code signing for distribution outside the App Store
- DMG provides a drag-and-drop installation experience
- Apple Silicon (arm64) is the primary target

### Windows
- NSIS creates a traditional Windows installer
- May require code signing for Windows Defender

### Linux
- AppImage is a portable format that works on most distributions
- No installation required, just make executable and run

## Release Checklist

- [ ] Version bumped in `package.json`
- [ ] CHANGELOG.md updated
- [ ] All tests pass
- [ ] Build successful for target platforms
- [ ] Built application tested
- [ ] Git tag created
- [ ] Release published (if applicable)

