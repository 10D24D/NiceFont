// ==UserScript==
// @name         NiceFont
// @namespace    https://github.com/10D24D/NiceFont/
// @version      1.1
// @description  NiceFont 主打让字体更“耐视”好看。支持手动、定时、动态的调整每个网页的字体样式，包括字体大小、字体类型，并且记住它们！
// @description:en NiceFont focuses on making fonts more "durable" and good-looking. Support manual, timed and dynamic adjustment of the font style of each web page, including font size and font type, and remember them!
// @author       DD1024z
// @match        *://*/*
// @icon         https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png
// @license      Apache License 2.0
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL https://update.greasyfork.org/scripts/533232/NiceFont.user.js
// @updateURL https://update.greasyfork.org/scripts/533232/NiceFont.meta.js
// ==/UserScript==

(function () {
    'use strict';

    if (window.top !== window.self) return; // 不在顶层页面时直接退出脚本

    const STORAGE_KEY = 'NiceFont_config'; // 存储字体大小和字体类型配置的键

    let fontIncrement = GM_getValue('font_increment', 1); // 字体增大或减小的步长，默认值为 1px

    const LANGUAGE = GM_getValue('language', 'en'); // 获取用户的语言设置，默认语言是英文
    let currentLanguage = LANGUAGE; // 当前语言

    // 获取字体类型配置，直接从config中获取fontFamily
    let config = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    let currentFontFamily = config.fontFamily || 'none'; // 从 config 获取字体类型，默认 none

    // 多语言文本，支持英文和简体中文
    const translations = {
        en: {
            fontSizeAdjustment: "Font Size Adjustment: ",
            setFontIncrement: "Set Font Increment: ",
            increase: "Increase Font Size",
            decrease: "Decrease Font Size",
            reset: "Reset Font",
            reapply: "Reapply Font Changes",
            toggleWatch: "Toggle Dynamic Font Adjustment",
            toggleTimer: "Toggle Timer-based Font Adjustment",
            dynamicAdjustmentEnabled: "Dynamic Font Adjustment: Enabled",
            dynamicAdjustmentDisabled: "Dynamic Font Adjustment: Disabled",
            timerAdjustmentEnabled: "Timer-based Font Adjustment: Enabled",
            timerAdjustmentDisabled: "Timer-based Font Adjustment: Disabled",
            usageLanguage: "Menu Language: English【√】/ 简体中文",
            dynamicWatchConfirm: "Switch the function of dynamically adjusting the font and refresh the page immediately? After being enabled, the font will be dynamically adjusted when there is new content on the page.\n\nNote: After enabling this function, there will be lag when browsing complex pages!",
            timerPrompt: "Switch the function of adjusting the font at regular intervals and refresh the page immediately?\nPlease enter the interval time for applying font changes at regular intervals (unit: seconds. Enter 0 to close). ",
            switchLanguageConfirm: "Are you sure you want to switch to Simplified Chinese?",
            setFontIncrementPrompt: "Enter font increment (default is 1px):",
            setFontIncrementErrorAlert: "Invalid increment value. Please enter a positive number.",
            setFontFamily: "Set Font Family: ",
            setFontFamilyPrompt: "Enter the font family (default is none):",
            supportFontFamily: "Supported fonts:",
            invalidFontFamilyAlert: "The font you entered is not supported. Please choose a valid one.",
            applyFontFamilyConfirm: 'Would you like this font setting to take effect on all pages or only on the current page?\n "Ok" is applied to all pages, and "Cancel" is only applied to the current page.',
        },
        zh: {
            fontSizeAdjustment: "字体大小调整：",
            setFontIncrement: "设置字体增量：",
            increase: "放大字体",
            decrease: "缩小字体",
            reset: "恢复字体",
            reapply: "应用字体变化",
            toggleWatch: "动态调整字体",
            toggleTimer: "定时调整字体",
            dynamicAdjustmentEnabled: "动态调整字体：已开启",
            dynamicAdjustmentDisabled: "动态调整字体：已关闭",
            timerAdjustmentEnabled: "定时调整字体：已开启",
            timerAdjustmentDisabled: "定时调整字体：已关闭",
            usageLanguage: "菜单语言：英文 / 简体中文【√】",
            dynamicWatchConfirm: "切换动态调整字体的功能并立即刷新页面？\n启用后页面有新内容将动态调整字体。\n\n注意：启用该功能后在浏览复杂页面会存在卡顿现象！",
            timerPrompt: "切换定时调整字体的功能并立即刷新页面？\n请输入定时应用字体变化的间隔时间（单位：秒，输入0则关闭）",
            switchLanguageConfirm: "确定要切换到英文吗？",
            setFontIncrementPrompt: "输入字体增量（默认为1px）：",
            setFontIncrementErrorAlert: "无效的递增值，请输入一个正数。",
            setFontFamily: "设置字体类型：",
            setFontFamilyPrompt: "输入字体类型（默认为none）：",
            supportFontFamily: "支持的字体：",
            invalidFontFamilyAlert: "您输入的字体不受支持，请选择一个有效的字体。",
            applyFontFamilyConfirm: "您希望此字体设置应用于所有页面还是仅当前页面生效？\n“确定”应用到所有页面，“取消”仅应用于当前页面。",
        }
    };

    // 获取字体调整配置
    let currentAdjustment = parseInt(config.resize || '0', 10);
    let watchDOMChanges = config.watcher === true;
    let intervalSeconds = parseInt(config.timer || '0', 10);

    let observer = null;
    let timer = null;
    let menuHandles = {}; // 用来存储菜单项的句柄
    let supportFonts = getSupportedFonts();

    // 更新菜单命令
    updateMenuCommands();

    if (currentAdjustment !== 0 || LANGUAGE) {
        markDefaultFontSize(document.body);
        applyFontSizeRecursively(document.body, currentAdjustment);

        // 启用动态调整字体
        if (watchDOMChanges) {
            observer = new MutationObserver(() => {
                markDefaultFontSize(document.body);
                applyFontSizeRecursively(document.body, currentAdjustment);
                applyFontFamilyToPage(currentFontFamily);
            });
            observer.observe(document.body, { childList: true, subtree: true });
        } else if (intervalSeconds > 0) {
            // 启用定时调整字体
            timer = setInterval(() => {
                markDefaultFontSize(document.body);
                applyFontSizeRecursively(document.body, currentAdjustment);
                applyFontFamilyToPage(currentFontFamily);
            }, intervalSeconds * 1000);
        }
    }

    // 保存字体调整配置
    function saveConfig() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            resize: currentAdjustment,
            watcher: watchDOMChanges,
            timer: intervalSeconds,
            fontFamily: currentFontFamily
        }));
    }

    // 修改字体大小并保存配置、更新菜单
    function changeFontSize(increment) {
        currentAdjustment += increment;
        markDefaultFontSize(document.body);
        applyFontSizeRecursively(document.body, currentAdjustment);
        saveConfig();
        updateMenuCommands();
    }

    // 更新油猴脚本菜单
    function updateMenuCommands() {
        // 移除旧菜单
        Object.values(menuHandles).forEach(GM_unregisterMenuCommand);

        // 根据当前语言选择翻译文本
        const t = translations[currentLanguage];

        // 字体大小显示
        menuHandles.status = GM_registerMenuCommand(`📏 ${t.fontSizeAdjustment} ${currentAdjustment >= 0 ? '+' : ''}${currentAdjustment}px`, () => { });

        // 放大字体
        menuHandles.increase = GM_registerMenuCommand(`🔼 ${t.increase}`, () => changeFontSize(fontIncrement));

        // 缩小字体
        menuHandles.decrease = GM_registerMenuCommand(`🔽 ${t.decrease}`, () => changeFontSize(-fontIncrement));

        // 恢复默认字体大小
        menuHandles.reset = GM_registerMenuCommand(`🔁 ${t.reset}`, () => {
            resetFontSize(document.body);
            currentAdjustment = 0;
            watchDOMChanges = false;
            intervalSeconds = 0;
            if (observer) observer.disconnect();
            if (timer) clearInterval(timer);
            currentFontFamily = 'none';
            saveConfig();
            applyFontFamilyToPage(currentFontFamily);
            updateMenuCommands();
        });

        // 重新应用字体调整
        menuHandles.reapply = GM_registerMenuCommand(`♻️ ${t.reapply}`, () => {
            markDefaultFontSize(document.body);
            applyFontSizeRecursively(document.body, currentAdjustment);
        });

        // 设置增量值
        menuHandles.setIncrement = GM_registerMenuCommand(`⚙️ ${t.setFontIncrement} ${fontIncrement}px`, () => {
            const input = prompt(`${t.setFontIncrementPrompt}`, fontIncrement.toString());
            const newIncrement = parseInt(input, 10);
            if (!isNaN(newIncrement) && newIncrement > 0) {
                fontIncrement = newIncrement;
                GM_setValue('font_increment', fontIncrement);
                updateMenuCommands();
            } else {
                alert(`${t.setFontIncrementErrorAlert}`);
            }
        });

        // 设置字体类型
        menuHandles.setFontFamily = GM_registerMenuCommand(`🖋️ ${t.setFontFamily} ${currentFontFamily}`, () => {
            let input;
            do {
                input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${supportFonts.join(", ")}`, currentFontFamily);
                if (input && supportFonts.indexOf(input.trim()) === -1) {
                    alert(t.invalidFontFamilyAlert);
                }
            } while (input && supportFonts.indexOf(input.trim()) === -1);

            if (input && input.trim() !== "") {
                const applyToAllPages = confirm(`${t.applyFontFamilyConfirm}`);
                currentFontFamily = input.trim();
                if (applyToAllPages) {
                    GM_setValue('font_family', currentFontFamily);
                    document.body.style.fontFamily = currentFontFamily;
                }
                applyFontFamilyToPage(currentFontFamily);
                saveConfig();
                updateMenuCommands();
            }
        });

        // 切换动态调整字体功能
        menuHandles.toggleWatch = GM_registerMenuCommand(`${watchDOMChanges ? '👁️ ' + t.dynamicAdjustmentEnabled : '👁️ ' + t.dynamicAdjustmentDisabled}`, () => {
            if (confirm(t.dynamicWatchConfirm)) {
                watchDOMChanges = !watchDOMChanges;
                if (watchDOMChanges) {
                    intervalSeconds = 0;
                    if (timer) clearInterval(timer);
                }
                saveConfig();
                updateMenuCommands();
                location.reload();
            }
        });

        // 切换定时调整字体功能
        menuHandles.toggleTimer = GM_registerMenuCommand(
            intervalSeconds > 0 ? `⏱️ ${t.timerAdjustmentEnabled}【${intervalSeconds}s】` : `⏱️ ${t.timerAdjustmentDisabled}`,
            () => {
                const input = prompt(t.timerPrompt, intervalSeconds.toString());
                const secs = parseInt(input, 10);
                if (!isNaN(secs)) {
                    intervalSeconds = secs;
                    if (intervalSeconds > 0) {
                        watchDOMChanges = false;
                        if (observer) observer.disconnect();
                    } else {
                        if (timer) clearInterval(timer);
                    }
                    saveConfig();
                    updateMenuCommands();
                    location.reload();
                }
            }
        );

        // 切换语言功能
        menuHandles.switchLanguage = GM_registerMenuCommand(`🌏 ${t.usageLanguage}`, () => {
            const newLanguage = currentLanguage === 'en' ? 'zh' : 'en';
            if (confirm(t.switchLanguageConfirm)) {
                currentLanguage = newLanguage;
                GM_setValue('language', currentLanguage);
                updateMenuCommands();
            }
        });
    }

    // 检查是否有可见文本
    function hasVisibleText(el) {
        return Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "");
    }

    // 标记默认字体大小
    function markDefaultFontSize(el) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;

        const style = window.getComputedStyle(el);
        const isVisible = style.display !== "none" && style.visibility !== "hidden";

        if (hasVisibleText(el) && isVisible && !el.hasAttribute('data-default-fontsize')) {
            el.setAttribute('data-default-fontsize', style.fontSize);
        }

        Array.from(el.children).forEach(child => markDefaultFontSize(child));
    }

    // 批量更新字体大小
    function applyFontSizeRecursively(el, increment) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;

        const style = window.getComputedStyle(el);
        const isVisible = style.display !== "none" && style.visibility !== "hidden";

        if (hasVisibleText(el) && isVisible) {
            let currentFontSize = el.style.fontSize || style.fontSize;

            if (!el.hasAttribute('data-default-fontsize')) {
                el.setAttribute('data-default-fontsize', currentFontSize);
            }

            const baseFontSize = parseFloat(convertToPx(el, el.getAttribute('data-default-fontsize')));

            if (!isNaN(baseFontSize)) {
                const newFontSize = baseFontSize + increment;
                el.style.fontSize = `${newFontSize}px`;
            }

            // 设置字体类型，只更新需要更新的 fontFamily
            if (currentFontFamily !== 'auto' && currentFontFamily !== 'none' && el.style.fontFamily !== currentFontFamily) {
                el.style.fontFamily = currentFontFamily;
            }
        }

        // 支持处理 Shadow DOM 中的字体调整。如果有 shadowRoot，递归处理 shadow DOM 中的元素
        if (el.shadowRoot) {
            const shadowChildren = el.shadowRoot.querySelectorAll('*');
            shadowChildren.forEach(child => applyFontSizeRecursively(child, increment));
        }

        // 遍历子元素，异步更新字体大小
        Array.from(el.children).forEach(child => {
            requestAnimationFrame(() => applyFontSizeRecursively(child, increment));
        });
    }


    // 批量应用字体调整
    function applyFontFamilyToPage(fontFamily) {
        document.body.style.fontFamily = fontFamily;
        Array.from(document.body.getElementsByTagName('*')).forEach(el => {
            el.style.fontFamily = fontFamily;
        });
    }

    // 重置字体大小
    function resetFontSize(el) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;

        const defaultSize = el.getAttribute('data-default-fontsize');
        if (defaultSize) {
            el.style.fontSize = defaultSize;
            el.removeAttribute('data-default-fontsize');
        }

        Array.from(el.children).forEach(child => resetFontSize(child));
    }

    // 转换字体单位（支持 px, em, rem）
    function convertToPx(el, fontSize) {
        const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
        if (fontSize.includes("rem")) {
            return parseFloat(fontSize) * rootFontSize;
        }
        if (fontSize.includes("em")) {
            const parentFontSize = parseFloat(window.getComputedStyle(el.parentElement).fontSize);
            return parseFloat(fontSize) * parentFontSize;
        }
        if (fontSize.includes("%")) {
            const parentFontSize = parseFloat(window.getComputedStyle(el.parentElement).fontSize);
            return (parseFloat(fontSize) / 100) * parentFontSize;
        }
        return fontSize;
    }

    // 获取支持的字体列表
    function getSupportedFonts() {
        const fontFamilies = [
            'auto', 'Arial', 'cursive', 'emoji', 'fangsong', 'fantasy', 'math', 'monospace', 'none', 'sans-serif', 'serif',
            'system-ui', 'ui-monospace', 'ui-rounded', 'ui-sans-serif', 'ui-serif', '-webkit-body',
            'inherit', 'initial', 'revert', 'revert-layer', 'unset',
            'Verdana', 'Helvetica', 'Tahoma', 'Times New Roman', 'Georgia', 'Courier New', 'Comic Sans MS',
        ];
        // 直接返回从浏览器字体库中记录下的字体家族
        return fontFamilies;

        /*
        const testString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        const testElement = document.createElement('span');
        testElement.textContent = testString;
        
        let supportedFonts = [];

        fontFamilies.forEach(font => {
            testElement.style.fontFamily = font;
            document.body.appendChild(testElement);
            const isSupported = window.getComputedStyle(testElement).fontFamily.indexOf(font) !== -1;
            if (isSupported) {
                supportedFonts.push(font);
            }
            document.body.removeChild(testElement);
        });

        return supportedFonts;
        */
    }

})();
