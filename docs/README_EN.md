<div align="center">
  <img src="https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png" width="180" alt="NiceFont Logo"/>
</div>

# NiceFont - Make Web Fonts Clearer and More Comfortable!

| [中文](https://github.com/10D24D/NiceFont/blob/main/README.md) | [English](https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md) |

[![Version](https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=Version&logo=velog&logoColor=BE95FF&color=7B68EE)](https://greasyfork.org/scripts/533232-nicefont) 
[![Downloads](https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=Installs&logo=bilibili&logoColor=78FF96)](https://greasyfork.org/scripts/533232-nicefont)  
[![Stars](https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange)](https://github.com/10D24D/NiceFont) 
[![Forks](https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E)](https://github.com/10D24D/NiceFont)

## ✨ Project Introduction

**NiceFont** is a powerful tool for optimizing font rendering on webpages. Say goodbye to blurry text and hello to clarity and comfort. "Truly adjusts fonts without zooming the page—no compromises!"

- **True Font Scaling**: Enhances font size and style directly, without page zoom.
- **Flexible Configuration**: Save your preferences and apply them across pages. Supports first-load, dynamic, or timed adjustment for subdomains, entire sites, or globally.
- **Wide Compatibility**: Works with almost all websites including Bilibili, DingTalk Docs, Zhihu, forums, etc.
- **Multilingual UI**: Supports 9 languages (Chinese, English, Korean, Japanese, Russian, French, German, Spanish, Portuguese).

Ideal for users who value a comfortable reading experience, such as developers, students, or people with visual sensitivity.

If you like this project, consider giving [NiceFont](https://github.com/10D24D/NiceFont) a ⭐ star on GitHub!

## 🎨 Interface Preview

| ![UI 1](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_en.png) | ![UI 2](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_en.png) |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |

## 📑 Key Features

- **📏 Real-Time Font Scaling**: Adjust font size with one click, precise control (default step: 1px).
- **🔠 Custom Fonts**: Choose built-in fonts (e.g., Fangsong, Microsoft Yahei) or enter a custom font.
- **🔄 Reset Fonts**: Revert to original fonts with one click.
- **1️⃣ First-Load Adjustment**: Auto-adjust fonts after page load with a customizable delay (default 3s).
- **🔎 Dynamic Adjustment**: Automatically apply settings when content changes.
- **⏱️ Timed Adjustment**: Periodically update fonts based on interval settings.
- **🌐 Multilingual Menu**: UI supports 9 languages, switch anytime.
- **🎨 Flexible UI**: Choose between floating "web menu" or Tampermonkey's native menu.
- **📍 Config Scope**: Apply settings to subdomains, domains, or globally.
- **💾 Persistent Save**: Font settings are saved and synced across pages and devices.

## 🚀 Installation Guide

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/) 🛠️
2. Visit the [NiceFont Script Page](https://greasyfork.org/en/scripts/533232-nicefont) 🌐
3. Click "Install" — the script will be added to your manager ⚙️
4. Refresh any page, open the NiceFont menu, and start customizing! 🔄

## 📜 Changelog

### v3.1 - 2025-05-20
- **Other**:
  - Refined project description.

### v3.0 - 2025-05-20
- **New Features**:
  - Draggable floating menu panel.
  - Smart panel popup on sites with no saved settings.
- **Improvements**:
  - Rewritten in modular structure.
- **Fixes**:
  - Resolved issues with reset and iframe compatibility.

### v2.0 - 2025-05-19
- **New Features**:
  - Switch between menu panels, redesigned UI with dropdown selection, status display, and save button.
  - Show configuration origin (subdomain/domain/global).
  - Support for subdomain/domain/global settings scope.
- **Improvements**:
  - Throttling applied to dynamic adjustments.
  - Added logging for debugging.
  - Better error handling with try-catch blocks.
  - Delay-supported font adjustment after page load.
- **Fixes**:
  - Fixed font reset issue in previous versions.

### v1.4 - 2025-04-20
- Emergency fix for menu not showing.

### v1.3 - 2025-04-20
- New setting persistence, auto-adjust fonts on first visit.
- Smoother menu experience.

### v1.2 - 2025-04-19
- Support font adjustment inside iframes (DingTalk Docs).

### v1.1 - 2025-04-19
- Support for Shadow DOM, fix Bilibili comment section fonts.

### v1.0 - 2025-04-18
- Initial release with font size, type, dynamic/timed adjustment, and save settings support.

## ❓ FAQ

- **What websites does NiceFont support?**  
  Almost all, including Bilibili, DingTalk, Zhihu, iframes, and Shadow DOM.

- **How do I use custom fonts?**  
  Select "Set Font Type" in the menu, choose a built-in font or type your own.

- **Why aren’t my settings saved?**  
  Make sure you clicked "Save Settings" and chose a config scope. Settings auto-apply on future visits.

- **How do I switch the language?**  
  Choose "Switch Menu Language" in the menu. 9 languages supported.

- **Encounter issues?**  
  Submit via [GitHub Issues](https://github.com/10D24D/NiceFont/issues) — we’ll fix it ASAP!

## 🤝 Contributing

You're welcome to contribute or make suggestions!
- Report bugs or request features: [GitHub Issues](https://github.com/10D24D/NiceFont/issues) 📝
- Fork the repo and open a PR 🚀
- Like the project? ⭐ Star on [GitHub](https://github.com/10D24D/NiceFont) or leave a review on [GreasyFork](https://greasyfork.org/en/scripts/533232-nicefont)!

## 📝 License

NiceFont is open-sourced under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Feel free to use, modify, and share — just follow the terms.

## ⚠️ Disclaimer

NiceFont is a free and open-source project. By using it, you agree to assume any risk. The developer is not liable for any issues or damages caused by using this script.