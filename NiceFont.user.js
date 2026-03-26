// ==UserScript==
// @name         NiceFont (耐视字体)
// @name:zh-CN    NiceFont (耐视字体)
// @name:zh-TW    NiceFont（耐視字體）
// @name:en       NiceFont
// @name:ko       NiceFont (좋은 글꼴)
// @name:ja       NiceFont (いいフォント)
// @name:ru       NiceFont (Хороший шрифт)
// @name:fr       NiceFont (Police agréable)
// @name:de       NiceFont (Schöne Schrift)
// @name:es       NiceFont (Fuente agradable)
// @name:pt       NiceFont (Fonte agradável)
// @version      4.3.1
// @author       DD1024z
// @description  NiceFont: 是一款优化网页字体显示的工具，让浏览更清晰、舒适！“真正调整字体，而非页面缩放，拒绝将就”！可直接修改网页的字体大小与风格，保存你的字体设置，轻松应用到每个网页，支持首次、定时或动态调整字体，适配子域名、整站或全局设置，几乎兼容所有网站！
// @description:zh-TW  NiceFont：優化網頁字體顯示的工具，瀏覽更清晰、舒適！「真正調整字體，非頁面縮放，拒絕將就」！直接修改字體大小與風格，儲存設定，輕鬆應用於各網頁，支援首次、定時或動態調整，適配子域名或全局設定，幾乎相容所有網站！
// @description:en     NiceFont: Optimize web font display for clear, comfortable browsing! "Adjusts fonts directly, not page scaling—no compromises!" Modify font size & style, save settings, apply to all pages. Supports one-time, scheduled, or dynamic adjustments, for subdomains or globally. Works on nearly all sites!
// @description:ko     NiceFont: 웹 폰트 표시를 최적화하여 선명하고 편안한 브라우징! "페이지를 스케일링하지 않고 폰트를 조정—타협 없음!" 폰트 크기와 스타일을 수정, 설정 저장, 모든 페이지에 적용. 최초, 정기, 동적 조정 지원, 서브도메인 또는 전역 설정. 거의 모든 사이트 호환!
// @description:ja     NiceFont：ウェブフォントを最適化し、クリアで快適な閲覧を！「ページスケーリング不要、フォントを直接調整—妥協なし！」フォントサイズとスタイルを変更、設定を保存、全ページに適用。初回、定期、動的調整をサポート、サブドメインやグローバル設定に対応。ほぼ全サイト対応！
// @description:ru     NiceFont: Оптимизирует веб-шрифты для четкого и удобного чтения! "Регулирует шрифты, а не масштабирует страницу — никаких компромиссов!" Изменяет размер и стиль шрифта, сохраняет настройки, применяет ко всем страницам. Поддерживает разовые, плановые или динамические настройки, для поддоменов или глобально. Работает почти на всех сайтах!
// @description:fr     NiceFont : Optimisez l'affichage des polices web pour une navigation claire et confortable ! « Ajuste les polices directement, pas de zoom de page — sans compromis ! » Modifie taille et style, enregistre les paramètres, applique à toutes les pages. Supporte ajustements uniques, programmés ou dynamiques, pour sous-domaines ou global. Compatible avec presque tous les sites !
// @description:de     NiceFont: Optimiert Webschrift für klares, angenehmes Surfen! "Passt Schriften direkt an, ohne Seiten-Skalierung — keine Kompromisse!" Ändert Schriftgröße und -stil, speichert Einstellungen, wendet sie auf alle Seiten an. Unterstützt einmalige, geplante oder dynamische Anpassungen, für Subdomains oder global. Kompatibel mit fast allen Websites!
// @description:es     NiceFont: Optimiza fuentes web para una navegación clara y cómoda. "Ajusta fuentes directamente, sin escalar página — ¡sin concesiones!" Modifica tamaño y estilo, guarda configuraciones, aplica a todas las páginas. Admite ajustes únicos, programados o dinámicos, para subdominios o global. Compatible con casi todos los sitios.
// @description:pt     NiceFont: Otimiza fontes web para navegação clara e confortável! "Ajusta fontes diretamente, sem escalonar página — sem concessões!" Modifica tamanho e estilo, salva configurações, aplica a todas as páginas. Suporta ajustes únicos, agendados ou dinâmicos, para subdomínios ou global. Compatível com quase todos os sites!
// @homepageURL   https://github.com/10D24D/NiceFont/
// @namespace    https://github.com/10D24D/NiceFont/
// @icon         https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png
// @match        *://*/*
// @match        file://*/*
// @license      Apache License 2.0
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_info
// @grant        GM_listValues
// @grant        GM_download
// @run-at       document-start
// @compatible   edge version≥90 (Compatible Tampermonkey, Violentmonkey)
// @compatible   Chrome version≥90 (Compatible Tampermonkey, Violentmonkey)
// @compatible   Firefox version≥84 (Compatible Greasemonkey, Tampermonkey, Violentmonkey)
// @compatible   Opera version≥78 (Compatible Tampermonkey, Violentmonkey)
// @compatible   Safari version≥15.4 (Compatible Tampermonkey, Userscripts)
// @create       2025-4-18
// @copyright    2025, DD1024z
// @downloadURL https://update.greasyfork.org/scripts/533232/NiceFont%20%28%E8%80%90%E8%A7%86%E5%AD%97%E4%BD%93%29.user.js
// @updateURL https://update.greasyfork.org/scripts/533232/NiceFont%20%28%E8%80%90%E8%A7%86%E5%AD%97%E4%BD%93%29.meta.js
// ==/UserScript==

/**
 * NiceFont - 网页字体优化工具
 * 结构：Utils -> appState -> ConfigScopeManager -> ConfigManager -> FontManager -> UIManager
 */
