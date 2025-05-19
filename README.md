## NiceFont - 字体调整脚本

| <a href="https://github.com/10D24D/NiceFont/blob/main/README.md">中文</a> | <a href="https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md">English</a> |
| ------------------------------------------------------------ | ------------------------------------------------------------ |

<a href="https://greasyfork.org/scripts/533232-nicefont" target="_blank">
<img alt="version" src="https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=%E7%89%88%E6%9C%AC&logo=velog&logoColor=BE95FF&color=7B68EE"></img>
<img alt="download" src="https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=%E7%94%A8%E6%88%B7%E5%AE%89%E8%A3%85%E9%87%8F&logo=bilibili&logoColor=78FF96"></img>
</a>
<a href="https://github.com/10D24D/NiceFont" target="_blank">
<img alt="stars" src="https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange"></img>
<img alt="forks" src="https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E"></img>
</a>

### ✨ 项目简介

- **NiceFont** 是一款修改页面字体的脚本工具，旨在让字体更加清晰、舒适、耐视、好看！“真正调整字体，而非页面缩放，拒绝将就！”。
- 支持动态、定时和手动调整字体大小和类型，可记住在不同页面上的字体设置，下次仍然使用同样的字体访问。
- 基本支持所有网站的字体调整，包括B站的评论区、钉钉的在线文档。
- 喜欢这个插件的小伙伴，可以给我的GitHub项目 [NiceFont](https://github.com/10D24D/NiceFont) 点个⭐️STAR支持一下。

### 📜 更新日志

#### v2.0.0 - 2025-05-19

**新功能**

- **切换菜单面板**：新增直观的浮动面板界面，支持下拉菜单选择字体、实时状态显示和一键保存配置。用户可在浮动面板和 Tampermonkey 菜单间切换。
- **首次调整字体**：支持自定义首次加载页面后调整字体的时间，提升初始体验。
- **当前配置源于**：直观显示当前网站的字体配置情况。
- **配置作用范围**：支持子域名、顶级域名、所有网站三种配置模式，灵活保存和应用字体设置。

**改进**

- **性能优化**：
  - 使用节流（`throttle`）优化动态调整，降低性能开销。
- **健壮性**：
  - 新增日志功能（`log`）便于调试。
  - 增加错误捕获（`try-catch`），提高脚本稳定性。

**修复**

- 修复了旧版中字体重置问题。

---

#### v1.4 - 2025-04-20

- 紧急修复菜单不显示的 BUG。

---

#### v1.3 - 2025-04-20

- 优化代码，新增配置保存功能，首次访问页面自动调整字体。
- 体验优化：固定悬浮菜单，调整字体大小更省心。

---

#### v1.2 - 2025-04-19

- 支持 iframe 内字体调整，解决钉钉在线文档字体无法调整的问题。

---

#### v1.1 - 2025-04-19

- 增加对 Shadow DOM 的支持，解决 B 站评论区字体无法调整的问题。

---

#### v1.0 - 2025-04-18

- 初始版本，支持字体大小调整、字体类型选择、动态调整、定时调整和记忆设置功能。

### 🎨 界面预览

<img alt="UI" src="https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_zh.png"></img>

<img alt="UI" src="https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_zh.png"></img>

### 📑 主要功能

- **📏 字体大小调整**：显示当前网页调整字体大小的情况。
- **🔼 放大字体**：一键放大网页所有字体。
- **🔽 缩小字体**：一键缩小网页所有字体。
- **🔁 恢复字体**：恢复网页初始字体设置。
- **♻️ 应用字体变化**：重新应用已设置的字体调整。
- **📈 设置字体增量**：自定义每次调整的字体大小增量（默认 1px）。
- **🖋️ 设置字体类型**：选择或输入自定义字体类型（如 仿宋、微软雅黑）。
- **1️⃣ 切换首次调整字体**：开启后，页面加载 3 秒后自动调整字体，可自定义时间。
- **👁️ 切换动态调整字体**：开启后，页面新内容加载时自动调整字体。
- **⏱️ 切换定时调整字体**：设置定时间隔，定期应用字体调整。
- **🌐 切换菜单语言**：自由切换菜单显示语言。支持 9 种语言：支持汉语、英语、韩语、日语、俄语、法语、德语、西班牙语、葡萄牙语。
- **🎨 切换菜单面板:** 在浮动面板和 Tampermonkey 菜单间切换。
- **📍 当前配置源于:** 显示当前网站使用的字体配置来源。点击菜单可删除当前配置
- **ℹ️ 配置作用范围:** 选择配置保存范围（子域名、顶级域名、所有网站）。
- **💾 保存设置**：支持局部或全局保存设置，刷新后自动生效。

### 🚀 安装步骤

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Greasemonkey](https://www.greasespot.net/) 🛠️。
2. 访问 [NiceFont 脚本页面](https://greasyfork.org/zh-CN/scripts/533232-nicefont) 🌐。
3. 点击“安装”按钮，脚本将自动添加到您的油猴管理器中 ⚙️。
4. 刷新网页，点击脚本菜单即可开始使用脚本 🔄。

### 🤝 如何贡献

欢迎贡献代码和改进意见！请通过 Issue 提交您的反馈，或者直接发起 Pull Request。如果可以，帮忙点个 Star ⭐ 或好评支持这个项目！

**GitHub**：[https://github.com/10D24D/NiceFont](https://github.com/10D24D/NiceFont) 📍

### 📝 许可协议

此项目遵循 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) 开源协议。使用、修改及分发代码时，请遵守该协议条款。

### ⚠️ 免责声明

此脚本为开源项目，免费供所有人使用。使用本脚本时，您同意承担由于脚本带来的任何风险。开发者不对由于使用本脚本导致的任何损失或问题负责。