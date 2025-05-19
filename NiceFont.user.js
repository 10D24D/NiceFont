// ==UserScript==
// @name         NiceFont
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
// @namespace    https://github.com/10D24D/NiceFont/
// @version      2.0
// @description  NiceFont: 修改页面字体的工具，“真正调整字体，而非页面缩放，拒绝将就！”。让字体更清晰、舒适！支持动态、定时调整字体大小和类型，记住你的设置，轻松优化每个网页的字体显示！
// @description:en NiceFont is a tool for modifying webpage fonts. "Adjust the font itself, not the page zoom. No compromises!" It makes the fonts clearer and more comfortable! Supports dynamic and timed adjustments for font size and type, remembers your settings, and easily optimizes the font display on every webpage!
// @description:zh-CN NiceFont: 修改页面字体的工具，“真正调整字体，而非页面缩放，拒绝将就！”。让字体更清晰、舒适！支持动态、定时调整字体大小和类型，记住你的设置，轻松优化每个网页的字体显示！
// @description:zh-TW NiceFont: 修改頁面字體的工具，“真正調整字體，而非頁面縮放，拒絕將就！”。讓字體更清晰、舒適！支持動態、定時調整字體大小和類型，記住你的設置，輕鬆優化每個網頁的字體顯示！
// @description:ko NiceFont: 페이지 글꼴을 수정하는 도구, "글꼴을 실제로 조정하고 페이지 확대/축소를 하지 않습니다. 타협하지 마세요!" 글꼴을 더 선명하고 편안하게 만듭니다! 동적 및 시간 기반 글꼴 크기와 유형 조정 지원, 설정을 기억하고 모든 웹페이지의 글꼴 표시를 쉽게 최적화합니다!
// @description:ja NiceFont: ページのフォントを変更するツール、「ページのズームではなくフォントを調整します。妥協しません！」フォントをよりクリアで快適に！動的およびタイマーでフォントのサイズとタイプを調整でき、設定を記憶して、各ウェブページのフォント表示を簡単に最適化します！
// @description:ru NiceFont — инструмент для изменения шрифтов на веб-страницах. "Настройте шрифт, а не масштаб страницы. Без компромиссов!" Делает шрифты более четкими и удобными! Поддерживает динамическую и по времени настройку размера и типа шрифта, запоминает ваши настройки и легко оптимизирует отображение шрифтов на каждой веб-странице!
// @description:fr NiceFont est un outil de modification des polices de pages web. "Ajustez la police elle-même, pas le zoom de la page. Pas de compromis!" Il rend les polices plus claires et confortables! Prend en charge les ajustements dynamiques et programmés de la taille et du type de police, se souvient de vos paramètres et optimise facilement l'affichage des polices sur chaque page web!
// @description:de NiceFont ist ein Tool zur Änderung der Schriftarten auf Webseiten. "Stellen Sie die Schriftart selbst ein, nicht den Seitenzoom. Keine Kompromisse!" Es macht die Schriftarten klarer und komfortabler! Unterstützt dynamische und zeitgesteuerte Anpassungen der Schriftgröße und des Schriftstils, merkt sich Ihre Einstellungen und optimiert die Schriftanzeige auf jeder Webseite problemlos!
// @description:es NiceFont es una herramienta para modificar las fuentes de las páginas web. "Ajusta la fuente en sí, no el zoom de la página. ¡Sin compromisos!" ¡Hace que las fuentes sean más claras y cómodas! Soporta ajustes dinámicos y programados del tamaño y tipo de fuente, recuerda tus configuraciones y optimiza fácilmente la visualización de fuentes en cada página web!
// @description:pt NiceFont é uma ferramenta para modificar as fontes das páginas da web. "Ajuste a fonte em si, não o zoom da página. Sem compromissos!" Torna as fontes mais claras e confortáveis! Suporta ajustes dinâmicos e temporizados do tamanho e tipo de fonte, lembra suas configurações e otimiza facilmente a exibição das fontes em cada página da web!
// @author       DD1024z
// @match        *://*/*
// @icon         https://raw.githubusercontent.com/10D24D/NiceFont/main/static/logo.png
// @license      Apache License 2.0
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// @grant        GM_info
// @downloadURL https://update.greasyfork.org/scripts/533232/NiceFont.user.js
// @updateURL   https://update.greasyfork.org/scripts/533232/NiceFont.meta.js
// ==/UserScript==

