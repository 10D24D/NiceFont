<div align="center">
  <img src="https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png" width="180" alt="NiceFont Logo"/>
</div>

# NiceFont - 让网页字体更清晰、更舒适！

| [中文](https://github.com/10D24D/NiceFont/blob/main/README.md) | [English](https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md) |

[![Version](https://img.shields.io/greasyfork/v/533232?style=for-the-badge&label=版本&logo=velog&logoColor=BE95FF&color=7B68EE)](https://greasyfork.org/scripts/533232-nicefont) 
[![Downloads](https://img.shields.io/greasyfork/dt/533232?style=for-the-badge&label=用户安装量&logo=bilibili&logoColor=78FF96)](https://greasyfork.org/scripts/533232-nicefont)  
[![Stars](https://img.shields.io/github/stars/10D24D/NiceFont?style=for-the-badge&label=Stars&logo=undertale&logoColor=red&color=orange)](https://github.com/10D24D/NiceFont) 
[![Forks](https://img.shields.io/github/forks/10D24D/NiceFont?style=for-the-badge&label=Forks&logo=stackshare&logoColor=green&color=0AC18E)](https://github.com/10D24D/NiceFont)

## ✨ 项目简介

**NiceFont** 耐视字体，是一款优化网页字体显示的强大工具，让浏览更清晰、舒适、耐视！“真正调整字体，而非页面缩放，拒绝将就”！
- **真实字体调整**：告别页面缩放，直接优化字体大小与风格。  
- **灵活配置**：保存你的字体设置，轻松应用到每个网页。支持首次、定时或动态调整网页字体，适配子域名、整站或全局设置。 
- **广泛兼容**：支持哔哩哔哩B站评论区、钉钉在线文档、知乎、社区论坛等几乎所有网站。 

喜欢这个插件的小伙伴，可以给我的GitHub 项目 [NiceFont](https://github.com/10D24D/NiceFont) 点个 ⭐ Star 支持一下！

## 🎨 界面预览

| ![UI 1](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_1_zh.png) | ![UI 2](https://raw.githubusercontent.com/10D24D/NiceFont/refs/heads/main/static/ui_2_zh.png) |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |

## 📑 主要功能

- **🔠 设置字体类型**：选择内置字体（如仿宋、微软雅黑）或输入自定义字体。
- **📏 字体大小调整**：一键放大/缩小字体，并显示当前调整情况。
- **♻️ 恢复字体**：一键恢复字体，还原网页原始字体大小和风格。
- **1️⃣ 首次调整**：页面加载后自动应用字体设置，支持自定义延迟时间）。
- **⏱️ 定时调整**：按设定的时间定期应用字体设置，适合时效性要求中等的网页（需注意复杂页面可能会出现卡顿现象）。
- **🔎 动态调整**：页面内容变化时自动应用字体设置，适合实时变动的网页（需注意复杂页面可能会出现卡顿现象）。
- **🌐 多语言支持**：菜单支持 9 种语言，自动根据浏览器语言同步切换。
- **🚫 排除元素**：排除自定义的css样式选择器，网页元素。
- **📍 当前配置作用**：支持排除站点，或匹配子域名、顶级域名及所有网站进行字体调整（根据不同情况，点击操作可删除对应配置）。
- **💾 保存配置**：持久化保存字体调整的配置到本地，重新打开页面仍然生效。

## 🚀 安装步骤

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或 [Violentmonkey](https://violentmonkey.github.io//) 🛠️。
2. 访问 [NiceFont 脚本页面](https://greasyfork.org/zh-CN/scripts/533232-nicefont) 🌐。
3. 点击“安装”按钮，脚本将自动添加到你的脚本管理器 ⚙️。
4. 刷新任意网页，点击扩展工具的菜单，再打开 NiceFont 菜单，即可自定义字体🔠

## 📜 更新日志

### v4.0.0 - 2025-05-22
- **新功能**：
  - 新增排除网页元素、排除指定站点功能。
- **改进**：
  - 菜单语言的显示自动根据浏览器语言同步切换。
  - 使用 !important 的方式设置字体，避免外部样式影响。
  - 重新定义部分菜单命名，纠正语义不明确问题。
- **修复**：
  - 修复代码重构后动态调整功能失效的BUG。
  - 解决首次/定时/动态调整开关独立问题。

### v3.2 - 2025-05-21
- **修复**：
  - 解决使用全局 CSS 变量影响页面原始布局的问题，恢复字体设置直接应用到 DOM 节点的方式。
  - 解决油猴菜单模式下字体调整功能不弹出设置窗口的问题。
  - 解决网页菜单模式在切换菜单语言或其他异常情况下无法显示的问题。

### v3.1 - 2025-05-20
- **其他**：
  - 调整项目代码描述。

### v3.0 - 2025-05-20
- **新功能**：
  - 新增拖拽式浮动面板。
  - 小小的智能，在没有保存字体配置的网站中自动弹出面板。
- **改进**：
  - 使用模块化重新编码。
- **修复**：
  - 修复字体重置和 iframe 兼容性问题。

### v2.0 - 2025-05-19
- **新功能**
  - 新增“切换菜单面板”功能，直观的浮动面板界面，支持下拉菜单选择字体、实时状态显示和一键保存配置。
  - 新增“当前配置源于”功能，直观显示当前网站的字体配置情况。
  - 新增“配置作用范围”功能，支持子域名、顶级域名、所有网站三种配置模式，灵活保存和应用字体设置。
- **改进**
  - 使用节流throttle优化动态调整，降低性能开销。
  - 新增日志功能log便于调试。
  - 增加错误捕获try-catch，提高脚本稳定性。
  - 首次调整字体功能，支持自定义延迟时间，用以页面加载后自动调整字体，提升体验。
- **修复**
  - 修复了旧版中字体重置问题。

### v1.4 - 2025-04-20
- 修复菜单不显示的紧急 Bug。

### v1.3 - 2025-04-20
- 新增配置保存功能，首次访问页面自动调整字体。
- 优化悬浮菜单体验，调整字体更流畅。

### v1.2 - 2025-04-19
- 支持 iframe 字体调整，兼容钉钉在线文档。

### v1.1 - 2025-04-19
- 支持 Shadow DOM，修复 B 站评论区字体调整问题。

### v1.0 - 2025-04-18
- 初始版本，支持字体大小调整、类型选择、动态/定时调整及设置保存。

## ❓ 常见问题 (FAQ)

- **NiceFont 支持哪些网站？**  
  几乎兼容所有网站，包括哔哩哔哩B站的评论区、钉钉在线文档、知乎等，支持 iframe 和 Shadow DOM 内容。
- **如何自定义字体？**  
  在菜单中选择“设置字体类型”，可从内置字体（如 Arial、仿宋）中选择，或输入自定义字体名称。也可以选择“auto”模式，然后在浏览器配置中修改全局字体。
- **遇到问题怎么办？**  
  请在 [GitHub Issues](https://github.com/10D24D/NiceFont/issues) 或 [Greasyfork Feedback](https://greasyfork.org/zh-CN/scripts/533232-nicefont/feedback) 提交反馈，我们会尽快解决！

## 🤝 如何贡献

欢迎为 NiceFont 贡献代码或建议！  
- 提交 Bug 或功能请求：[GitHub Issues](https://github.com/10D24D/NiceFont/issues) 📝  
- 贡献代码：Fork 项目并提交 Pull Request 🚀  
- 喜欢 NiceFont？可以帮忙点个 [⭐ Star](https://github.com/10D24D/NiceFont) 或在 [GreasyFork](https://greasyfork.org/zh-CN/scripts/533232-nicefont) 留下好评！

## 📝 许可协议

NiceFont 遵循 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) 开源协议。欢迎使用、修改和分享，但请遵守协议条款。

## ⚠️ 免责声明

NiceFont 是一个免费的开源项目。使用本脚本即表示你同意承担相关风险。开发者不对因使用脚本导致的任何问题或损失负责。
