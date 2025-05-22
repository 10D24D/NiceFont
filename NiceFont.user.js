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
// @version      4.0.1
// @author       DD1024z
// @description  NiceFont: 是一款优化网页字体显示的工具，让浏览更清晰、舒适！“真正调整字体，而非页面缩放，拒绝将就”！可直接修改网页的字体大小与风格，保存你的字体设置，轻松应用到每个网页，支持首次、定时或动态调整字体，适配子域名、整站或全局设置，几乎兼容所有网站！
// @description:zh-CN  NiceFont: 是一款优化网页字体显示的工具，让浏览更清晰、舒适！“真正调整字体，而非页面缩放，拒绝将就”！可直接修改网页的字体大小与风格，保存你的字体设置，轻松应用到每个网页，支持首次、定时或动态调整字体，适配子域名、整站或全局设置，几乎兼容所有网站！
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
// @downloadURL  https://update.greasyfork.org/scripts/533232/NiceFont.user.js
// @updateURL    https://update.greasyfork.org/scripts/533232/NiceFont.meta.js
// @match        *://*/*
// @license      Apache License 2.0
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_info
// @grant        GM_listValues
// @run-at       document-start
// @compatible   edge version≥90 (Compatible Tampermonkey, Violentmonkey)
// @compatible   Chrome version≥90 (Compatible Tampermonkey, Violentmonkey)
// @compatible   Firefox version≥84 (Compatible Greasemonkey, Tampermonkey, Violentmonkey)
// @compatible   Opera version≥78 (Compatible Tampermonkey, Violentmonkey)
// @compatible   Safari version≥15.4 (Compatible Tampermonkey, Userscripts)
// @create       2025-4-18
// @copyright    2025, DD1024z
// ==/UserScript==

