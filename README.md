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

- **v1.4**：紧急修复菜单不显示的BUG。
- **v1.3**：优化代码，新增配置保存功能，首次访问页面自动调整字体等；体验优化，固定悬浮菜单，调整字体大小更省心。
- **v1.2**：支持 iFrame 中字体调整，解决部分网站（如：钉钉在线文档的字体）字体无法调整问题。
- **v1.1**：增加对 Shadow DOM 的支持，解决 B站评论区字体无法调整问题。
- **v1.0**：初始版本，支持字体大小调整、字体类型选择、动态调整、定时调整和记忆设置功能。

### 🎨 界面预览

<img alt="UI" src="https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_zh.png"></img>

### 📑 主要功能

- **📏 字体大小调整**：显示当前页面调整字体大小的情况。
- **🔼 放大字体**：点击菜单放大网页所有的字体。
- **🔽 缩小字体**：点击菜单缩小网页所有的字体。
- **🔁 恢复字体**：恢复初始字体设置。
- **♻️ 应用字体变化**：重新应用已设置的字体调整。
- **⚙️ 设置字体增量**：设置每次调整字体时的增量（默认 1px）。
- **🖋️ 设置字体类型**：设置网页显示的字体类型。
- **1️⃣ 切换首次调整字体**：开启或关闭首次调整字体功能。启用后首次访问页面三秒后将自动调整字体。
- **👁️ 切换动态调整字体**：开启或关闭动态调整字体功能。启用后页面有新内容将自动调整字体。
- **⏱️ 切换定时调整字体**：设置定时调整字体的时间间隔。启用后定时应用字体变化。
- **🌐 切换菜单语言**：设置菜单显示的语言，支持汉语、英语、韩语、日语、俄语、法语、德语、西班牙语、葡萄牙语。
- **💾 保存设置**：调整设置会被保存，应对不同网站，支持局部保存、全局保存，刷新后自动生效 。

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