# CatMarkDownEditor Changelog
All notable changes to CatMarkDownEditor will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-12-04
### BREAKING CHANGES
- Migrated from CodeMirror 5 to CodeMirror 6. This is a complete rewrite of the editor's core and introduces a new API.
- Dropped support for some legacy options that are not compatible with CodeMirror 6.

### Added
- New modular architecture based on CodeMirror 6.
- Re-implemented core functionalities: toolbar, status bar, autosave, preview, side-by-side, and fullscreen modes.
- Re-implemented image upload functionality with support for drag & drop and paste.

### Changed
- Updated all dependencies to their latest versions.
- The build process now uses Babel to transpile modern JavaScript.
- The project license has been changed to GPL-3.0-or-later.
