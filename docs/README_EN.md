# NiceFont - Make Web Fonts Clearer and More Comfortable!

| [中文](https://github.com/10D24D/NiceFont/blob/main/README.md) | [English](https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md) |

[![Version](https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=Version&logo=velog&logoColor=BE95FF&color=7B68EE)](https://greasyfork.org/scripts/533232-nicefont) 
[![Downloads](https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=Installs&logo=bilibili&logoColor=78FF96)](https://greasyfork.org/scripts/533232-nicefont)  
[![Stars](https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange)](https://github.com/10D24D/NiceFont) 
[![Forks](https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E)](https://github.com/10D24D/NiceFont)

## ✨ Overview

**NiceFont** is a powerful userscript tool designed to optimize web fonts, making your browsing experience clearer and more comfortable!  
Tired of small, blurry, or inconsistent web fonts? NiceFont gives you full control over font size and style — truly adjust fonts, not just zoom the page!

- **Cross-site support**: Works on almost any website, including Bilibili comments and DingTalk documents.
- **Personalized experience**: Supports dynamic, scheduled, and manual font adjustments. Settings are saved automatically and persist after refresh.
- **Multilingual UI**: Supports 9 languages (Chinese, English, Korean, Japanese, Russian, French, German, Spanish, Portuguese) for global usability.
- **User-friendly**: Intuitive floating panel and Tampermonkey menu make it easy to use.

Like NiceFont? ⭐ Star us on [GitHub](https://github.com/10D24D/NiceFont)!

## 🎨 UI Preview

| ![UI 1](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_en.png) | ![UI 2](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_en.png) |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |

## 📑 Key Features

- **📏 Real-time font adjustment**: One-click increase/decrease with precision (1px by default).
- **🔠 Custom fonts**: Choose from built-in fonts (e.g., FangSong, Microsoft YaHei) or enter custom font names.
- **🔄 Reset fonts**: One-click to restore original web fonts.
- **1️⃣ Initial adjustment**: Auto adjust fonts after page load with custom delay (default 3s).
- **🔎 Dynamic adjustment**: Automatically applies font settings as content changes.
- **⏱️ Scheduled adjustment**: Periodically reapply font settings — great for dynamic content.
- **🌐 Multilingual support**: Switch UI language anytime.
- **🎨 Flexible panels**: Choose between a floating panel or the Tampermonkey menu.
- **📍 Config scope**: Apply settings by subdomain, root domain, or globally.
- **💾 Persistent storage**: Settings are saved and synced across pages or devices.

## 🚀 Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/). 🛠️  
2. Visit the [NiceFont script page](https://greasyfork.org/en/scripts/533232-nicefont). 🌐  
3. Click the "Install" button to add the script to your manager. ⚙️  
4. Refresh any webpage and open the NiceFont menu to start customizing fonts! 🔄  

## 📜 Changelog

### v3.0 - 2025-05-20
- **New**:
  - Added draggable floating panel.
  - Automatically shows panel on new sites without saved settings.
- **Improved**:
  - Refactored with modular code structure.
- **Fixed**:
  - Font reset issues and iframe compatibility bugs.

### v2.0 - 2025-05-19
- **New**:
  - Introduced menu switcher with floating UI, dropdown font selector, live status, and one-click save.
  - Added “Config source” display to show where current settings come from.
  - Added “Config scope” (subdomain/root domain/global) to flexibly apply settings.
- **Improved**:
  - Used `throttle` to optimize performance during dynamic updates.
  - Added `log` system for debugging.
  - Wrapped logic in `try-catch` blocks to enhance stability.
  - Added initial font adjustment with customizable delay after page load.
- **Fixed**:
  - Font reset issue from earlier versions.

### v1.4 - 2025-04-20
- Fixed urgent bug where menu wouldn't display.

### v1.3 - 2025-04-20
- Added settings persistence; fonts now auto-adjust on first visit.
- Improved floating menu experience.

### v1.2 - 2025-04-19
- Support for iframe font adjustment, compatible with DingTalk documents.

### v1.1 - 2025-04-19
- Shadow DOM support; fixed Bilibili comment font issue.

### v1.0 - 2025-04-18
- Initial release: font size adjustment, type selection, dynamic/scheduled adjustment, and saved settings.

## ❓ FAQ

- **Which websites are supported?**  
  Almost all sites — including Bilibili, DingTalk, Zhihu — with support for iframe and Shadow DOM.
- **How do I set a custom font?**  
  In the menu, choose "Set Font Type", then pick a built-in font (e.g. Arial, FangSong) or enter a custom name.
- **Why aren’t my settings saved?**  
  Make sure you click "Save Settings" and select a config scope (subdomain/root/global). Settings will auto-apply next time.
- **How do I switch the language?**  
  Use the “Switch Language” option in the menu.
- **Having issues?**  
  Please report via [GitHub Issues](https://github.com/10D24D/NiceFont/issues) and we’ll help promptly!

## 🤝 Contribute

We welcome contributions to NiceFont!  
- Submit bugs or feature requests: [GitHub Issues](https://github.com/10D24D/NiceFont/issues) 📝  
- Code contributions: Fork the project and create a Pull Request 🚀  
- Like NiceFont? Give it a [⭐ Star](https://github.com/10D24D/NiceFont) or leave a review on [GreasyFork](https://greasyfork.org/en/scripts/533232-nicefont)!

## 📝 License

NiceFont is released under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).  
Feel free to use, modify, and share it — just follow the terms.

## ⚠️ Disclaimer

NiceFont is a free and open-source project.  
By using this script, you agree to bear all risks. The developers are not liable for any issues or losses caused by the script.
