| <a href="https://github.com/10D24D/NiceFont/blob/main/README.md">中文</a> | <a href="https://github.com/10D24D/NiceFont/blob/main/docs/README_EN.md">English</a> | 
| --- | --- | 

## NiceFont - Font Adjustment Script

### UI

<img src="/static/ui_en.png" width="350"></img>

### Description

**NiceFont** is a userscript designed to make fonts on webpages more "durable" and aesthetically pleasing. This script supports manual, timed, and dynamic adjustments of font size and font type, and it remembers these settings, so they persist even after refreshing the page.

### Features

- **Font Adjustment**: Users can freely adjust the font size and type.
- **Dynamic Adjustment**: Fonts automatically adjust when the content of the page changes.
- **Timed Adjustment**: Set an interval to adjust fonts at regular intervals.
- **Language Support**: The script supports both English and Simplified Chinese.
- **Memory Settings**: All font adjustments are saved, and they are automatically applied after refreshing the page.
- **Multiple Font Support**: You can select different fonts, and the script will automatically detect supported fonts.

### Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/).
2. Visit the [NiceFont script page](https://greasyfork.org/en/scripts/533232-nicefont).
3. Click the "Install" button, and the script will be automatically added to your userscript manager.
4. Once installed, refresh your webpage, and the script will begin working.

### Usage Instructions

- **Adjust Font Size**: Use the menu to increase, decrease, or reset the font size.
- **Set Font Type**: Choose from available system fonts (such as Arial, Verdana, Courier, etc.).
- **Switch Language**: The script supports English and Simplified Chinese, and you can switch between languages from the menu.
- **Dynamic Font Adjustment**: Fonts will automatically adjust when new content is added to the page.
- **Timed Font Adjustment**: Set an interval to adjust the font at regular intervals.

### Menu Features

- **Increase Font**: Click to increase the font size, with a customizable increment.
- **Decrease Font**: Click to decrease the font size, with a customizable increment.
- **Reset Font Size**: Restore the default font size.
- **Reapply Font Changes**: Reapply the font size and style changes to the page.
- **Set Font Increment**: Set the font size increment (default is 1px).
- **Set Font Type**: Select and apply a font family for the page.
- **Toggle Dynamic Font Adjustment**: Enable or disable dynamic font adjustment based on page content changes.
- **Toggle Timed Font Adjustment**: Set the time interval for applying font changes automatically.
- **Switch Language**: Switch between English and Simplified Chinese menu language.

### Configuration

- **Font Increment**: Controls how much the font size increases or decreases during each adjustment. Default is 1px.
- **Timed Adjustment**: Set the time interval for applying font changes automatically (in seconds).
- **Font Family**: Select a font family for the page. You can customize this or use the default font.
- **Dynamic Adjustment**: Enable or disable dynamic font adjustments whenever page content changes.

### Supported Fonts

- **System Fonts**: Arial, Verdana, Helvetica, Times New Roman, etc.
- **Other Fonts**: Supports commonly used web fonts like Courier New, Comic Sans MS, Georgia, and more.

### Notes

1. **Performance**: Enabling dynamic font adjustment may cause delays in loading complex pages, especially when page content is frequently changing.
2. **Refresh Required**: Some settings, such as changing font type, may require refreshing the page to take effect.
3. **Compatibility**: The script works in most modern browsers, but there might be compatibility issues on some specific browsers or with certain page structures.

### Changelog

- **v1.0**: Initial version with support for font size adjustment, font type selection, dynamic adjustment, timed adjustment, and memory settings.

### Contact

- **GitHub**: https://github.com/10D24D/NiceFont

------

### Disclaimer

This script is an open-source project and is free for everyone to use. By using this script, you agree to take full responsibility for any risks that may arise from its use. The developers are not responsible for any losses or issues caused by using this script.