(function () {
    'use strict';

    // 网站的嵌套页面不执行脚本
    if (window.top !== window.self) {
        return;
    }

    // 调试开关，生产环境中禁用日志
    const enableLogging = true;

    const Constants = {
        DEFAULT_FONT_SIZE: 16, // 默认字体大小（px）
        ENABLED_ICON: '✔️',
        DISABLED_ICON: '✖️',
        BASE_STORAGE_KEY: 'NiceFont_config',
        GLOBAL_DEFAULT_KEY: 'NiceFont_global_default_config',
        PANEL_TYPE_KEY: 'NiceFont_panelType',
    };

    const lang = navigator.language.split('-')[0] || 'en';

    /**
     * 自定义日志函数，仅在调试模式下输出
     * @param {...any} args - 日志参数
     */
    function log(...args) {
        if (enableLogging) {
            console.log('[NiceFont]', ...args);
        }
    }

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

    // --- 状态管理 ---
    class State {
        constructor() {
            this._fontIncrement = 1;
            this._currentFontFamily = 'none';
            this._currentAdjustment = 0;
            this._dynamicAdjustment = false;
            this._intervalSeconds = 0;
            this._firstAdjustmentTime = 0;
            this._panelType = 'pluginPanel';
            this._isConfigModified = false;
            this._targetScope = 1;
            this._pendingScopeChange = null;
            this._observer = null;
            this._timer = null;
            this._isAutoOpened = false;
            this._excludedSelectors = ['img', 'i', 'code', 'code *'];
            this._isExcludedSite = false;
        }

        // fontIncrement
        get fontIncrement() {
            return this._fontIncrement;
        }
        set fontIncrement(value) {
            if (typeof value !== 'number' || value < 0) {
                console.warn('[State] fontIncrement 必须是正数');
                return;
            }
            this._fontIncrement = value;
        }

        // currentFontFamily
        get currentFontFamily() {
            return this._currentFontFamily;
        }
        set currentFontFamily(value) {
            this._currentFontFamily = value;
        }

        // currentAdjustment
        get currentAdjustment() {
            return this._currentAdjustment;
        }
        set currentAdjustment(value) {
            if (typeof value !== 'number') {
                console.warn('[State] currentAdjustment 必须是数字');
                return;
            }
            this._currentAdjustment = value;
        }

        // dynamicAdjustment
        get dynamicAdjustment() {
            return this._dynamicAdjustment;
        }
        set dynamicAdjustment(value) {
            this._dynamicAdjustment = !!value;
        }

        // intervalSeconds
        get intervalSeconds() {
            return this._intervalSeconds;
        }
        set intervalSeconds(value) {
            if (typeof value !== 'number' || value < 0) {
                console.warn('[State] intervalSeconds 必须是正数');
                return;
            }
            this._intervalSeconds = value;
        }

        // firstAdjustmentTime
        get firstAdjustmentTime() {
            return this._firstAdjustmentTime;
        }
        set firstAdjustmentTime(value) {
            if (typeof value !== 'number' || value < 0) {
                console.warn('[State] firstAdjustmentTime 必须是正数');
                return;
            }
            this._firstAdjustmentTime = value;
        }

        // panelType
        get panelType() {
            return this._panelType;
        }
        set panelType(value) {
            this._panelType = value;
        }

        // isConfigModified
        get isConfigModified() {
            return this._isConfigModified;
        }
        set isConfigModified(value) {
            this._isConfigModified = !!value;
        }

        // targetScope
        get targetScope() {
            return this._targetScope;
        }
        set targetScope(value) {
            if (![0, 1, 2, 3].includes(value)) {
                console.warn('[State] targetScope 必须是 0, 1, 2 或 3');
                return;
            }
            this._targetScope = value;
        }

        // pendingScopeChange
        get pendingScopeChange() {
            return this._pendingScopeChange;
        }
        set pendingScopeChange(value) {
            this._pendingScopeChange = value;
        }

        // observer
        get observer() {
            return this._observer;
        }
        set observer(value) {
            this._observer = value;
        }

        // timer
        get timer() {
            return this._timer;
        }
        set timer(value) {
            this._timer = value;
        }

        // isAutoOpened
        get isAutoOpened() {
            return this._isAutoOpened;
        }
        set isAutoOpened(value) {
            this._isAutoOpened = !!value;
        }

        // excludedSelectors
        get excludedSelectors() {
            return this._excludedSelectors;
        }
        set excludedSelectors(value) {
            if (!Array.isArray(value)) {
                console.warn('[State] excludedSelectors 必须是数组，收到:', value, '使用默认值');
                this._excludedSelectors = ['img', 'i', 'code', 'code *'];
                return;
            }
            this._excludedSelectors = value;
        }
    }

    // 全局状态实例，用于管理脚本的配置
    const appState = new State();

    // --- 多语言支持 --- 汉语(zh)、英语(en)、韩语(ko)、日语(ja)、俄语(ru)、法语(fr)、德语(de)、西班牙语(es)、葡萄牙语(pt)
    const translations = {
        zh: {
            setFontFamily: '设置字体类型',
            setFontFamilyPrompt: '请输入字体类型（例如：Arial, sans-serif）：',
            supportFontFamily: '支持的字体：',
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
            currentConfigScope: '当前配置作用',
            modifyConfigScope: '修改配置作用',
            modifyConfigScopePrompt: '请输入配置作用范围：\n0: 排除本站\n1: 子域名 ({hostname})\n2: 顶级域名 ({tld})\n3: 所有网站\n当前范围: {scope}',
            saveConfig: '保存配置',
            saveConfigPending: '保存配置（有更改）',
            saveConfigConfirm: '是否保存配置到 {scope} [{target}]？',
            deleteConfigConfirm: '是否删除 {target} 的配置？',
            deleteBeforeScopeChangeConfirm: '更改范围前，是否删除 {scope} [{target}] 的现有配置？',
            notConfigured: '未配置',
            invalidInput: '输入无效，请输入 0、1、2 或 3！',
            subdomain: '子域名',
            topLevelDomain: '顶级域名',
            allWebsites: '所有网站',
            excludeThisSite: '排除本站',
            currentConfigScopeExcluded: '排除本站 ({hostname})',
        },
        en: {
            setFontFamily: 'Set Font Family',
            setFontFamilyPrompt: 'Please enter font family (e.g., Arial, sans-serif):',
            supportFontFamily: 'Supported fonts:',
            fontSizeAdjustment: 'Font Size Adjustment',
            increase: 'Increase Font',
            decrease: 'Decrease Font',
            restore: 'Restore Font',
            firstAdjustment: 'First Adjustment',
            firstAdjustmentConfirm: 'Enter delay time for first adjustment (seconds, 0 to disable):',
            timerAdjustment: 'Timer Adjustment',
            timerPrompt: 'Enter interval for periodic adjustment (seconds, 0 to disable):',
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
            modifyConfigScopePrompt: 'Enter configuration scope:\n0: Exclude this site\n1: Subdomain ({hostname})\n2: Top-Level Domain ({tld})\n3: All Websites\nCurrent scope: {scope}',
            saveConfig: 'Save Configuration',
            saveConfigPending: 'Save Configuration (Changes Pending)',
            saveConfigConfirm: 'Save configuration to {scope} [{target}]?',
            deleteConfigConfirm: 'Delete configuration for {target}?',
            deleteBeforeScopeChangeConfirm: 'Before changing scope, delete existing configuration for {scope} [{target}]?',
            notConfigured: 'Not Configured',
            invalidInput: 'Invalid input, please enter 0, 1, 2, or 3!',
            subdomain: 'Subdomain',
            topLevelDomain: 'Top-Level Domain',
            allWebsites: 'All Websites',
            excludeThisSite: 'Exclude This Site',
            currentConfigScopeExcluded: 'Exclude This Site ({hostname})',
        },
        ko: {
            setFontFamily: '글꼴 설정',
            setFontFamilyPrompt: '글꼴을 입력하세요 (예: Arial, sans-serif):',
            supportFontFamily: '지원되는 글꼴:',
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
            modifyConfigScopePrompt: '설정 범위를 입력하세요:\n0: 이 사이트 제외\n1: 서브도메인 ({hostname})\n2: 최상위 도메인 ({tld})\n3: 모든 웹사이트\n현재 범위: {scope}',
            saveConfig: '설정 저장',
            saveConfigPending: '설정 저장 (변경 대기 중)',
            saveConfigConfirm: '{scope} [{target}]에 설정을 저장하시겠습니까?',
            deleteConfigConfirm: '{target}의 설정을 삭제하시겠습니까?',
            deleteBeforeScopeChangeConfirm: '범위 변경 전, {scope} [{target}]의 기존 설정을 삭제하시겠습니까?',
            notConfigured: '설정되지 않음',
            invalidInput: '잘못된 입력입니다. 0, 1, 2, 3 중 하나를 입력하세요!',
            subdomain: '서브도메인',
            topLevelDomain: '최상위 도메인',
            allWebsites: '모든 웹사이트',
            excludeThisSite: '이 사이트 제외',
            currentConfigScopeExcluded: '이 사이트 제외 ({hostname})',
        },
        ja: {
            setFontFamily: 'フォントの設定',
            setFontFamilyPrompt: 'フォントを入力してください（例：Arial, sans-serif）：',
            supportFontFamily: 'サポートされているフォント：',
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
            modifyConfigScopePrompt: '設定範囲を入力してください：\n0: このサイトを除外\n1: サブドメイン ({hostname})\n2: トップレベルドメイン ({tld})\n3: すべてのウェブサイト\n現在の範囲: {scope}',
            saveConfig: '設定を保存',
            saveConfigPending: '設定を保存（変更待ち）',
            saveConfigConfirm: '{scope} [{target}] に設定を保存しますか？',
            deleteConfigConfirm: '{target} の設定を削除しますか？',
            deleteBeforeScopeChangeConfirm: '範囲変更前に、{scope} [{target}] の既存の設定を削除しますか？',
            notConfigured: '未設定',
            invalidInput: '無効な入力です。0、1、2、または3を入力してください！',
            subdomain: 'サブドメイン',
            topLevelDomain: 'トップレベルドメイン',
            allWebsites: 'すべてのウェブサイト',
            excludeThisSite: 'このサイトを除外',
            currentConfigScopeExcluded: 'このサイトを除外 ({hostname})',
        },
        ru: {
            setFontFamily: 'Установить шрифт',
            setFontFamilyPrompt: 'Введите название шрифта (например: Arial, sans-serif):',
            supportFontFamily: 'Поддерживаемые шрифты:',
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
            modifyConfigScopePrompt: 'Введите область настроек:\n0: Исключить этот сайт\n1: Поддомен ({hostname})\n2: Домен верхнего уровня ({tld})\n3: Все веб-сайты\nТекущая область: {scope}',
            saveConfig: 'Сохранить настройки',
            saveConfigPending: 'Сохранить настройки (есть изменения)',
            saveConfigConfirm: 'Сохранить настройки для {scope} [{target}]?',
            deleteConfigConfirm: 'Удалить настройки для {target}?',
            deleteBeforeScopeChangeConfirm: 'Перед изменением области удалить текущие настройки для {scope} [{target}]?',
            notConfigured: 'Не настроено',
            invalidInput: 'Недопустимый ввод, введите 0, 1, 2 или 3!',
            subdomain: 'Поддомен',
            topLevelDomain: 'Домен верхнего уровня',
            allWebsites: 'Все веб-сайты',
            excludeThisSite: 'Исключить этот сайт',
            currentConfigScopeExcluded: 'Исключить этот сайт ({hostname})',
        },
        fr: {
            setFontFamily: 'Définir la famille de polices',
            setFontFamilyPrompt: 'Veuillez entrer la famille de polices (par exemple : Arial, sans-serif) :',
            supportFontFamily: 'Polices prises en charge :',
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
            modifyConfigScopePrompt: 'Entrez la portée de la configuration :\n0 : Exclure ce site\n1 : Sous-domaine ({hostname})\n2 : Domaine de premier niveau ({tld})\n3 : Tous les sites web\nPortée actuelle : {scope}',
            saveConfig: 'Enregistrer la configuration',
            saveConfigPending: 'Enregistrer la configuration (modifications en attente)',
            saveConfigConfirm: 'Enregistrer la configuration pour {scope} [{target}] ?',
            deleteConfigConfirm: 'Supprimer la configuration pour {target} ?',
            deleteBeforeScopeChangeConfirm: 'Avant de changer la portée, supprimer la configuration existante pour {scope} [{target}] ?',
            notConfigured: 'Non configuré',
            invalidInput: 'Saisie invalide, veuillez entrer 0, 1, 2 ou 3 !',
            subdomain: 'Sous-domaine',
            topLevelDomain: 'Domaine de premier niveau',
            allWebsites: 'Tous les sites web',
            excludeThisSite: 'Exclure ce site',
            currentConfigScopeExcluded: 'Exclure ce site ({hostname})',
        },
        de: {
            setFontFamily: 'Schriftart einstellen',
            setFontFamilyPrompt: 'Bitte geben Sie die Schriftart ein (z. B. Arial, sans-serif):',
            supportFontFamily: 'Unterstützte Schriftarten:',
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
            modifyConfigScopePrompt: 'Geben Sie den Konfigurationsbereich ein:\n0: Diesen Standort ausschließen\n1: Subdomain ({hostname})\n2: Top-Level-Domain ({tld})\n3: Alle Websites\nAktueller Bereich: {scope}',
            saveConfig: 'Konfiguration speichern',
            saveConfigPending: 'Konfiguration speichern (Änderungen ausstehend)',
            saveConfigConfirm: 'Konfiguration für {scope} [{target}] speichern?',
            deleteConfigConfirm: 'Konfiguration für {target} löschen?',
            deleteBeforeScopeChangeConfirm: 'Vor Änderung des Bereichs bestehende Konfiguration für {scope} [{target}] löschen?',
            notConfigured: 'Nicht konfiguriert',
            invalidInput: 'Ungültige Eingabe, bitte 0, 1, 2 oder 3 eingeben!',
            subdomain: 'Subdomain',
            topLevelDomain: 'Top-Level-Domain',
            allWebsites: 'Alle Websites',
            excludeThisSite: 'Diesen Standort ausschließen',
            currentConfigScopeExcluded: 'Diesen Standort ausschließen ({hostname})',
        },
        es: {
            setFontFamily: 'Establecer familia de fuentes',
            setFontFamilyPrompt: 'Por favor, introduce la familia de fuentes (por ejemplo: Arial, sans-serif):',
            supportFontFamily: 'Fuentes soportadas:',
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
            modifyConfigScopePrompt: 'Introduce el alcance de la configuración:\n0: Excluir este sitio\n1: Subdominio ({hostname})\n2: Dominio de primer nivel ({tld})\n3: Todos los sitios web\nAlcance actual: {scope}',
            saveConfig: 'Guardar configuración',
            saveConfigPending: 'Guardar configuración (cambios pendientes)',
            saveConfigConfirm: '¿Guardar configuración en {scope} [{target}]?',
            deleteConfigConfirm: '¿Eliminar configuración para {target}?',
            deleteBeforeScopeChangeConfirm: 'Antes de cambiar el alcance, ¿eliminar la configuración existente para {scope} [{target}]?',
            notConfigured: 'No configurado',
            invalidInput: '¡Entrada inválida, por favor introduce 0, 1, 2 o 3!',
            subdomain: 'Subdominio',
            topLevelDomain: 'Dominio de primer nivel',
            allWebsites: 'Todos los sitios web',
            excludeThisSite: 'Excluir este sitio',
            currentConfigScopeExcluded: 'Excluir este sitio ({hostname})',
        },
        pt: {
            setFontFamily: 'Definir família de fontes',
            setFontFamilyPrompt: 'Por favor, insira a família de fontes (por exemplo: Arial, sans-serif):',
            supportFontFamily: 'Fontes suportadas:',
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
            modifyConfigScopePrompt: 'Insira o escopo da configuração:\n0: Excluir este site\n1: Subdomínio ({hostname})\n2: Domínio de nível superior ({tld})\n3: Todos os sites\nEscopo atual: {scope}',
            saveConfig: 'Salvar configuração',
            saveConfigPending: 'Salvar configuração (alterações pendentes)',
            saveConfigConfirm: 'Salvar configuração para {scope} [{target}]?',
            deleteConfigConfirm: 'Excluir configuração para {target}?',
            deleteBeforeScopeChangeConfirm: 'Antes de mudar o escopo, excluir a configuração existente para {scope} [{target}]?',
            notConfigured: 'Não configurado',
            invalidInput: 'Entrada inválida, por favor insira 0, 1, 2 ou 3!',
            subdomain: 'Subdomínio',
            topLevelDomain: 'Domínio de nível superior',
            allWebsites: 'Todos os sites',
            excludeThisSite: 'Excluir este site',
            currentConfigScopeExcluded: 'Excluir este site ({hostname})',
        }
    };

    const t = translations[lang] || translations.en;

    // --- 配置范围管理 ---
    const ConfigScopeManager = {
        scopeMap: { 0: 'excludeThisSite', 1: 'subdomain', 2: 'topLevelDomain', 3: 'allWebsites' },

        initKeys() {
            this.subdomainKey = `${Constants.BASE_STORAGE_KEY}_${window.location.hostname}`;
            this.topLevelKey = `${Constants.BASE_STORAGE_KEY}_${Utils.getTopLevelDomain()}`;
            this.excludedKey = `${Constants.EXCLUDED_KEY}_${window.location.hostname}`;
        },

        getConfigKey() {
            this.initKeys();
            const scope = appState.targetScope;
            if (scope === 0) return this.excludedKey;
            if (scope === 1) return this.subdomainKey;
            if (scope === 2) return this.topLevelKey;
            return Constants.GLOBAL_DEFAULT_KEY;
        },

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

        getScopeText(scope) {
            if (scope === 0) return t.excludeThisSite;
            return scope === 1 ? t.subdomain : scope === 2 ? t.topLevelDomain : t.allWebsites;
        },

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

        getConfigScopeDisplayText() {
            const effectiveScope = this.getEffectiveScope();
            const currentScopeText = this.getScopeText(effectiveScope);
            const pendingScope = appState.pendingScopeChange;
            if (pendingScope !== null && pendingScope !== effectiveScope) {
                const targetScopeText = this.getScopeText(pendingScope);
                return `${currentScopeText} -> ${targetScopeText}`;
            }
            return currentScopeText;
        },

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
            log(`删除配置: ${target}`);
            return true;
        }
    };

    // --- 配置管理 ---
    const ConfigManager = {
        loadConfig() {
            ConfigScopeManager.initKeys();
            let config = GM_getValue(ConfigScopeManager.excludedKey, null);
            let effectiveScope = 0;
            let configKey = ConfigScopeManager.excludedKey;

            if (config && config.excluded) {
                appState.isExcludedSite = true;
                appState.currentAdjustment = 0;
                appState.currentFontFamily = 'none';
                appState.dynamicAdjustment = false;
                appState.intervalSeconds = 0;
                appState.firstAdjustmentTime = 0;
                appState.excludedSelectors = ['img', 'i', 'code', 'code *'];
                appState.targetScope = 0;
                log('加载排除站点配置');
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
            appState.fontIncrement = config.increment || 1;
            appState.currentFontFamily = config.fontFamily || 'none';
            appState.currentAdjustment = config.resize || 0;
            appState.dynamicAdjustment = config.watcher || false;
            appState.intervalSeconds = config.timer || 0;
            appState.firstAdjustmentTime = config.firstTime || 0;
            appState.excludedSelectors = Array.isArray(config.excludedSelectors) && config.excludedSelectors.length > 0
                ? config.excludedSelectors
                : ['img', 'i', 'code', 'code *'];
            appState.targetScope = effectiveScope;

            if (enableLogging) {
                const scopeText = ConfigScopeManager.getScopeText(effectiveScope);
                const target = effectiveScope === 0 ? window.location.hostname :
                    effectiveScope === 1 ? window.location.hostname :
                        effectiveScope === 2 ? `*.${Utils.getTopLevelDomain().replace(/^\./, '')}` : t.allWebsites;

                const storageKeys = [
                    ConfigScopeManager.excludedKey,
                    ConfigScopeManager.subdomainKey,
                    ConfigScopeManager.topLevelKey,
                    'NiceFont_panelPosition',
                    'NiceFont_closeCount',
                    'NiceFont_lastCloseTime',
                    'NiceFont_autoOpenPageMenu',
                    'NiceFont_version',
                    'NiceFont_language',
                    'NiceFont_panelType',
                ];

                const storageValues = {};
                storageKeys.forEach(key => {
                    const value = GM_getValue(key, null);
                    storageValues[key] = value !== null ? value : '未设置';
                });

                const configDetails = {
                    source: {
                        scope: scopeText,
                        target: target,
                        key: configKey
                    },
                    settings: config,
                    storage: storageValues
                };

                log('加载配置详情:', configDetails);
            }
        },

        saveConfig() {
            let scope = appState.pendingScopeChange !== null ? appState.pendingScopeChange : appState.targetScope;

            if (!appState.isConfigModified && appState.pendingScopeChange === null) {
                scope = appState.targetScope;
            }

            if (![0, 1, 2, 3].includes(scope)) {
                console.warn('[NiceFont] 无效的 scope 值:', scope, '使用默认 scope=1');
                scope = 1;
            }

            const scopeText = ConfigScopeManager.getScopeText(scope);
            const target = scope === 0 ? window.location.hostname :
                scope === 1 ? window.location.hostname :
                    scope === 2 ? `*.${Utils.getTopLevelDomain().replace(/^\./, '')}` : t.allWebsites;
            const confirmMessage = scope === 3 ?
                t.saveConfigConfirm.replace('{scope}', scopeText).replace(' [{target}]', '') :
                t.saveConfigConfirm.replace('{scope}', scopeText).replace('{target}', target);

            if (confirm(confirmMessage)) {
                ConfigScopeManager.initKeys();
                const key = scope === 0 ? ConfigScopeManager.excludedKey :
                    scope === 1 ? ConfigScopeManager.subdomainKey :
                        scope === 2 ? ConfigScopeManager.topLevelKey : Constants.GLOBAL_DEFAULT_KEY;

                if (scope === 0) {
                    GM_setValue(key, { excluded: true });
                    appState.isExcludedSite = true;
                    appState.currentAdjustment = 0;
                    appState.currentFontFamily = 'none';
                    appState.dynamicAdjustment = false;
                    appState.intervalSeconds = 0;
                    appState.firstAdjustmentTime = 0;
                    FontManager.restoreFont(document.body);
                    log(`保存排除站点配置: ${target}`);
                } else {
                    const config = {
                        increment: appState.fontIncrement,
                        resize: appState.currentAdjustment,
                        watcher: appState.dynamicAdjustment,
                        timer: appState.intervalSeconds,
                        fontFamily: appState.currentFontFamily,
                        firstTime: appState.firstAdjustmentTime,
                        excludedSelectors: appState.excludedSelectors
                    };
                    GM_setValue(key, config);
                    appState.isExcludedSite = false;
                    log(`保存配置到: ${target} (scope=${scope}, key=${key})`);
                }

                appState.isConfigModified = false;
                appState.targetScope = scope;
                appState.pendingScopeChange = null;
                ConfigManager.loadConfig();
                UIManager.updateUI();
            } else {
                log('用户取消保存配置');
            }
        },

        changeConfigScope() {
            const effectiveScope = ConfigScopeManager.getEffectiveScope();
            const currentScopeText = ConfigScopeManager.getScopeText(effectiveScope);
            const input = prompt(
                t.modifyConfigScopePrompt
                    .replace('{scope}', currentScopeText)
                    .replace('{hostname}', window.location.hostname)
                    .replace('{tld}', `*.${Utils.getTopLevelDomain().replace(/^\./, '')}`),
                appState.targetScope
            );
            const newScope = parseInt(input, 10);
            if (![0, 1, 2, 3].includes(newScope)) {
                if (input !== null) alert(t.invalidInput);
                return;
            }
            if (newScope === effectiveScope) {
                log(`新范围与当前范围相同: ${ConfigScopeManager.scopeMap[newScope]}`);
                return;
            }
            ConfigScopeManager.initKeys();
            const hasConfig = effectiveScope === 0 ? !!GM_getValue(ConfigScopeManager.excludedKey, null) :
                effectiveScope === 1 ? Object.keys(GM_getValue(ConfigScopeManager.subdomainKey, {})).length > 0 :
                    effectiveScope === 2 ? Object.keys(GM_getValue(ConfigScopeManager.topLevelKey, {})).length > 0 :
                        Object.keys(GM_getValue(Constants.GLOBAL_DEFAULT_KEY, {})).length > 0;

            if (newScope > effectiveScope && hasConfig) {
                const confirmMessage = effectiveScope === 3 ?
                    `${t.currentConfigScope}: ${ConfigScopeManager.getCurrentConfigText()}\n${t.deleteBeforeScopeChangeConfirm.replace('{scope}', ConfigScopeManager.getScopeText(effectiveScope)).replace(' [{target}]', '')}` :
                    `${t.currentConfigScope}: ${ConfigScopeManager.getCurrentConfigText()}\n${t.deleteBeforeScopeChangeConfirm.replace('{scope}', ConfigScopeManager.getScopeText(effectiveScope)).replace('{target}', ConfigScopeManager.getCurrentConfigText())}`;
                if (confirm(confirmMessage)) {
                    ConfigScopeManager.deleteConfig(effectiveScope);
                    appState.pendingScopeChange = newScope;
                    appState.targetScope = newScope;
                    appState.isConfigModified = true;
                    UIManager.updateUI();
                    log(`标记范围更改为: ${ConfigScopeManager.scopeMap[newScope]}`);
                }
            } else {
                appState.pendingScopeChange = newScope;
                appState.targetScope = newScope;
                appState.isConfigModified = true;
                UIManager.updateUI();
                log(`标记范围更改为: ${ConfigScopeManager.scopeMap[newScope]}`);
            }
        },

        deleteCurrentConfig() {
            const effectiveScope = ConfigScopeManager.getEffectiveScope();
            const scopeText = ConfigScopeManager.getScopeText(effectiveScope);
            const target = ConfigScopeManager.getCurrentConfigText();

            if (target === t.notConfigured) {
                log('无配置可删除');
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
                if (!appState.isExcludedSite) {
                    FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                }
                UIManager.updateUI();
                log('配置已删除，targetScope 设置为 1');
                return true;
            }
            return false;
        }
    };

    // --- 字体管理 ---
    const FontManager = {
        supportFonts: [
            'custom', 'auto', 'none', 'Arial', 'cursive', 'fangsong', 'fantasy', 'monospace',
            'sans-serif', 'serif', 'system-ui', 'ui-monospace', 'ui-rounded', 'ui-sans-serif',
            'ui-serif', '-webkit-body', 'inherit', 'initial', 'unset', 'Verdana', 'Helvetica',
            'Tahoma', 'Times New Roman', 'Georgia', 'Courier New', 'Comic Sans MS'
        ],
        styleCache: new WeakMap(),

        getCachedStyle(el) {
            if (!this.styleCache.has(el)) {
                this.styleCache.set(el, window.getComputedStyle(el));
            }
            return this.styleCache.get(el);
        },

        updateExcludedSelectors(selectors) {
            try {
                document.querySelector(selectors);
                const uniqueSelectors = [...new Set(
                    selectors.split(',')
                        .map(s => s.trim())
                        .filter(s => s)
                )];
                appState.excludedSelectors = uniqueSelectors;
                log(`更新排除选择器: ${uniqueSelectors.join(', ')}`);
                return true;
            } catch (e) {
                console.error('[NiceFont] 无效的选择器:', selectors, e);
                return false;
            }
        },

        isExcludedElement(el) {
            return appState.excludedSelectors.some(selector => el.matches(selector));
        },

        traverseDOM(el, callback) {
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
                        const font = appState.currentFontFamily;
                        if (font !== 'none') {
                            iframeDoc.documentElement.style.setProperty('font-family', font, 'important');
                        } else {
                            iframeDoc.documentElement.style.removeProperty('font-family');
                        }
                        this.traverseDOM(iframeDoc.body, callback);
                    }
                } catch (e) {
                    //console.error('[NiceFont] 访问 iframe 失败:', e);
                }
            }
            if (el.shadowRoot) {
                try {
                    Array.from(el.shadowRoot.querySelectorAll('*')).forEach(child => {
                        if (!this.isExcludedElement(child)) {
                            this.traverseDOM(child, callback);
                        }
                    });
                } catch (e) {
                    //console.error('[NiceFont] 处理 Shadow DOM 失败:', e);
                }
            }
            Array.from(el.children).forEach(child => requestAnimationFrame(() => this.traverseDOM(child, callback)));
        },

        applyFontRecursively(el, increment) {
            if (appState.isExcludedSite) return;
            const font = appState.currentFontFamily;
            this.traverseDOM(el, (node) => {
                const style = this.getCachedStyle(node);
                const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
                if (Utils.hasVisibleText(node) && isVisible) {
                    let currentFontSize = node.style.fontSize || style.fontSize;
                    if (!node.hasAttribute('data-default-fontsize')) {
                        node.setAttribute('data-default-fontsize', currentFontSize);
                    }
                    const baseFontSize = parseFloat(Utils.convertToPx(node, node.getAttribute('data-default-fontsize')));
                    if (!isNaN(baseFontSize)) {
                        node.style.setProperty('font-size', `${baseFontSize + increment}px`, 'important');
                    }
                    if (font !== 'none') {
                        node.style.setProperty('font-family', font, 'important');
                    } else {
                        node.style.removeProperty('font-family');
                    }
                }
            });
        },

        restoreFont(el) {
            appState.currentAdjustment = 0;
            appState.currentFontFamily = 'none';
            appState.intervalSeconds = 0;
            appState.firstAdjustmentTime = 0;
            this.traverseDOM(el, (node) => {
                const defaultSize = node.getAttribute('data-default-fontsize');
                if (defaultSize) {
                    node.style.fontSize = defaultSize;
                    node.removeAttribute('data-default-fontsize');
                } else {
                    node.style.removeProperty('font-size');
                }
                node.style.removeProperty('font-family');
                this.styleCache.delete(node);
            });
        },

        changeFontSize(increment) {
            if (appState.isExcludedSite) return;
            appState.currentAdjustment = appState.currentAdjustment + increment;
            this.applyFontRecursively(document.body, appState.currentAdjustment);
            appState.isConfigModified = true;
            UIManager.updateUI();
            log(`字体大小调整: ${increment}px, 当前: ${appState.currentAdjustment}px`);
        }
    };

    // --- 界面管理 ---
    const UIManager = {
        menuHandles: [],
        panelCache: null,

        getCommandsConfig() {
            const commands = [
                {
                    id: 'setFontFamily',
                    getText: () => `🔠 ${t.setFontFamily}: ${appState.currentFontFamily}`,
                    action: () => {
                        if (appState.panelType === 'pluginPanel') {
                            const input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${FontManager.supportFonts.join(', ')}`, appState.currentFontFamily === 'none' ? '' : appState.currentFontFamily);
                            if (input && input.trim()) {
                                const newFont = input.trim();
                                appState.currentFontFamily = newFont;
                                if (!FontManager.supportFonts.includes(newFont)) {
                                    FontManager.supportFonts.splice(FontManager.supportFonts.length - 1, 0, newFont);
                                }
                                FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                                appState.isConfigModified = true;
                                UIManager.updateUI();
                                log(`字体类型设置为: ${newFont}`);
                            } else {
                                log('取消字体输入');
                            }
                        } else {
                            let select = UIManager.panelCache?.shadowRoot?.querySelector('#NiceFont_font-family');
                            if (select) {
                                select.remove();
                                document.removeEventListener('click', UIManager.closeDropdown);
                                UIManager.closeDropdown = null;
                                log('移除现有字体下拉菜单');
                                return;
                            }
                            select = document.createElement('select');
                            select.id = 'NiceFont_font-family';
                            select.className = 'font-family-select';
                            select.innerHTML = FontManager.supportFonts.map(font =>
                                `<option value="${font}" ${font === appState.currentFontFamily ? 'selected' : ''}>${font === 'custom' ? (lang === 'zh' ? '手动输入' : 'Custom Input') : font}</option>`
                            ).join('');
                            const btn = UIManager.panelCache?.shadowRoot?.querySelector('#NiceFont_setFontFamily');
                            if (btn) {
                                btn.appendChild(select);
                                select.focus();
                                select.addEventListener('click', e => e.stopPropagation());
                                select.addEventListener('change', (e) => {
                                    const selectedFont = e.target.value;
                                    if (selectedFont === 'custom') {
                                        const input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${FontManager.supportFonts.slice(0, -1).join(', ')}`, '');
                                        if (input && input.trim()) {
                                            const newFont = input.trim();
                                            if (!FontManager.supportFonts.includes(newFont)) {
                                                FontManager.supportFonts.splice(FontManager.supportFonts.length - 1, 0, newFont);
                                                const option = document.createElement('option');
                                                option.value = newFont;
                                                option.textContent = newFont;
                                                select.insertBefore(option, select.lastChild);
                                            }
                                            appState.currentFontFamily = newFont;
                                            select.value = newFont;
                                        } else {
                                            select.value = appState.currentFontFamily;
                                            select.remove();
                                            document.removeEventListener('click', UIManager.closeDropdown);
                                            UIManager.closeDropdown = null;
                                            log('取消自定义字体输入');
                                            return;
                                        }
                                    } else {
                                        appState.currentFontFamily = selectedFont;
                                    }
                                    FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                                    appState.isConfigModified = true;
                                    UIManager.updateUI();
                                    select.remove();
                                    document.removeEventListener('click', UIManager.closeDropdown);
                                    UIManager.closeDropdown = null;
                                    log(`字体类型设置为: ${appState.currentFontFamily}`);
                                });
                                UIManager.closeDropdown = (event) => {
                                    if (!select.contains(event.target) && !btn.contains(event.target)) {
                                        select.remove();
                                        document.removeEventListener('click', UIManager.closeDropdown);
                                        UIManager.closeDropdown = null;
                                        log('下拉菜单关闭');
                                    }
                                };
                                document.addEventListener('click', UIManager.closeDropdown);
                                log('字体下拉菜单创建并显示');
                            }
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
                        appState.isConfigModified = true;
                        UIManager.updateUI();
                        log('恢复字体');
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
                        if (!isNaN(secs)) {
                            appState.firstAdjustmentTime = secs;
                            if (secs > 0) {
                                appState.intervalSeconds = 0;
                                appState.dynamicAdjustment = false;
                                log(`首次调整设置为: ${secs}s`);
                                appState.isConfigModified = true;
                            }
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
                    id: 'timer-adjustment',
                    getText: () => {
                        const statusIcon = appState.intervalSeconds > 0 ? Constants.ENABLED_ICON : Constants.DISABLED_ICON;
                        const timeText = appState.intervalSeconds > 0 ? `【${appState.intervalSeconds}s】` : '';
                        return `⏱️ ${t.timerAdjustment}: ${statusIcon}${timeText}`;
                    },
                    action: () => {
                        const input = prompt(t.timerPrompt, appState.intervalSeconds.toString());
                        const secs = parseInt(input, 10);
                        if (!isNaN(secs)) {
                            appState.intervalSeconds = secs;
                            if (secs > 0) {
                                appState.firstAdjustmentTime = 0;
                                appState.dynamicAdjustment = false;
                                log(`定时调整设置为: ${secs}s`);
                                appState.isConfigModified = true;
                            }
                            if (this.panelCache) {
                                this.updatePanelContent();
                            }
                        } else {
                            appState.intervalSeconds = 0;
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
                                appState.intervalSeconds = 0;
                                log('动态调整启用');
                                appState.isConfigModified = true;
                            }
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
                        const maxDisplayLength = 23;
                        const selectors = Array.isArray(appState.excludedSelectors) ? appState.excludedSelectors : ['img', 'i', 'code', 'code *'];
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
                                FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                                appState.isConfigModified = true;
                                UIManager.updateUI();
                                log(`排除元素设置为: ${input}`);
                            } else {
                                alert(t.invalidSelectorAlert);
                            }
                        }
                    },
                    title: appState.excludedSelectors,
                    displayInPluginPanel: true,
                    displayInFloatingPanel: true
                },
                // 当前版本存在BUG，临时禁用浮动面板菜单
                /*{
                    id: 'switch-panel',
                    getText: () => `🎨 ${t.switchPanel}: ${appState.panelType === 'pluginPanel' ? t.pluginPanel : t.floatingPanel}`,
                    action: () => {
                        const newPanelType = appState.panelType === 'pluginPanel' ? 'floatingPanel' : 'pluginPanel';
                        if (newPanelType === 'floatingPanel') {
                            const shouldAutoOpen = confirm(t.autoOpenFloatingPanelPrompt);
                            GM_setValue('NiceFont_autoOpenPageMenu', !shouldAutoOpen);
                            log(`设置 NiceFont_autoOpenPageMenu: ${!shouldAutoOpen}`);
                        }
                        GM_setValue(Constants.PANEL_TYPE_KEY, newPanelType);
                        appState.panelType = newPanelType;
                        if (this.panelCache) {
                            this.panelCache.remove();
                            this.panelCache = null;
                            log('移除现有浮动面板');
                        }
                        if (newPanelType === 'floatingPanel') {
                            this.createFloatingPanel();
                            if (this.panelCache && this.panelCache.shadowRoot) {
                                const shadow = this.panelCache.shadowRoot;
                                const panelContainer = shadow.querySelector('div');
                                if (panelContainer) {
                                    if (!ConfigScopeManager.hasConfig() && !GM_getValue('NiceFont_autoOpenPageMenu', false)) {
                                        panelContainer.style.display = 'block';
                                        appState.isAutoOpened = true;
                                        log('直接创建并显示浮动面板（切换到网页菜单模式），isAutoOpened=true');
                                    }
                                }
                            } else {
                                console.error('[NiceFont] panelCache 或 shadowRoot 未正确初始化，面板显示失败');
                            }
                        }
                        UIManager.updateUI();
                        log(`切换到面板类型: ${newPanelType}`);
                    },
                    displayInPluginPanel: false, 
                    displayInFloatingPanel: false
                },*/
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
                    log(`执行插件菜单命令: ${cmd.id}`);
                    this.updatePluginPanel();
                }, { autoClose: cmd.autoClose, title: cmd.title });
                this.menuHandles.push(handle);
            });
        },

        updatePanelContent() {
            if (!this.panelCache || !this.panelCache.shadowRoot) {
                log('panelCache 或 shadowRoot 不存在，跳过更新内容');
                return;
            }
            const scriptName = lang === 'zh' ? GM_info.script.name : 'NiceFont';

            const shadow = this.panelCache.shadowRoot;
            const headerDiv = shadow.querySelector('.NiceFont_header > div');
            if (headerDiv) {
                headerDiv.textContent = scriptName;
            } else {
                console.error('[NiceFont] 未找到 .NiceFont_header > div，无法更新标题');
            }

            const contentContainer = shadow.querySelector('.NiceFont_content');
            if (contentContainer) {
                contentContainer.innerHTML = this.getCommandsConfig()
                    .filter(cmd => cmd.displayInFloatingPanel && (!appState.isExcludedSite || ['currentConfigScope', 'config-scope', 'save-config'].includes(cmd.id)))
                    .map(cmd => {
                        const text = cmd.getText();
                        return `<div class="action-btn" id="NiceFont_${cmd.id}">${text}</div>`;
                    })
                    .join('');
                log('面板内容更新成功');
            } else {
                console.error('[NiceFont] 未找到 .NiceFont_content，无法更新内容');
            }
        },

        createFloatingPanel() {
            if (this.closeDropdown) {
                document.removeEventListener('click', this.closeDropdown);
                this.closeDropdown = null;
                log('清理 closeDropdown 事件监听器（创建新面板）');
            }
            let existingPanel = document.querySelector('nicefont-panel');
            if (existingPanel && existingPanel.shadowRoot) {
                log('nicefont-panel 已存在，跳过创建');
                this.panelCache = existingPanel;
                return;
            }

            if (this.panelCache) {
                this.panelCache.remove();
                this.panelCache = null;
                log('清理现有 panelCache');
            }

            const scriptName = lang === 'zh' ? GM_info.script.name : 'NiceFont';
            const savedPosition = GM_getValue('NiceFont_panelPosition', { top: '50px', right: '20px' });

            this.panelCache = document.createElement('nicefont-panel');
            this.panelCache.id = 'NiceFont_panel';
            this.panelCache.setAttribute('data-nicefont-panel', 'true');
            const shadow = this.panelCache.attachShadow({ mode: 'open' });

            const panelContainer = document.createElement('div');
            panelContainer.style.cssText = `
                position: fixed;
                top: ${savedPosition.top};
                right: ${savedPosition.right};
                left: auto;
                width: 300px;
                background: #fff;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                z-index: 10001;
                font-family: sans-serif !important;
                font-size: 15px !important;
                user-select: none;
                display: none;
            `;
            panelContainer.innerHTML = `
                <div class="NiceFont_header" style="display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 10002;">
                    <div style="font-size: 16px; text-align: left; flex-grow: 1; cursor: grab; margin: 5px; font-weight: bold;">${scriptName}</div>
                    <button class="NiceFont_close-btn" id="NiceFont_close-btn" style="border: none; border-radius: 3px; padding: 1px 6px; cursor: pointer; line-height: 16px; font-size: 12px; background: none; color: #000;">✖️</button>
                </div>
                <div class="NiceFont_content"></div>
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                :host {
                    display: block;
                }
                div {
                    font-family: sans-serif !important;
                    font-size: 15px !important;
                }
                .NiceFont_header > div {
                    font-size: 16px !important;
                    font-weight: bold;
                    text-align: left;
                    flex-grow: 1;
                    cursor: grab;
                    margin: 5px;
                }
                .NiceFont_close-btn {
                    border: none;
                    border-radius: 3px;
                    padding: 1px 6px;
                    cursor: pointer;
                    line-height: 16px;
                    font-size: 12px;
                    background: none;
                    color: #000;
                }
                .NiceFont_close-btn:hover {
                    text-decoration: underline;
                }
                .action-btn {
                    display: block;
                    padding: 2px;
                    border-radius: 3px;
                    cursor: pointer;
                    text-align: left;
                    font-size: 15px !important;
                    font-weight: bold;
                }
                .action-btn:hover {
                    text-decoration: underline;
                }
                #NiceFont_set-font-size-btn {
                    padding: 2px;
                    text-decoration: none !important;
                }
                .font-family-select {
                    display: inline-block;
                    width: auto;
                    padding: 2px;
                    margin-left: 5px;
                    border: 1px solid #ddd;
                    border-radius: 3px;
                    font-size: 14px;
                    vertical-align: middle;
                }
            `;
            shadow.appendChild(styleSheet);
            shadow.appendChild(panelContainer);

            this.updatePanelContent();

            try {
                document.documentElement.appendChild(this.panelCache);
                log('浮动面板创建并添加到 document.documentElement');
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
                log('面板持久性检查已清理');
            }
        },

        ensurePanelPersistence() {
            if (appState.panelType !== 'floatingPanel') {
                log('插件菜单模式，无需确保面板持久性');
                return;
            }
            this.persistenceInterval = setInterval(() => {
                if (appState.panelType !== 'floatingPanel') {
                    clearInterval(this.persistenceInterval);
                    this.persistenceInterval = null;
                    log('切换到插件菜单模式，停止面板持久性检查');
                    return;
                }
                if (!this.panelCache || !(this.panelCache instanceof Node) || !document.documentElement.contains(this.panelCache)) {
                    log('检测到面板无效或被移除，重新创建');
                    this.createFloatingPanel();
                    if (this.panelCache && this.panelCache instanceof Node) {
                        try {
                            document.documentElement.appendChild(this.panelCache);
                            this.updatePanelContent();
                            const shadow = this.panelCache.shadowRoot;
                            const panelContainer = shadow.querySelector('div');
                            if (panelContainer && appState.isAutoOpened) {
                                panelContainer.style.display = 'block';
                                log('面板重新显示，isAutoOpened=true');
                            }
                        } catch (e) {
                            this.panelCache = null;
                        }
                    }
                }
            }, 1000);
            log('面板持久性检查已启用');
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

            header.addEventListener('mousedown', (e) => {
                if (e.target.classList.contains('NiceFont_close-btn')) return;
                isDragging = true;
                initialX = e.clientX + parseFloat(panelContainer.style.right || '0');
                initialY = e.clientY - parseFloat(panelContainer.style.top || '0');
                header.style.cursor = 'grabbing';
                log('开始拖拽');
                e.preventDefault();
                e.stopPropagation();
            }, { capture: true, passive: false });

            document.addEventListener('mousemove', (e) => {
                if (isDragging) {
                    e.preventDefault();
                    if (rafId) cancelAnimationFrame(rafId);
                    rafId = requestAnimationFrame(() => {
                        const rect = panelContainer.getBoundingClientRect();
                        let newX = initialX - e.clientX + window.scrollX;
                        let newY = e.clientY - initialY + window.scrollY;
                        newX = Math.max(0, Math.min(newX, window.innerWidth - rect.width));
                        newY = Math.max(0, Math.min(newY, window.innerHeight - rect.height));
                        panelContainer.style.right = `${newX}px`;
                        panelContainer.style.top = `${newY}px`;
                        panelContainer.style.left = 'auto';
                    });
                }
            }, { capture: true, passive: false });

            document.addEventListener('mouseup', (e) => {
                if (isDragging) {
                    isDragging = false;
                    header.style.cursor = 'grab';
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    GM_setValue('NiceFont_panelPosition', {
                        top: panelContainer.style.top,
                        right: panelContainer.style.right
                    });
                    log('拖拽结束, 面板位置保存:', panelContainer.style.top, panelContainer.style.right);
                    e.stopPropagation();
                }
            }, { capture: true, passive: false });

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
                const btn = e.target.closest('.action-btn');
                if (btn) {
                    const command = this.getCommandsConfig().find(c => c.id === btn.id.replace('NiceFont_', ''));
                    if (command && command.id !== 'increase' && command.id !== 'decrease') {
                        log(`执行命令: ${command.id}`);
                        command.action();
                    }
                }
                if (e.target.id === 'NiceFont_close-btn') {
                    panelContainer.style.display = 'none';
                    appState.isAutoOpened = false;
                    log(`面板关闭，isAutoOpened=false`);
                }
                e.stopPropagation();
            }, { capture: false });
        },

        togglePanel() {
            if (appState.panelType !== 'floatingPanel') {
                log('非浮动面板模式，忽略 togglePanel');
                return;
            }
            if (!this.panelCache || !document.documentElement.contains(this.panelCache)) {
                log('panelCache 不存在或未附加到 DOM，尝试重新创建');
                this.createFloatingPanel();
                if (!this.panelCache) {
                    console.error('[NiceFont] 面板创建失败，检查 createFloatingPanel');
                    return;
                }
            }

            const shadow = this.panelCache.shadowRoot;
            const panelContainer = shadow.querySelector('div');
            const isHidden = panelContainer.style.display === 'none';
            const display = isHidden ? 'block' : 'none';
            panelContainer.style.display = display;
            appState.isAutoOpened = false;
            log(`面板显示状态: ${display}, isAutoOpened=false`);

            if (display === 'block') {
                this.updatePanelContent();
            } else {
                if (this.closeDropdown) {
                    document.removeEventListener('click', this.closeDropdown);
                    this.closeDropdown = null;
                    log('清理 closeDropdown 事件监听器（面板关闭）');
                }
            }
        },

        updateUI() {
            log('调用 updateUI 当前菜单面板:', appState.panelType);
            if (appState.panelType === 'pluginPanel') {
                this.updatePluginPanel();
                this.cleanupPersistence();
                if (this.panelCache) {
                    this.panelCache.remove();
                    this.panelCache = null;
                    log('移除浮动面板（切换到插件菜单）');
                }
                if (this.closeDropdown) {
                    document.removeEventListener('click', this.closeDropdown);
                    this.closeDropdown = null;
                    log('清理 closeDropdown 事件监听器（切换到插件菜单）');
                }
            } else {
                this.updatePluginPanel();
                if (this.panelCache && document.documentElement.contains(this.panelCache)) {
                    this.updatePanelContent();
                } else {
                    log('panelCache 不存在，等待 togglePanel 创建');
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


    // --- 初始化 ---
    /**
     * 初始化脚本
     */
    function init() {
        // 检查旧版本存储数据并清理（用于升级兼容）
        const oldVersion = GM_getValue('NiceFont_version', '0.0');
        const currentVersion = GM_info?.script?.version;
        if (oldVersion !== currentVersion) {
            let keys = GM_listValues();
            keys.forEach(key => {
                GM_deleteValue(key);
            });
            GM_setValue('NiceFont_version', currentVersion);
            log(`检测到版本升级: ${oldVersion} -> ${currentVersion}，清理旧存储并保存新版本`);
        }

        let panelType = GM_getValue(Constants.PANEL_TYPE_KEY, 'pluginPanel');
        appState.panelType = panelType;
        log(`面板类型设置为: ${panelType}`);

        ConfigManager.loadConfig();

        UIManager.updateUI();

        window.addEventListener('load', () => {
            if (appState.isExcludedSite) return;
            if (appState.currentAdjustment !== 0 || appState.currentFontFamily !== 'none') {
                if (appState.firstAdjustmentTime > 0) {
                    setTimeout(() => {
                        FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                        log('应用首次字体调整');
                    }, appState.firstAdjustmentTime * 1000);
                }
                if (appState.intervalSeconds > 0) {
                    appState.timer = setInterval(() => {
                        FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                    }, appState.intervalSeconds * 1000);
                    log(`定时调整启用: ${appState.intervalSeconds}s`);
                }
                if (appState.dynamicAdjustment) {
                    const nodeCount = document.body.getElementsByTagName('*').length;
                    const throttleTime = nodeCount > 10000 ? 200 : 100;
                    appState.observer = new MutationObserver(Utils.throttle(() => {
                        FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                    }, throttleTime));
                    appState.observer.observe(document.body, { childList: true, subtree: true });
                    FontManager.applyFontRecursively(document.body, appState.currentAdjustment);
                    log('动态调整启用');
                }
            }
        });

        if (appState.panelType === 'floatingPanel' && !ConfigScopeManager.hasConfig()) {
            const autoOpenPageMenu = GM_getValue('NiceFont_autoOpenPageMenu', false);
            if (!autoOpenPageMenu) {
                UIManager.createFloatingPanel();
                if (UIManager.panelCache) {
                    const shadow = UIManager.panelCache.shadowRoot;
                    const panelContainer = shadow.querySelector('div');
                    panelContainer.style.display = 'block';
                    appState.isAutoOpened = true;
                    log('无配置且浮动面板模式，自动显示菜单面板，isAutoOpened=true');
                }
            } else {
                log('自动弹出已禁用（NiceFont_autoOpenPageMenu=true）');
            }
        }

        log('脚本初始化完成');
    }

    init();
})();