(function () {
    'use strict';

    // 日志开关（内部变量，固定为false）
    const enableLogging = false;

    // 自定义日志函数
    function log(...args) {
        if (enableLogging) {
            console.log(...args);
        }
    }

    if (window.top !== window.self) {
        log('NiceFont: 跳过iframe中的执行');
        return; // 不在顶层页面时直接退出脚本
    }

    log('NiceFont: 脚本正在初始化...');

    // 获取顶级域名（例如 .douban.com）
    function getTopLevelDomain() {
        const hostname = window.location.hostname;
        const parts = hostname.split('.');
        if (parts.length >= 2) {
            return `.${parts.slice(-2).join('.')}`;
        }
        return hostname;
    }

    const BASE_STORAGE_KEY = 'NiceFont_config'; // 基础存储键
    const GLOBAL_DEFAULT_KEY = 'NiceFont_global_default_config'; // 全局默认配置键
    const topLevelDomain = getTopLevelDomain();
    const hostname = window.location.hostname;
    const SUBDOMAIN_STORAGE_KEY = `${BASE_STORAGE_KEY}_${hostname}`; // 子域名存储键
    const TOPLEVEL_STORAGE_KEY = `${BASE_STORAGE_KEY}_${topLevelDomain}`; // 顶级域名存储键
    const PANEL_TYPE_KEY = 'NiceFont_panelType'; // 面板类型键

    // 配置作用范围（1: 子域名, 2: 顶级域名, 3: 所有网站）
    let configScope = 1; // 默认子域名
    let targetScope = 1; // 当前会话的目标作用范围，默认子域名
    const scopeMap = {
        1: 'subdomain',
        2: 'topLevelDomain',
        3: 'allWebsites'
    };

    let supportFonts = [
        'auto', 'Arial', 'cursive', 'emoji', 'fangsong', 'fantasy', 'math', 'monospace', 'none', 'sans-serif', 'serif',
        'system-ui', 'ui-monospace', 'ui-rounded', 'ui-sans-serif', 'ui-serif', '-webkit-body',
        'inherit', 'initial', 'revert', 'revert-layer', 'unset',
        'Verdana', 'Helvetica', 'Tahoma', 'Times New Roman', 'Georgia', 'Courier New', 'Comic Sans MS',
        'custom' // 手动输入选项
    ];

    // 多语言文本。支持汉语(zh)、英语(en)、韩语(ko)、日语(ja)、俄语(ru)、法语(fr)、德语(de)、西班牙语(es)、葡萄牙语(pt)
    const translations = {
        zh: {
            increase: '增大字体',
            decrease: '减小字体',
            reset: '重置字体',
            reapply: '应用字体变化',
            fontSizeAdjustment: '字体大小调整',
            setFontIncrement: '字体大小增量',
            setFontIncrementPrompt: '请输入字体增量（单位：像素）：',
            setFontIncrementErrorAlert: '请输入有效的增量值（大于0的整数）！',
            setFontFamily: '设置字体类型',
            setFontFamilyPrompt: '请输入字体类型',
            supportFontFamily: '支持的字体类型：',
            invalidFontFamilyAlert: '请输入有效的字体类型！',
            firstAdjustmentConfirm: '请输入首次调整时间（秒，0表示禁用）：',
            firstAdjustmentEnabled: '首次调整字体: ✔️',
            firstAdjustmentDisabled: '首次调整字体: ✖️',
            timerPrompt: '请输入定时调整间隔（秒，0表示禁用）：',
            timerAdjustmentEnabled: '定时调整字体: ✔️',
            timerAdjustmentDisabled: '定时调整字体: ✖️',
            dynamicWatchConfirm: '是否启用/禁用动态调整？',
            dynamicAdjustmentEnabled: '动态调整字体: ✔️',
            dynamicAdjustmentDisabled: '动态调整字体: ✖️',
            usageLanguage: '切换菜单语言',
            switchPanel: '切换菜单面板',
            tampermonkeyPanel: '油猴菜单',
            floatingPanel: '页面菜单',
            showPanel: '显示面板',
            configScope: '配置作用范围',
            subdomain: '子域名',
            topLevelDomain: '顶级域名',
            allWebsites: '所有网站',
            configScopePrompt: '请输入配置作用范围：\n1: 子域名 ({hostname})\n2: 顶级域名 ({tld})\n3: 所有网站\n当前范围: {scope}',
            invalidInput: '请输入有效的范围（1, 2， 或 3）！',
            currentConfigScope: '当前配置源于',
            notConfigured: '未配置',
            saveConfig: '保存配置',
            saveConfigPending: '保存配置（需确定）',
            saveConfigConfirm: '确定保存配置到：{scope} [{target}]？',
            deleteConfigConfirm: '确定删除当前配置吗？（将删除：{scope} [{target}]）',
            deleteBeforeScopeChangeConfirm: '更改为更广的作用范围需要先删除当前配置。\n确定删除当前配置吗？（将删除：{scope} [{target}]）'
        },
        en: {
            increase: 'Increase Font',
            decrease: 'Decrease Font',
            reset: 'Reset Font',
            reapply: 'Apply Font Changes',
            fontSizeAdjustment: 'Font Size Adjustment',
            setFontIncrement: 'Font Size Increment',
            setFontIncrementPrompt: 'Enter font increment (pixels):',
            setFontIncrementErrorAlert: 'Please enter a valid increment value (positive integer)!',
            setFontFamily: 'Set Font Family',
            setFontFamilyPrompt: 'Enter font family',
            supportFontFamily: 'Supported font families:',
            invalidFontFamilyAlert: 'Please enter a valid font family!',
            firstAdjustmentConfirm: 'Enter first adjustment time (seconds, 0 to disable):',
            firstAdjustmentEnabled: 'First Font Adjustment: ✔️',
            firstAdjustmentDisabled: 'First Font Adjustment: ✖️',
            timerPrompt: 'Enter timer adjustment interval (seconds, 0 to disable):',
            timerAdjustmentEnabled: 'Timer Font Adjustment: ✔️',
            timerAdjustmentDisabled: 'Timer Font Adjustment: ✖️',
            dynamicWatchConfirm: 'Enable/Disable dynamic adjustment?',
            dynamicAdjustmentEnabled: 'Dynamic Font Adjustment: ✔️',
            dynamicAdjustmentDisabled: 'Dynamic Font Adjustment: ✖️',
            usageLanguage: 'Switch Menu Language',
            switchPanel: 'Switch Menu Panel',
            tampermonkeyPanel: 'Tampermonkey Menu',
            floatingPanel: 'Page Menu',
            showPanel: 'Show Panel',
            configScope: 'Config Scope',
            subdomain: 'Subdomain',
            topLevelDomain: 'Top-Level Domain',
            allWebsites: 'All Websites',
            configScopePrompt: 'Enter config scope:\n1: Subdomain ({hostname})\n2: Top-Level Domain ({tld})\n3: All Websites\nCurrent scope: {scope}',
            invalidInput: 'Please enter a valid scope (1, 2, or 3)!',
            currentConfigScope: 'Current Config Scope',
            notConfigured: 'Not Configured',
            saveConfig: 'Save Config',
            saveConfigPending: 'Save Config (Pending)',
            saveConfigConfirm: 'Save configuration to: {scope} [{target}]?',
            deleteConfigConfirm: 'Are you sure to delete the current configuration? (Will delete: {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: 'Changing to a broader scope requires deleting the current configuration.\nAre you sure to delete the current configuration? (Will delete: {scope} [{target}])'
        },
        ko: {
            increase: '글꼴 확대',
            decrease: '글꼴 축소',
            reset: '글꼴 초기화',
            reapply: '글꼴 변경 적용',
            fontSizeAdjustment: '글꼴 크기 조정',
            setFontIncrement: '글꼴 크기 증가량',
            setFontIncrementPrompt: '글꼴 증가량을 입력하세요 (단위: 픽셀):',
            setFontIncrementErrorAlert: '유효한 증가량 값(0보다 큰 정수)을 입력하세요!',
            setFontFamily: '글꼴 종류 설정',
            setFontFamilyPrompt: '글꼴 종류를 입력하세요',
            supportFontFamily: '지원되는 글꼴 종류:',
            invalidFontFamilyAlert: '유효한 글꼴 종류를 입력하세요!',
            firstAdjustmentConfirm: '첫 조정 시간 입력 (초, 0은 비활성화):',
            firstAdjustmentEnabled: '첫 글꼴 조정: ✔️',
            firstAdjustmentDisabled: '첫 글꼴 조정: ✖️',
            timerPrompt: '타이머 조정 간격 입력 (초, 0은 비활성화):',
            timerAdjustmentEnabled: '타이머 글꼴 조정: ✔️',
            timerAdjustmentDisabled: '타이머 글꼴 조정: ✖️',
            dynamicWatchConfirm: '동적 조정을 활성화/비활성화 하시겠습니까?',
            dynamicAdjustmentEnabled: '동적 글꼴 조정: ✔️',
            dynamicAdjustmentDisabled: '동적 글꼴 조정: ✖️',
            usageLanguage: '메뉴 언어 전환',
            switchPanel: '메뉴 패널 전환',
            tampermonkeyPanel: '탬퍼몽키 메뉴',
            floatingPanel: '페이지 메뉴',
            showPanel: '패널 표시',
            configScope: '설정 범위',
            subdomain: '서브도메인',
            topLevelDomain: '최상위 도메인',
            allWebsites: '모든 웹사이트',
            configScopePrompt: '설정 범위를 입력하세요:\n1: 서브도메인 ({hostname})\n2: 최상위 도메인 ({tld})\n3: 모든 웹사이트\n현재 범위: {scope}',
            invalidInput: '유효한 범위(1, 2, 또는 3)를 입력하세요!',
            currentConfigScope: '현재 설정 범위',
            notConfigured: '설정되지 않음',
            saveConfig: '설정 저장',
            saveConfigPending: '설정 저장 (확인 필요)',
            saveConfigConfirm: '설정을 다음에 저장: {scope} [{target}]?',
            deleteConfigConfirm: '현재 설정을 삭제하시겠습니까? (삭제: {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: '더 넓은 범위로 변경하려면 현재 설정을 삭제해야 합니다.\n현재 설정을 삭제하시겠습니까? (삭제: {scope} [{target}])'
        },
        ja: {
            increase: 'フォントを大きくする',
            decrease: 'フォントを小さくする',
            reset: 'フォントをリセット',
            reapply: 'フォントの変更を適用',
            fontSizeAdjustment: 'フォントサイズの調整',
            setFontIncrement: 'フォントサイズの増分',
            setFontIncrementPrompt: 'フォントの増分を入力してください（単位：ピクセル）：',
            setFontIncrementErrorAlert: '有効な増分値（0より大きい整数）を入力してください！',
            setFontFamily: 'フォントの種類を設定',
            setFontFamilyPrompt: 'フォントの種類を入力してください',
            supportFontFamily: 'サポートされているフォントの種類：',
            invalidFontFamilyAlert: '有効なフォントの種類を入力してください！',
            firstAdjustmentConfirm: '初回調整時間を入力してください（秒、0で無効）：',
            firstAdjustmentEnabled: '初回フォント調整：✔️',
            firstAdjustmentDisabled: '初回フォント調整：✖️',
            timerPrompt: 'タイマー調整間隔を入力してください（秒、0で無効）：',
            timerAdjustmentEnabled: 'タイマーフォント調整：✔️',
            timerAdjustmentDisabled: 'タイマーフォント調整：✖️',
            dynamicWatchConfirm: '動的調整を有効/無効にしますか？',
            dynamicAdjustmentEnabled: '動的フォント調整：✔️',
            dynamicAdjustmentDisabled: '動的フォント調整：✖️',
            usageLanguage: 'メニュー言語の切り替え',
            switchPanel: 'メニューパネルの切り替え',
            tampermonkeyPanel: 'Tampermonkeyメニュー',
            floatingPanel: 'ページメニュー',
            showPanel: 'パネルを表示',
            configScope: '設定の適用範囲',
            subdomain: 'サブドメイン',
            topLevelDomain: 'トップレベルドメイン',
            allWebsites: 'すべてのウェブサイト',
            configScopePrompt: '設定の適用範囲を入力してください：\n1: サブドメイン ({hostname})\n2: トップレベルドメイン ({tld})\n3: すべてのウェブサイト\n現在の範囲: {scope}',
            invalidInput: '有効な範囲（1、2、または3）を入力してください！',
            currentConfigScope: '現在の設定範囲',
            notConfigured: '未設定',
            saveConfig: '設定を保存',
            saveConfigPending: '設定を保存（確定が必要）',
            saveConfigConfirm: '設定を以下に保存しますか：{scope} [{target}]？',
            deleteConfigConfirm: '現在の設定を削除しますか？（削除：{scope} [{target}]）',
            deleteBeforeScopeChangeConfirm: 'より広い範囲に変更するには、現在の設定を削除する必要があります。\n現在の設定を削除しますか？（削除：{scope} [{target}]）'
        },
        ru: {
            increase: 'Увеличить шрифт',
            decrease: 'Уменьшить шрифт',
            reset: 'Сбросить шрифт',
            reapply: 'Применить изменения шрифта',
            fontSizeAdjustment: 'Регулировка размера шрифта',
            setFontIncrement: 'Шаг увеличения шрифта',
            setFontIncrementPrompt: 'Введите шаг увеличения шрифта (в пикселях):',
            setFontIncrementErrorAlert: 'Введите корректное значение шага (положительное целое число)!',
            setFontFamily: 'Установить тип шрифта',
            setFontFamilyPrompt: 'Введите тип шрифта',
            supportFontFamily: 'Поддерживаемые типы шрифтов:',
            invalidFontFamilyAlert: 'Введите корректный тип шрифта!',
            firstAdjustmentConfirm: 'Введите время первой настройки (в секундах, 0 для отключения):',
            firstAdjustmentEnabled: 'Первая настройка шрифта: ✔️',
            firstAdjustmentDisabled: 'Первая настройка шрифта: ✖️',
            timerPrompt: 'Введите интервал настройки таймера (в секундах, 0 для отключения):',
            timerAdjustmentEnabled: 'Настройка шрифта по таймеру: ✔️',
            timerAdjustmentDisabled: 'Настройка шрифта по таймеру: ✖️',
            dynamicWatchConfirm: 'Включить/отключить динамическую настройку?',
            dynamicAdjustmentEnabled: 'Динамическая настройка шрифта: ✔️',
            dynamicAdjustmentDisabled: 'Динамическая настройка шрифта: ✖️',
            usageLanguage: 'Переключить язык меню',
            switchPanel: 'Переключить панель меню',
            tampermonkeyPanel: 'Меню Tampermonkey',
            floatingPanel: 'Меню страницы',
            showPanel: 'Показать панель',
            configScope: 'Область конфигурации',
            subdomain: 'Поддомен',
            topLevelDomain: 'Домен верхнего уровня',
            allWebsites: 'Все веб-сайты',
            configScopePrompt: 'Введите область конфигурации:\n1: Поддомен ({hostname})\n2: Домен верхнего уровня ({tld})\n3: Все веб-сайты\nТекущая область: {scope}',
            invalidInput: 'Введите корректную область (1, 2 или 3)!',
            currentConfigScope: 'Текущая область конфигурации',
            notConfigured: 'Не настроено',
            saveConfig: 'Сохранить конфигурацию',
            saveConfigPending: 'Сохранить конфигурацию (ожидает подтверждения)',
            saveConfigConfirm: 'Сохранить конфигурацию в: {scope} [{target}]?',
            deleteConfigConfirm: 'Удалить текущую конфигурацию? (Удалится: {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: 'Для изменения на более широкую область необходимо удалить текущую конфигурацию.\nУдалить текущую конфигурацию? (Удалится: {scope} [{target}])'
        },
        fr: {
            increase: 'Augmenter la police',
            decrease: 'Réduire la police',
            reset: 'Réinitialiser la police',
            reapply: 'Appliquer les changements de police',
            fontSizeAdjustment: 'Ajustement de la taille de la police',
            setFontIncrement: 'Incrément de la taille de la police',
            setFontIncrementPrompt: 'Entrez l’incrément de la police (en pixels) :',
            setFontIncrementErrorAlert: 'Veuillez entrer une valeur d’incrément valide (entier positif) !',
            setFontFamily: 'Définir la famille de polices',
            setFontFamilyPrompt: 'Entrez la famille de polices',
            supportFontFamily: 'Familles de polices prises en charge :',
            invalidFontFamilyAlert: 'Veuillez entrer une famille de polices valide !',
            firstAdjustmentConfirm: 'Entrez le temps du premier ajustement (en secondes, 0 pour désactiver) :',
            firstAdjustmentEnabled: 'Premier ajustement de police : ✔️',
            firstAdjustmentDisabled: 'Premier ajustement de police : ✖️',
            timerPrompt: 'Entrez l’intervalle d’ajustement du minuteur (en secondes, 0 pour désactiver) :',
            timerAdjustmentEnabled: 'Ajustement de police par minuteur : ✔️',
            timerAdjustmentDisabled: 'Ajustement de police par minuteur : ✖️',
            dynamicWatchConfirm: 'Activer/désactiver l’ajustement dynamique ?',
            dynamicAdjustmentEnabled: 'Ajustement dynamique de la police : ✔️',
            dynamicAdjustmentDisabled: 'Ajustement dynamique de la police : ✖️',
            usageLanguage: 'Changer la langue du menu',
            switchPanel: 'Changer de panneau de menu',
            tampermonkeyPanel: 'Menu Tampermonkey',
            floatingPanel: 'Menu de la page',
            showPanel: 'Afficher le panneau',
            configScope: 'Portée de la configuration',
            subdomain: 'Sous-domaine',
            topLevelDomain: 'Domaine de premier niveau',
            allWebsites: 'Tous les sites web',
            configScopePrompt: 'Entrez la portée de la configuration :\n1 : Sous-domaine ({hostname})\n2 : Domaine de premier niveau ({tld})\n3 : Tous les sites web\nPortée actuelle : {scope}',
            invalidInput: 'Veuillez entrer une portée valide (1, 2 ou 3) !',
            currentConfigScope: 'Portée de la configuration actuelle',
            notConfigured: 'Non configuré',
            saveConfig: 'Enregistrer la configuration',
            saveConfigPending: 'Enregistrer la configuration (en attente)',
            saveConfigConfirm: 'Enregistrer la configuration dans : {scope} [{target}] ?',
            deleteConfigConfirm: 'Supprimer la configuration actuelle ? (Supprimera : {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: 'Changer pour une portée plus large nécessite la suppression de la configuration actuelle.\nSupprimer la configuration actuelle ? (Supprimera : {scope} [{target}])'
        },
        de: {
            increase: 'Schriftart vergrößern',
            decrease: 'Schriftart verkleinern',
            reset: 'Schriftart zurücksetzen',
            reapply: 'Schriftänderungen anwenden',
            fontSizeAdjustment: 'Schriftgrößenanpassung',
            setFontIncrement: 'Schriftgrößeninkrement',
            setFontIncrementPrompt: 'Geben Sie das Schriftgrößeninkrement ein (in Pixeln):',
            setFontIncrementErrorAlert: 'Bitte geben Sie einen gültigen Inkrementwert ein (positive Ganzzahl)!',
            setFontFamily: 'Schriftartfamilie festlegen',
            setFontFamilyPrompt: 'Geben Sie die Schriftartfamilie ein',
            supportFontFamily: 'Unterstützte Schriftartfamilien:',
            invalidFontFamilyAlert: 'Bitte geben Sie eine gültige Schriftartfamilie ein!',
            firstAdjustmentConfirm: 'Geben Sie die Zeit für die erste Anpassung ein (in Sekunden, 0 zum Deaktivieren):',
            firstAdjustmentEnabled: 'Erste Schrifteinstellung: ✔️',
            firstAdjustmentDisabled: 'Erste Schrifteinstellung: ✖️',
            timerPrompt: 'Geben Sie das Intervall für die Timer-Anpassung ein (in Sekunden, 0 zum Deaktivieren):',
            timerAdjustmentEnabled: 'Timer-Schrifteinstellung: ✔️',
            timerAdjustmentDisabled: 'Timer-Schrifteinstellung: ✖️',
            dynamicWatchConfirm: 'Dynamische Anpassung aktivieren/deaktivieren?',
            dynamicAdjustmentEnabled: 'Dynamische Schrifteinstellung: ✔️',
            dynamicAdjustmentDisabled: 'Dynamische Schrifteinstellung: ✖️',
            usageLanguage: 'Menüsprache wechseln',
            switchPanel: 'Menüpanel wechseln',
            tampermonkeyPanel: 'Tampermonkey-Menü',
            floatingPanel: 'Seitenmenü',
            showPanel: 'Panel anzeigen',
            configScope: 'Konfigurationsbereich',
            subdomain: 'Subdomain',
            topLevelDomain: 'Top-Level-Domain',
            allWebsites: 'Alle Websites',
            configScopePrompt: 'Geben Sie den Konfigurationsbereich ein:\n1: Subdomain ({hostname})\n2: Top-Level-Domain ({tld})\n3: Alle Websites\nAktueller Bereich: {scope}',
            invalidInput: 'Bitte geben Sie einen gültigen Bereich ein (1, 2 oder 3)!',
            currentConfigScope: 'Aktueller Konfigurationsbereich',
            notConfigured: 'Nicht konfiguriert',
            saveConfig: 'Konfiguration speichern',
            saveConfigPending: 'Konfiguration speichern (ausstehend)',
            saveConfigConfirm: 'Konfiguration speichern unter: {scope} [{target}]?',
            deleteConfigConfirm: 'Aktuelle Konfiguration löschen? (Löscht: {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: 'Das Ändern auf einen breiteren Bereich erfordert das Löschen der aktuellen Konfiguration.\nAktuelle Konfiguration löschen? (Löscht: {scope} [{target}])'
        },
        es: {
            increase: 'Aumentar fuente',
            decrease: 'Reducir fuente',
            reset: 'Restablecer fuente',
            reapply: 'Aplicar cambios de fuente',
            fontSizeAdjustment: 'Ajuste del tamaño de fuente',
            setFontIncrement: 'Incremento del tamaño de fuente',
            setFontIncrementPrompt: 'Ingrese el incremento de fuente (en píxeles):',
            setFontIncrementErrorAlert: '¡Ingrese un valor de incremento válido (entero positivo)!',
            setFontFamily: 'Establecer familia de fuentes',
            setFontFamilyPrompt: 'Ingrese la familia de fuentes',
            supportFontFamily: 'Familias de fuentes soportadas:',
            invalidFontFamilyAlert: '¡Ingrese una familia de fuentes válida!',
            firstAdjustmentConfirm: 'Ingrese el tiempo del primer ajuste (en segundos, 0 para desactivar):',
            firstAdjustmentEnabled: 'Primer ajuste de fuente: ✔️',
            firstAdjustmentDisabled: 'Primer ajuste de fuente: ✖️',
            timerPrompt: 'Ingrese el intervalo de ajuste del temporizador (en segundos, 0 para desactivar):',
            timerAdjustmentEnabled: 'Ajuste de fuente por temporizador: ✔️',
            timerAdjustmentDisabled: 'Ajuste de fuente por temporizador: ✖️',
            dynamicWatchConfirm: '¿Activar/desactivar el ajuste dinámico?',
            dynamicAdjustmentEnabled: 'Ajuste dinámico de fuente: ✔️',
            dynamicAdjustmentDisabled: 'Ajuste dinámico de fuente: ✖️',
            usageLanguage: 'Cambiar idioma del menú',
            switchPanel: 'Cambiar panel de menú',
            tampermonkeyPanel: 'Menú de Tampermonkey',
            floatingPanel: 'Menú de página',
            showPanel: 'Mostrar panel',
            configScope: 'Alcance de la configuración',
            subdomain: 'Subdominio',
            topLevelDomain: 'Dominio de primer nivel',
            allWebsites: 'Todos los sitios web',
            configScopePrompt: 'Ingrese el alcance de la configuración:\n1: Subdominio ({hostname})\n2: Dominio de primer nivel ({tld})\n3: Todos los sitios web\nAlcance actual: {scope}',
            invalidInput: '¡Ingrese un alcance válido (1, 2 o 3)!',
            currentConfigScope: 'Alcance de configuración actual',
            notConfigured: 'No configurado',
            saveConfig: 'Guardar configuración',
            saveConfigPending: 'Guardar configuración (pendiente)',
            saveConfigConfirm: '¿Guardar configuración en: {scope} [{target}]?',
            deleteConfigConfirm: '¿Eliminar la configuración actual? (Se eliminará: {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: 'Cambiar a un alcance más amplio requiere eliminar la configuración actual.\n¿Eliminar la configuración actual? (Se eliminará: {scope} [{target}])'
        },
        pt: {
            increase: 'Aumentar fonte',
            decrease: 'Diminuir fonte',
            reset: 'Redefinir fonte',
            reapply: 'Aplicar mudanças de fonte',
            fontSizeAdjustment: 'Ajuste do tamanho da fonte',
            setFontIncrement: 'Incremento do tamanho da fonte',
            setFontIncrementPrompt: 'Digite o incremento da fonte (em pixels):',
            setFontIncrementErrorAlert: 'Por favor, insira um valor de incremento válido (inteiro positivo)!',
            setFontFamily: 'Definir família de fontes',
            setFontFamilyPrompt: 'Digite a família de fontes',
            supportFontFamily: 'Famílias de fontes suportadas:',
            invalidFontFamilyAlert: 'Por favor, insira uma família de fontes válida!',
            firstAdjustmentConfirm: 'Digite o tempo do primeiro ajuste (em segundos, 0 para desativar):',
            firstAdjustmentEnabled: 'Primeiro ajuste de fonte: ✔️',
            firstAdjustmentDisabled: 'Primeiro ajuste de fonte: ✖️',
            timerPrompt: 'Digite o intervalo de ajuste do temporizador (em segundos, 0 para desativar):',
            timerAdjustmentEnabled: 'Ajuste de fonte por temporizador: ✔️',
            timerAdjustmentDisabled: 'Ajuste de fonte por temporizador: ✖️',
            dynamicWatchConfirm: 'Ativar/desativar ajuste dinâmico?',
            dynamicAdjustmentEnabled: 'Ajuste dinâmico de fonte: ✔️',
            dynamicAdjustmentDisabled: 'Ajuste dinâmico de fonte: ✖️',
            usageLanguage: 'Mudar idioma do menu',
            switchPanel: 'Mudar painel do menu',
            tampermonkeyPanel: 'Menu Tampermonkey',
            floatingPanel: 'Menu da página',
            showPanel: 'Mostrar painel',
            configScope: 'Escopo da configuração',
            subdomain: 'Subdomínio',
            topLevelDomain: 'Domínio de topo',
            allWebsites: 'Todos os sites',
            configScopePrompt: 'Digite o escopo da configuração:\n1: Subdomínio ({hostname})\n2: Domínio de topo ({= ({tld})\n3: Todos os sites\nEscopo atual: {scope}',
            invalidInput: 'Por favor, insira um escopo válido (1, 2 ou 3)!',
            currentConfigScope: 'Escopo da configuração atual',
            notConfigured: 'Não configurado',
            saveConfig: 'Salvar configuração',
            saveConfigPending: 'Salvar configuração (pendente)',
            saveConfigConfirm: 'Salvar configuração em: {scope} [{target}]?',
            deleteConfigConfirm: 'Tem certeza de que deseja excluir a configuração atual? (Será excluído: {scope} [{target}])',
            deleteBeforeScopeChangeConfirm: 'Mudar para um escopo mais amplo requer a exclusão da configuração atual.\nTem certeza de que deseja excluir a configuração atual? (Será excluído: {scope} [{target}])'
        }
    };

    // 读取语言设置
    let currentLanguage = GM_getValue('language', navigator.language);
    if (!translations[currentLanguage]) {
        currentLanguage = currentLanguage.startsWith('zh') ? 'zh' : 'en';
        GM_setValue('language', currentLanguage);
    }
    log(`NiceFont: 语言设置为 ${currentLanguage}`);

    // 检查是否首次使用，默认为浮动面板
    let panelType = GM_getValue(PANEL_TYPE_KEY, null);
    if (panelType === null) {
        panelType = 'floating';
        GM_setValue(PANEL_TYPE_KEY, panelType);
        log(`NiceFont: 面板类型默认设置为 ${panelType}`);
    }

    // 按优先级读取配置
    let subdomainConfig = GM_getValue(SUBDOMAIN_STORAGE_KEY, {});
    let topLevelConfig = GM_getValue(TOPLEVEL_STORAGE_KEY, {});
    let globalDefaultConfig = GM_getValue(GLOBAL_DEFAULT_KEY, {});

    // 确定当前使用的配置
    let currentConfig = subdomainConfig;
    let effectiveScope = 1; // 默认子域名
    if (Object.keys(subdomainConfig).length === 0) {
        currentConfig = topLevelConfig;
        effectiveScope = 2; // 顶级域名
        if (Object.keys(topLevelConfig).length === 0) {
            currentConfig = globalDefaultConfig;
            effectiveScope = 3; // 所有网站
        }
    }

    // 获取字体类型配置
    let fontIncrement = currentConfig.increment || 1;
    let currentFontFamily = currentConfig.fontFamily || 'none';
    let currentAdjustment = currentConfig.resize || 0;
    let watchDOMChanges = currentConfig.watcher ?? false;
    let intervalSeconds = currentConfig.timer || 0;
    let firstAdjustment = currentConfig.first ?? false;
    let firstAdjustmentTime = currentConfig.firstTime || 3;

    let observer = null;
    let timer = null;
    let menuHandles = [];
    let isConfigModified = false; // 跟踪配置是否被修改
    // 在全局作用域中添加标志变量和待更改状态
    let isScopeChangeDeletion = false;
    let pendingScopeChange = null; // 待更改的配置范围

    // 更新保存按钮文字
    function updateSaveButton() {
        const t = translations[currentLanguage] || translations['en'];
        const saveBtn = document.getElementById('NiceFont_save-config-btn');
        if (saveBtn) {
            saveBtn.textContent = `💾 ${isConfigModified ? t.saveConfigPending : t.saveConfig}`;
        }
    }

    // 获取当前配置来源的显示文本（无“->”）
    function getCurrentConfigScopeText() {
        const t = translations[currentLanguage] || translations['en'];
        const subdomainConfig = GM_getValue(SUBDOMAIN_STORAGE_KEY, {});
        const topLevelConfig = GM_getValue(TOPLEVEL_STORAGE_KEY, {});
        const globalDefaultConfig = GM_getValue(GLOBAL_DEFAULT_KEY, {});

        if (Object.keys(subdomainConfig).length > 0) {
            return window.location.hostname; // 子域名
        } else if (Object.keys(topLevelConfig).length > 0) {
            const tld = getTopLevelDomain().replace(/^\./, ''); // 移除前置 .
            return `*.${tld}`; // 顶级域名
        } else if (Object.keys(globalDefaultConfig).length > 0) {
            return t.allWebsites; // 所有网站
        } else {
            return t.notConfigured; // 未配置
        }
    }

    // 获取配置作用范围的显示文本（仅显示范围名称）
    function getConfigScopeDisplayText() {
        const t = translations[currentLanguage] || translations['en'];
        const currentScopeText = effectiveScope === 1 ? t.subdomain :
            effectiveScope === 2 ? t.topLevelDomain : t.allWebsites;

        // 如果没有配置（所有配置均为空），直接显示子域名或待更改范围
        if (Object.keys(subdomainConfig).length === 0 &&
            Object.keys(topLevelConfig).length === 0 &&
            Object.keys(globalDefaultConfig).length === 0) {
            const safeTargetScope = pendingScopeChange !== null ? pendingScopeChange : targetScope;
            return safeTargetScope === 1 ? t.subdomain :
                safeTargetScope === 2 ? t.topLevelDomain : t.allWebsites;
        }

        // 如果目标作用范围与当前配置范围不同，或有待更改范围，显示“当前 -> 目标”
        const safeTargetScope = pendingScopeChange !== null ? pendingScopeChange : targetScope;
        if (safeTargetScope !== effectiveScope || pendingScopeChange !== null) {
            const targetScopeText = pendingScopeChange !== null ?
                (pendingScopeChange === 1 ? t.subdomain :
                    pendingScopeChange === 2 ? t.topLevelDomain : t.allWebsites) :
                (safeTargetScope === 1 ? t.subdomain :
                    safeTargetScope === 2 ? t.topLevelDomain : t.allWebsites);
            return `${currentScopeText} -> ${targetScopeText}`;
        }
        return currentScopeText;
    }

    // 推断当前配置范围
    function getCurrentConfigScope() {
        const subdomainConfig = GM_getValue(SUBDOMAIN_STORAGE_KEY, {});
        const topLevelConfig = GM_getValue(TOPLEVEL_STORAGE_KEY, {});
        const globalDefaultConfig = GM_getValue(GLOBAL_DEFAULT_KEY, {});

        if (Object.keys(subdomainConfig).length > 0) {
            return 1; // 子域名
        } else if (Object.keys(topLevelConfig).length > 0) {
            return 2; // 顶级域名
        } else if (Object.keys(globalDefaultConfig).length > 0) {
            return 3; // 所有网站
        } else {
            return configScope; // 未配置时使用当前 configScope
        }
    }

    // 删除当前配置
    function deleteCurrentConfig() {
        const t = translations[currentLanguage] || translations['en'];
        let scopeText, scope, target;

        // 确定实际保存的配置范围
        if (Object.keys(subdomainConfig).length > 0) {
            scope = 1;
            scopeText = t.subdomain;
            target = window.location.hostname;
        } else if (Object.keys(topLevelConfig).length > 0) {
            scope = 2;
            scopeText = t.topLevelDomain;
            target = `*.${getTopLevelDomain().replace(/^\./, '')}`;
        } else if (Object.keys(globalDefaultConfig).length > 0) {
            scope = 3;
            scopeText = t.allWebsites;
            target = t.allWebsites;
        } else {
            log('NiceFont: 无配置可删除');
            return false; // 无配置时返回 false
        }

        // 仅在非作用范围更改删除时显示提示
        let shouldDelete = isScopeChangeDeletion || confirm(
            scope === 3
                ? `${t.currentConfigScope}: ${getCurrentConfigScopeText()}\n${t.deleteConfigConfirm.replace('{scope}', scopeText).replace(' [{target}]', '')}`
                : `${t.currentConfigScope}: ${getCurrentConfigScopeText()}\n${t.deleteConfigConfirm.replace('{scope}', scopeText).replace('{target}', getCurrentConfigScopeText())}`
        );

        if (shouldDelete) {
            // 立即删除配置
            if (scope === 1) {
                GM_setValue(SUBDOMAIN_STORAGE_KEY, {});
                log('NiceFont: 删除子域名配置', target);
            } else if (scope === 2) {
                GM_setValue(TOPLEVEL_STORAGE_KEY, {});
                log('NiceFont: 删除顶级域名配置', target);
            } else {
                GM_setValue(GLOBAL_DEFAULT_KEY, {});
                log('NiceFont: 删除所有网站配置');
            }

            // 更新配置状态
            subdomainConfig = GM_getValue(SUBDOMAIN_STORAGE_KEY, {});
            topLevelConfig = GM_getValue(TOPLEVEL_STORAGE_KEY, {});
            globalDefaultConfig = GM_getValue(GLOBAL_DEFAULT_KEY, {});
            currentConfig = subdomainConfig;
            effectiveScope = 1;
            if (Object.keys(subdomainConfig).length === 0) {
                currentConfig = topLevelConfig;
                effectiveScope = 2;
                if (Object.keys(topLevelConfig).length === 0) {
                    currentConfig = globalDefaultConfig;
                    effectiveScope = 3;
                }
            }
            targetScope = 1; // 默认回到子域名

            // 更新界面
            updateMenuCommands();
            updatePanelCommands();
            updateSaveButton();
            log('NiceFont: 配置已删除');
            return true;
        }
        return false;
    }

    // 更改配置作用范围
    function changeConfigScope() {
        const t = translations[currentLanguage] || translations['en'];
        const hostname = window.location.hostname;
        const tld = getTopLevelDomain().replace(/^\./, ''); // 移除前置 .
        const currentScopeText = effectiveScope === 1 ? t.subdomain :
            effectiveScope === 2 ? t.topLevelDomain : t.allWebsites;

        // 备份当前配置
        const backupConfig = {
            fontIncrement: fontIncrement,
            currentAdjustment: currentAdjustment,
            currentFontFamily: currentFontFamily,
            watchDOMChanges: watchDOMChanges,
            intervalSeconds: intervalSeconds,
            firstAdjustment: firstAdjustment,
            firstAdjustmentTime: firstAdjustmentTime,
            observer: observer,
            timer: timer
        };

        const input = prompt(
            t.configScopePrompt
                .replace('{scope}', currentScopeText)
                .replace('{hostname}', hostname)
                .replace('{tld}', tld), targetScope
        );
        const newScope = parseInt(input, 10);
        if ([1, 2, 3].includes(newScope)) {
            // 如果新范围与当前范围相同，直接返回
            if (newScope === effectiveScope) {
                log(`NiceFont: 新范围与当前范围相同 (${scopeMap[newScope]})，无需更改`);
                return;
            }

            // 检查是否为更广的作用范围
            if (newScope > effectiveScope) {
                let currentScope, scopeText;

                // 确定当前配置范围
                if (effectiveScope === 1 && Object.keys(subdomainConfig).length > 0) {
                    currentScope = 1;
                    scopeText = t.subdomain;
                } else if (effectiveScope === 2 && Object.keys(topLevelConfig).length > 0) {
                    currentScope = 2;
                    scopeText = t.topLevelDomain;
                } else {
                    // 无需删除，直接标记范围更改
                    pendingScopeChange = newScope;
                    targetScope = newScope;
                    isConfigModified = true;
                    updateMenuCommands();
                    updatePanelCommands();
                    updateSaveButton();
                    log(`NiceFont: 标记配置范围更改为${scopeMap[newScope]}，无需删除配置`);
                    return;
                }

                // 提示删除当前配置
                const confirmMessage = currentScope === 3
                    ? `${t.currentConfigScope}: ${getCurrentConfigScopeText()}\n${t.deleteBeforeScopeChangeConfirm.replace('{scope}', scopeText).replace(' [{target}]', '')}`
                    : `${t.currentConfigScope}: ${getCurrentConfigScopeText()}\n${t.deleteBeforeScopeChangeConfirm.replace('{scope}', scopeText).replace('{target}', getCurrentConfigScopeText())}`;

                // 设置标志以跳过 deleteCurrentConfig 的提示
                isScopeChangeDeletion = true;
                let deleted = false;
                try {
                    // 尝试删除当前配置
                    deleted = deleteCurrentConfig();
                } finally {
                    // 重置标志
                    isScopeChangeDeletion = false;
                }

                if (deleted) {
                    // 标记新范围为待保存
                    pendingScopeChange = newScope;
                    targetScope = newScope;
                    isConfigModified = true;
                    updateMenuCommands();
                    updatePanelCommands();
                    updateSaveButton();
                    log(`NiceFont: 标记配置范围更改为${scopeMap[newScope]}，已删除旧配置`);
                } else {
                    // 用户取消删除，恢复备份配置
                    fontIncrement = backupConfig.fontIncrement;
                    currentAdjustment = backupConfig.currentAdjustment;
                    currentFontFamily = backupConfig.currentFontFamily;
                    watchDOMChanges = backupConfig.watchDOMChanges;
                    intervalSeconds = backupConfig.intervalSeconds;
                    firstAdjustment = backupConfig.firstAdjustment;
                    firstAdjustmentTime = backupConfig.firstAdjustmentTime;
                    observer = backupConfig.observer;
                    timer = backupConfig.timer;

                    // 恢复页面字体
                    if (fontIncrement !== 1 || currentAdjustment !== 0 || currentFontFamily !== 'none') {
                        applyFontRecursively(document.body);
                    }

                    updateMenuCommands();
                    updatePanelCommands();
                    updateSaveButton();
                    log('NiceFont: 用户取消删除，恢复原有配置');
                    return;
                }
            } else {
                // 较小的范围，直接标记更改
                pendingScopeChange = newScope;
                targetScope = newScope;
                isConfigModified = true;
                updateMenuCommands();
                updatePanelCommands();
                updateSaveButton();
                log(`NiceFont: 标记配置范围更改为${scopeMap[newScope]}`);
            }
        } else if (input !== null) {
            alert(t.invalidInput);
        }
    }

    // 保存配置
    function saveConfig() {
        const t = translations[currentLanguage] || translations['en'];
        const hostname = window.location.hostname;
        const tld = getTopLevelDomain().replace(/^\./, ''); // 移除前置 .
        const scopeText = (pendingScopeChange || targetScope) === 1 ? t.subdomain :
            (pendingScopeChange || targetScope) === 2 ? t.topLevelDomain : t.allWebsites;
        const target = (pendingScopeChange || targetScope) === 1 ? hostname :
            (pendingScopeChange || targetScope) === 2 ? `*.${tld}` : t.allWebsites;

        log(`NiceFont: 保存配置，targetScope=${pendingScopeChange || targetScope}, scopeText=${scopeText}, target=${target}`);

        // 修正提示格式：当作用范围为“所有网站”时，只显示“所有网站”
        const confirmMessage = (pendingScopeChange || targetScope) === 3
            ? t.saveConfigConfirm.replace('{scope}', scopeText).replace(' [{target}]', '')
            : t.saveConfigConfirm.replace('{scope}', scopeText).replace('{target}', target);

        if (confirm(confirmMessage)) {
            // 保存配置
            const config = {
                increment: fontIncrement,
                resize: currentAdjustment,
                watcher: watchDOMChanges,
                timer: intervalSeconds,
                fontFamily: currentFontFamily,
                first: firstAdjustment,
                firstTime: firstAdjustmentTime
            };
            const saveScope = pendingScopeChange || targetScope;
            if (saveScope === 1) {
                GM_setValue(SUBDOMAIN_STORAGE_KEY, config);
                log('NiceFont: 保存到子域名', hostname);
            } else if (saveScope === 2) {
                GM_setValue(TOPLEVEL_STORAGE_KEY, config);
                log('NiceFont: 保存到顶级域名', tld);
            } else {
                GM_setValue(GLOBAL_DEFAULT_KEY, config);
                log('NiceFont: 保存到所有网站');
            }

            // 更新状态
            isConfigModified = false;
            if (pendingScopeChange !== null) {
                targetScope = pendingScopeChange;
                pendingScopeChange = null;
            }

            // 重载配置以反映保存后的状态
            subdomainConfig = GM_getValue(SUBDOMAIN_STORAGE_KEY, {});
            topLevelConfig = GM_getValue(TOPLEVEL_STORAGE_KEY, {});
            globalDefaultConfig = GM_getValue(GLOBAL_DEFAULT_KEY, {});
            currentConfig = subdomainConfig;
            effectiveScope = 1;
            if (Object.keys(subdomainConfig).length === 0) {
                currentConfig = topLevelConfig;
                effectiveScope = 2;
                if (Object.keys(topLevelConfig).length === 0) {
                    currentConfig = globalDefaultConfig;
                    effectiveScope = 3;
                }
            }
            targetScope = effectiveScope; // 同步目标作用范围

            // 如果没有配置，重置字体设置
            if (Object.keys(subdomainConfig).length === 0 &&
                Object.keys(topLevelConfig).length === 0 &&
                Object.keys(globalDefaultConfig).length === 0) {
                fontIncrement = 1;
                currentAdjustment = 0;
                currentFontFamily = 'none';
                watchDOMChanges = false;
                intervalSeconds = 0;
                firstAdjustment = false;
                firstAdjustmentTime = 3;
                // 停止动态观察和定时器
                if (observer) {
                    observer.disconnect();
                    observer = null;
                }
                if (timer) {
                    clearInterval(timer);
                    timer = null;
                }
                // 重置页面字体
                resetFont(document.body);
            }

            // 更新界面
            updateMenuCommands();
            updatePanelCommands();
            updateSaveButton();
        }
    }

    // 节流防抖
    function throttle(fn, wait) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= wait) {
                lastCall = now;
                fn(...args);
            }
        };
    }

    // CSS 样式：悬浮面板和遮罩层
    GM_addStyle(`
        :root {
            --nicefont-family: none; /* 定义全局字体类型变量 */
        }
        *:not(#NiceFont_panel):not([data-nicefont-panel]):not(.action-btn) {
            font-family: var(--nicefont-family, inherit) !important; /* 应用字体类型，排除面板 */
        }
        #NiceFont_panel {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 10001;
            font-family: sans-serif;
            font-size: 14px;
        }
        #NiceFont_panel h3 {
            margin: 0 0 10px;
            font-size: 16px;
            display: inline-block;
        }
        #NiceFont_panel .NiceFont_close-btn {
            float: right;
            border: none;
            border-radius: 3px;
            padding: 1px 6px;
            cursor: pointer;
            line-height: 16px;
            font-size: 12px;
            background: none;
            color: #000;
        }
        #NiceFont_panel .NiceFont_close-btn:hover {
            text-decoration: underline;
        }
        #NiceFont_panel .action-btn {
            display: block;
            padding: 2px;
            border-radius: 3px;
            cursor: pointer;
            text-align: left;
        }
        #NiceFont_panel .action-btn:hover {
            text-decoration: underline;
        }
        #NiceFont_panel .status {
            padding: 2px;
            text-decoration: none !important;
        }
        #NiceFont_panel .font-family-select {
            display: inline-block;
            width: auto;
            padding: 2px;
            margin-left: 5px;
            border: 1px solid #ddd;
            border-radius: 3px;
            font-size: 14px;
            vertical-align: middle;
        }
        #NiceFont_overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 10000;
            display: none;
        }
    `);

    // 创建浮动面板
    function createFloatingPanel() {
        const t = translations[currentLanguage] || translations['en'];
        const scriptName = GM_info?.script?.name || 'NiceFont';
        const currentScope = getCurrentConfigScope();
        const scopeText = currentScope === 1 ? t.subdomain : currentScope === 2 ? t.topLevelDomain : t.allWebsites;
        log('NiceFont: 创建浮动面板');
        const panel = document.createElement('div');
        panel.id = 'NiceFont_panel';
        panel.setAttribute('data-nicefont-panel', 'true');
        panel.innerHTML = `
        <h3>${scriptName}</h3>
        <button class="NiceFont_close-btn" id="NiceFont_close-btn">✖️</button>
        <div class="action-btn status">📏 ${t.fontSizeAdjustment}: ${currentAdjustment >= 0 ? '+' : ''}${currentAdjustment}px</div>
        <div class="action-btn" id="NiceFont_increase-btn">🔼 ${t.increase}</div>
        <div class="action-btn" id="NiceFont_decrease-btn">🔽 ${t.decrease}</div>
        <div class="action-btn" id="NiceFont_reset-btn">🔁 ${t.reset}</div>
        <div class="action-btn" id="NiceFont_reapply-btn">♻️ ${t.reapply}</div>
        <div class="action-btn" id="NiceFont_set-increment-btn">📈 ${t.setFontIncrement}: ${fontIncrement}px</div>
        <div class="action-btn" id="NiceFont_set-font-family-btn">🖋️ ${t.setFontFamily}: ${currentFontFamily}</div>
        <div class="action-btn" id="NiceFont_first-adjustment-btn">1️⃣ ${firstAdjustment ? t.firstAdjustmentEnabled : t.firstAdjustmentDisabled} ${firstAdjustment ? `【${firstAdjustmentTime}s】` : ''}</div>
        <div class="action-btn" id="NiceFont_timer-adjustment-btn">⏱️ ${intervalSeconds > 0 ? t.timerAdjustmentEnabled : t.timerAdjustmentDisabled} ${intervalSeconds > 0 ? `【${intervalSeconds}s】` : ''}</div>
        <div class="action-btn" id="NiceFont_dynamic-adjustment-btn">👁️ ${watchDOMChanges ? t.dynamicAdjustmentEnabled : t.dynamicAdjustmentDisabled}</div>
        <div class="action-btn" id="NiceFont_switch-language-btn">🌐 ${t.usageLanguage}: ${currentLanguage}</div>
        <div class="action-btn" id="NiceFont_switch-panel-btn">🎨 ${t.switchPanel}: ${panelType === 'tampermonkey' ? t.tampermonkeyPanel : t.floatingPanel}</div>
        <div class="action-btn" id="NiceFont_config-currentConfigScope-btn">📍 ${t.currentConfigScope}: ${getCurrentConfigScopeText()}</div>
        <div class="action-btn" id="NiceFont_config-scope-btn">ℹ️ ${t.configScope}: ${scopeText}</div>
        <div class="action-btn" id="NiceFont_save-config-btn">💾 ${isConfigModified ? t.saveConfigPending : t.saveConfig}</div>
    `;

        const overlay = document.createElement('div');
        overlay.id = 'NiceFont_overlay';
        overlay.style.display = 'block';

        try {
            if (document.body) {
                document.body.appendChild(overlay);
                document.body.appendChild(panel);
                log('NiceFont: 浮动面板和覆盖附加到主体');
            } else {
                log('NiceFont: document.body 不可用');
                return;
            }
        } catch (e) {
            log('NiceFont: 附加面板或覆盖层错误：', e);
            return;
        }

        // 事件绑定
        const updateStatus = () => {
            const statusEl = panel.querySelector('.status');
            if (statusEl) {
                statusEl.textContent = `📏 ${t.fontSizeAdjustment}: ${currentAdjustment >= 0 ? '+' : ''}${currentAdjustment}px`;
            }
        };

        const bindButton = (id, action) => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', action);
            } else {
                log(`NiceFont: 未找到按钮#${id}`);
            }
        };

        bindButton('NiceFont_increase-btn', () => {
            changeFontSize(fontIncrement);
            isConfigModified = true;
            updateStatus();
            updateSaveButton();
        });

        bindButton('NiceFont_decrease-btn', () => {
            changeFontSize(-fontIncrement);
            isConfigModified = true;
            updateStatus();
            updateSaveButton();
        });

        bindButton('NiceFont_reset-btn', () => {
            resetFont(document.body);
            currentAdjustment = 0;
            currentFontFamily = 'none';
            watchDOMChanges = false;
            intervalSeconds = 0;
            firstAdjustment = false;
            firstAdjustmentTime = 3;
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
            isConfigModified = true;
            updateStatus();
            updateMenuCommands();
            updatePanelCommands();
            updateSaveButton();
            log('NiceFont: 字体设置重置，配置标记为修改');
        });

        bindButton('NiceFont_reapply-btn', () => {
            applyFontRecursively(document.body, currentAdjustment);
        });

        bindButton('NiceFont_close-btn', () => {
            panel.style.display = 'none';
            overlay.style.display = 'none';
            log('NiceFont: 面板关闭，屏蔽层隐藏');
        });

        bindButton('NiceFont_set-increment-btn', () => {
            const input = prompt(t.setFontIncrementPrompt, fontIncrement.toString());
            const newIncrement = parseInt(input, 10);
            if (!isNaN(newIncrement) && newIncrement > 0) {
                fontIncrement = newIncrement;
                isConfigModified = true;
                updateMenuCommands();
                updatePanelCommands();
                updateSaveButton();
                log(`NiceFont: 字体增量设置为${newIncrement}px`);
            } else {
                alert(t.setFontIncrementErrorAlert);
            }
        });

        bindButton('NiceFont_set-font-family-btn', (event) => {
            event.stopPropagation();
            const btn = document.getElementById('NiceFont_set-font-family-btn');
            let select = document.getElementById('NiceFont_font-family');
            if (select) {
                select.remove();
                document.removeEventListener('click', closeDropdown);
                return;
            }
            select = document.createElement('select');
            select.id = 'NiceFont_font-family';
            select.className = 'font-family-select';
            select.innerHTML = supportFonts.map(font =>
                `<option value="${font}" ${font === currentFontFamily ? 'selected' : ''}>${font === 'custom' ? (currentLanguage === 'zh' ? '手动输入' : 'Custom Input') : font}</option>`
            ).join('');
            btn.appendChild(select);

            select.focus();

            select.addEventListener('click', (e) => {
                e.stopPropagation();
            });

            select.addEventListener('change', (e) => {
                const selectedFont = e.target.value;
                if (selectedFont === 'custom') {
                    const input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${supportFonts.slice(0, -1).join(", ")}`, '');
                    if (input && input.trim() !== '') {
                        const newFont = input.trim();
                        if (!supportFonts.includes(newFont)) {
                            supportFonts.splice(supportFonts.length - 1, 0, newFont);
                            const option = document.createElement('option');
                            option.value = newFont;
                            option.textContent = newFont;
                            select.insertBefore(option, select.lastChild);
                        }
                        currentFontFamily = newFont;
                        select.value = newFont;
                    } else {
                        alert(t.invalidFontFamilyAlert);
                        select.value = currentFontFamily;
                        select.remove();
                        document.removeEventListener('click', closeDropdown);
                        return;
                    }
                } else {
                    currentFontFamily = selectedFont;
                }
                // 通过 :root 设置字体类型
                if (currentFontFamily !== 'none') {
                    document.documentElement.style.setProperty('--nicefont-family', currentFontFamily);
                } else {
                    document.documentElement.style.removeProperty('--nicefont-family');
                }
                isConfigModified = true;
                btn.textContent = `🖋️ ${t.setFontFamily}: ${currentFontFamily}`;
                select.remove();
                document.removeEventListener('click', closeDropdown);
                updateMenuCommands();
                updatePanelCommands();
                updateSaveButton();
                log(`NiceFont: 字体类型设置为 ${currentFontFamily}`);
            });

            function closeDropdown(event) {
                if (!select.contains(event.target) && !btn.contains(event.target)) {
                    select.remove();
                    document.removeEventListener('click', closeDropdown);
                    log('NiceFont: 点击外部关闭下拉菜单');
                }
            }

            document.addEventListener('click', closeDropdown);
        });

        bindButton('NiceFont_first-adjustment-btn', () => {
            const input = prompt(t.firstAdjustmentConfirm, firstAdjustmentTime.toString());
            const secs = parseInt(input, 10);
            if (!isNaN(secs)) {
                firstAdjustment = !firstAdjustment;
                firstAdjustmentTime = secs;
                if (secs === 0) {
                    firstAdjustment = false;
                }
                if (firstAdjustment) {
                    setTimeout(() => {
                        applyFontRecursively(document.body, currentAdjustment);
                    }, firstAdjustmentTime * 1000);
                }
                isConfigModified = true;
                updateMenuCommands();
                updatePanelCommands();
                updateSaveButton();
                log(`NiceFont: 第一次调整字体已切换，时间设置为${secs}s`);
            }
        });

        bindButton('NiceFont_timer-adjustment-btn', () => {
            const input = prompt(t.timerPrompt, intervalSeconds.toString());
            const secs = parseInt(input, 10);
            if (!isNaN(secs)) {
                intervalSeconds = secs;
                if (intervalSeconds > 0) {
                    watchDOMChanges = false;
                    if (observer) observer.disconnect();
                    if (timer) clearInterval(timer);
                    timer = setInterval(() => {
                        applyFontRecursively(document.body, currentAdjustment);
                    }, intervalSeconds * 1000);
                    log(`NiceFont: 定时调整字体已切换，时间设置为${secs}s`);
                } else {
                    if (timer) clearInterval(timer);
                    log('NiceFont: 定时器已禁用');
                }
                isConfigModified = true;
                updateMenuCommands();
                updatePanelCommands();
                updateSaveButton();
            }
        });

        bindButton('NiceFont_dynamic-adjustment-btn', () => {
            if (confirm(t.dynamicWatchConfirm)) {
                watchDOMChanges = !watchDOMChanges;
                if (watchDOMChanges) {
                    intervalSeconds = 0;
                    if (timer) clearInterval(timer);
                    observer = new MutationObserver(throttle(() => {
                        applyFontRecursively(document.body, currentAdjustment);
                    }, 100));
                    observer.observe(document.body, { childList: true, subtree: true });
                    log('NiceFont: 动态调整字体已启用');
                } else {
                    if (observer) observer.disconnect();
                    log('NiceFont: 动态调整字体已禁用');
                }
                isConfigModified = true;
                updateMenuCommands();
                updatePanelCommands();
                updateSaveButton();
            }
        });

        bindButton('NiceFont_config-currentConfigScope-btn', deleteCurrentConfig);

        bindButton('NiceFont_config-scope-btn', changeConfigScope);

        bindButton('NiceFont_switch-panel-btn', () => {
            const newPanelType = panelType === 'tampermonkey' ? 'floating' : 'tampermonkey';
            GM_setValue(PANEL_TYPE_KEY, newPanelType);
            panelType = newPanelType;
            updateMenuCommands();
            panel.remove();
            overlay.remove();
            log(`NiceFont: 切换到面板类型：${newPanelType}`);
        });

        bindButton('NiceFont_switch-language-btn', () => {
            let input;
            do {
                input = prompt(`zh: 汉语 \t en: English \t ko: 한국어 \t ja: 日本語 \t ru: Русский \t fr: Français \t de: Deutsch \t es: Español \t pt: Português`, currentLanguage);
                if (input && Object.keys(translations).indexOf(input.trim()) === -1) {
                    alert('Invalid language code!');
                }
            } while (input && Object.keys(translations).indexOf(input.trim()) === -1);
            if (input && input.trim() !== "") {
                currentLanguage = input.trim();
                GM_setValue('language', currentLanguage);
                updateMenuCommands();
                panel.remove();
                overlay.remove();
                createFloatingPanel();
                log(`NiceFont: 语言切换为 ${currentLanguage}`);
            }
        });

        bindButton('NiceFont_save-config-btn', saveConfig);
    }

    // 修改字体大小并保存配置、更新菜单
    function changeFontSize(increment) {
        currentAdjustment += increment;
        applyFontRecursively(document.body, currentAdjustment);
        updateMenuCommands();
        updatePanelCommands();
        log(`NiceFont: 字体大小改变${increment}px，当前调整：${currentAdjustment}px`);
    }

    // 更新面板命令
    function updatePanelCommands() {
        const t = translations[currentLanguage] || translations['en'];

        const firstAdjustmentBtn = document.getElementById('NiceFont_first-adjustment-btn');
        if (firstAdjustmentBtn) {
            firstAdjustmentBtn.textContent = `1️⃣ ${firstAdjustment ? t.firstAdjustmentEnabled : t.firstAdjustmentDisabled} ${firstAdjustment ? `【${firstAdjustmentTime}s】` : ''}`;
        }

        const timerAdjustmentBtn = document.getElementById('NiceFont_timer-adjustment-btn');
        if (timerAdjustmentBtn) {
            timerAdjustmentBtn.textContent = `⏱️ ${intervalSeconds > 0 ? t.timerAdjustmentEnabled : t.timerAdjustmentDisabled} ${intervalSeconds > 0 ? `【${intervalSeconds}s】` : ''}`;
        }

        const dynamicAdjustmentBtn = document.getElementById('NiceFont_dynamic-adjustment-btn');
        if (dynamicAdjustmentBtn) {
            dynamicAdjustmentBtn.textContent = `👁️ ${watchDOMChanges ? t.dynamicAdjustmentEnabled : t.dynamicAdjustmentDisabled}`;
        }

        const incrementBtn = document.getElementById('NiceFont_set-increment-btn');
        if (incrementBtn) {
            incrementBtn.textContent = `📈 ${t.setFontIncrement}: ${fontIncrement}px`;
        }

        const fontFamilyBtn = document.getElementById('NiceFont_set-font-family-btn');
        if (fontFamilyBtn) {
            fontFamilyBtn.textContent = `🖋️ ${t.setFontFamily}: ${currentFontFamily}`;
        }

        const scopeBtn = document.getElementById('NiceFont_config-scope-btn');
        if (scopeBtn) {
            scopeBtn.textContent = `ℹ️ ${t.configScope}: ${getConfigScopeDisplayText()}`;
        }

        const currentConfigScopeBtn = document.getElementById('NiceFont_config-currentConfigScope-btn');
        if (currentConfigScopeBtn) {
            currentConfigScopeBtn.textContent = `📍 ${t.currentConfigScope}: ${getCurrentConfigScopeText()}`;
        }
    }

    // 更新油猴脚本菜单
    function updateMenuCommands() {
        menuHandles.forEach(handle => {
            try {
                GM_unregisterMenuCommand(handle);
            } catch (e) {
                log('NiceFont: 取消注册菜单错误：', e);
            }
        });
        menuHandles = [];
        const t = translations[currentLanguage] || translations['en'];
        const currentScope = getCurrentConfigScope();
        const scopeText = currentScope === 1 ? t.subdomain : currentScope === 2 ? t.topLevelDomain : t.allWebsites;
        log('NiceFont: 更新菜单命令');

        // 定义所有命令，顺序与浮动面板一致（用于油猴菜单模式）
        const commands = [
            { id: 'status', text: `📏 ${t.fontSizeAdjustment}: ${currentAdjustment >= 0 ? '+' : ''}${currentAdjustment}px`, action: () => { } },
            {
                id: 'increase', text: `🔼 ${t.increase}`, action: () => {
                    changeFontSize(fontIncrement);
                    isConfigModified = true;
                }, autoClose: false
            },
            {
                id: 'decrease', text: `🔽 ${t.decrease}`, action: () => {
                    changeFontSize(-fontIncrement);
                    isConfigModified = true;
                }, autoClose: false
            },
            {
                id: 'reset', text: `🔁 ${t.reset}`, action: () => {
                    resetFont(document.body);
                    currentAdjustment = 0;
                    currentFontFamily = 'none';
                    watchDOMChanges = false;
                    intervalSeconds = 0;
                    firstAdjustment = false;
                    firstAdjustmentTime = 3;
                    if (observer) {
                        observer.disconnect();
                        observer = null;
                    }
                    if (timer) {
                        clearInterval(timer);
                        timer = null;
                    }
                    isConfigModified = true;
                    updateMenuCommands();
                    log('NiceFont: 恢复字体');
                }
            },
            {
                id: 'reapply', text: `♻️ ${t.reapply}`, action: () => {
                    applyFontRecursively(document.body, currentAdjustment);
                    log('NiceFont: 应用字体变化');
                }, autoClose: false
            },
            {
                id: 'setIncrement', text: `📈 ${t.setFontIncrement}: ${fontIncrement}px`, action: () => {
                    const input = prompt(t.setFontIncrementPrompt, fontIncrement.toString());
                    const newIncrement = parseInt(input, 10);
                    if (!isNaN(newIncrement) && newIncrement > 0) {
                        fontIncrement = newIncrement;
                        isConfigModified = true;
                        updateMenuCommands();
                        log(`NiceFont: 字体增量设置为${newIncrement}px`);
                    } else {
                        alert(t.setFontIncrementErrorAlert);
                    }
                }
            },
            {
                id: 'setFontFamily', text: `🖋️ ${t.setFontFamily}: ${currentFontFamily}`, action: () => {
                    const input = prompt(`${t.setFontFamilyPrompt}\n\n${t.supportFontFamily}\n${supportFonts.slice(0, -1).join(", ")}`, currentFontFamily);
                    if (input && input.trim() !== "") {
                        const newFont = input.trim();
                        if (!supportFonts.includes(newFont)) {
                            supportFonts.splice(supportFonts.length - 1, 0, newFont);
                        }
                        currentFontFamily = newFont;
                        // 通过 :root 设置字体类型
                        if (currentFontFamily !== 'none') {
                            document.documentElement.style.setProperty('--nicefont-family', currentFontFamily);
                        } else {
                            document.documentElement.style.removeProperty('--nicefont-family');
                        }
                        isConfigModified = true;
                        updateMenuCommands();
                        log(`NiceFont: 字体类型设置为 ${currentFontFamily}`);
                    } else {
                        alert(t.invalidFontFamilyAlert);
                    }
                }
            },
            {
                id: 'toggleFirstAdjustment', text: `1️⃣ ${firstAdjustment ? t.firstAdjustmentEnabled : t.firstAdjustmentDisabled} ${firstAdjustment ? `【${firstAdjustmentTime}s】` : ''}`, action: () => {
                    const input = prompt(t.firstAdjustmentConfirm, firstAdjustmentTime.toString());
                    const secs = parseInt(input, 10);
                    if (!isNaN(secs)) {
                        firstAdjustment = !firstAdjustment;
                        firstAdjustmentTime = secs;
                        if (secs === 0) {
                            firstAdjustment = false;
                        }
                        isConfigModified = true;
                        updateMenuCommands();
                        log(`NiceFont: 第一次调整字体已切换，时间设置为${secs}s`);
                    }
                }
            },
            {
                id: 'toggleTimer', text: `⏱️ ${intervalSeconds > 0 ? t.timerAdjustmentEnabled : t.timerAdjustmentDisabled} ${intervalSeconds > 0 ? `【${intervalSeconds}s】` : ''}`, action: () => {
                    const input = prompt(t.timerPrompt, intervalSeconds.toString());
                    const secs = parseInt(input, 10);
                    if (!isNaN(secs)) {
                        intervalSeconds = secs;
                        if (intervalSeconds > 0) {
                            watchDOMChanges = false;
                            if (observer) observer.disconnect();
                            if (timer) clearInterval(timer);
                            timer = setInterval(() => {
                                applyFontRecursively(document.body, currentAdjustment);
                            }, intervalSeconds * 1000);
                            log(`NiceFont: 定时调整字体已切换，时间设置为${secs}s`);
                        } else {
                            if (timer) clearInterval(timer);
                            log('NiceFont: 定时调整字体已禁用');
                        }
                        isConfigModified = true;
                        updateMenuCommands();
                    }
                }
            },
            {
                id: 'toggleWatch', text: `👁️ ${watchDOMChanges ? t.dynamicAdjustmentEnabled : t.dynamicAdjustmentDisabled}`, action: () => {
                    if (confirm(t.dynamicWatchConfirm)) {
                        watchDOMChanges = !watchDOMChanges;
                        if (watchDOMChanges) {
                            intervalSeconds = 0;
                            if (timer) clearInterval(timer);
                            observer = new MutationObserver(throttle(() => {
                                applyFontRecursively(document.body, currentAdjustment);
                            }, 100));
                            observer.observe(document.body, { childList: true, subtree: true });
                            log('NiceFont: 动态调整字体已启用');
                        } else {
                            if (observer) observer.disconnect();
                            log('NiceFont: 动态调整字体已禁用');
                        }
                        isConfigModified = true;
                        updateMenuCommands();
                    }
                }
            },
            {
                id: 'switchLanguage', text: `🌐 ${t.usageLanguage}: ${currentLanguage}`, action: () => {
                    let input;
                    do {
                        input = prompt(`zh: 汉语 \t en: English \t ko: 한국어 \t ja: 日本語 \t ru: Русский \t fr: Français \t de: Deutsch \t es: Español \t pt: Português`, currentLanguage);
                        if (input && Object.keys(translations).indexOf(input.trim()) === -1) {
                            alert('Invalid language code!');
                        }
                    } while (input && Object.keys(translations).indexOf(input.trim()) === -1);
                    if (input && input.trim() !== "") {
                        currentLanguage = input.trim();
                        GM_setValue('language', currentLanguage);
                        updateMenuCommands();
                        log(`NiceFont: 语言切换为 ${currentLanguage}`);
                    }
                }
            },
            {
                id: 'switchPanel', text: `🎨 ${t.switchPanel}: ${panelType === 'tampermonkey' ? t.tampermonkeyPanel : t.floatingPanel}`, action: () => {
                    const newPanelType = panelType === 'tampermonkey' ? 'floating' : 'tampermonkey';
                    GM_setValue(PANEL_TYPE_KEY, newPanelType);
                    panelType = newPanelType;
                    updateMenuCommands();
                    const panel = document.getElementById('NiceFont_panel');
                    const overlay = document.getElementById('NiceFont_overlay');
                    if (panel) {
                        panel.remove();
                        log('NiceFont: 移除面板型开关上现有的面板');
                    }
                    if (overlay) {
                        overlay.remove();
                        log('NiceFont: 移除了面板开关上现有的覆盖层');
                    }
                    log(`NiceFont: 切换到面板类型：${newPanelType}`);
                }
            },
            { id: 'currentConfigScope', text: `📍 ${t.currentConfigScope}: ${getCurrentConfigScopeText()}`, action: deleteCurrentConfig },
            { id: 'configScope', text: `ℹ️ ${t.configScope}: ${scopeText}`, action: changeConfigScope },
            { id: 'saveConfig', text: `💾 ${isConfigModified ? t.saveConfigPending : t.saveConfig}`, action: saveConfig },
        ];

        // 注册命令
        if (panelType === 'floating') {
            // 仅注册“切换菜单面板”和“显示面板”
            const switchPanelHandle = GM_registerMenuCommand(
                `🎨 ${t.switchPanel}: ${panelType === 'tampermonkey' ? t.tampermonkeyPanel : t.floatingPanel}`,
                () => {
                    const newPanelType = panelType === 'tampermonkey' ? 'floating' : 'tampermonkey';
                    GM_setValue(PANEL_TYPE_KEY, newPanelType);
                    panelType = newPanelType;
                    updateMenuCommands();
                    const panel = document.getElementById('NiceFont_panel');
                    const overlay = document.getElementById('NiceFont_overlay');
                    if (panel) {
                        panel.remove();
                        log('NiceFont: 移除面板型开关上现有的面板');
                    }
                    if (overlay) {
                        overlay.remove();
                        log('NiceFont: 移除了面板开关上现有的覆盖层');
                    }
                    log(`NiceFont: 切换到面板类型：${newPanelType}`);
                }
            );
            menuHandles.push(switchPanelHandle);
            log('NiceFont: 注册切换面板菜单');

            const showPanelHandle = GM_registerMenuCommand(`📅 ${t.showPanel}`, () => {
                const panel = document.getElementById('NiceFont_panel');
                const overlay = document.getElementById('NiceFont_overlay');
                if (panel) {
                    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
                    overlay.style.display = panel.style.display === 'none' ? 'none' : 'block';
                    log(`NiceFont: 切换面板为 ${panel.style.display}, 屏蔽层设为 ${overlay.style.display}`);
                } else {
                    createFloatingPanel();
                }
            });
            menuHandles.push(showPanelHandle);
            log('NiceFont: 注册显示面板菜单');
        } else {
            // 油猴菜单模式：注册所有命令（不包括“显示面板”）
            commands.forEach(cmd => {
                const handle = GM_registerMenuCommand(cmd.text, cmd.action, { autoClose: cmd.autoClose });
                menuHandles.push(handle);
                log(`NiceFont: 注册菜单：${cmd.id}`);
            });
        }
    }

    // 检查是否有可见文本
    function hasVisibleText(el) {
        return Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "");
    }

    // 批量更新字体
    function applyFontRecursively(el, increment) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;
        if (el.id === 'NiceFont_panel' || el.hasAttribute('data-nicefont-panel')) {
            log('NiceFont: 跳过对面板的字体调整');
            return;
        }

        const style = window.getComputedStyle(el);
        const isVisible = style.display !== "none" && style.visibility !== "hidden";

        if (hasVisibleText(el) && isVisible) {
            let currentFontSize = el.style.fontSize || style.fontSize;

            if (!el.hasAttribute('data-default-fontsize')) {
                el.setAttribute('data-default-fontsize', currentFontSize); // 存储默认字体大小
            }

            const baseFontSize = parseFloat(convertToPx(el, el.getAttribute('data-default-fontsize')));

            if (!isNaN(baseFontSize)) {
                const newFontSize = baseFontSize + increment;
                el.style.fontSize = `${newFontSize}px`; // 设置字体大小
            }
        }

        // 通过 :root 设置字体类型
        if (currentFontFamily !== 'none') {
            document.documentElement.style.setProperty('--nicefont-family', currentFontFamily);
        } else {
            document.documentElement.style.removeProperty('--nicefont-family');
        }

        // 处理 iframe
        if (el.tagName === 'IFRAME') {
            try {
                const iframeDocument = el.contentDocument || el.contentWindow.document;
                if (iframeDocument) {
                    applyFontRecursively(iframeDocument.body, increment);
                    // 为 iframe 的 :root 设置字体类型
                    if (currentFontFamily !== 'none') {
                        iframeDocument.documentElement.style.setProperty('--nicefont-family', currentFontFamily);
                    } else {
                        iframeDocument.documentElement.style.removeProperty('--nicefont-family');
                    }
                }
            } catch (e) {
                log('NiceFont: 访问 iframe 时出错:', e);
            }
        }

        // 处理 Shadow DOM
        if (el.shadowRoot) {
            const shadowChildren = el.shadowRoot.querySelectorAll('*');
            shadowChildren.forEach(child => applyFontRecursively(child, increment));
        }

        // 递归处理子元素
        Array.from(el.children).forEach(child => {
            requestAnimationFrame(() => applyFontRecursively(child, increment));
        });
    }

    // 重置字体
    function resetFont(el) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;
        if (el.id === 'NiceFont_panel' || el.hasAttribute('data-nicefont-panel')) {
            log('NiceFont: 跳过对面板的字体重置');
            return;
        }

        // 恢复字体大小
        const defaultSize = el.getAttribute('data-default-fontsize');
        if (defaultSize) {
            el.style.fontSize = defaultSize; // 恢复到原始字体大小
            el.removeAttribute('data-default-fontsize'); // 清理属性
        } else {
            el.style.removeProperty('font-size'); // 移除内联字体大小
        }

        // 移除内联字体类型
        el.style.removeProperty('font-family');

        // 通过 :root 重置字体类型
        try {
            document.documentElement.style.removeProperty('--nicefont-family');
        } catch (e) {
            log('NiceFont: 移除 --nicefont-family 失败:', e);
        }

        // 处理 Shadow DOM
        if (el.shadowRoot) {
            try {
                const shadowChildren = el.shadowRoot.querySelectorAll('*');
                shadowChildren.forEach(child => resetFont(child));
                // 重置 Shadow DOM 的 :root
                const shadowRoot = el.shadowRoot;
                if (shadowRoot.adoptedStyleSheets && shadowRoot.adoptedStyleSheets.length > 0) {
                    log('NiceFont: Shadow DOM 包含样式表，跳过重置');
                } else {
                    const style = shadowRoot.querySelector('style');
                    if (style) {
                        style.textContent = style.textContent.replace(/--nicefont-family:[^;]+;/g, '');
                    }
                }
            } catch (e) {
                log('NiceFont: 处理 Shadow DOM 失败:', e);
            }
        }

        // 处理 iframe
        if (el.tagName === 'IFRAME') {
            try {
                const iframeDocument = el.contentDocument || el.contentWindow.document;
                if (iframeDocument) {
                    resetFont(iframeDocument.body);
                    // 重置 iframe 的 :root
                    iframeDocument.documentElement.style.removeProperty('--nicefont-family');
                }
            } catch (e) {
                log('NiceFont: 访问 iframe 时出错，重置字体失败:', e);
            }
        }

        // 递归重置子元素
        try {
            Array.from(el.children).forEach(child => resetFont(child));
        } catch (e) {
            log('NiceFont: 递归重置子元素失败:', e);
        }
    }

    // 转换字体单位
    function convertToPx(el, fontSize) {
        if (!fontSize) return 16;
        if (fontSize.includes("rem")) {
            const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
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
        if (fontSize.includes("pt")) {
            return parseFloat(fontSize) * 1.3333;
        }
        if (fontSize.includes("vw")) {
            return parseFloat(fontSize) * window.innerWidth / 100;
        }
        if (fontSize.includes("vh")) {
            return parseFloat(fontSize) * window.innerHeight / 100;
        }
        return parseFloat(fontSize);
    }

    // 初始化
    log('NiceFont: 正在初始化菜单');
    updateMenuCommands();

    if (currentAdjustment !== 0 || currentFontFamily !== 'none') {
        if (firstAdjustment && firstAdjustmentTime > 0) {
            setTimeout(() => {
                applyFontRecursively(document.body, currentAdjustment);
                log('NiceFont: 应用第一次字体调整');
            }, firstAdjustmentTime * 1000);
        }

        if (watchDOMChanges) {
            if (timer) clearInterval(timer);
            observer = new MutationObserver(throttle(() => {
                applyFontRecursively(document.body, currentAdjustment);
            }, 100));
            observer.observe(document.body, { childList: true, subtree: true });
            log('NiceFont: 启用动态字体调整');
        } else if (intervalSeconds > 0) {
            if (observer) observer.disconnect();
            timer = setInterval(() => {
                applyFontRecursively(document.body, currentAdjustment);
            }, intervalSeconds * 1000);
            log(`NiceFont: 使用${intervalSeconds}s间隔启用基于定时器的字体调整`);
        }
    }

    log('NiceFont: 脚本初始化完成');
})();