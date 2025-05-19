## NiceFont - Font Adjustment Script

| <a href="https://github.com/10D24D/NiceFont/blob/main/README.md">中文</a> | <a href="https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md">English</a> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

<a href="https://greasyfork.org/scripts/533232-nicefont" target="_blank">
<img alt="version" src="https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=Version&logo=velog&logoColor=BE95FF&color=7B68EE"></img>
<img alt="download" src="https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=Installs&logo=bilibili&logoColor=78FF96"></img>
</a>
<a href="https://github.com/10D24D/NiceFont" target="_blank">
<img alt="stars" src="https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange"></img>
<img alt="forks" src="https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E"></img>
</a>

### ✨ Project Overview

- **NiceFont** is a font modification userscript designed to make fonts clearer, more comfortable, eye-friendly, and aesthetically pleasing! “Truly adjust the font, not the page zoom. Refuse to settle!”
- Supports dynamic, scheduled, and manual font adjustment. Remembers your font settings for each page and applies them the next time you visit.
- Works on almost all websites, including comment sections on Bilibili and online docs on DingTalk.
- If you like this script, feel free to star the GitHub repo [NiceFont](https://github.com/10D24D/NiceFont) ⭐.

### 📜 Changelog

#### v2.0.0 - 2025-05-19

**New Features**

- **Switchable Menu Panel**: A new floating panel interface allows for intuitive font selection via dropdowns, real-time status display, and one-click save. You can switch between the floating panel and Tampermonkey menu.
- **Initial Font Adjustment**: Customize the delay before the first font adjustment after the page loads for better UX.
- **Current Config Source**: Clearly indicates the origin of the current font settings for the site.
- **Config Scope**: Choose to save/apply settings for subdomain, root domain, or all sites.

**Improvements**

- **Performance Optimization**:
  - Added `throttle` for dynamic adjustment to reduce performance impact.
- **Robustness**:
  - Added `log` function for debugging.
  - Added `try-catch` for better error handling and script stability.

**Fixes**

- Fixed font reset issues in earlier versions.

---

#### v1.4 - 2025-04-20

- Emergency fix for the menu not displaying.

---

#### v1.3 - 2025-04-20

- Refactored code. Added config saving; fonts auto-adjust on first visit.
- UX improvements: floating menu fixed for easier access.

---

#### v1.2 - 2025-04-19

- Font adjustment now works in iframes, solving the issue with DingTalk online documents.

---

#### v1.1 - 2025-04-19

- Added support for Shadow DOM, solving the issue with Bilibili comment font.

---

#### v1.0 - 2025-04-18

- Initial release with support for font size/type adjustment, dynamic/scheduled updates, and memory features.

### 🎨 UI Preview

<img alt="UI" src="https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_en.png"></img>

<img alt="UI" src="https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_en.png"></img>

### 📑 Main Features

- **📏 Font Size Adjustment**: Shows current font size changes on the page.
- **🔼 Enlarge Fonts**: One-click to enlarge all fonts on the page.
- **🔽 Shrink Fonts**: One-click to shrink all fonts on the page.
- **🔁 Reset Fonts**: Restore original fonts on the page.
- **♻️ Apply Font Changes**: Reapply the current font settings.
- **📈 Set Font Step**: Customize font size change per step (default 1px).
- **🖋️ Set Font Family**: Choose or enter custom font family (e.g., Fangsong, Microsoft YaHei).
- **1️⃣ Toggle Initial Adjustment**: Auto-adjust fonts after 3 seconds (default); customizable delay.
- **👁️ Toggle Dynamic Adjustment**: Automatically adjust fonts when new content loads.
- **⏱️ Toggle Scheduled Adjustment**: Apply font changes periodically at set intervals.
- **🌐 Toggle Menu Language**: Switch UI language freely. Supports 9 languages: Chinese, English, Korean, Japanese, Russian, French, German, Spanish, Portuguese.
- **🎨 Toggle Menu Panel**: Switch between floating panel and Tampermonkey menu.
- **📍 Current Config Source**: Shows the source of the current font settings. Click to delete.
- **ℹ️ Config Scope**: Choose the scope for config saving (subdomain, domain, all sites).
- **💾 Save Settings**: Save current settings locally or globally. Automatically applies after reload.

### 🚀 Installation Guide

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/) 🛠️.
2. Visit the [NiceFont script page](https://greasyfork.org/en/scripts/533232-nicefont) 🌐.
3. Click the “Install” button to add it to your userscript manager ⚙️.
4. Refresh any page and access the script menu to start using it 🔄.

### 🤝 How to Contribute

Contributions are welcome! Submit issues, feedback, or Pull Requests on GitHub. And if you find it useful, please leave a ⭐ or a good review to support the project!

**GitHub**: [https://github.com/10D24D/NiceFont](https://github.com/10D24D/NiceFont) 📍

### 📝 License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). Please follow the license terms for usage, modification, and distribution.

### ⚠️ Disclaimer

This is an open-source script, free for public use. By using it, you agree to bear any risks. The developer is not liable for any loss or issues arising from the use of this script.
