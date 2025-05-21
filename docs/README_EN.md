<div align="center">
  <img src="https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png" width="180" alt="NiceFont Logo"/>
</div>

# NiceFont - Make Web Fonts Clearer and More Comfortable!

| [Chinese](https://github.com/10D24D/NiceFont/blob/main/README.md) | [English](https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md) |

[![Version](https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=Version&logo=velog&logoColor=BE95FF&color=7B68EE)](https://greasyfork.org/scripts/533232-nicefont) 
[![Downloads](https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=Downloads&logo=bilibili&logoColor=78FF96)](https://greasyfork.org/scripts/533232-nicefont)  
[![Stars](https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange)](https://github.com/10D24D/NiceFont) 
[![Forks](https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E)](https://github.com/10D24D/NiceFont)

## ✨ Project Overview

**NiceFont** is a powerful tool designed to optimize web font display, making browsing clearer, more comfortable, and visually appealing! "True font adjustment, not page scaling—say no to compromises!"
- **True Font Adjustment**: No page scaling, directly optimizes font size and style.  
- **Flexible Configuration**: Save your font settings and easily apply them to any webpage. Supports one-time, timed, or dynamic font adjustments, adaptable to subdomains, entire sites, or global settings. 
- **Broad Compatibility**: Works with almost all websites, including Bilibili comment sections, DingTalk online documents, Zhihu, forums, and more. 
- **Multilingual Interface**: Supports 9 languages (Chinese, English, Korean, Japanese, Russian, French, German, Spanish, Portuguese) for seamless global use.

Perfect for users seeking a comfortable reading experience, such as media article readers, novel enthusiasts, or those with visual sensitivities.

If you like this plugin, please give my GitHub project [NiceFont](https://github.com/10D24D/NiceFont) a ⭐ Star to show your support!

## 🎨 Interface Preview

| ![UI 1](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_en.png) | ![UI 2](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_en.png) |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |

## 📑 Key Features

- **📏 Font Size Adjustment**: Easily increase or decrease font size with precise control (default increment: 1px).
- **🔠 Font Type Adjustment**: Choose from built-in fonts (e.g., FangSong, Microsoft YaHei) or input custom fonts.
- **🔄 Font Reset**: Restore the webpage's original font settings with one click.
- **1️⃣ One-Time Adjustment**: Automatically adjust fonts upon page load with customizable delay (default: 3 seconds).
- **⏱️ Timed Adjustment**: Periodically update fonts at set intervals, ideal for dynamic webpages.
- **🔎 Dynamic Adjustment**: Automatically apply font settings when page content changes for a consistent experience.
- **🌐 Multilingual Support**: Menu supports 9 languages with seamless switching.
- **🎨 Flexible Panel**: Choose between a floating "web menu" or "plugin menu."
- **📍 Configuration Scope**: Supports subdomain, top-level domain, or global configurations for flexible preference saving.
- **💾 Persistent Storage**: Save font modification settings.

## 🚀 Installation Steps

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) 🛠️.
2. Visit the [NiceFont script page](https://greasyfork.org/en/scripts/533232-nicefont) 🌐.
3. Click the "Install" button to add the script to your script manager ⚙️.
4. Refresh any webpage, open the NiceFont menu, and start customizing fonts! 🔄

## 📜 Changelog

### v3.2 - 2025-05-21
- **Fixes**:
  - Resolved issues with global CSS variables affecting original page layouts; font settings now apply directly to DOM nodes.
  - Fixed font adjustment settings not appearing in Tampermonkey menu mode.
  - Addressed issues with web menu mode not displaying when switching languages or encountering other errors.

### v3.1 - 2025-05-20
- **Other**:
  - Updated project code description.

### v3.0 - 2025-05-20
- **New Features**:
  - Added draggable floating panel.
  - Smart auto-popup panel for websites without saved font configurations.
- **Improvements**:
  - Rewritten with modular code.
- **Fixes**:
  - Fixed font reset and iframe compatibility issues.

### v2.0 - 2025-05-19
- **New Features**:
  - Added "Switch Menu Panel" with an intuitive floating panel interface, supporting dropdown font selection, real-time status display, and one-click configuration saving.
  - Added "Configuration Source" feature to clearly display the font configuration status for the current website.
  - Added "Configuration Scope" feature, supporting subdomain, top-level domain, or all-website configuration modes for flexible saving and application.
- **Improvements**:
  - Optimized dynamic adjustments with throttling to reduce performance overhead.
  - Added logging for easier debugging.
  - Enhanced error handling with try-catch for improved script stability.
  - Added customizable delay for one-time font adjustment to enhance the experience after page load.
- **Fixes**:
  - Fixed font reset issues from previous versions.

### v1.4 - 2025-04-20
- Fixed critical bug causing menu to not display.

### v1.3 - 2025-04-20
- Added configuration saving, enabling automatic font adjustments on first page visit.
- Improved floating menu experience for smoother font adjustments.

### v1.2 - 2025-04-19
- Added support for iframe font adjustments, compatible with DingTalk online documents.

### v1.1 - 2025-04-19
- Added support for Shadow DOM, fixing font adjustment issues in Bilibili comment sections.

### v1.0 - 2025-04-18
- Initial release with font size adjustment, type selection, dynamic/timed adjustments, and settings saving.

## ❓ Frequently Asked Questions (FAQ)

- **Which websites does NiceFont support?**  
  Compatible with nearly all websites, including Bilibili comment sections, DingTalk online documents, Zhihu, and more, with support for iframes and Shadow DOM content.
- **How do I customize fonts?**  
  In the menu, select "Set Font Type" to choose from built-in fonts (e.g., Arial, FangSong) or input a custom font name. Alternatively, select "auto" mode and modify global fonts in your browser settings.
- **What should I do if I encounter issues?**  
  Submit feedback via [GitHub Issues](https://github.com/10D24D/NiceFont/issues) or [Greasyfork Feedback](https://greasyfork.org/en/scripts/533232-nicefont/feedback), and we’ll address it promptly!

## 🤝 How to Contribute

We welcome contributions to NiceFont through code or suggestions!  
- Report bugs or request features: [GitHub Issues](https://github.com/10D24D/NiceFont/issues) 📝  
- Contribute code: Fork the project and submit a Pull Request 🚀  
- Love NiceFont? Give it a [⭐ Star](https://github.com/10D24D/NiceFont) or leave a review on [GreasyFork](https://greasyfork.org/en/scripts/533232-nicefont)!

## 📝 License

NiceFont is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Feel free to use, modify, and share, but please comply with the license terms.

## ⚠️ Disclaimer

NiceFont is a free, open-source project. By using this script, you agree to assume any associated risks. The developer is not responsible for any issues or losses caused by the use of this script.