(function () {
    'use strict';

    // iframe 等嵌套页面不执行，避免重复注入
    if (window.top !== window.self) {
        return;
    }

    /** 常量：存储键、默认值等 */
    const Constants = {
        DEFAULT_FONT_SIZE: 16,
        ENABLED_ICON: '✔️',
        DISABLED_ICON: '✖️',
        BASE_STORAGE_KEY: 'NiceFont_config',
        GLOBAL_DEFAULT_KEY: 'NiceFont_global_default_config',
        EXCLUDED_KEY: 'NiceFont_excluded',
        PANEL_TYPE_KEY: 'NiceFont_panelType',
    };

    // --- 工具函数模块 ---
    const Utils = {
        /**
         * 节流函数，限制函数调用频率
         * @param {Function} fn - 要节流的函数
         * @param {number} wait - 节流间隔（毫秒）
         * @returns {Function} 节流后的函数
         */
        throttle(fn, wait) {
            let timeout = null;
            return function (...args) {
                if (!timeout) {
                    timeout = setTimeout(() => {
                        fn(...args);
                        timeout = null;
                    }, wait);
                }
            };
        },

        /**
         * 将字体大小单位转换为像素
         * @param {HTMLElement} el - 元素
         * @param {string} fontSize - 字体大小（带单位）
         * @returns {number} 像素值
         */
        convertToPx(el, fontSize) {
            if (!fontSize) return Constants.DEFAULT_FONT_SIZE;
            const units = {
                'rem': () => parseFloat(fontSize) * parseFloat(window.getComputedStyle(document.documentElement).fontSize),
                'em': () => parseFloat(fontSize) * parseFloat(window.getComputedStyle(el.parentElement).fontSize),
                '%': () => (parseFloat(fontSize) / 100) * parseFloat(window.getComputedStyle(el.parentElement).fontSize),
                'pt': () => parseFloat(fontSize) * 1.3333,
                'vw': () => parseFloat(fontSize) * window.innerWidth / 100,
                'vh': () => parseFloat(fontSize) * window.innerHeight / 100,
                'vmin': () => parseFloat(fontSize) * Math.min(window.innerWidth, window.innerHeight) / 100,
                'vmax': () => parseFloat(fontSize) * Math.max(window.innerWidth, window.innerHeight) / 100
            };
            const unit = fontSize.match(/[a-z%]+$/i)?.[0];
            return unit && units[unit] ? units[unit]() : parseFloat(fontSize) || Constants.DEFAULT_FONT_SIZE;
        },

        /**
         * 检查元素是否包含可见文本
         * @param {HTMLElement} el - 元素
         * @returns {boolean} 是否包含可见文本
         */
        hasVisibleText(el) {
            return Array.from(el.childNodes).some(
                node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
            );
        },

        /**
         * 获取顶级域名
         * @returns {string} 顶级域名（如 .example.com）
         */
        getTopLevelDomain() {
            const hostname = window.location.hostname;
            const parts = hostname.split('.');
            return parts.length >= 2 ? `.${parts.slice(-2).join('.')}` : hostname;
        }
    };

    /**
     * 应用状态（运行时数据，非持久化）
     * 持久化由 ConfigManager 通过 GM_getValue/GM_setValue 处理
     */
    const appState = {
        fontIncrement: 1,
        currentFontFamily: 'none',
        currentAdjustment: 0,
        dynamicAdjustment: false,
        intervalSeconds: 0,
        firstAdjustmentTime: 0,
        panelType: 'pluginPanel',
        isConfigModified: false,
        targetScope: 1,
        pendingScopeChange: null,
        observer: null,
        timer: null,
        firstAdjustmentTimeout: null,
        isAutoOpened: false,
        excludedSelectors: ['i', 'code', 'code *', 'pre', 'pre *', 'svg', 'canvas', 'kbd', 'samp'],
        textStroke: 0,
        textShadow: 0,
        isExcludedSite: false,
    };

    let t;  // 多语言文案，init 时按 navigator.language 赋值
    let lastSavedSnapshot = null;  // 上次保存时的快照，用于判断配置是否被修改

    /** 将当前 appState 写入 lastSavedSnapshot */
    function updateSavedSnapshot() {
        lastSavedSnapshot = {
            resize: appState.currentAdjustment,
            fontFamily: appState.currentFontFamily,
            increment: appState.fontIncrement,
            watcher: appState.dynamicAdjustment,
            timer: appState.intervalSeconds,
            firstTime: appState.firstAdjustmentTime,
            excludedSelectors: JSON.stringify(appState.excludedSelectors),
            textStroke: appState.textStroke,
            textShadow: appState.textShadow,
        };
    }

    /** 对比 lastSavedSnapshot 与 appState，更新 isConfigModified */
    function checkConfigModified() {
        if (appState.pendingScopeChange !== null) {
            appState.isConfigModified = true;
            return;
        }
        if (!lastSavedSnapshot) {
            appState.isConfigModified = true;
            return;
        }
        const strokeEq = Math.abs(appState.textStroke - (lastSavedSnapshot.textStroke ?? 0)) < 1e-6;
        const shadowEq = Math.abs(appState.textShadow - (lastSavedSnapshot.textShadow ?? 0)) < 1e-6;
        appState.isConfigModified = (
            appState.currentAdjustment !== lastSavedSnapshot.resize ||
            appState.currentFontFamily !== lastSavedSnapshot.fontFamily ||
            appState.fontIncrement !== lastSavedSnapshot.increment ||
            appState.dynamicAdjustment !== lastSavedSnapshot.watcher ||
            appState.intervalSeconds !== lastSavedSnapshot.timer ||
            appState.firstAdjustmentTime !== lastSavedSnapshot.firstTime ||
            JSON.stringify(appState.excludedSelectors) !== lastSavedSnapshot.excludedSelectors ||
            !strokeEq ||
            !shadowEq
        );
    }

    /** 配置范围管理：0=排除本站 1=子域名 2=顶级域 3=全局 */
    const ConfigScopeManager = {
        scopeMap: { 0: 'excludeThisSite', 1: 'subdomain', 2: 'topLevelDomain', 3: 'allWebsites' },

        /** 初始化存储键（subdomainKey、topLevelKey、excludedKey） */
        initKeys() {
            this.subdomainKey = `${Constants.BASE_STORAGE_KEY}_${window.location.hostname}`;
            this.topLevelKey = `${Constants.BASE_STORAGE_KEY}_${Utils.getTopLevelDomain()}`;
            this.excludedKey = `${Constants.EXCLUDED_KEY}_${window.location.hostname}`;
        },

        /** 根据 targetScope 返回当前配置对应的 GM 存储键 */
        getConfigKey() {
            this.initKeys();
            const scope = appState.targetScope;
            if (scope === 0) return this.excludedKey;
            if (scope === 1) return this.subdomainKey;
            if (scope === 2) return this.topLevelKey;
            return Constants.GLOBAL_DEFAULT_KEY;
        },

        /** 根据存储内容判断实际生效的范围（0/1/2/3） */
        getEffectiveScope() {
            this.initKeys();
            const excludedConfig = GM_getValue(this.excludedKey, null);
            const subdomainConfig = GM_getValue(this.subdomainKey, {});
            const topLevelConfig = GM_getValue(this.topLevelKey, {});
            const globalConfig = GM_getValue(Constants.GLOBAL_DEFAULT_KEY, {});
            if (excludedConfig && excludedConfig.excluded) return 0;
            if (Object.keys(subdomainConfig).length > 0) return 1;
            if (Object.keys(topLevelConfig).length > 0) return 2;
            if (Object.keys(globalConfig).length > 0) return 3;
            return 1;
        },

        /** 当前 targetScope 下是否存在有效配置 */
        hasConfig() {
            this.initKeys();
            const configKey = this.getConfigKey();
            const config = GM_getValue(configKey, null);
            const hasConfig = !!config && (
                (configKey === this.excludedKey && config.excluded) ||
                Object.keys(config).length > 0
            );
            return hasConfig;
        },

        /** 范围对应的多语言文案 */
        getScopeText(scope) {
            if (scope === 0) return t.currentConfigScopeExcluded.replace('{hostname}', window.location.hostname);
            return scope === 1 ? t.subdomain : scope === 2 ? t.topLevelDomain : t.allWebsites;
        },

        /** 范围展示文本（带具体目标） */
        getScopeDisplayText(scope) {
            if (scope === 0) return t.currentConfigScopeExcluded.replace('{hostname}', window.location.hostname);
            if (scope === 1) return t.subdomain;
            if (scope === 2) return t.topLevelDomain;
            return t.allWebsites;
        },

        /** 当前配置的显示文本（hostname、*.tld、全部网站等） */
        getCurrentConfigText() {
            this.initKeys();
            const excludedConfig = GM_getValue(this.excludedKey, null);
            const subdomainConfig = GM_getValue(this.subdomainKey, {});
            const topLevelConfig = GM_getValue(this.topLevelKey, {});
            const globalConfig = GM_getValue(Constants.GLOBAL_DEFAULT_KEY, {});
            if (excludedConfig && excludedConfig.excluded) return t.currentConfigScopeExcluded.replace('{hostname}', window.location.hostname);
            if (Object.keys(subdomainConfig).length > 0) return window.location.hostname;
            if (Object.keys(topLevelConfig).length > 0) return `*.${Utils.getTopLevelDomain().replace(/^\./, '')}`;
            if (Object.keys(globalConfig).length > 0) return t.allWebsites;
            return t.notConfigured;
        },

        /** 配置范围显示文本，含 pendingScopeChange 时显示 "当前 -> 目标" */
        getConfigScopeDisplayText() {
            const effectiveScope = this.getEffectiveScope();
            const currentScopeText = this.getScopeDisplayText(effectiveScope);
            const pendingScope = appState.pendingScopeChange;
            if (pendingScope !== null && pendingScope !== effectiveScope) {
                const targetScopeText = this.getScopeDisplayText(pendingScope);
                return `${currentScopeText} -> ${targetScopeText}`;
            }
            return currentScopeText;
        },

        /** 删除指定范围的配置（scope=0 删 excluded，其他置空对象） */
        deleteConfig(scope) {
            this.initKeys();
            let key, target;
            if (scope === 0) {
                key = this.excludedKey;
                target = window.location.hostname;
                GM_deleteValue(key);
            } else if (scope === 1) {
                key = this.subdomainKey;
                target = window.location.hostname;
                GM_setValue(key, {});
            } else if (scope === 2) {
                key = this.topLevelKey;
                target = `*.${Utils.getTopLevelDomain().replace(/^\./, '')}`;
                GM_setValue(key, {});
            } else {
                key = Constants.GLOBAL_DEFAULT_KEY;
                target = t.allWebsites;
                GM_setValue(key, {});
            }
            return true;
        }
    };

    /** 配置管理：加载/保存/删除/导出导入 */
    const ConfigManager = {
        /** 按优先级加载配置到 appState */
        loadConfig() {
            ConfigScopeManager.initKeys();
            let config = GM_getValue(ConfigScopeManager.excludedKey, null);
            let effectiveScope = 0;
            let configKey = ConfigScopeManager.excludedKey;

            if (config && config.excluded) {
                appState.isExcludedSite = true;
                appState.currentAdjustment = 0;
                appState.currentFontFamily = 'none';
                appState.textStroke = 0;
                appState.textShadow = 0;
                appState.dynamicAdjustment = false;
                appState.intervalSeconds = 0;
                appState.firstAdjustmentTime = 0;
                appState.excludedSelectors = ['i', 'code', 'code *', 'pre', 'pre *', 'svg', 'canvas', 'kbd', 'samp'];
                appState.targetScope = 0;
                updateSavedSnapshot();
                return;
            }

            config = GM_getValue(ConfigScopeManager.subdomainKey, {});
            effectiveScope = 1;
            configKey = ConfigScopeManager.subdomainKey;

            if (Object.keys(config).length === 0) {
                config = GM_getValue(ConfigScopeManager.topLevelKey, {});
                effectiveScope = 2;
                configKey = ConfigScopeManager.topLevelKey;
                if (Object.keys(config).length === 0) {
                    config = GM_getValue(Constants.GLOBAL_DEFAULT_KEY, {});
                    effectiveScope = Object.keys(config).length > 0 ? 3 : 1;
                    configKey = effectiveScope === 3 ? Constants.GLOBAL_DEFAULT_KEY : ConfigScopeManager.subdomainKey;
                }
            }

            appState.isExcludedSite = false;
            appState.fontIncrement = (typeof config.increment === 'number' && config.increment >= 0) ? config.increment : 1;
            appState.currentFontFamily = config.fontFamily || 'none';
            appState.currentAdjustment = (typeof config.resize === 'number') ? config.resize : 0;
            appState.dynamicAdjustment = !!config.watcher;
            appState.intervalSeconds = (typeof config.timer === 'number' && config.timer >= 0) ? config.timer : 0;
            appState.firstAdjustmentTime = (typeof config.firstTime === 'number' && config.firstTime >= 0) ? config.firstTime : 0;
            // 兼容旧配置：历史定时调整自动迁移为动态调整开启 + 定时关闭
            const hadLegacyTimer = appState.intervalSeconds > 0;
            if (appState.intervalSeconds > 0) {
                appState.dynamicAdjustment = true;
                appState.intervalSeconds = 0;
            }
            // 互斥策略：首次调整与动态调整二选一（优先保留首次调整）
            if (appState.firstAdjustmentTime > 0 && appState.dynamicAdjustment) {
                appState.dynamicAdjustment = false;
            }
            appState.excludedSelectors = Array.isArray(config.excludedSelectors) && config.excludedSelectors.length > 0
                ? config.excludedSelectors
                : ['i', 'code', 'code *', 'pre', 'pre *', 'svg', 'canvas', 'kbd', 'samp'];
            appState.textStroke = FontManager.parseStrokeValue(config.textStroke);
            appState.textShadow = FontManager.parseShadowValue(config.textShadow);
            appState.targetScope = [0, 1, 2, 3].includes(effectiveScope) ? effectiveScope : 1;
            if (hadLegacyTimer && configKey) {
                GM_setValue(configKey, {
                    ...config,
                    watcher: appState.dynamicAdjustment,
                    timer: 0
                });
            }

            updateSavedSnapshot();
        },

        /** 不弹确认，直接按 scope 落盘并刷新状态 */
        applyScopeConfigDirect(scope) {
            ConfigScopeManager.initKeys();
            const key = scope === 0 ? ConfigScopeManager.excludedKey :
                scope === 1 ? ConfigScopeManager.subdomainKey :
                    scope === 2 ? ConfigScopeManager.topLevelKey : Constants.GLOBAL_DEFAULT_KEY;

            if (scope === 0) {
                GM_setValue(key, { excluded: true });
                appState.isExcludedSite = true;
                appState.currentAdjustment = 0;
                appState.currentFontFamily = 'none';
                appState.textStroke = 0;
                appState.textShadow = 0;
                appState.dynamicAdjustment = false;
                appState.intervalSeconds = 0;
                appState.firstAdjustmentTime = 0;
                FontManager.restoreFont(document.body);
            } else {
                const config = {
                    increment: appState.fontIncrement,
                    resize: appState.currentAdjustment,
                    watcher: appState.dynamicAdjustment,
                    timer: appState.intervalSeconds,
                    fontFamily: appState.currentFontFamily,
                    firstTime: appState.firstAdjustmentTime,
                    excludedSelectors: appState.excludedSelectors,
                    textStroke: appState.textStroke,
                    textShadow: appState.textShadow
                };
                GM_setValue(key, config);
                appState.isExcludedSite = false;
            }

            appState.isConfigModified = false;
            appState.targetScope = scope;
            appState.pendingScopeChange = null;
            ConfigManager.loadConfig();
            setupScheduledAdjustments();
            UIManager.updateUI();
            UIManager.closeFloatingPanel();
        },

        /** 保存当前 appState 到指定范围，需用户确认 */
        saveConfig() {
            let scope = appState.pendingScopeChange !== null ? appState.pendingScopeChange : appState.targetScope;
            let skipConfirm = false;

            if (!appState.isConfigModified && appState.pendingScopeChange === null) {
                scope = appState.targetScope;
            }

            if (![0, 1, 2, 3].includes(scope)) {
                console.warn('[NiceFont] 无效的 scope 值:', scope, '使用默认 scope=1');
                scope = 1;
            }

            const hasVisualAdjustment =
                appState.currentAdjustment !== 0 ||
                appState.currentFontFamily !== 'none' ||
                appState.textStroke > 0 ||
                appState.textShadow > 0;
            const hasApplyMode = appState.firstAdjustmentTime > 0 || appState.dynamicAdjustment;
            if (hasVisualAdjustment && !hasApplyMode) {
                const promptText = t.adjustmentModeRequiredPrompt ||
                    'Detected font changes, but neither "First Adjustment" nor "Dynamic Adjustment" is enabled.\nChoose one to continue saving:\n1: First Adjustment (default 3s)\n2: Dynamic Adjustment';
                const invalidText = t.adjustmentModeRequiredInvalid || 'Invalid input. Save cancelled.';
                const input = prompt(promptText, '2');
                if (input === null) return;
                const mode = parseInt(input, 10);
                if (mode === 1) {
                    appState.firstAdjustmentTime = appState.firstAdjustmentTime > 0 ? appState.firstAdjustmentTime : 3;
                    appState.dynamicAdjustment = false;
                } else if (mode === 2) {
                    appState.dynamicAdjustment = true;
                    appState.firstAdjustmentTime = 0;
                } else {
                    alert(invalidText);
                    return;
                }
                skipConfirm = true;
            }

            const scopeText = ConfigScopeManager.getScopeText(scope);
            const target = scope === 0 ? window.location.hostname :
                scope === 1 ? window.location.hostname :
                    scope === 2 ? `*.${Utils.getTopLevelDomain().replace(/^\./, '')}` : t.allWebsites;
            const confirmMessage = scope === 3 ?
                t.saveConfigConfirm.replace('{scope}', scopeText).replace(' [{target}]', '') :
                t.saveConfigConfirm.replace('{scope}', scopeText).replace('{target}', target);

            if (skipConfirm || confirm(confirmMessage)) {
                ConfigManager.applyScopeConfigDirect(scope);
            }
        },

        /** 修改配置范围（0/1/2/3），可能触发删除确认 */
        changeConfigScope() {
            const effectiveScope = ConfigScopeManager.getEffectiveScope();
            const currentScopeText = ConfigScopeManager.getScopeDisplayText(effectiveScope);
            const input = prompt(
                t.modifyConfigScopePrompt
                    .replace('{scope}', currentScopeText)
                    .replace(/\{hostname\}/g, window.location.hostname)
                    .replace('{tld}', `*.${Utils.getTopLevelDomain().replace(/^\./, '')}`),
                appState.targetScope
            );
            const newScope = parseInt(input, 10);
            if (![0, 1, 2, 3].includes(newScope)) {
                if (input !== null) alert(t.invalidInput);
                return;
            }
            if (newScope === effectiveScope) {
                return;
            }
            ConfigScopeManager.initKeys();
            const hasConfig = effectiveScope === 0 ? !!GM_getValue(ConfigScopeManager.excludedKey, null) :
                effectiveScope === 1 ? Object.keys(GM_getValue(ConfigScopeManager.subdomainKey, {})).length > 0 :
                    effectiveScope === 2 ? Object.keys(GM_getValue(ConfigScopeManager.topLevelKey, {})).length > 0 :
                        Object.keys(GM_getValue(Constants.GLOBAL_DEFAULT_KEY, {})).length > 0;

            if (effectiveScope === 3 && newScope === 0) {
                const scopeText = ConfigScopeManager.getScopeText(0);
                const target = window.location.hostname;
                const confirmMessage =
                    `${t.currentConfigScope}: ${ConfigScopeManager.getCurrentConfigText()}\n` +
                    t.saveConfigConfirm.replace('{scope}', scopeText).replace('{target}', target);
                if (confirm(confirmMessage)) {
                    ConfigManager.applyScopeConfigDirect(0);
                }
                return;
            }

            if (newScope > effectiveScope && hasConfig) {
                const confirmMessage = effectiveScope === 3 ?
                    `${t.currentConfigScope}: ${ConfigScopeManager.getCurrentConfigText()}\n${t.deleteBeforeScopeChangeConfirm.replace('{scope}', ConfigScopeManager.getScopeText(effectiveScope)).replace(' [{target}]', '')}` :
                    `${t.currentConfigScope}: ${ConfigScopeManager.getCurrentConfigText()}\n${t.deleteBeforeScopeChangeConfirm.replace('{scope}', ConfigScopeManager.getScopeText(effectiveScope)).replace('{target}', ConfigScopeManager.getCurrentConfigText())}`;
                if (confirm(confirmMessage)) {
                    ConfigScopeManager.deleteConfig(effectiveScope);
                    appState.pendingScopeChange = newScope;
                    appState.targetScope = newScope;
                    checkConfigModified();
                    UIManager.updateUI();
                }
            } else {
                appState.pendingScopeChange = newScope;
                appState.targetScope = newScope;
                checkConfigModified();
                UIManager.updateUI();
            }
        },

        /** 删除当前生效范围的配置 */
        deleteCurrentConfig() {
            const effectiveScope = ConfigScopeManager.getEffectiveScope();
            const scopeText = ConfigScopeManager.getScopeText(effectiveScope);
            const target = ConfigScopeManager.getCurrentConfigText();

            if (target === t.notConfigured) {
                return false;
            }

            const confirmMessage = effectiveScope === 3 ?
                `${t.currentConfigScope}: ${target}\n${t.deleteConfigConfirm.replace('{target}', target)}` :
                `${t.currentConfigScope}: ${target}\n${t.deleteConfigConfirm.replace('{target}', target)}`;

            if (confirm(confirmMessage)) {
                ConfigScopeManager.deleteConfig(effectiveScope);
                appState.targetScope = effectiveScope === 0 ? 1 : 1;
                appState.pendingScopeChange = null;
                appState.isExcludedSite = false;
                appState.isConfigModified = false;
                ConfigManager.loadConfig();
                setupScheduledAdjustments();
                UIManager.updateUI();
                return true;
            }
            return false;
        },

        /** 导出所有 NiceFont_ 开头的 GM 存储为 JSON 文件，优先使用 GM_download */
        exportConfig() {
            const keys = GM_listValues().filter(k => k.startsWith('NiceFont_'));
            const data = {};
            keys.forEach(k => { data[k] = GM_getValue(k, null); });
            const json = JSON.stringify({
                version: GM_info?.script?.version || '4.2.0',
                exportedAt: new Date().toISOString(),
                data
            }, null, 2);
            const filename = `NiceFont_config_${new Date().toISOString().slice(0, 10)}.json`;
            if (typeof GM_download === 'function') {
                const blob = new Blob([json], { type: 'application/json' });
                const blobUrl = URL.createObjectURL(blob);
                GM_download({ url: blobUrl, name: filename, saveAs: true });
                setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
            } else {
                const blob = new Blob([json], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(url), 100);
            }
        },

        /** 从 JSON 文件导入配置，展示新增/修改/删除数量后确认写入 */
        importConfig() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json,application/json';
            input.onchange = () => {
                const file = input.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    try {
                        const parsed = JSON.parse(reader.result);
                        const data = parsed?.data || parsed;
                        if (typeof data !== 'object') throw new Error('Invalid format');
                        const importKeys = Object.keys(data).filter(k => k.startsWith('NiceFont_'));
                        if (importKeys.length === 0) throw new Error('No data');
                        const currentKeys = GM_listValues().filter(k => k.startsWith('NiceFont_'));
                        const added = importKeys.filter(k => !currentKeys.includes(k));
                        const modified = importKeys.filter(k => {
                            if (!currentKeys.includes(k)) return false;
                            const a = GM_getValue(k, null);
                            const b = data[k];
                            return JSON.stringify(a) !== JSON.stringify(b);
                        });
                        const deleted = currentKeys.filter(k => !importKeys.includes(k));
                        const msg = t.importConfigPreview
                            .replace('{add}', added.length)
                            .replace('{modify}', modified.length)
                            .replace('{delete}', deleted.length);
                        if (!confirm(msg)) return;
                        deleted.forEach(k => GM_deleteValue(k));
                        importKeys.forEach(k => GM_setValue(k, data[k]));
                        ConfigManager.loadConfig();
                        updateSavedSnapshot();
                        setupScheduledAdjustments();
                        UIManager.updateUI();
                        alert(t.importConfigSuccess);
                    } catch (e) {
                        console.error('[NiceFont] 导入失败:', e);
                        alert(t.importConfigError);
                    }
                };
                reader.readAsText(file, 'UTF-8');
            };
            input.click();
        },

        /** 清空所有 NiceFont_ 配置，需输入 y 确认 */
        clearAllConfig() {
            const input = prompt(t.clearAllConfigConfirm);
            if (input?.trim().toLowerCase() !== 'y') return;
            const keys = GM_listValues().filter(k => k.startsWith('NiceFont_'));
            keys.forEach(k => GM_deleteValue(k));
            appState.currentAdjustment = 0;
            appState.currentFontFamily = 'none';
            appState.textStroke = 0;
            appState.textShadow = 0;
            appState.targetScope = 1;
            appState.pendingScopeChange = null;
            appState.isExcludedSite = false;
            appState.isConfigModified = false;
            appState.dynamicAdjustment = false;
            appState.intervalSeconds = 0;
            appState.firstAdjustmentTime = 0;
            ConfigManager.loadConfig();
            updateSavedSnapshot();
            setupScheduledAdjustments();
            UIManager.updateUI();
            FontManager.restoreFont(document.body);
        },

        /** 导出/导入入口：prompt 选择 1、2 或 3（插件面板时支持 3 清空） */
        exportImportConfig() {
            const choice = prompt(t.exportImportPrompt);
            if (choice === '1') ConfigManager.exportConfig();
            else if (choice === '2') ConfigManager.importConfig();
            else if (choice === '3') ConfigManager.clearAllConfig();
        }
    };

    /** 字体管理：遍历 DOM 应用/恢复字体，支持 iframe、Shadow DOM，字体列表可动态扩展 */
    const FontManager = {
        /** 精简字体列表：参考「字体渲染」脚本，保留常用中英文字体，移除对显示无实质影响的 generic 关键字 */
        supportFonts: [
            'custom', 'auto', 'none',
            'Microsoft YaHei UI', 'Microsoft YaHei', 'PingFang SC', 'Sarasa Gothic SC',
            'Source Han Sans SC', 'Hiragino Sans GB', 'HarmonyOS Sans SC', 'LXGW WenKai',
            'sans-serif', 'serif', 'monospace',
            'Arial', 'Verdana', 'Georgia', 'Times New Roman'
        ],
        systemFontsCache: [],
        styleCache: new WeakMap(),

        /** 尝试获取系统已安装字体（Chrome 103+，需用户授权）；不支持时回退到当前页面已加载字体 */
        async loadSystemFonts() {
            if (typeof window.queryLocalFonts === 'function') {
                try {
                    const fonts = await window.queryLocalFonts();
                    const families = [...new Set(fonts.map(f => f.family).filter(Boolean))].sort();
                    this.systemFontsCache = families;
                    return families;
                } catch (e) {
                }
            }
            const pageFonts = this.getFontsFromPage();
            if (pageFonts.length > 0) {
                this.systemFontsCache = [...new Set([...this.systemFontsCache, ...pageFonts])].sort();
            }
            return this.systemFontsCache;
        },

        /** 从 document.fonts 获取当前页面已加载的字体（无需权限） */
        getFontsFromPage() {
            if (!document.fonts?.forEach) return [];
            const seen = new Set();
            document.fonts.forEach(ff => { if (ff.family) seen.add(ff.family); });
            return [...seen];
        },

        /** 获取字体列表：supportFonts（含用户添加）+ 系统字体（去重）+ custom 置尾 */
        getFontList() {
            const fromSupport = this.supportFonts.filter(f => f !== 'custom');
            const system = this.systemFontsCache.filter(f => !fromSupport.includes(f));
            return [...new Set([...fromSupport, ...system]), 'custom'];
        },

        /** 缓存 getComputedStyle，避免重复计算 */
        getCachedStyle(el) {
            if (!this.styleCache.has(el)) {
                this.styleCache.set(el, window.getComputedStyle(el));
            }
            return this.styleCache.get(el);
        },

        /** 更新排除选择器，校验有效性后写入 appState.excludedSelectors */
        updateExcludedSelectors(selectors) {
            const uniqueSelectors = [...new Set(
                selectors.split(',')
                    .map(s => s.trim())
                    .filter(s => s)
            )];
            for (const sel of uniqueSelectors) {
                try {
                    document.querySelector(sel);
                } catch (e) {
                    console.error('[NiceFont] 无效的CSS选择器:', sel, e);
                    return false;
                }
            }
            appState.excludedSelectors = uniqueSelectors;
            return true;
        },

        /** 解析描边值：0-1 数字，兼容旧版 'none' 或字符串 */
        parseStrokeValue(v) {
            if (typeof v === 'number' && !isNaN(v)) return Math.max(0, Math.min(1, v));
            if (v === 'none' || v === '' || v == null) return 0;
            const n = parseFloat(v);
            return isNaN(n) ? 0 : Math.max(0, Math.min(1, n));
        },

        /** 解析阴影值：0-4 数字，兼容旧版 'none' 或字符串 */
        parseShadowValue(v) {
            if (typeof v === 'number' && !isNaN(v)) return Math.max(0, Math.min(4, v));
            if (v === 'none' || v === '' || v == null) return 0;
            const n = parseFloat(v);
            return isNaN(n) ? 0 : Math.max(0, Math.min(4, n));
        },

        /** 描边数值转 CSS */
        getStrokeCSS(v) { return v > 0 ? `${v}px #333` : ''; },

        /** 阴影数值转 CSS */
        getShadowCSS(v) { return v > 0 ? `1px 1px ${v}px #7C7C7CDD` : ''; },

        /** 根据基础字号生成 class 名（四舍五入取整，如 16.3 -> s16） */
        getSizeClassBase(basePx) {
            const n = Math.round(basePx);
            return Math.max(8, Math.min(96, n));  // 限制 8-96
        },

        /** 从已有 class 模式类名解析基准字号（px），无则 null */
        parseNicefontSizeClassBase(node) {
            for (const c of node.classList) {
                const m = /^nicefont-s(\d+)$/.exec(c);
                if (m) {
                    const n = parseInt(m[1], 10);
                    if (n >= 8 && n <= 96) return n;
                }
            }
            return null;
        },

        /**
         * 解析用于调整字号的基准 px：优先 data-fontsize-default-fontsize，其次 nicefont-sN，最后当前计算字号
         * class 模式不写 data 属性，复用已挂上的 nicefont-sN 作为基准，避免把已叠加 adjustment 的 computed 当成新基准
         */
        getEffectiveBaseFontSizePx(node, style) {
            const attr = node.getAttribute('data-fontsize-default-fontsize');
            if (attr) {
                const px = parseFloat(Utils.convertToPx(node, attr));
                return isNaN(px) ? null : px;
            }
            const fromClass = this.parseNicefontSizeClassBase(node);
            if (fromClass != null) return fromClass;
            const current = node.style.fontSize || style.fontSize;
            if (!current || current === '0px') return null;
            const px = parseFloat(Utils.convertToPx(node, current));
            return isNaN(px) ? null : px;
        },

        /**
         * 切换渲染方式或重新应用前：去掉 class 档位类；若有 data-nicefont-restore-style 则整段还原为首次记录时的 style 属性，否则按旧逻辑逐条去掉 !important
         */
        stripNodeNiceFontArtifacts(node) {
            node.classList.remove('nicefont-applied');
            for (const c of [...node.classList]) {
                if (/^nicefont-s\d+$/.test(c)) node.classList.remove(c);
            }
            const saved = node.getAttribute('data-nicefont-restore-style');
            if (saved !== null) {
                if (saved === '') {
                    node.removeAttribute('style');
                } else {
                    node.setAttribute('style', saved);
                }
            } else {
                for (const p of ['font-family', '-webkit-text-stroke', 'text-stroke', 'text-shadow']) {
                    if (node.style.getPropertyPriority(p) === 'important') {
                        node.style.removeProperty(p);
                    }
                }
                if (node.style.getPropertyPriority('font-size') === 'important') {
                    node.style.removeProperty('font-size');
                    const def = node.getAttribute('data-fontsize-default-fontsize');
                    if (def) node.style.fontSize = def;
                }
            }
        },

        /** 获取或创建全局样式元素，用于 root/class 模式；置于 head 末尾以提高层叠优先级 */
        getOrCreateGlobalStyle(doc) {
            const root = doc.documentElement || doc;
            if (root.nodeType !== Node.ELEMENT_NODE) return null;
            let el = doc.getElementById?.('NiceFont-global-styles') || root.querySelector?.('#NiceFont-global-styles');
            const parent = doc.head || root;
            if (!el) {
                el = doc.createElement('style');
                el.id = 'NiceFont-global-styles';
                parent.appendChild(el);
            } else if (el.parentNode) {
                parent.appendChild(el);
            }
            return el;
        },

        /**
         * contenteditable + 非标准 placeholder：伪元素占位符基准字号（如百度文库 ::after 14px）
         * 首次用 getComputedStyle(::after) 反推基准（减去当前 adjustment，避免已套用 calc 时存大）
         */
        syncContentEditablePlaceholderBase(node) {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (node.getAttribute('contenteditable') !== 'true' || !node.hasAttribute('placeholder')) return;
            // 仅首次采样并固定基数，避免后续重复计算导致漂移
            let basePx = parseFloat(node.getAttribute('data-nicefont-placeholder-base'), 10);
            if (!basePx || isNaN(basePx) || basePx <= 0) {
                basePx = 14;
                try {
                    node.setAttribute('data-nicefont-ph-syncing', '1');
                    const afterPx = parseFloat(window.getComputedStyle(node, '::after').fontSize);
                    const beforePx = parseFloat(window.getComputedStyle(node, '::before').fontSize);
                    const elPx = parseFloat(window.getComputedStyle(node).fontSize);
                    const raw = afterPx || beforePx || elPx || 14;
                    let b = raw;
                    if (b < 8 || b > 96) b = raw;
                    basePx = Math.round(b * 100) / 100;
                    if (basePx < 1) basePx = 14;
                } catch (e) {
                    basePx = 14;
                } finally {
                    node.removeAttribute('data-nicefont-ph-syncing');
                }
                node.setAttribute('data-nicefont-placeholder-base', String(basePx));
            }
            node.style.setProperty('--nicefont-placeholder-base', `${basePx}px`);
        },

        /** 作者是否在 style 属性里写了字体相关声明（用于混合策略：此类节点改走内联强制覆盖） */
        hasAuthorInlineFontRelatedStyle(styleAttr) {
            if (!styleAttr || !String(styleAttr).trim()) return false;
            return /\b(?:font-size|font-family|font|font-weight|font-variant|font-stretch|line-height)\s*:/i.test(styleAttr);
        },

        /** 全局：字号档位 + .nicefont-applied 字族；描边/阴影为全页一条规则（与 class 分档共用同一 style 标签） */
        updateClassModeStyles(doc, sizeBases) {
            const root = doc.documentElement;
            if (!root) return;
            const adj = `${appState.currentAdjustment}px`;
            const font = appState.currentFontFamily;
            const hasCustomFontFamily = font !== 'none';
            const strokeCSS = this.getStrokeCSS(appState.textStroke);
            const shadowCSS = this.getShadowCSS(appState.textShadow);
            root.style.setProperty('--nicefont-adjustment', adj);
            if (hasCustomFontFamily) {
                root.style.setProperty('--nicefont-family', font);
            } else {
                root.style.removeProperty('--nicefont-family');
            }
            root.style.setProperty('--nicefont-stroke', strokeCSS || 'none');
            root.style.setProperty('--nicefont-shadow', shadowCSS || 'none');
            root.classList.add('NiceFont-stroke-shadow');
            const sizeRules = (sizeBases || []).map(s => `.nicefont-s${s} { font-size: calc(${s}px + var(--nicefont-adjustment)) !important; }`).join('\n');
            const styleEl = this.getOrCreateGlobalStyle(doc);
            if (styleEl) {
                const panelNot = ':not(nicefont-panel):not(#NiceFont_panel)';
                const appliedRule = hasCustomFontFamily
                    ? `.nicefont-applied { font-family: var(--nicefont-family) !important; }`
                    : '';
                const strokeRule = `.NiceFont-stroke-shadow *${panelNot} { -webkit-text-stroke: var(--nicefont-stroke) !important; text-stroke: var(--nicefont-stroke) !important; text-shadow: var(--nicefont-shadow) !important; }`;
                /* 伪元素字号：calc(每元素变量基准 + 全页 adjustment)，变量由 syncContentEditablePlaceholderBase 写入 */
                const cePlaceholderRule = `html body .input-normal-wrap [contenteditable="true"][placeholder]:not([data-nicefont-ph-syncing="1"])::before,
html body .input-normal-wrap [contenteditable="true"][placeholder]:not([data-nicefont-ph-syncing="1"])::after,
html body [contenteditable="true"][placeholder]:not([data-nicefont-ph-syncing="1"])::before,
html body [contenteditable="true"][placeholder]:not([data-nicefont-ph-syncing="1"])::after {
  font-size: calc(var(--nicefont-placeholder-base, 14px) + var(--nicefont-adjustment)) !important;
}`;
                styleEl.textContent = (appliedRule ? (appliedRule + '\n') : '') + (sizeRules ? (sizeRules + '\n') : '') + strokeRule + '\n' + cePlaceholderRule;
            }
        },

        /** 清除全局注入（NiceFont-stroke-shadow、变量、#NiceFont-global-styles） */
        clearGlobalStyles(doc) {
            const root = doc.documentElement;
            if (root) {
                root.classList.remove('NiceFont-stroke-shadow');
                root.style.removeProperty('--nicefont-adjustment');
                root.style.removeProperty('--nicefont-family');
                root.style.removeProperty('--nicefont-stroke');
                root.style.removeProperty('--nicefont-shadow');
            }
            const el = doc.getElementById?.('NiceFont-global-styles') || doc.querySelector?.('#NiceFont-global-styles');
            if (el) el.remove();
        },

        /** 判断元素是否匹配排除选择器 */
        isExcludedElement(el) {
            return appState.excludedSelectors.some(selector => el.matches(selector));
        },

        /** 递归遍历 DOM（含 iframe、Shadow DOM），对非排除元素执行 callback */
        traverseDOM(el, callback, options) {
            if (el.nodeType !== Node.ELEMENT_NODE ||
                el.id === 'NiceFont_panel' ||
                el.hasAttribute('data-nicefont-panel') ||
                this.isExcludedElement(el)) {
                return;
            }
            callback(el);
            if (el.tagName === 'IFRAME') {
                try {
                    const iframeDoc = el.contentDocument || el.contentWindow.document;
                    if (iframeDoc && iframeDoc.body) {
                        if (options?.clearIframe) {
                            this.clearGlobalStyles(iframeDoc);
                        } else {
                            const bases = options?.classSizeBases || Array.from({ length: 89 }, (_, i) => i + 8);
                            this.updateClassModeStyles(iframeDoc, bases);
                        }
                        this.traverseDOM(iframeDoc.body, callback, options);
                    }
                } catch (e) {
                    //console.error('[NiceFont] 访问 iframe 失败:', e);
                }
            }
            if (el.shadowRoot) {
                try {
                    for (const child of el.shadowRoot.children) {
                        if (!this.isExcludedElement(child)) {
                            this.traverseDOM(child, callback, options);
                        }
                    }
                } catch (e) {
                    // Shadow DOM 访问可能受跨域限制
                }
            }
            for (const child of el.children) {
                this.traverseDOM(child, callback, options);
            }
        },

        /** 递归应用：默认 class 分档 + 全局描边/阴影；若作者已在 style 中声明字体相关则对该节点用内联强制覆盖 */
        applyFontRecursively(el, increment) {
            if (appState.isExcludedSite) return;
            const font = appState.currentFontFamily;
            const hasCustomFontFamily = font !== 'none';

            this.clearGlobalStyles(document);
            const classSizeBases = Array.from({ length: 89 }, (_, i) => i + 8);
            this.updateClassModeStyles(document, classSizeBases);
            const opts = { classSizeBases };

            this.traverseDOM(el, (node) => {
                this.styleCache.delete(node);
                const originalStyleAttrBeforeStrip = node.getAttribute('style') ?? '';
                const useInlineFont = this.hasAuthorInlineFontRelatedStyle(originalStyleAttrBeforeStrip);
                const styleBeforeStrip = window.getComputedStyle(node);
                const hadDataDefault = node.hasAttribute('data-fontsize-default-fontsize');
                const fromClassBeforeStrip = this.parseNicefontSizeClassBase(node);
                const baseFontSize = this.getEffectiveBaseFontSizePx(node, styleBeforeStrip);

                this.stripNodeNiceFontArtifacts(node);
                this.styleCache.delete(node);
                const style = this.getCachedStyle(node);

                const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
                const isFormControl = node.tagName === 'TEXTAREA' || node.tagName === 'INPUT';
                const isCePlaceholder = node.getAttribute('contenteditable') === 'true' && node.hasAttribute('placeholder');
                if ((Utils.hasVisibleText(node) || isFormControl || isCePlaceholder) && isVisible) {
                    if (isCePlaceholder) {
                        this.syncContentEditablePlaceholderBase(node);
                    }
                    const currentFontSize = node.style.fontSize || style.fontSize;
                    if (useInlineFont && !hadDataDefault) {
                        node.setAttribute(
                            'data-fontsize-default-fontsize',
                            fromClassBeforeStrip != null ? `${fromClassBeforeStrip}px` : currentFontSize
                        );
                        node.setAttribute('data-nicefont-restore-style', originalStyleAttrBeforeStrip);
                    }
                    if (currentFontSize != '0px') {
                        if (baseFontSize != null && !isNaN(baseFontSize)) {
                            if (useInlineFont) {
                                node.style.setProperty('font-size', `${baseFontSize + increment}px`, 'important');
                                if (font !== 'none') {
                                    node.style.setProperty('font-family', font, 'important');
                                } else {
                                    node.style.removeProperty('font-family');
                                }
                            } else {
                                const s = this.getSizeClassBase(baseFontSize);
                                if (hasCustomFontFamily) {
                                    node.classList.add('nicefont-applied');
                                } else {
                                    node.classList.remove('nicefont-applied');
                                }
                                node.classList.add(`nicefont-s${s}`);
                            }
                        }
                    }
                }
            }, opts);
        },

        /** 当前视觉参数是否都为默认值（用于自动清理已挂载样式） */
        isVisualStateDefault() {
            return appState.currentAdjustment === 0 &&
                appState.currentFontFamily === 'none' &&
                appState.textStroke <= 0 &&
                appState.textShadow <= 0;
        },

        /** 仅清理 NiceFont 已注入样式/类，不改 appState 逻辑配置 */
        clearAppliedStyles(el) {
            this.clearGlobalStyles(document);
            this.traverseDOM(el, (node) => {
                const isFormControl = node.tagName === 'TEXTAREA' || node.tagName === 'INPUT';
                const isCePh = node.getAttribute('contenteditable') === 'true' && node.hasAttribute('placeholder');
                if (Utils.hasVisibleText(node) || isFormControl || isCePh) {
                    if (node.hasAttribute('data-nicefont-placeholder-base')) {
                        node.removeAttribute('data-nicefont-placeholder-base');
                        node.style.removeProperty('--nicefont-placeholder-base');
                    }
                    node.classList.remove('nicefont-applied');
                    for (let i = 8; i <= 96; i++) node.classList.remove(`nicefont-s${i}`);
                    const saved = node.getAttribute('data-nicefont-restore-style');
                    if (saved !== null) {
                        if (saved === '') {
                            node.removeAttribute('style');
                        } else {
                            node.setAttribute('style', saved);
                        }
                        node.removeAttribute('data-fontsize-default-fontsize');
                        node.removeAttribute('data-nicefont-restore-style');
                    } else {
                        const defaultSize = node.getAttribute('data-fontsize-default-fontsize');
                        if (defaultSize) {
                            node.style.fontSize = defaultSize;
                        } else {
                            node.style.removeProperty('font-size');
                        }
                        node.removeAttribute('data-fontsize-default-fontsize');
                        node.style.removeProperty('font-family');
                        node.style.removeProperty('-webkit-text-stroke');
                        node.style.removeProperty('text-stroke');
                        node.style.removeProperty('text-shadow');
                        if (!node.style.cssText.trim()) {
                            node.removeAttribute('style');
                        }
                    }
                    this.styleCache.delete(node);
                }
            }, { clearIframe: true });
        },

        /** 按当前状态应用或清理字体效果（默认值时自动清理） */
        applyCurrentState(el = document.body) {
            if (appState.isExcludedSite || !el) return;
            if (this.isVisualStateDefault()) {
                this.clearAppliedStyles(el);
                return;
            }
            this.applyFontRecursively(el, appState.currentAdjustment);
        },

        /** 恢复字体：若有 data-nicefont-restore-style 则还原为首次记录时的 style；否则按旧逻辑逐项移除 */
        restoreFont(el) {
            appState.currentAdjustment = 0;
            appState.currentFontFamily = 'none';
            appState.textStroke = 0;
            appState.textShadow = 0;
            appState.intervalSeconds = 0;
            appState.firstAdjustmentTime = 0;
            this.clearAppliedStyles(el);
        },

        /** 调整字体大小（累加 increment），并应用至页面 */
        changeFontSize(increment) {
            if (appState.isExcludedSite) return;
            appState.currentAdjustment = appState.currentAdjustment + increment;
            this.applyCurrentState(document.body);
            checkConfigModified();
            UIManager.updateUI();
        }
    };

    /**
     * 界面管理：插件菜单、浮动面板、命令配置
     * 支持 pluginPanel（油猴菜单）与 floatingPanel（页面内浮动）
     */
    const UIManager = {
        menuHandles: [],
        panelCache: null,

        /** 关闭浮动面板（保存成功后自动收起） */
        closeFloatingPanel() {
            if (appState.panelType !== 'floatingPanel') return;
            const panelContainer = this.panelCache?.shadowRoot?.querySelector('.NiceFont_panel-container');
            if (!panelContainer) return;
            panelContainer.style.display = 'none';
            appState.isAutoOpened = false;
            if (this.closeDropdown) {
                document.removeEventListener('click', this.closeDropdown);
                this.closeDropdown = null;
            }
        },

        /** 返回所有命令配置（id、getText、action、displayInPluginPanel 等） */
        getCommandsConfig() {
            const commands = [
                {
                    id: 'setFontFamily',
                    getText: () => `🔠 ${t.setFontFamily}: ${appState.currentFontFamily}`,
                    action: () => {
                        if (appState.panelType === 'pluginPanel') {
                            const input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${FontManager.getFontList().slice(0, -1).join(', ')}`, appState.currentFontFamily === 'none' ? '' : appState.currentFontFamily);
                            if (input && input.trim()) {
                                const newFont = input.trim();
                                appState.currentFontFamily = newFont;
                                if (!FontManager.supportFonts.includes(newFont)) {
                                    FontManager.supportFonts.splice(FontManager.supportFonts.length - 1, 0, newFont);
                                }
                                FontManager.applyCurrentState(document.body);
                                checkConfigModified();
                                UIManager.updateUI();
                            }
                        } else {
                            const shadow = UIManager.panelCache?.shadowRoot;
                            shadow?.querySelector('#NiceFont_stroke-slider-wrap')?.remove();
                            shadow?.querySelector('#NiceFont_shadow-slider-wrap')?.remove();
                            let select = shadow?.querySelector('#NiceFont_font-family');
                            if (select) {
                                select.remove();
                                document.removeEventListener('click', UIManager.closeDropdown);
                                UIManager.closeDropdown = null;
                                return;
                            }
                            select = document.createElement('select');
                            select.id = 'NiceFont_font-family';
                            select.className = 'font-family-select';
                            const fontToCss = f => f.includes("'") ? `"${f.replace(/"/g, '\\"')}"` : (f.includes(' ') ? `'${f}'` : f);
                            const renderFontOptions = () => {
                                const list = FontManager.getFontList();
                                const skipPreview = ['none', 'auto', 'custom'];
                                select.innerHTML = list.map(font => {
                                    const label = font === 'custom' ? t.customInput : font;
                                    const ff = skipPreview.includes(font) ? '' : ` style="font-family: ${fontToCss(font)}, sans-serif"`;
                                    return `<option value="${font}"${font === appState.currentFontFamily ? ' selected' : ''}${ff}>${label}</option>`;
                                }).join('');
                                const cur = appState.currentFontFamily;
                                select.style.fontFamily = !skipPreview.includes(cur) ? `${fontToCss(cur)}, sans-serif` : '';
                            };
                            renderFontOptions();
                            FontManager.loadSystemFonts().then(loaded => {
                                if (loaded.length > 0 && select.parentNode) renderFontOptions();
                            });
                            const btn = UIManager.panelCache?.shadowRoot?.querySelector('#NiceFont_setFontFamily');
                            if (btn) {
                                btn.appendChild(select);
                                select.focus();
                                select.addEventListener('click', e => e.stopPropagation());
                                select.addEventListener('change', (e) => {
                                    const selectedFont = e.target.value;
                                    if (selectedFont === 'custom') {
                                        const input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${FontManager.getFontList().slice(0, -1).join(', ')}`, '');
                                        if (input && input.trim()) {
                                            const newFont = input.trim();
                                            if (!FontManager.supportFonts.includes(newFont)) {
                                                FontManager.supportFonts.splice(FontManager.supportFonts.length - 1, 0, newFont);
                                                const option = document.createElement('option');
                                                option.value = newFont;
                                                option.textContent = newFont;
                                                option.style.fontFamily = `${fontToCss(newFont)}, sans-serif`;
                                                select.insertBefore(option, select.lastChild);
                                            }
                                            appState.currentFontFamily = newFont;
                                            select.value = newFont;
                                        } else {
                                            select.value = appState.currentFontFamily;
                                            select.remove();
                                            document.removeEventListener('click', UIManager.closeDropdown);
                                            UIManager.closeDropdown = null;
                                            return;
                                        }
                                    } else {
                                        appState.currentFontFamily = selectedFont;
                                    }
                                    FontManager.applyCurrentState(document.body);
                                    checkConfigModified();
                                    UIManager.updateUI();
                                    select.remove();
                                    document.removeEventListener('click', UIManager.closeDropdown);
                                    UIManager.closeDropdown = null;
                                });
                                UIManager.closeDropdown = (event) => {
                                    if (!select.contains(event.target) && !btn.contains(event.target)) {
                                        select.remove();
                                        document.removeEventListener('click', UIManager.closeDropdown);
                                        UIManager.closeDropdown = null;
                                    }
                                };
                                document.addEventListener('click', UIManager.closeDropdown);
                            }
                        }
                    },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'setTextStroke',
                    getText: () => `✏️ ${t.setTextStroke}: ${appState.textStroke > 0 ? appState.textStroke.toFixed(2) : t.none}`,
                    action: () => {
                        if (appState.panelType === 'pluginPanel') {
                            const input = prompt(t.setTextStrokePrompt, appState.textStroke.toString());
                            if (input !== null) {
                                const val = FontManager.parseStrokeValue(input.trim());
                                appState.textStroke = val;
                                FontManager.applyCurrentState(document.body);
                                checkConfigModified();
                                UIManager.updateUI();
                            }
                        } else {
                            UIManager.showStrokeSlider();
                        }
                    },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'setTextShadow',
                    getText: () => `🌑 ${t.setTextShadow}: ${appState.textShadow > 0 ? appState.textShadow.toFixed(2) : t.none}`,
                    action: () => {
                        if (appState.panelType === 'pluginPanel') {
                            const input = prompt(t.setTextShadowPrompt, appState.textShadow.toString());
                            if (input !== null) {
                                const val = FontManager.parseShadowValue(input.trim());
                                appState.textShadow = val;
                                FontManager.applyCurrentState(document.body);
                                checkConfigModified();
                                UIManager.updateUI();
                            }
                        } else {
                            UIManager.showShadowSlider();
                        }
                    },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'status',
                    getText: () => `📏 ${t.fontSizeAdjustment}: ${appState.currentAdjustment >= 0 ? '+' : ''}${appState.currentAdjustment}px`,
                    action: () => { },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'increase',
                    getText: () => `🔼 ${t.increase}`,
                    action: () => FontManager.changeFontSize(appState.fontIncrement),
                    autoClose: false,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'decrease',
                    getText: () => `🔽 ${t.decrease}`,
                    action: () => FontManager.changeFontSize(-appState.fontIncrement),
                    autoClose: false,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'restore',
                    getText: () => `♻️ ${t.restore}`,
                    action: () => {
                        FontManager.restoreFont(document.body);
                        checkConfigModified();
                        UIManager.updateUI();
                    },
                    autoClose: false,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'first-adjustment',
                    getText: () => {
                        const statusIcon = appState.firstAdjustmentTime > 0 ? Constants.ENABLED_ICON : Constants.DISABLED_ICON;
                        const timeText = appState.firstAdjustmentTime > 0 ? `【${appState.firstAdjustmentTime}s】` : '';
                        return `1️⃣ ${t.firstAdjustment}: ${statusIcon}${timeText}`;
                    },
                    action: () => {
                        const input = prompt(t.firstAdjustmentConfirm, appState.firstAdjustmentTime.toString());
                        const secs = parseInt(input, 10);
                        if (!isNaN(secs) && secs >= 0) {
                            appState.firstAdjustmentTime = secs;
                            if (secs > 0) {
                                appState.dynamicAdjustment = false;
                            }
                            checkConfigModified();
                            if (this.panelCache) {
                                this.updatePanelContent();
                            }
                        } else {
                            appState.firstAdjustmentTime = 0;
                        }
                    },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'dynamic-adjustment',
                    getText: () => {
                        const statusIcon = appState.dynamicAdjustment ? Constants.ENABLED_ICON : Constants.DISABLED_ICON;
                        return `🔎 ${t.dynamicAdjustment}: ${statusIcon}`;
                    },
                    action: () => {
                        if (confirm(t.dynamicWatchConfirm)) {
                            appState.dynamicAdjustment = !appState.dynamicAdjustment;
                            if (appState.dynamicAdjustment) {
                                appState.firstAdjustmentTime = 0;
                            }
                            checkConfigModified();
                            if (this.panelCache) {
                                this.updatePanelContent();
                            }
                        }
                    },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'exclude-elements',
                    getText: () => {
                        const maxDisplayLength = 40;
                        const selectors = Array.isArray(appState.excludedSelectors) ? appState.excludedSelectors : ['i', 'code', 'code *', 'pre', 'pre *', 'svg', 'canvas', 'kbd', 'samp'];
                        const selectorsText = selectors.join(', ');
                        const displayText = selectorsText.length > maxDisplayLength
                            ? selectorsText.substring(0, maxDisplayLength - 3) + '...'
                            : selectorsText;
                        return `🚫 ${t.excludeElements}: ${displayText || t.none}`;
                    },
                    action: () => {
                        const input = prompt(t.excludeElementsPrompt, appState.excludedSelectors.join(', '));
                        if (input !== null && input.trim()) {
                            if (FontManager.updateExcludedSelectors(input)) {
                                FontManager.applyCurrentState(document.body);
                                checkConfigModified();
                                UIManager.updateUI();
                            } else {
                                alert(t.invalidSelectorAlert);
                            }
                        }
                    },
                    title: appState.excludedSelectors,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'switch-panel',
                    getText: () => `🎨 ${t.switchPanel}: ${appState.panelType === 'pluginPanel' ? t.pluginPanel : t.floatingPanel}`,
                    action: () => {
                        const newPanelType = appState.panelType === 'pluginPanel' ? 'floatingPanel' : 'pluginPanel';
                        if (newPanelType === 'floatingPanel') {
                            const shouldAutoOpen = confirm(t.autoOpenFloatingPanelPrompt);
                            GM_setValue('NiceFont_autoOpenPageMenu', !shouldAutoOpen);
                        }
                        GM_setValue(Constants.PANEL_TYPE_KEY, newPanelType);
                        appState.panelType = newPanelType;
                        if (this.panelCache) {
                            this.panelCache.remove();
                            this.panelCache = null;
                        }
                        if (newPanelType === 'floatingPanel') {
                            this.createFloatingPanel();
                            if (this.panelCache && this.panelCache.shadowRoot) {
                                const shadow = this.panelCache.shadowRoot;
                                const panelContainer = shadow.querySelector('.NiceFont_panel-container');
                                if (panelContainer) {
                                    // 显式切换到浮动面板时始终打开一次；确认框只写入 NiceFont_autoOpenPageMenu，影响后续无配置页的自动弹出
                                    panelContainer.style.display = 'block';
                                    appState.isAutoOpened = true;
                                }
                            } else {
                                console.error('[NiceFont] panelCache 或 shadowRoot 未正确初始化，面板显示失败');
                            }
                        }
                        UIManager.updateUI();
                    },
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'show-panel',
                    getText: () => `🔣 ${t.showPanel}`,
                    action: () => this.togglePanel(),
                    displayInPluginPanel: true,
                    displayInFloatingPanel: false
                },
                {
                    id: 'currentConfigScope',
                    getText: () => `📍 ${t.currentConfigScope}: ${ConfigScopeManager.getCurrentConfigText()}`,
                    action: ConfigManager.deleteCurrentConfig,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'config-scope',
                    getText: () => `ℹ️ ${t.modifyConfigScope}: ${ConfigScopeManager.getConfigScopeDisplayText()}`,
                    action: ConfigManager.changeConfigScope,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'export-import-config',
                    getText: () => `📋 ${t.exportImportConfig}`,
                    getFloatingPanelHtml: () => {
                        const m = t.exportImportConfig.match(/^([^/]+)\/(.+)$/);
                        const exportL = m ? m[1].trim() : t.exportLink;
                        const rest = m ? m[2] : t.importLink + t.exportImportConfigSuffix;
                        const suffix = t.exportImportConfigSuffix;
                        const importL = suffix && rest.endsWith(suffix) ? rest.slice(0, -suffix.length).trim() : rest;
                        const suffixDisplay = suffix && rest.endsWith(suffix) ? suffix : '';
                        const clearLabel = suffixDisplay || t.clearAllConfigLabel;
                        const suffixHtml = clearLabel ? `<span class="nf-clear-config">${suffixDisplay ? '' : ' '}${clearLabel}</span>` : '';
                        return `📋 <span class="nf-export">${exportL}</span>/<span class="nf-import">${importL}</span>${suffixHtml}`;
                    },
                    action: ConfigManager.exportImportConfig,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                {
                    id: 'save-config',
                    getText: () => `💾 ${appState.isConfigModified ? t.saveConfigPending : t.saveConfig}`,
                    action: ConfigManager.saveConfig,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                }
            ];

            // 如果站点被排除，只显示 currentConfigScope
            if (appState.isExcludedSite && appState.panelType === 'pluginPanel') {
                return commands.filter(cmd => cmd.id === 'currentConfigScope');
            }

            return commands;
        },

        /** 刷新油猴菜单项文案 */
        updatePluginPanel() {
            this.menuHandles.forEach(handle => {
                try {
                    GM_unregisterMenuCommand(handle);
                } catch (e) {
                    console.error('[NiceFont] 取消注册菜单失败:', e);
                }
            });
            this.menuHandles = [];
            const commands = appState.panelType === 'pluginPanel'
                ? this.getCommandsConfig().filter(cmd => cmd.id !== 'show-panel')
                : this.getCommandsConfig().filter(cmd => ['switch-panel', 'show-panel'].includes(cmd.id));
            commands.forEach(cmd => {
                const handle = GM_registerMenuCommand(cmd.getText(), () => {
                    cmd.action();
                    this.updatePluginPanel();
                }, { autoClose: cmd.autoClose, title: cmd.title });
                this.menuHandles.push(handle);
            });
        },

        /** 刷新浮动面板内的按钮列表 */
        updatePanelContent() {
            if (!this.panelCache || !this.panelCache.shadowRoot) {
                return;
            }
            const scriptName = t.panelTitle;

            const shadow = this.panelCache.shadowRoot;
            const titleDiv = shadow.querySelector('.NiceFont_title');
            if (titleDiv) {
                titleDiv.textContent = scriptName;
            } else {
                console.error('[NiceFont] 未找到 .NiceFont_title，无法更新标题');
            }

            const contentContainer = shadow.querySelector('.NiceFont_content');
            if (contentContainer) {
                contentContainer.innerHTML = this.getCommandsConfig()
                    .filter(cmd => cmd.displayInFloatingPanel && (!appState.isExcludedSite || ['currentConfigScope', 'config-scope', 'export-import-config', 'save-config', 'switch-panel'].includes(cmd.id)))
                    .map(cmd => {
                        const html = cmd.getFloatingPanelHtml ? cmd.getFloatingPanelHtml() : cmd.getText();
                        return `<div class="action-btn" id="NiceFont_${cmd.id}">${html}</div>`;
                    })
                    .join('');
            } else {
                console.error('[NiceFont] 未找到 .NiceFont_content，无法更新内容');
            }
        },

        showStrokeSlider() {
            let wrap = this.panelCache?.shadowRoot?.querySelector('#NiceFont_stroke-slider-wrap');
            if (wrap) {
                wrap.remove();
                document.removeEventListener('click', this.closeDropdown);
                this.closeDropdown = null;
                return;
            }
            wrap = this.panelCache?.shadowRoot?.querySelector('#NiceFont_shadow-slider-wrap');
            if (wrap) wrap.remove();
            const btn = this.panelCache?.shadowRoot?.querySelector('#NiceFont_setTextStroke');
            if (!btn) return;
            const row = document.createElement('div');
            row.id = 'NiceFont_stroke-slider-wrap';
            row.className = 'slider-row';
            const range = document.createElement('input');
            range.type = 'range';
            range.min = '0';
            range.max = '1';
            range.step = '0.05';
            range.value = appState.textStroke;
            const span = document.createElement('span');
            span.textContent = appState.textStroke.toFixed(2);
            range.addEventListener('input', () => {
                const v = Math.round(parseFloat(range.value) * 100) / 100;
                appState.textStroke = v;
                span.textContent = v.toFixed(2);
                if (btn.firstChild) btn.firstChild.textContent = `✏️ ${t.setTextStroke}: ${v > 0 ? v.toFixed(2) : t.none}`;
                FontManager.applyCurrentState(document.body);
                checkConfigModified();
                UIManager.updateUI();
            });
            row.appendChild(range);
            row.appendChild(span);
            btn.appendChild(row);
            this.closeDropdown = (e) => {
                if (!row.contains(e.target) && !btn.contains(e.target)) {
                    row.remove();
                    document.removeEventListener('click', this.closeDropdown);
                    this.closeDropdown = null;
                    UIManager.updatePanelContent();
                }
            };
            document.addEventListener('click', this.closeDropdown);
        },

        showShadowSlider() {
            let wrap = this.panelCache?.shadowRoot?.querySelector('#NiceFont_shadow-slider-wrap');
            if (wrap) {
                wrap.remove();
                document.removeEventListener('click', this.closeDropdown);
                this.closeDropdown = null;
                return;
            }
            wrap = this.panelCache?.shadowRoot?.querySelector('#NiceFont_stroke-slider-wrap');
            if (wrap) wrap.remove();
            const btn = this.panelCache?.shadowRoot?.querySelector('#NiceFont_setTextShadow');
            if (!btn) return;
            const row = document.createElement('div');
            row.id = 'NiceFont_shadow-slider-wrap';
            row.className = 'slider-row';
            const range = document.createElement('input');
            range.type = 'range';
            range.min = '0';
            range.max = '4';
            range.step = '0.05';
            range.value = appState.textShadow;
            const span = document.createElement('span');
            span.textContent = appState.textShadow.toFixed(2);
            range.addEventListener('input', () => {
                const v = Math.round(parseFloat(range.value) * 100) / 100;
                appState.textShadow = v;
                span.textContent = v.toFixed(2);
                if (btn.firstChild) btn.firstChild.textContent = `🌑 ${t.setTextShadow}: ${v > 0 ? v.toFixed(2) : t.none}`;
                FontManager.applyCurrentState(document.body);
                checkConfigModified();
                UIManager.updateUI();
            });
            row.appendChild(range);
            row.appendChild(span);
            btn.appendChild(row);
            this.closeDropdown = (e) => {
                if (!row.contains(e.target) && !btn.contains(e.target)) {
                    row.remove();
                    document.removeEventListener('click', this.closeDropdown);
                    this.closeDropdown = null;
                    UIManager.updatePanelContent();
                }
            };
            document.addEventListener('click', this.closeDropdown);
        },

        /** 创建浮动面板（custom element + Shadow DOM），可拖拽 */
        createFloatingPanel() {
            if (this.closeDropdown) {
                document.removeEventListener('click', this.closeDropdown);
                this.closeDropdown = null;
            }
            let existingPanel = document.querySelector('nicefont-panel');
            if (existingPanel && existingPanel.shadowRoot) {
                this.panelCache = existingPanel;
                return;
            }

            if (this.panelCache) {
                this.panelCache.remove();
                this.panelCache = null;
            }

            const scriptName = t.panelTitle;
            const savedPosition = GM_getValue('NiceFont_panelPosition', { top: '50px', right: '20px' });
            const vpW = window.visualViewport?.width ?? document.documentElement.clientWidth;
            const panelW = 360;
            const safeRight = Math.max(0, Math.min(parseFloat(String(savedPosition.right).replace(/px$/, '')) || 20, vpW - panelW));
            const safeTop = savedPosition.top || '50px';

            this.panelCache = document.createElement('nicefont-panel');
            this.panelCache.id = 'NiceFont_panel';
            this.panelCache.setAttribute('data-nicefont-panel', 'true');
            const shadow = this.panelCache.attachShadow({ mode: 'open' });

            const panelContainer = document.createElement('div');
            panelContainer.className = 'NiceFont_panel-container';
            panelContainer.style.cssText = `
                position: fixed;
                top: ${safeTop};
                right: ${safeRight}px;
                left: auto;
                width: ${panelW}px;
                border-radius: 5px;
                padding: 10px;
                z-index: 2147483647;
                font-family: sans-serif !important;
                font-size: 15px !important;
                user-select: none;
                display: none;
            `;
            const logoUrl = 'https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png';
            panelContainer.innerHTML = `
                <div class="NiceFont_header" style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 10002;">
                    <div class="NiceFont_header-left" style="display: flex; align-items: center; flex-grow: 1; cursor: grab; margin-bottom: 5px;">
                        <img src="${logoUrl}" alt="NiceFont" class="NiceFont_logo" style="width: 24px; height: 24px; margin-right: 8px; flex-shrink: 0;">
                        <div class="NiceFont_title" style="font-size: 16px; font-weight: bold;">${scriptName}</div>
                    </div>
                    <button class="NiceFont_close-btn" id="NiceFont_close-btn" type="button">✖️</button>
                </div>
                <div class="NiceFont_content"></div>
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                :host {
                    all: initial;
                    display: block;
                    font-family: sans-serif !important;
                    font-size: 15px !important;
                    line-height: 1.5 !important;
                    box-sizing: border-box;
                }
                :host * {
                    box-sizing: border-box;
                }
                div {
                    font-family: sans-serif !important;
                    font-size: 15px !important;
                    color: inherit !important;
                }
                .NiceFont_panel-container {
                    background: #fff !important;
                    color: #333 !important;
                    border: 1px solid #ccc !important;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.15);
                }
                .NiceFont_panel-container,
                .NiceFont_panel-container * {
                    font-family: sans-serif !important;
                    text-transform: none !important;
                    letter-spacing: normal !important;
                    word-spacing: normal !important;
                    text-indent: 0 !important;
                }
                @media (prefers-color-scheme: dark) {
                    .NiceFont_panel-container {
                        background: #1e1e1e !important;
                        color: #e0e0e0 !important;
                        border: 1px solid #444 !important;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.5);
                    }
                }
                .NiceFont_header {
                    touch-action: none;
                }
                .NiceFont_header-left {
                    cursor: grab;
                }
                .NiceFont_title {
                    font-size: 16px !important;
                    font-weight: bold !important;
                    color: inherit !important;
                }
                .NiceFont_close-btn {
                    border: none !important;
                    border-radius: 3px;
                    padding: 1px 6px;
                    cursor: pointer;
                    line-height: 16px;
                    font-size: 12px !important;
                    background: transparent !important;
                    color: inherit !important;
                }
                .NiceFont_close-btn:hover {
                    text-decoration: none;
                }
                .action-btn {
                    display: block;
                    padding: 2px;
                    border-radius: 3px;
                    cursor: pointer;
                    text-align: left;
                    font-size: 14px !important;
                    color: inherit !important;
                    background: transparent !important;
                }
                .action-btn:hover {
                    text-decoration: none;
                }
                .action-btn .nf-export,
                .action-btn .nf-import {
                    color: inherit;
                    cursor: pointer;
                    pointer-events: auto;
                }
                .action-btn .nf-export:hover,
                .action-btn .nf-import:hover,
                .action-btn .nf-clear-config:hover {
                    text-decoration: underline;
                }
                .action-btn .nf-clear-config {
                    cursor: pointer;
                    pointer-events: auto;
                }
                #NiceFont_set-font-size-btn {
                    padding: 2px;
                    text-decoration: none !important;
                }
                .slider-row {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 4px 0;
                }
                .slider-row input[type="range"] {
                    flex: 1;
                    min-width: 80px;
                }
                .slider-row span {
                    font-size: 12px;
                    min-width: 28px;
                }
                .font-family-select {
                    display: inline-block;
                    width: auto;
                    padding: 2px;
                    margin-left: 5px;
                    border: 1px solid #ddd !important;
                    border-radius: 3px;
                    font-size: 14px !important;
                    font-family: inherit;
                    color: #333 !important;
                    background: #fff !important;
                    vertical-align: middle;
                }
                @media (prefers-color-scheme: dark) {
                    .font-family-select {
                        border-color: #555 !important;
                        color: #e0e0e0 !important;
                        background: #2d2d2d !important;
                    }
                }
            `;
            shadow.appendChild(styleSheet);
            shadow.appendChild(panelContainer);

            try {
                this.updatePanelContent();
            } catch (e) {
                console.error('[NiceFont] 初始化面板内容失败:', e);
            }

            try {
                document.documentElement.appendChild(this.panelCache);
            } catch (e) {
                console.error('[NiceFont] 添加面板到 DOM 失败:', e);
                this.panelCache = null;
                return;
            }

            this.ensurePanelPersistence();
            this.bindPanelEvents(shadow, panelContainer);
        },

        cleanupPersistence() {
            if (this.persistenceInterval) {
                clearInterval(this.persistenceInterval);
                this.persistenceInterval = null;
            }
        },

        ensurePanelPersistence() {
            if (appState.panelType !== 'floatingPanel') {
                return;
            }
            this.persistenceInterval = setInterval(() => {
                if (appState.panelType !== 'floatingPanel') {
                    clearInterval(this.persistenceInterval);
                    this.persistenceInterval = null;
                    return;
                }
                if (!this.panelCache || !(this.panelCache instanceof Node) || !document.documentElement.contains(this.panelCache)) {
                    this.createFloatingPanel();
                    if (this.panelCache && this.panelCache instanceof Node) {
                        try {
                            document.documentElement.appendChild(this.panelCache);
                            this.updatePanelContent();
                            const shadow = this.panelCache.shadowRoot;
                            const panelContainer = shadow.querySelector('.NiceFont_panel-container');
                            if (panelContainer && appState.isAutoOpened) {
                                panelContainer.style.display = 'block';
                            }
                        } catch (e) {
                            this.panelCache = null;
                        }
                    }
                }
            }, 1000);
        },

        bindPanelEvents(shadow, panelContainer) {
            const header = shadow.querySelector('.NiceFont_header');
            if (!header) {
                console.error('[NiceFont] 未找到 .NiceFont_header，无法绑定拖拽事件');
                this.panelCache.remove();
                this.panelCache = null;
                return;
            }

            let isDragging = false;
            let initialX;
            let initialY;
            let rafId = null;
            let lastTouchEnd = 0;

            const getCoords = (e) => (e.touches ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : { x: e.clientX, y: e.clientY });

            const getViewportSize = () => {
                const vv = window.visualViewport;
                return vv ? { w: vv.width, h: vv.height } : { w: document.documentElement.clientWidth, h: document.documentElement.clientHeight };
            };

            const onDragStart = (e) => {
                if (e.target.closest('.NiceFont_close-btn')) return;
                if (e.type === 'mousedown' && Date.now() - lastTouchEnd < 400) return;
                const { x, y } = getCoords(e);
                const rect = panelContainer.getBoundingClientRect();
                const vp = getViewportSize();
                const currentLeft = panelContainer.style.left !== 'auto' && panelContainer.style.left
                    ? parseFloat(panelContainer.style.left) : vp.w - parseFloat(panelContainer.style.right || '0') - rect.width;
                const currentTop = parseFloat(panelContainer.style.top || '0');
                isDragging = true;
                initialX = x - currentLeft;
                initialY = y - currentTop;
                header.style.cursor = 'grabbing';
                e.preventDefault();
                e.stopPropagation();
            };

            const onDragMove = (e) => {
                if (!isDragging) return;
                const { x, y } = getCoords(e);
                e.preventDefault();
                if (rafId) cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(() => {
                    const rect = panelContainer.getBoundingClientRect();
                    const vp = getViewportSize();
                    let newLeft = x - initialX;
                    let newTop = y - initialY;
                    newLeft = Math.max(0, Math.min(newLeft, vp.w - rect.width));
                    newTop = Math.max(0, Math.min(newTop, vp.h - rect.height));
                    panelContainer.style.left = `${newLeft}px`;
                    panelContainer.style.top = `${newTop}px`;
                    panelContainer.style.right = 'auto';
                });
            };

            const onDragEnd = (e) => {
                if (!isDragging) return;
                if (e.type === 'touchend' || e.type === 'touchcancel') lastTouchEnd = Date.now();
                isDragging = false;
                header.style.cursor = 'grab';
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                const vp = getViewportSize();
                const rect = panelContainer.getBoundingClientRect();
                const left = parseFloat(panelContainer.style.left || '0');
                const right = vp.w - left - rect.width;
                GM_setValue('NiceFont_panelPosition', {
                    top: panelContainer.style.top,
                    right: `${Math.max(0, right)}px`
                });
                e.preventDefault();
                e.stopPropagation();
            };

            header.addEventListener('mousedown', onDragStart, { capture: true, passive: false });
            header.addEventListener('touchstart', onDragStart, { capture: true, passive: false });
            document.addEventListener('mousemove', onDragMove, { capture: true, passive: false });
            document.addEventListener('touchmove', onDragMove, { capture: true, passive: false });
            document.addEventListener('mouseup', onDragEnd, { capture: true, passive: false });
            document.addEventListener('touchend', onDragEnd, { capture: true, passive: false });
            document.addEventListener('touchcancel', onDragEnd, { capture: true, passive: false });

            let longPressTimer = null;
            const startLongPress = (action, interval = 100) => {
                action();
                longPressTimer = setInterval(action, interval);
            };
            const stopLongPress = () => {
                if (longPressTimer) {
                    clearInterval(longPressTimer);
                    longPressTimer = null;
                }
            };

            shadow.addEventListener('mousedown', (e) => {
                const btn = e.target.closest('.action-btn');
                if (btn) {
                    const commandId = btn.id.replace('NiceFont_', '');
                    if (commandId === 'increase' || commandId === 'decrease') {
                        const command = this.getCommandsConfig().find(c => c.id === commandId);
                        if (command) startLongPress(command.action);
                    }
                }
            }, { capture: false });

            shadow.addEventListener('mouseup', stopLongPress, { capture: false });
            shadow.addEventListener('mouseleave', stopLongPress, { capture: false });

            shadow.addEventListener('click', (e) => {
                if (e.target.classList.contains('nf-export')) {
                    e.preventDefault();
                    ConfigManager.exportConfig();
                    return;
                }
                if (e.target.classList.contains('nf-import')) {
                    e.preventDefault();
                    ConfigManager.importConfig();
                    return;
                }
                if (e.target.classList.contains('nf-clear-config')) {
                    e.preventDefault();
                    ConfigManager.clearAllConfig();
                    return;
                }
                const btn = e.target.closest('.action-btn');
                if (btn) {
                    const command = this.getCommandsConfig().find(c => c.id === btn.id.replace('NiceFont_', ''));
                    if (command && command.id !== 'increase' && command.id !== 'decrease') {
                        command.action();
                    }
                }
                if (e.target.id === 'NiceFont_close-btn') {
                    panelContainer.style.display = 'none';
                    appState.isAutoOpened = false;
                }
                e.stopPropagation();
            }, { capture: false });

        },

        /** 切换浮动面板显示/隐藏 */
        togglePanel() {
            if (appState.panelType !== 'floatingPanel') {
                return;
            }
            if (!this.panelCache || !document.documentElement.contains(this.panelCache)) {
                this.createFloatingPanel();
                if (!this.panelCache) {
                    console.error('[NiceFont] 面板创建失败，检查 createFloatingPanel');
                    return;
                }
            }

            const shadow = this.panelCache.shadowRoot;
            const panelContainer = shadow.querySelector('.NiceFont_panel-container');
            const isHidden = panelContainer.style.display === 'none';
            const display = isHidden ? 'block' : 'none';
            panelContainer.style.display = display;
            appState.isAutoOpened = false;

            if (display === 'block') {
                this.updatePanelContent();
            } else {
                if (this.closeDropdown) {
                    document.removeEventListener('click', this.closeDropdown);
                    this.closeDropdown = null;
                }
            }
        },

        /** 根据 panelType 更新插件菜单或浮动面板 */
        updateUI() {
            if (appState.panelType === 'pluginPanel') {
                this.updatePluginPanel();
                this.cleanupPersistence();
                if (this.panelCache) {
                    this.panelCache.remove();
                    this.panelCache = null;
                }
                if (this.closeDropdown) {
                    document.removeEventListener('click', this.closeDropdown);
                    this.closeDropdown = null;
                }
            } else {
                this.updatePluginPanel();
                const hasSlider = this.panelCache?.shadowRoot?.querySelector('#NiceFont_stroke-slider-wrap, #NiceFont_shadow-slider-wrap');
                if (this.panelCache && document.documentElement.contains(this.panelCache)) {
                    if (!hasSlider) this.updatePanelContent();
                }
                if (this.panelCache?.shadowRoot) {
                    const saveBtn = this.panelCache.shadowRoot.querySelector('#NiceFont_save-config');
                    if (saveBtn) {
                        saveBtn.textContent = `💾 ${appState.isConfigModified ? t.saveConfigPending : t.saveConfig}`;
                    }
                }
            }
        },
    };


    // --- 定时器与 Observer 管理 ---
    /** 清理定时器与 ResizeObserver，页面卸载时调用 */
    function cleanupTimersAndObserver() {
        if (appState.timer) {
            clearInterval(appState.timer);
            appState.timer = null;
        }
        if (appState.firstAdjustmentTimeout) {
            clearTimeout(appState.firstAdjustmentTimeout);
            appState.firstAdjustmentTimeout = null;
        }
        if (appState.observer) {
            appState.observer.disconnect();
            appState.observer = null;
        }
    }

    /** 根据配置启动首次延迟、动态调整（ResizeObserver） */
    function setupScheduledAdjustments() {
        cleanupTimersAndObserver();
        if (appState.isExcludedSite || !document.body) return;
        if (appState.currentAdjustment === 0 && appState.currentFontFamily === 'none' && appState.textStroke <= 0 && appState.textShadow <= 0) return;

        if (appState.firstAdjustmentTime > 0) {
            appState.firstAdjustmentTimeout = setTimeout(() => {
                FontManager.applyCurrentState(document.body);
                appState.firstAdjustmentTimeout = null;
            }, appState.firstAdjustmentTime * 1000);
        } else if (appState.dynamicAdjustment) {
            const throttleTime = document.body.childElementCount > 500 ? 500 : 300;
            appState.observer = new MutationObserver(Utils.throttle(() => {
                FontManager.applyCurrentState(document.body);
            }, throttleTime));
            appState.observer.observe(document.body, { childList: true, subtree: true });
            FontManager.applyCurrentState(document.body);
        } else if (!appState.firstAdjustmentTime) {
            FontManager.applyCurrentState(document.body);
        }
    }

    // --- 初始化 ---

    /** 多语言文案，按 navigator.language 前缀匹配 */
    const TRANSLATIONS = {
        zh: {
            setFontFamily: '设置字体类型',
            setFontFamilyPrompt: '请输入字体类型（例如：Arial, sans-serif）：',
            supportFontFamily: '支持的字体：',
            setTextStroke: '字体描边',
            setTextStrokePrompt: '请输入 0.0-1.0（0 为关闭）：',
            setTextShadow: '字体阴影',
            setTextShadowPrompt: '请输入 0.0-4.0（0 为关闭）：',
            fontSizeAdjustment: '字体大小调整',
            increase: '增大字体',
            decrease: '减小字体',
            restore: '恢复字体',
            firstAdjustment: '首次调整',
            firstAdjustmentConfirm: '请输入首次调整的延迟时间（秒，0表示禁用）：',
            timerAdjustment: '定时调整',
            timerPrompt: '请输入定时调整的间隔时间（秒，0表示禁用）：',
            dynamicAdjustment: '动态调整',
            dynamicWatchConfirm: '是否启用/禁用动态调整？启用后将监控页面变化并自动调整字体。',
            excludeElements: '排除元素',
            excludeElementsPrompt: '请输入要排除的CSS选择器（用逗号分隔，例如：code, pre）：',
            none: '无',
            invalidSelectorAlert: '无效的CSS选择器，请检查输入！',
            switchPanel: '切换面板',
            pluginPanel: '插件面板',
            floatingPanel: '浮动面板',
            autoOpenFloatingPanelPrompt: '在没有调整字体配置的网页上自动弹出设置字体的浮动面板？',
            showPanel: '显示面板',
            currentConfigScope: '当前配置范围',
            modifyConfigScope: '修改配置范围',
            modifyConfigScopePrompt: '请输入配置范围：\n0: 排除本站 ({hostname})\n1: 匹配本站 ({hostname})\n2: 匹配域名 ({tld})\n3: 匹配所有网站\n当前范围: {scope}',
            exportImportConfig: '导出/导入配置',
            clearAllConfigConfirm: '请输入 y 确认清空所有配置：',
            clearAllConfigLabel: '清空',
            exportLink: '导出',
            importLink: '导入',
            exportImportConfigSuffix: '配置',
            exportImportPrompt: '1: 导出配置  2: 导入配置  3: 清空配置\n请输入 1、2 或 3:',
            importConfigPreview: '将新增 {add} 项、修改 {modify} 项、删除 {delete} 项配置，是否继续？',
            importConfigSuccess: '配置导入成功！',
            importConfigError: '导入失败，请检查 JSON 格式是否正确。',
            saveConfig: '保存配置',
            saveConfigPending: '保存配置（有更改）',
            saveConfigConfirm: '是否保存配置到 {scope} [{target}]？',
            adjustmentModeRequiredPrompt: '检测到已调整字体，但未启用“首次调整”或“动态调整”。\n请选择启用方式后将直接保存：\n1: 首次调整（默认 3 秒）\n2: 动态调整',
            adjustmentModeRequiredInvalid: '输入无效，已取消保存。',
            deleteConfigConfirm: '是否删除 {target} 的配置？',
            deleteBeforeScopeChangeConfirm: '更改范围前，是否删除 {scope} [{target}] 的现有配置？',
            notConfigured: '未配置',
            invalidInput: '输入无效，请输入 0、1、2 或 3！',
            subdomain: '匹配本站',
            topLevelDomain: '匹配域名',
            allWebsites: '匹配所有网站',
            excludeThisSite: '排除本站',
            currentConfigScopeExcluded: '排除本站 ({hostname})',
            customInput: '手动输入',
            panelTitle: 'NiceFont (耐视字体)',
        },
        en: {
            setFontFamily: 'Set Font Family',
            setFontFamilyPrompt: 'Please enter font family (e.g., Arial, sans-serif):',
            supportFontFamily: 'Supported fonts:',
            setTextStroke: 'Font Stroke',
            setTextStrokePrompt: 'Enter 0.0-1.0 (0 to disable):',
            setTextShadow: 'Font Shadow',
            setTextShadowPrompt: 'Enter 0.0-4.0 (0 to disable):',
            fontSizeAdjustment: 'Font Size Adjustment',
            increase: 'Increase Font',
            decrease: 'Decrease Font',
            restore: 'Restore Font',
            firstAdjustment: 'First Adjustment',
            firstAdjustmentConfirm: 'Enter delay time for first adjustment (seconds, 0 to disable):',
            timerAdjustment: 'Scheduled Adjustment',
            timerPrompt: 'Enter interval for scheduled adjustment (seconds, 0 to disable):',
            dynamicAdjustment: 'Dynamic Adjustment',
            dynamicWatchConfirm: 'Enable/disable dynamic adjustment? When enabled, it will monitor page changes and adjust fonts automatically.',
            excludeElements: 'Exclude Elements',
            excludeElementsPrompt: 'Enter CSS selectors to exclude (comma-separated, e.g., code, pre):',
            none: 'None',
            invalidSelectorAlert: 'Invalid CSS selector, please check your input!',
            switchPanel: 'Switch Panel',
            pluginPanel: 'Plugin Panel',
            floatingPanel: 'Floating Panel',
            autoOpenFloatingPanelPrompt: 'Automatically show the font settings floating panel on pages without font adjustment configuration?',
            showPanel: 'Show Panel',
            currentConfigScope: 'Current Configuration Scope',
            modifyConfigScope: 'Modify Configuration Scope',
            modifyConfigScopePrompt: 'Enter configuration scope:\n0: Exclude this site ({hostname})\n1: Match this site ({hostname})\n2: Match domain ({tld})\n3: Match all websites\nCurrent scope: {scope}',
            exportImportConfig: 'Export/Import Config',
            clearAllConfigConfirm: 'Enter y to confirm clearing all configurations:',
            clearAllConfigLabel: 'Clear',
            exportLink: 'Export',
            importLink: 'Import',
            exportImportConfigSuffix: ' Config',
            exportImportPrompt: '1: Export config  2: Import config  3: Clear all config\nEnter 1, 2, or 3:',
            importConfigPreview: 'Add {add}, modify {modify}, delete {delete} config items. Continue?',
            importConfigSuccess: 'Config imported successfully!',
            importConfigError: 'Import failed. Please check if the JSON format is correct.',
            saveConfig: 'Save Configuration',
            saveConfigPending: 'Save Configuration (Changes Pending)',
            saveConfigConfirm: 'Save configuration to {scope} [{target}]?',
            adjustmentModeRequiredPrompt: 'Detected font changes, but neither "First Adjustment" nor "Dynamic Adjustment" is enabled.\nChoose one, then it will save directly:\n1: First Adjustment (default 3 seconds)\n2: Dynamic Adjustment',
            adjustmentModeRequiredInvalid: 'Invalid input. Save has been cancelled.',
            deleteConfigConfirm: 'Delete configuration for {target}?',
            deleteBeforeScopeChangeConfirm: 'Before changing scope, delete existing configuration for {scope} [{target}]?',
            notConfigured: 'Not Configured',
            invalidInput: 'Invalid input, please enter 0, 1, 2, or 3!',
            subdomain: 'Match This Site',
            topLevelDomain: 'Match Domain',
            allWebsites: 'Match All Websites',
            excludeThisSite: 'Exclude This Site',
            currentConfigScopeExcluded: 'Exclude This Site ({hostname})',
            customInput: 'Manual Input',
            panelTitle: 'NiceFont',
        },
        ko: {
            setFontFamily: '글꼴 설정',
            setFontFamilyPrompt: '글꼴을 입력하세요 (예: Arial, sans-serif):',
            supportFontFamily: '지원되는 글꼴:',
            setTextStroke: '글꼴 테두리',
            setTextStrokePrompt: '0.0-1.0 입력 (0은 비활성화):',
            setTextShadow: '글꼴 그림자',
            setTextShadowPrompt: '0.0-4.0 입력 (0은 비활성화):',
            fontSizeAdjustment: '글꼴 크기 조정',
            increase: '글꼴 크기 증가',
            decrease: '글꼴 크기 감소',
            restore: '글꼴 복원',
            firstAdjustment: '최초 조정',
            firstAdjustmentConfirm: '최초 조정 지연 시간 입력 (초, 0은 비활성화):',
            timerAdjustment: '주기적 조정',
            timerPrompt: '주기적 조정 간격 입력 (초, 0은 비활성화):',
            dynamicAdjustment: '동적 조정',
            dynamicWatchConfirm: '동적 조정 활성화/비활성화? 활성화 시 페이지 변화를 모니터링하여 글꼴을 자동으로 조정합니다.',
            excludeElements: '요소 제외',
            excludeElementsPrompt: '제외할 CSS 선택자를 입력하세요 (쉼표로 구분, 예: code, pre):',
            none: '없음',
            invalidSelectorAlert: '유효하지 않은 CSS 선택자입니다. 입력을 확인하세요!',
            switchPanel: '패널 전환',
            pluginPanel: '플러그인 패널',
            floatingPanel: '부동 패널',
            autoOpenFloatingPanelPrompt: '글꼴 조정 설정이 없는 페이지에서 글꼴 설정 부동 패널을 자동으로 표시하시겠습니까?',
            showPanel: '패널 표시',
            currentConfigScope: '현재 설정 범위',
            modifyConfigScope: '설정 범위 수정',
            modifyConfigScopePrompt: '설정 범위를 입력하세요:\n0: 이 사이트 제외 ({hostname})\n1: 이 사이트 매칭 ({hostname})\n2: 도메인 매칭 ({tld})\n3: 모든 웹사이트 매칭\n현재 범위: {scope}',
            exportImportConfig: '설정 내보내기/가져오기',
            clearAllConfigConfirm: '초기화하려면 y를 입력하세요:',
            clearAllConfigLabel: '초기화',
            exportLink: '내보내기',
            importLink: '가져오기',
            exportImportConfigSuffix: '',
            exportImportPrompt: '1: 설정 내보내기  2: 설정 가져오기  3: 설정 초기화\n1, 2 또는 3을 입력하세요:',
            importConfigPreview: '{add}개 추가, {modify}개 수정, {delete}개 삭제됩니다. 계속하시겠습니까?',
            importConfigSuccess: '설정이 성공적으로 가져와졌습니다!',
            importConfigError: '가져오기 실패. JSON 형식이 올바른지 확인하세요.',
            saveConfig: '설정 저장',
            saveConfigPending: '설정 저장 (변경 대기 중)',
            saveConfigConfirm: '{scope} [{target}]에 설정을 저장하시겠습니까?',
            deleteConfigConfirm: '{target}의 설정을 삭제하시겠습니까?',
            deleteBeforeScopeChangeConfirm: '범위 변경 전, {scope} [{target}]의 기존 설정을 삭제하시겠습니까?',
            notConfigured: '설정되지 않음',
            invalidInput: '잘못된 입력입니다. 0, 1, 2, 3 중 하나를 입력하세요!',
            subdomain: '이 사이트 매칭',
            topLevelDomain: '도메인 매칭',
            allWebsites: '모든 웹사이트 매칭',
            excludeThisSite: '이 사이트 제외',
            currentConfigScopeExcluded: '이 사이트 제외 ({hostname})',
            customInput: '수동 입력',
            panelTitle: 'NiceFont',
        },
        ja: {
            setFontFamily: 'フォントの設定',
            setFontFamilyPrompt: 'フォントを入力してください（例：Arial, sans-serif）：',
            supportFontFamily: 'サポートされているフォント：',
            setTextStroke: 'フォント縁取り',
            setTextStrokePrompt: '0.0-1.0 を入力（0で無効）：',
            setTextShadow: 'フォントシャドウ',
            setTextShadowPrompt: '0.0-4.0 を入力（0で無効）：',
            fontSizeAdjustment: 'フォントサイズの調整',
            increase: 'フォントサイズを大きくする',
            decrease: 'フォントサイズを小さくする',
            restore: 'フォントをリセット',
            firstAdjustment: '初回調整',
            firstAdjustmentConfirm: '初回調整の遅延時間を入力（秒、0で無効）：',
            timerAdjustment: '定期調整',
            timerPrompt: '定期調整の間隔を入力（秒、0で無効）：',
            dynamicAdjustment: '動的調整',
            dynamicWatchConfirm: '動的調整を有効/無効にしますか？有効にすると、ページの変化を監視し、フォントを自動的に調整します。',
            excludeElements: '要素を除外',
            excludeElementsPrompt: '除外するCSSセレクタを入力してください（カンマ区切り、例：code, pre）：',
            none: 'なし',
            invalidSelectorAlert: '無効なCSSセレクタです。入力を確認してください！',
            switchPanel: 'パネル切り替え',
            pluginPanel: 'プラグインパネル',
            floatingPanel: 'フローティングパネル',
            autoOpenFloatingPanelPrompt: 'フォント調整設定がないページでフォント設定のフローティングパネルを自動的に表示しますか？',
            showPanel: 'パネルを表示',
            currentConfigScope: '現在の設定範囲',
            modifyConfigScope: '設定範囲の変更',
            modifyConfigScopePrompt: '設定範囲を入力してください：\n0: このサイトを除外 ({hostname})\n1: このサイトに一致 ({hostname})\n2: ドメインに一致 ({tld})\n3: すべてのウェブサイトに一致\n現在の範囲: {scope}',
            exportImportConfig: '設定のエクスポート/インポート',
            clearAllConfigConfirm: 'クリアするには y を入力してください:',
            clearAllConfigLabel: 'クリア',
            exportLink: 'エクスポート',
            importLink: 'インポート',
            exportImportConfigSuffix: '',
            exportImportPrompt: '1: 設定をエクスポート  2: 設定をインポート  3: 設定をクリア\n1、2または3を入力してください:',
            importConfigPreview: '{add}件追加、{modify}件変更、{delete}件削除されます。続行しますか？',
            importConfigSuccess: '設定のインポートに成功しました！',
            importConfigError: 'インポートに失敗しました。JSON形式が正しいか確認してください。',
            saveConfig: '設定を保存',
            saveConfigPending: '設定を保存（変更待ち）',
            saveConfigConfirm: '{scope} [{target}] に設定を保存しますか？',
            deleteConfigConfirm: '{target} の設定を削除しますか？',
            deleteBeforeScopeChangeConfirm: '範囲変更前に、{scope} [{target}] の既存の設定を削除しますか？',
            notConfigured: '未設定',
            invalidInput: '無効な入力です。0、1、2、または3を入力してください！',
            subdomain: 'このサイトに一致',
            topLevelDomain: 'ドメインに一致',
            allWebsites: 'すべてのウェブサイトに一致',
            excludeThisSite: 'このサイトを除外',
            currentConfigScopeExcluded: 'このサイトを除外 ({hostname})',
            customInput: '手動入力',
            panelTitle: 'NiceFont',
        },
        ru: {
            setFontFamily: 'Установить шрифт',
            setFontFamilyPrompt: 'Введите название шрифта (например: Arial, sans-serif):',
            supportFontFamily: 'Поддерживаемые шрифты:',
            setTextStroke: 'Обводка шрифта',
            setTextStrokePrompt: 'Введите 0.0-1.0 (0 — выкл.):',
            setTextShadow: 'Тень шрифта',
            setTextShadowPrompt: 'Введите 0.0-4.0 (0 — выкл.):',
            fontSizeAdjustment: 'Настройка размера шрифта',
            increase: 'Увеличить шрифт',
            decrease: 'Уменьшить шрифт',
            restore: 'Восстановить шрифт',
            firstAdjustment: 'Первая настройка',
            firstAdjustmentConfirm: 'Введите время задержки для первой настройки (секунды, 0 для отключения):',
            timerAdjustment: 'Периодическая настройка',
            timerPrompt: 'Введите интервал для периодической настройки (секунды, 0 для отключения):',
            dynamicAdjustment: 'Динамическая настройка',
            dynamicWatchConfirm: 'Включить/отключить динамическую настройку? При включении будет отслеживать изменения страницы и автоматически настраивать шрифт.',
            excludeElements: 'Исключить элементы',
            excludeElementsPrompt: 'Введите CSS-селекторы для исключения (через запятую, например: code, pre):',
            none: 'Нет',
            invalidSelectorAlert: 'Недопустимый CSS-селектор, проверьте ввод!',
            switchPanel: 'Переключить панель',
            pluginPanel: 'Панель плагина',
            floatingPanel: 'Плавающая панель',
            autoOpenFloatingPanelPrompt: 'Автоматически показывать плавающую панель настройки шрифта на страницах без конфигурации шрифта?',
            showPanel: 'Показать панель',
            currentConfigScope: 'Текущая область настроек',
            modifyConfigScope: 'Изменить область настроек',
            modifyConfigScopePrompt: 'Введите область настроек:\n0: Исключить этот сайт ({hostname})\n1: Совпадение с этим сайтом ({hostname})\n2: Совпадение с доменом ({tld})\n3: Совпадение со всеми сайтами\nТекущая область: {scope}',
            exportImportConfig: 'Экспорт/Импорт настроек',
            clearAllConfigConfirm: 'Введите y для подтверждения очистки всех настроек:',
            clearAllConfigLabel: 'Очистить',
            exportLink: 'Экспорт',
            importLink: 'Импорт',
            exportImportConfigSuffix: ' настроек',
            exportImportPrompt: '1: Экспорт настроек  2: Импорт настроек  3: Очистить все\nВведите 1, 2 или 3:',
            importConfigPreview: 'Добавить {add}, изменить {modify}, удалить {delete}. Продолжить?',
            importConfigSuccess: 'Настройки успешно импортированы!',
            importConfigError: 'Ошибка импорта. Проверьте формат JSON.',
            saveConfig: 'Сохранить настройки',
            saveConfigPending: 'Сохранить настройки (есть изменения)',
            saveConfigConfirm: 'Сохранить настройки для {scope} [{target}]?',
            deleteConfigConfirm: 'Удалить настройки для {target}?',
            deleteBeforeScopeChangeConfirm: 'Перед изменением области удалить текущие настройки для {scope} [{target}]?',
            notConfigured: 'Не настроено',
            invalidInput: 'Недопустимый ввод, введите 0, 1, 2 или 3!',
            subdomain: 'Совпадение с этим сайтом',
            topLevelDomain: 'Совпадение с доменом',
            allWebsites: 'Совпадение со всеми сайтами',
            excludeThisSite: 'Исключить этот сайт',
            currentConfigScopeExcluded: 'Исключить этот сайт ({hostname})',
            customInput: 'Ручной ввод',
            panelTitle: 'NiceFont',
        },
        fr: {
            setFontFamily: 'Définir la famille de polices',
            setFontFamilyPrompt: 'Veuillez entrer la famille de polices (par exemple : Arial, sans-serif) :',
            supportFontFamily: 'Polices prises en charge :',
            setTextStroke: 'Contour de police',
            setTextStrokePrompt: 'Entrez 0.0-1.0 (0 pour désactiver) :',
            setTextShadow: 'Ombre de police',
            setTextShadowPrompt: 'Entrez 0.0-4.0 (0 pour désactiver) :',
            fontSizeAdjustment: 'Ajustement de la taille de la police',
            increase: 'Augmenter la police',
            decrease: 'Réduire la police',
            restore: 'Restaurer la police',
            firstAdjustment: 'Premier ajustement',
            firstAdjustmentConfirm: 'Entrez le délai pour le premier ajustement (secondes, 0 pour désactiver) :',
            timerAdjustment: 'Ajustement périodique',
            timerPrompt: 'Entrez l’intervalle pour l’ajustement périodique (secondes, 0 pour désactiver) :',
            dynamicAdjustment: 'Ajustement dynamique',
            dynamicWatchConfirm: 'Activer/désactiver l’ajustement dynamique ? Lorsqu’il est activé, il surveillera les changements de page et ajustera les polices automatiquement.',
            excludeElements: 'Exclure des éléments',
            excludeElementsPrompt: 'Entrez les sélecteurs CSS à exclure (séparés par des virgules, par ex. : code, pre) :',
            none: 'Aucun',
            invalidSelectorAlert: 'Sélecteur CSS invalide, veuillez vérifier votre saisie !',
            switchPanel: 'Changer de panneau',
            pluginPanel: 'Panneau du plugin',
            floatingPanel: 'Panneau flottant',
            autoOpenFloatingPanelPrompt: 'Afficher automatiquement le panneau flottant de réglage des polices sur les pages sans configuration d’ajustement de police ?',
            showPanel: 'Afficher le panneau',
            currentConfigScope: 'Portée actuelle de la configuration',
            modifyConfigScope: 'Modifier la portée de la configuration',
            modifyConfigScopePrompt: 'Entrez la portée de la configuration :\n0 : Exclure ce site ({hostname})\n1 : Correspondre à ce site ({hostname})\n2 : Correspondre au domaine ({tld})\n3 : Correspondre à tous les sites web\nPortée actuelle : {scope}',
            exportImportConfig: 'Exporter/Importer la config',
            clearAllConfigConfirm: 'Entrez y pour confirmer l\'effacement de toutes les configurations :',
            clearAllConfigLabel: 'Effacer',
            exportLink: 'Exporter',
            importLink: 'Importer',
            exportImportConfigSuffix: ' la config',
            exportImportPrompt: '1: Exporter  2: Importer  3: Tout effacer\nEntrez 1, 2 ou 3:',
            importConfigPreview: 'Ajouter {add}, modifier {modify}, supprimer {delete}. Continuer ?',
            importConfigSuccess: 'Configuration importée avec succès !',
            importConfigError: 'Échec de l\'import. Vérifiez le format JSON.',
            saveConfig: 'Enregistrer la configuration',
            saveConfigPending: 'Enregistrer la configuration (modifications en attente)',
            saveConfigConfirm: 'Enregistrer la configuration pour {scope} [{target}] ?',
            deleteConfigConfirm: 'Supprimer la configuration pour {target} ?',
            deleteBeforeScopeChangeConfirm: 'Avant de changer la portée, supprimer la configuration existante pour {scope} [{target}] ?',
            notConfigured: 'Non configuré',
            invalidInput: 'Saisie invalide, veuillez entrer 0, 1, 2 ou 3 !',
            subdomain: 'Correspondre à ce site',
            topLevelDomain: 'Correspondre au domaine',
            allWebsites: 'Correspondre à tous les sites web',
            excludeThisSite: 'Exclure ce site',
            currentConfigScopeExcluded: 'Exclure ce site ({hostname})',
            customInput: 'Saisie manuelle',
            panelTitle: 'NiceFont',
        },
        de: {
            setFontFamily: 'Schriftart einstellen',
            setFontFamilyPrompt: 'Bitte geben Sie die Schriftart ein (z. B. Arial, sans-serif):',
            supportFontFamily: 'Unterstützte Schriftarten:',
            setTextStroke: 'Schriftkontur',
            setTextStrokePrompt: '0.0-1.0 eingeben (0 = aus):',
            setTextShadow: 'Schriftschatten',
            setTextShadowPrompt: '0.0-4.0 eingeben (0 = aus):',
            fontSizeAdjustment: 'Schriftgrößenanpassung',
            increase: 'Schrift vergrößern',
            decrease: 'Schrift verkleinern',
            restore: 'Schrift zurücksetzen',
            firstAdjustment: 'Erste Anpassung',
            firstAdjustmentConfirm: 'Geben Sie die Verzögerungszeit für die erste Anpassung ein (Sekunden, 0 zum Deaktivieren):',
            timerAdjustment: 'Periodische Anpassung',
            timerPrompt: 'Geben Sie das Intervall für periodische Anpassungen ein (Sekunden, 0 zum Deaktivieren):',
            dynamicAdjustment: 'Dynamische Anpassung',
            dynamicWatchConfirm: 'Dynamische Anpassung aktivieren/deaktivieren? Bei Aktivierung werden Seitenänderungen überwacht und Schriften automatisch angepasst.',
            excludeElements: 'Elemente ausschließen',
            excludeElementsPrompt: 'Geben Sie die auszuschließenden CSS-Selektoren ein (durch Kommas getrennt, z. B. code, pre):',
            none: 'Keine',
            invalidSelectorAlert: 'Ungültiger CSS-Selektor, bitte überprüfen Sie Ihre Eingabe!',
            switchPanel: 'Panel wechseln',
            pluginPanel: 'Plugin-Panel',
            floatingPanel: 'Schwebendes Panel',
            autoOpenFloatingPanelPrompt: 'Das schwebende Panel für Schriftenanpassungen auf Seiten ohne Schriftenkonfiguration automatisch anzeigen?',
            showPanel: 'Panel anzeigen',
            currentConfigScope: 'Aktueller Konfigurationsbereich',
            modifyConfigScope: 'Konfigurationsbereich ändern',
            modifyConfigScopePrompt: 'Geben Sie den Konfigurationsbereich ein:\n0: Diese Website ausschließen ({hostname})\n1: Diese Website abgleichen ({hostname})\n2: Domain abgleichen ({tld})\n3: Alle Websites abgleichen\nAktueller Bereich: {scope}',
            exportImportConfig: 'Konfiguration exportieren/importieren',
            clearAllConfigConfirm: 'Geben Sie y ein, um alle Konfigurationen zu löschen:',
            clearAllConfigLabel: 'Löschen',
            exportLink: 'Exportieren',
            importLink: 'Importieren',
            exportImportConfigSuffix: '',
            exportImportPrompt: '1: Exportieren  2: Importieren  3: Alles löschen\n1, 2 oder 3 eingeben:',
            importConfigPreview: '{add} hinzufügen, {modify} ändern, {delete} löschen. Fortfahren?',
            importConfigSuccess: 'Konfiguration erfolgreich importiert!',
            importConfigError: 'Import fehlgeschlagen. JSON-Format prüfen.',
            saveConfig: 'Konfiguration speichern',
            saveConfigPending: 'Konfiguration speichern (Änderungen ausstehend)',
            saveConfigConfirm: 'Konfiguration für {scope} [{target}] speichern?',
            deleteConfigConfirm: 'Konfiguration für {target} löschen?',
            deleteBeforeScopeChangeConfirm: 'Vor Änderung des Bereichs bestehende Konfiguration für {scope} [{target}] löschen?',
            notConfigured: 'Nicht konfiguriert',
            invalidInput: 'Ungültige Eingabe, bitte 0, 1, 2 oder 3 eingeben!',
            subdomain: 'Diese Website abgleichen',
            topLevelDomain: 'Domain abgleichen',
            allWebsites: 'Alle Websites abgleichen',
            excludeThisSite: 'Diese Website ausschließen',
            currentConfigScopeExcluded: 'Diese Website ausschließen ({hostname})',
            customInput: 'Manuelle Eingabe',
            panelTitle: 'NiceFont',
        },
        es: {
            setFontFamily: 'Establecer familia de fuentes',
            setFontFamilyPrompt: 'Por favor, introduce la familia de fuentes (por ejemplo: Arial, sans-serif):',
            supportFontFamily: 'Fuentes soportadas:',
            setTextStroke: 'Contorno de fuente',
            setTextStrokePrompt: 'Introduce 0.0-1.0 (0 para desactivar):',
            setTextShadow: 'Sombra de fuente',
            setTextShadowPrompt: 'Introduce 0.0-4.0 (0 para desactivar):',
            fontSizeAdjustment: 'Ajuste del tamaño de la fuente',
            increase: 'Aumentar fuente',
            decrease: 'Reducir fuente',
            restore: 'Restaurar fuente',
            firstAdjustment: 'Primer ajuste',
            firstAdjustmentConfirm: 'Introduce el tiempo de retraso para el primer ajuste (segundos, 0 para desactivar):',
            timerAdjustment: 'Ajuste periódico',
            timerPrompt: 'Introduce el intervalo para ajustes periódicos (segundos, 0 para desactivar):',
            dynamicAdjustment: 'Ajuste dinámico',
            dynamicWatchConfirm: '¿Activar/desactivar el ajuste dinámico? Cuando está activado, monitoreará los cambios en la página y ajustará las fuentes automáticamente.',
            excludeElements: 'Excluir elementos',
            excludeElementsPrompt: 'Introduce los selectores CSS a excluir (separados por comas, por ej.: code, pre):',
            none: 'Ninguno',
            invalidSelectorAlert: '¡Selector CSS inválido, por favor verifica tu entrada!',
            switchPanel: 'Cambiar panel',
            pluginPanel: 'Panel del complemento',
            floatingPanel: 'Panel flotante',
            autoOpenFloatingPanelPrompt: '¿Mostrar automáticamente el panel flotante de configuración de fuentes en páginas sin configuración de ajuste de fuentes?',
            showPanel: 'Mostrar panel',
            currentConfigScope: 'Alcance actual de la configuración',
            modifyConfigScope: 'Modificar alcance de la configuración',
            modifyConfigScopePrompt: 'Introduce el alcance de la configuración:\n0: Excluir este sitio ({hostname})\n1: Coincidir con este sitio ({hostname})\n2: Coincidir con el dominio ({tld})\n3: Coincidir con todos los sitios web\nAlcance actual: {scope}',
            exportImportConfig: 'Exportar/Importar configuración',
            clearAllConfigConfirm: 'Introduzca y para confirmar el borrado de todas las configuraciones:',
            clearAllConfigLabel: 'Borrar',
            exportLink: 'Exportar',
            importLink: 'Importar',
            exportImportConfigSuffix: ' configuración',
            exportImportPrompt: '1: Exportar  2: Importar  3: Borrar todo\nIntroduce 1, 2 o 3:',
            importConfigPreview: 'Añadir {add}, modificar {modify}, eliminar {delete}. ¿Continuar?',
            importConfigSuccess: '¡Configuración importada correctamente!',
            importConfigError: 'Error al importar. Comprueba el formato JSON.',
            saveConfig: 'Guardar configuración',
            saveConfigPending: 'Guardar configuración (cambios pendientes)',
            saveConfigConfirm: '¿Guardar configuración en {scope} [{target}]?',
            deleteConfigConfirm: '¿Eliminar configuración para {target}?',
            deleteBeforeScopeChangeConfirm: 'Antes de cambiar el alcance, ¿eliminar la configuración existente para {scope} [{target}]?',
            notConfigured: 'No configurado',
            invalidInput: '¡Entrada inválida, por favor introduce 0, 1, 2 o 3!',
            subdomain: 'Coincidir con este sitio',
            topLevelDomain: 'Coincidir con el dominio',
            allWebsites: 'Coincidir con todos los sitios web',
            excludeThisSite: 'Excluir este sitio',
            currentConfigScopeExcluded: 'Excluir este sitio ({hostname})',
            customInput: 'Entrada manual',
            panelTitle: 'NiceFont',
        },
        pt: {
            setFontFamily: 'Definir família de fontes',
            setFontFamilyPrompt: 'Por favor, insira a família de fontes (por exemplo: Arial, sans-serif):',
            supportFontFamily: 'Fontes suportadas:',
            setTextStroke: 'Contorno da fonte',
            setTextStrokePrompt: 'Insira 0.0-1.0 (0 para desativar):',
            setTextShadow: 'Sombra da fonte',
            setTextShadowPrompt: 'Insira 0.0-4.0 (0 para desativar):',
            fontSizeAdjustment: 'Ajuste do tamanho da fonte',
            increase: 'Aumentar fonte',
            decrease: 'Diminuir fonte',
            restore: 'Restaurar fonte',
            firstAdjustment: 'Primeiro ajuste',
            firstAdjustmentConfirm: 'Insira o tempo de atraso para o primeiro ajuste (segundos, 0 para desativar):',
            timerAdjustment: 'Ajuste periódico',
            timerPrompt: 'Insira o intervalo para ajustes periódicos (segundos, 0 para desativar):',
            dynamicAdjustment: 'Ajuste dinâmico',
            dynamicWatchConfirm: 'Ativar/desativar ajuste dinâmico? Quando ativado, monitorará mudanças na página e ajustará fontes automaticamente.',
            excludeElements: 'Excluir elementos',
            excludeElementsPrompt: 'Insira seletores CSS para excluir (separados por vírgulas, por ex.: code, pre):',
            none: 'Nenhum',
            invalidSelectorAlert: 'Seletor CSS inválido, por favor verifique sua entrada!',
            switchPanel: 'Mudar painel',
            pluginPanel: 'Painel do plugin',
            floatingPanel: 'Painel flutuante',
            autoOpenFloatingPanelPrompt: 'Exibir automaticamente o painel flutuante de configuração de fontes em páginas sem configuração de ajuste de fontes?',
            showPanel: 'Mostrar painel',
            currentConfigScope: 'Escopo atual da configuração',
            modifyConfigScope: 'Modificar escopo da configuração',
            modifyConfigScopePrompt: 'Insira o escopo da configuração:\n0: Excluir este site ({hostname})\n1: Corresponder a este site ({hostname})\n2: Corresponder ao domínio ({tld})\n3: Corresponder a todos os sites\nEscopo atual: {scope}',
            exportImportConfig: 'Exportar/Importar configuração',
            clearAllConfigConfirm: 'Digite y para confirmar a limpeza de todas as configurações:',
            clearAllConfigLabel: 'Limpar',
            exportLink: 'Exportar',
            importLink: 'Importar',
            exportImportConfigSuffix: ' configuração',
            exportImportPrompt: '1: Exportar  2: Importar  3: Limpar tudo\nDigite 1, 2 ou 3:',
            importConfigPreview: 'Adicionar {add}, modificar {modify}, excluir {delete}. Continuar?',
            importConfigSuccess: 'Configuração importada com sucesso!',
            importConfigError: 'Falha ao importar. Verifique o formato JSON.',
            saveConfig: 'Salvar configuração',
            saveConfigPending: 'Salvar configuração (alterações pendentes)',
            saveConfigConfirm: 'Salvar configuração para {scope} [{target}]?',
            deleteConfigConfirm: 'Excluir configuração para {target}?',
            deleteBeforeScopeChangeConfirm: 'Antes de mudar o escopo, excluir a configuração existente para {scope} [{target}]?',
            notConfigured: 'Não configurado',
            invalidInput: 'Entrada inválida, por favor insira 0, 1, 2 ou 3!',
            subdomain: 'Corresponder a este site',
            topLevelDomain: 'Corresponder ao domínio',
            allWebsites: 'Corresponder a todos os sites',
            excludeThisSite: 'Excluir este site',
            currentConfigScopeExcluded: 'Excluir este site ({hostname})',
            customInput: 'Entrada manual',
            panelTitle: 'NiceFont',
        }
    };

    const lang = navigator.language.split('-')[0] || 'zh';
    t = TRANSLATIONS[lang] || TRANSLATIONS.zh;

    /** 初始化：加载配置、注册菜单、创建面板、绑定 load/beforeunload */
    function init() {
        let panelType = GM_getValue(Constants.PANEL_TYPE_KEY, 'pluginPanel');
        appState.panelType = panelType;

        ConfigManager.loadConfig();

        UIManager.updateUI();

        window.addEventListener('load', () => {
            setupScheduledAdjustments();
        });

        window.addEventListener('beforeunload', () => {
            cleanupTimersAndObserver();
        });

        if (appState.panelType === 'floatingPanel' && !ConfigScopeManager.hasConfig()) {
            const autoOpenPageMenu = GM_getValue('NiceFont_autoOpenPageMenu', false);
            if (!autoOpenPageMenu) {
                UIManager.createFloatingPanel();
                if (UIManager.panelCache) {
                    const shadow = UIManager.panelCache.shadowRoot;
                    const panelContainer = shadow.querySelector('.NiceFont_panel-container');
                    panelContainer.style.display = 'block';
                    appState.isAutoOpened = true;
                }
            }
        }

    }

    init();
})();
