<div align="center">
  <img src="https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png" width="180" alt="NiceFont Logo"/>
</div>

# NiceFont - Make Web Fonts Clearer and More Comfortable!

| [中文](https://github.com/10D24D/NiceFont/blob/main/README.md) | [English](https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md) |

[![Version](https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=Version&logo=velog&logoColor=BE95FF&color=7B68EE)](https://greasyfork.org/scripts/533232-nicefont) 
[![Downloads](https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=Downloads&logo=bilibili&logoColor=78FF96)](https://greasyfork.org/scripts/533232-nicefont)  
[![Stars](https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange)](https://github.com/10D24D/NiceFont) 
[![Forks](https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E)](https://github.com/10D24D/NiceFont)

## ✨ Project Overview

**NiceFont** is a powerful tool to optimize web font display, making browsing clearer, more comfortable, and visually pleasing! "Truly adjusts fonts, not page scaling—settle for nothing less!"

- **Real Font Adjustment**: Say goodbye to page scaling; directly optimize font size and style.
- **Flexible Configuration**: Save your font settings and easily apply them to every webpage. Supports first-time, scheduled, or dynamic font adjustments, adaptable to subdomains, entire sites, or global settings.
- **Broad Compatibility**: Supports almost all websites, including Bilibili comment sections, DingTalk online documents, Zhihu, community forums, and more.

If you like this plugin, please give our GitHub project [NiceFont](https://github.com/10D24D/NiceFont) a ⭐ Star to support us!

## 🎨 Interface Preview

| ![UI 1](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_en.png) | ![UI 2](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_en.png) |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |

## 📑 Main Features

- **🔠 Set Font Type**: Choose from built-in fonts (e.g., SimSun, Microsoft YaHei) or input custom fonts.
- **📏 Adjust Font Size**: One-click to enlarge/shrink fonts and display current adjustments.
- **♻️ Restore Fonts**: One-click to restore fonts to their original size and style.
- **1️⃣ First-Time Adjustment**: Automatically apply font settings after page load, with customizable delay time.
- **⏱️ Scheduled Adjustment**: Periodically apply font settings at set intervals, suitable for pages with moderate time sensitivity (note: complex pages may experience lag).
- **🔎 Dynamic Adjustment**: Automatically apply font settings when page content changes, suitable for real-time dynamic pages (note: complex pages may experience lag).
- **🌐 Multi-Language Support**: Menu supports 9 languages and automatically switches based on browser language.
- **🚫 Exclude Elements**: Exclude custom CSS selectors and webpage elements.
- **📍 Current Configuration Scope**: Supports excluding sites or matching subdomains, top-level domains, and all websites for font adjustments (click to delete corresponding configurations as needed).
- **💾 Save Configuration**: Persistently save font adjustment configurations locally, remaining effective upon reopening pages.

## 🚀 Installation Steps

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) 🛠️.
2. Visit the [NiceFont Script Page](https://greasyfork.org/en/scripts/533232-nicefont) 🌐.
3. Click the "Install" button; the script will be automatically added to your script manager ⚙️.
4. Refresh any webpage, click the extension tool's menu, then open the NiceFont menu to customize fonts 🔠.

## 📜 Changelog

### v4.0.2-2026-02-15

- **Fixes**:
  - Fixed the BUG where the font (0px) that was not displayed was also resized.

### v4.0.0 - 2025-05-22

- **New Features**:
  - Added functionality to exclude webpage elements and specified sites.
- **Improvements**:
  - Menu language display automatically switches based on browser language.
  - Fonts are set using `!important` to avoid external style interference.
  - Redesigned some menu names to correct ambiguous semantics.
- **Fixes**:
  - Fixed the bug where dynamic adjustment functionality failed after code refactoring.
  - Resolved the issue of independent toggles for first-time/scheduled/dynamic adjustments.

### v3.2 - 2025-05-21

- **Fixes**:
  - Resolved issues caused by using global CSS variables affecting the original page layout; reverted to applying font settings directly to DOM nodes.
  - Fixed the problem where the font adjustment feature did not pop up the settings window in Tampermonkey menu mode.
  - Addressed the issue where the webpage menu mode could not display under certain conditions, such as switching menu languages or other anomalies.

### v3.1 - 2025-05-20

- **Other**:
  - Adjusted project code descriptions.

### v3.0 - 2025-05-20

- **New Features**:
  - Introduced a draggable floating panel.
  - A touch of intelligence: automatically pops up the panel on websites without saved font configurations.
- **Improvements**:
  - Re-encoded using modularization.
- **Fixes**:
  - Fixed font reset and iframe compatibility issues.

### v2.0 - 2025-05-19

- **New Features**:
  - Added "Switch Menu Panel" feature: an intuitive floating panel interface supporting dropdown font selection, real-time status display, and one-click configuration saving.
  - Introduced "Current Configuration Source" feature: intuitively displays the font configuration status of the current website.
  - Added "Configuration Scope" feature: supports subdomain, top-level domain, and all-site configuration modes for flexible saving and application of font settings.
- **Improvements**:
  - Optimized dynamic adjustment using throttling to reduce performance overhead.
  - Added logging functionality for easier debugging.
  - Enhanced script stability with error capturing (`try-catch`).
  - First-time font adjustment feature now supports customizable delay time to improve the initial experience.
- **Fixes**:
  - Fixed font reset issues present in previous versions.

### v1.4 - 2025-04-20

- Urgently fixed the bug where the menu did not display.

### v1.3 - 2025-04-20

- Added configuration saving feature; automatically adjusts fonts on first page visit.
- Optimized floating menu experience for smoother font adjustments.

### v1.2 - 2025-04-19

- Supported font adjustments within iframes; compatible with DingTalk online documents.

### v1.1 - 2025-04-19

- Supported Shadow DOM; fixed font adjustment issues in Bilibili comment sections.

### v1.0 - 2025-04-18

- Initial version supporting font size adjustment, type selection, dynamic/scheduled adjustments, and settings saving.

## ❓ Frequently Asked Questions (FAQ)

- **Which websites does NiceFont support?**  
  Almost all websites, including Bilibili comment sections, DingTalk online documents, Zhihu, etc., supporting iframe and Shadow DOM content.

- **How to customize fonts?**  
  In the menu, select "Set Font Type" to choose from built-in fonts (e.g., Arial, SimSun) or input custom font names. You can also select the "auto" mode and modify global fonts in your browser settings.

- **What should I do if I encounter issues?**  
  Please submit feedback via [GitHub Issues](https://github.com/10D24D/NiceFont/issues) or [Greasyfork Feedback](https://greasyfork.org/en/scripts/533232-nicefont/feedback); we will resolve them as soon as possible!

## 🤝 How to Contribute

We welcome contributions and suggestions for NiceFont!  
- Submit bugs or feature requests: [GitHub Issues](https://github.com/10D24D/NiceFont/issues) 📝  
- Contribute code: Fork the project and submit a Pull Request 🚀  
- Like NiceFont? Please give us a [⭐ Star](https://github.com/10D24D/NiceFont) or leave a positive review on [GreasyFork](https://greasyfork.org/en/scripts/533232-nicefont)!

## 📝 License

NiceFont is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Feel free to use, modify, and share, but please comply with the license terms.

## ⚠️ Disclaimer

NiceFont is a free open-source project. By using this script, you agree to bear any associated risks. The developer is not responsible for any issues or losses resulting from the use of this script.
