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
// @version      1.4
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
// @downloadURL https://update.greasyfork.org/scripts/533232/NiceFont.user.js
// @updateURL   https://update.greasyfork.org/scripts/533232/NiceFont.meta.js
// ==/UserScript==

(function () {
    'use strict';

    if (window.top !== window.self) return; // 不在顶层页面时直接退出脚本

    const STORAGE_KEY = 'NiceFont_config'; // 存储字体大小和字体类型配置的键

    const supportFonts = [
        'auto', 'Arial', 'cursive', 'emoji', 'fangsong', 'fantasy', 'math', 'monospace', 'none', 'sans-serif', 'serif',
        'system-ui', 'ui-monospace', 'ui-rounded', 'ui-sans-serif', 'ui-serif', '-webkit-body',
        'inherit', 'initial', 'revert', 'revert-layer', 'unset',
        'Verdana', 'Helvetica', 'Tahoma', 'Times New Roman', 'Georgia', 'Courier New', 'Comic Sans MS',
    ];

    // 多语言文本。支持汉语(zh)、英语(en)、韩语(ko)、日语(ja)、俄语(ru)、法语(fr)、德语(de)、西班牙语(es)、葡萄牙语(pt)
    const translations = {
        zh: {
            fontSizeAdjustment: "字体大小调整: ",
            setFontIncrement: "设置字体增量: ",
            increase: "放大字体",
            decrease: "缩小字体",
            reset: "恢复字体",
            reapply: "应用字体变化",
            toggleWatch: "动态调整字体",
            toggleTimer: "定时调整字体",
            firstAdjustmentEnabled: "首次调整字体: ✔️",
            firstAdjustmentDisabled: "首次调整字体: ✖️",
            dynamicAdjustmentEnabled: "动态调整字体: ✔️",
            dynamicAdjustmentDisabled: "动态调整字体: ✖️",
            timerAdjustmentEnabled: "定时调整字体: ✔️",
            timerAdjustmentDisabled: "定时调整字体: ✖️",
            usageLanguage: "切换菜单语言: ",
            saveConfig: "保存配置",
            firstAdjustmentConfirm: "确定要切换首次调整字体的功能状态吗？\n启用后首次访问页面三秒后将自动调整字体。\n\n注意: \n该操作需要保存配置并刷新页面才可生效！",
            dynamicWatchConfirm: "确定要切换动态调整字体的功能状态吗？\n启用后页面有新内容将自动调整字体。\n\n注意: 启用该功能后在浏览复杂页面时可能存在卡顿现象！\n该操作需要保存配置并刷新页面才可生效！",
            timerPrompt: "确定要切换定时调整字体的功能状态吗？\n请输入定时应用字体变化的间隔时间（单位: 秒，输入0则关闭）\n\n注意: 启用该功能后在浏览复杂页面时可能存在卡顿现象！\n该操作需要保存配置并刷新页面才可生效！",
            setFontIncrementPrompt: "输入字体增量（默认为1px）: ",
            setFontIncrementErrorAlert: "无效的递增值，请输入一个正数。",
            setFontFamily: "设置字体类型: ",
            setFontFamilyPrompt: "输入字体类型（默认为none）: ",
            supportFontFamily: "支持的字体: ",
            invalidFontFamilyAlert: "您输入的字体不受支持，请选择一个有效的字体。",
            saveConfigConfirm: "请选择保存配置的方式！\n'确定'仅对当前网站生效，'取消'则对所有网站生效。",
        },
        en: {
            fontSizeAdjustment: "Font Size Adjustment: ",
            setFontIncrement: "Set Font Increment: ",
            increase: "Increase Font Size",
            decrease: "Decrease Font Size",
            reset: "Reset Font",
            reapply: "Reapply Font Changes",
            toggleWatch: "Toggle Dynamic Font Adjustment",
            toggleTimer: "Toggle Timer-based Font Adjustment",
            firstAdjustmentEnabled: "First Font Adjustment: ✔️",
            firstAdjustmentDisabled: "First Font Adjustment: ✖️",
            dynamicAdjustmentEnabled: "Dynamic Font Adjustment: ✔️",
            dynamicAdjustmentDisabled: "Dynamic Font Adjustment: ✖️",
            timerAdjustmentEnabled: "Timer-based Font Adjustment: ✔️",
            timerAdjustmentDisabled: "Timer-based Font Adjustment: ✖️",
            usageLanguage: "Switch Menu Language: ",
            saveConfig: "Save Configuration",
            firstAdjustmentConfirm: "Are you sure you want to toggle the first font adjustment feature? After enabling, the font will adjust automatically 3 seconds after first visiting a page.\n\nNote: \nThis operation requires saving the configuration and refreshing the page to take effect!",
            dynamicWatchConfirm: "Are you sure you want to toggle the dynamic font adjustment feature? After enabling, the font will adjust dynamically when new content appears on the page.\n\nNote: Enabling this feature may cause lag when browsing complex pages!\nThis operation requires saving the configuration and refreshing the page to take effect!",
            timerPrompt: "Are you sure you want to toggle the timer-based font adjustment feature? Please enter the interval time (in seconds) for applying font changes at regular intervals (enter 0 to disable).\n\nNote: Enabling this feature may cause lag when browsing complex pages!\nThis operation requires saving the configuration and refreshing the page to take effect!",
            setFontIncrementPrompt: "Enter font increment (default is 1px): ",
            setFontIncrementErrorAlert: "Invalid increment value. Please enter a positive number.",
            setFontFamily: "Set Font Family: ",
            setFontFamilyPrompt: "Enter font family (default is none): ",
            supportFontFamily: "Supported Fonts: ",
            invalidFontFamilyAlert: "The font you entered is not supported. Please choose a valid font.",
            saveConfigConfirm: "Please choose how you would like to save the configuration!\n'Ok' will apply to the current website only, 'Cancel' will apply to all websites.",
        },
        ko: {
            fontSizeAdjustment: "글꼴 크기 조정: ",
            setFontIncrement: "글꼴 증가 설정: ",
            increase: "글꼴 크기 확대",
            decrease: "글꼴 크기 축소",
            reset: "글꼴 초기화",
            reapply: "글꼴 변경 재적용",
            toggleWatch: "동적 글꼴 조정 전환",
            toggleTimer: "타이머 기반 글꼴 조정 전환",
            firstAdjustmentEnabled: "첫 번째 글꼴 조정: ✔️",
            firstAdjustmentDisabled: "첫 번째 글꼴 조정: ✖️",
            dynamicAdjustmentEnabled: "동적 글꼴 조정: ✔️",
            dynamicAdjustmentDisabled: "동적 글꼴 조정: ✖️",
            timerAdjustmentEnabled: "타이머 기반 글꼴 조정: ✔️",
            timerAdjustmentDisabled: "타이머 기반 글꼴 조정: ✖️",
            usageLanguage: "메뉴 언어 전환: ",
            saveConfig: "구성 저장",
            firstAdjustmentConfirm: "첫 번째 글꼴 조정 기능을 전환하시겠습니까? 활성화 시, 페이지를 처음 방문한 후 3초 후에 자동으로 글꼴이 조정됩니다.\n\n주의: \n이 작업은 구성을 저장하고 페이지를 새로 고침해야만 적용됩니다!",
            dynamicWatchConfirm: "동적 글꼴 조정 기능을 전환하시겠습니까? 활성화 후 페이지에 새로운 내용이 나타날 때 글꼴이 자동으로 조정됩니다.\n\n주의: 이 기능을 활성화하면 복잡한 페이지를 탐색할 때 지연이 발생할 수 있습니다!\n이 작업은 구성을 저장하고 페이지를 새로 고침해야만 적용됩니다!",
            timerPrompt: "타이머 기반 글꼴 조정 기능을 전환하시겠습니까? 글꼴 변화를 적용할 간격 시간을 (초 단위로) 입력하십시오(0을 입력하면 비활성화됨).\n\n주의: 이 기능을 활성화하면 복잡한 페이지를 탐색할 때 지연이 발생할 수 있습니다!\n이 작업은 구성을 저장하고 페이지를 새로 고침해야만 적용됩니다!",
            setFontIncrementPrompt: "글꼴 증가 값을 입력하십시오 (기본값: 1px): ",
            setFontIncrementErrorAlert: "잘못된 증가 값입니다. 양의 숫자를 입력하십시오.",
            setFontFamily: "글꼴 유형 설정: ",
            setFontFamilyPrompt: "글꼴 유형을 입력하십시오 (기본값: none): ",
            supportFontFamily: "지원되는 글꼴: ",
            invalidFontFamilyAlert: "입력한 글꼴은 지원되지 않습니다. 유효한 글꼴을 선택하십시오.",
            saveConfigConfirm: "구성 저장 방식을 선택하십시오!\n'확인'은 현재 사이트에만 적용되고, '취소'는 모든 사이트에 적용됩니다.",
        },
        ja: {
            fontSizeAdjustment: "フォントサイズ調整: ",
            setFontIncrement: "フォント増分設定: ",
            increase: "フォントサイズを拡大",
            decrease: "フォントサイズを縮小",
            reset: "フォントリセット",
            reapply: "フォント変更を再適用",
            toggleWatch: "動的フォント調整の切替",
            toggleTimer: "タイマーによるフォント調整の切替",
            firstAdjustmentEnabled: "初回フォント調整: ✔️",
            firstAdjustmentDisabled: "初回フォント調整: ✖️",
            dynamicAdjustmentEnabled: "動的フォント調整: ✔️",
            dynamicAdjustmentDisabled: "動的フォント調整: ✖️",
            timerAdjustmentEnabled: "タイマーによるフォント調整: ✔️",
            timerAdjustmentDisabled: "タイマーによるフォント調整: ✖️",
            usageLanguage: "メニュー言語を切り替え: ",
            saveConfig: "設定を保存",
            firstAdjustmentConfirm: "初回フォント調整機能を切り替えますか？有効にすると、ページを初めて訪問してから3秒後に自動でフォントが調整されます。\n\n注意: \nこの操作は設定を保存し、ページを更新してから適用されます！",
            dynamicWatchConfirm: "動的フォント調整機能を切り替えますか？有効にすると、ページに新しい内容が表示された時にフォントが自動で調整されます。\n\n注意: この機能を有効にすると、複雑なページを閲覧する際に遅延が発生する可能性があります！\nこの操作は設定を保存し、ページを更新してから適用されます！",
            timerPrompt: "タイマーによるフォント調整機能を切り替えますか？定期的にフォント変更を適用する間隔（秒単位）を入力してください（0を入力すると無効になります）。\n\n注意: この機能を有効にすると、複雑なページを閲覧する際に遅延が発生する可能性があります！\nこの操作は設定を保存し、ページを更新してから適用されます！",
            setFontIncrementPrompt: "フォント増分を入力してください（デフォルトは1px）：",
            setFontIncrementErrorAlert: "無効な増分値です。正の数を入力してください。",
            setFontFamily: "フォントファミリー設定: ",
            setFontFamilyPrompt: "フォントファミリーを入力してください（デフォルトはnone）：",
            supportFontFamily: "サポートされているフォント：",
            invalidFontFamilyAlert: "入力されたフォントはサポートされていません。有効なフォントを選択してください。",
            saveConfigConfirm: "設定保存方法を選択してください！\n「OK」は現在のサイトにのみ適用され、「キャンセル」はすべてのサイトに適用されます。",
        },
        ru: {
            fontSizeAdjustment: "Настройка размера шрифта: ",
            setFontIncrement: "Установить увеличение шрифта: ",
            increase: "Увеличить шрифт",
            decrease: "Уменьшить шрифт",
            reset: "Сбросить шрифт",
            reapply: "Применить изменения шрифта",
            toggleWatch: "Переключить динамическую настройку шрифта",
            toggleTimer: "Переключить настройку шрифта по таймеру",
            firstAdjustmentEnabled: "Первоначальная настройка шрифта: ✔️",
            firstAdjustmentDisabled: "Первоначальная настройка шрифта: ✖️",
            dynamicAdjustmentEnabled: "Динамическая настройка шрифта: ✔️",
            dynamicAdjustmentDisabled: "Динамическая настройка шрифта: ✖️",
            timerAdjustmentEnabled: "Настройка шрифта по таймеру: ✔️",
            timerAdjustmentDisabled: "Настройка шрифта по таймеру: ✖️",
            usageLanguage: "Переключить язык меню: ",
            saveConfig: "Сохранить настройки",
            firstAdjustmentConfirm: "Вы уверены, что хотите переключить настройку первоначального шрифта? После включения, шрифт будет автоматически изменяться через 3 секунды после первого посещения страницы.\n\nВнимание: \nЭта операция требует сохранения настроек и обновления страницы, чтобы они вступили в силу!",
            dynamicWatchConfirm: "Вы уверены, что хотите переключить динамическую настройку шрифта? После включения, шрифт будет автоматически изменяться, когда появляется новый контент на странице.\n\nВнимание: Включение этой функции может привести к задержкам при просмотре сложных страниц!\nЭта операция требует сохранения настроек и обновления страницы, чтобы они вступили в силу!",
            timerPrompt: "Вы уверены, что хотите переключить настройку шрифта по таймеру? Пожалуйста, введите интервал времени для применения изменений шрифта (в секундах). Введите 0, чтобы отключить.\n\nВнимание: Включение этой функции может привести к задержкам при просмотре сложных страниц!\nЭта операция требует сохранения настроек и обновления страницы, чтобы они вступили в силу!",
            setFontIncrementPrompt: "Введите увеличение шрифта (по умолчанию 1px): ",
            setFontIncrementErrorAlert: "Неверное значение увеличения. Пожалуйста, введите положительное число.",
            setFontFamily: "Установить семейство шрифта: ",
            setFontFamilyPrompt: "Введите семейство шрифта (по умолчанию none): ",
            supportFontFamily: "Поддерживаемые шрифты: ",
            invalidFontFamilyAlert: "Введенный вами шрифт не поддерживается. Пожалуйста, выберите действительный шрифт.",
            saveConfigConfirm: "Выберите способ сохранения настроек!\n'OK' применяется только для текущего сайта, 'Cancel' — для всех сайтов.",
        },
        fr: {
            fontSizeAdjustment: "Ajustement de la taille de la police: ",
            setFontIncrement: "Définir l'incrément de la police: ",
            increase: "Augmenter la taille de la police",
            decrease: "Réduire la taille de la police",
            reset: "Réinitialiser la police",
            reapply: "Réappliquer les changements de police",
            toggleWatch: "Basculer l'ajustement dynamique de la police",
            toggleTimer: "Basculer l'ajustement de la police basé sur un minuteur",
            firstAdjustmentEnabled: "Premier ajustement de la police: ✔️",
            firstAdjustmentDisabled: "Premier ajustement de la police: ✖️",
            dynamicAdjustmentEnabled: "Ajustement dynamique de la police: ✔️",
            dynamicAdjustmentDisabled: "Ajustement dynamique de la police: ✖️",
            timerAdjustmentEnabled: "Ajustement de la police par minuterie: ✔️",
            timerAdjustmentDisabled: "Ajustement de la police par minuterie: ✖️",
            usageLanguage: "Changer la langue du menu: ",
            saveConfig: "Sauvegarder la configuration",
            firstAdjustmentConfirm: "Voulez-vous vraiment changer l'état de la fonction d'ajustement initial de la police? Après activation, la police sera automatiquement ajustée 3 secondes après la première visite de la page.\n\nAttention: \nCette opération nécessite d'enregistrer la configuration et de rafraîchir la page pour qu'elle prenne effet!",
            dynamicWatchConfirm: "Voulez-vous vraiment changer l'état de la fonction d'ajustement dynamique de la police? Après activation, la police sera automatiquement ajustée lorsque de nouveaux contenus apparaissent sur la page.\n\nAttention: L'activation de cette fonction peut entraîner des ralentissements lors de la navigation sur des pages complexes!\nCette opération nécessite d'enregistrer la configuration et de rafraîchir la page pour qu'elle prenne effet!",
            timerPrompt: "Voulez-vous vraiment changer l'état de la fonction d'ajustement de la police par minuterie? Veuillez entrer l'intervalle de temps (en secondes) pour appliquer les changements de police régulièrement (entrez 0 pour désactiver).\n\nAttention: L'activation de cette fonction peut entraîner des ralentissements lors de la navigation sur des pages complexes!\nCette opération nécessite d'enregistrer la configuration et de rafraîchir la page pour qu'elle prenne effet!",
            setFontIncrementPrompt: "Entrez l'incrément de la police (par défaut 1px): ",
            setFontIncrementErrorAlert: "Valeur d'incrément invalide. Veuillez entrer un nombre positif.",
            setFontFamily: "Définir la famille de police: ",
            setFontFamilyPrompt: "Entrez la famille de police (par défaut none): ",
            supportFontFamily: "Polices prises en charge: ",
            invalidFontFamilyAlert: "La police que vous avez saisie n'est pas prise en charge. Veuillez choisir une police valide.",
            saveConfigConfirm: "Veuillez choisir comment vous souhaitez enregistrer la configuration!\n'OK' s'applique uniquement au site actuel, 'Annuler' s'applique à tous les sites.",
        },
        de: {
            fontSizeAdjustment: "Schriftgrößeneinstellung: ",
            setFontIncrement: "Schrifterhöhung festlegen: ",
            increase: "Schriftgröße vergrößern",
            decrease: "Schriftgröße verkleinern",
            reset: "Schrift zurücksetzen",
            reapply: "Schriftänderungen erneut anwenden",
            toggleWatch: "Dynamische Schriftgrößenanpassung umschalten",
            toggleTimer: "Zeitgesteuerte Schriftgrößenanpassung umschalten",
            firstAdjustmentEnabled: "Erste Schriftanpassung: ✔️",
            firstAdjustmentDisabled: "Erste Schriftanpassung: ✖️",
            dynamicAdjustmentEnabled: "Dynamische Schriftanpassung: ✔️",
            dynamicAdjustmentDisabled: "Dynamische Schriftanpassung: ✖️",
            timerAdjustmentEnabled: "Zeitgesteuerte Schriftanpassung: ✔️",
            timerAdjustmentDisabled: "Zeitgesteuerte Schriftanpassung: ✖️",
            usageLanguage: "Menüsprache wechseln: ",
            saveConfig: "Konfiguration speichern",
            firstAdjustmentConfirm: "Möchten Sie die erste Schriftanpassungsfunktion umschalten? Nach der Aktivierung wird die Schrift drei Sekunden nach dem ersten Besuch der Seite automatisch angepasst.\n\nAchtung: \nDiese Operation erfordert das Speichern der Konfiguration und das Aktualisieren der Seite, damit sie wirksam wird!",
            dynamicWatchConfirm: "Möchten Sie die dynamische Schriftanpassungsfunktion umschalten? Nach der Aktivierung wird die Schrift automatisch angepasst, wenn neuer Inhalt auf der Seite erscheint.\n\nAchtung: Das Aktivieren dieser Funktion kann zu Verzögerungen beim Browsen komplexer Seiten führen!\nDiese Operation erfordert das Speichern der Konfiguration und das Aktualisieren der Seite, damit sie wirksam wird!",
            timerPrompt: "Möchten Sie die zeitgesteuerte Schriftanpassungsfunktion umschalten? Bitte geben Sie das Intervall (in Sekunden) für die regelmäßige Anwendung der Schriftänderungen ein (geben Sie 0 ein, um sie zu deaktivieren).\n\nAchtung: Das Aktivieren dieser Funktion kann zu Verzögerungen beim Browsen komplexer Seiten führen!\nDiese Operation erfordert das Speichern der Konfiguration und das Aktualisieren der Seite, damit sie wirksam wird!",
            setFontIncrementPrompt: "Geben Sie die Schriftinkrementgröße ein (Standard ist 1px): ",
            setFontIncrementErrorAlert: "Ungültiger Inkrementwert. Bitte geben Sie eine positive Zahl ein.",
            setFontFamily: "Schriftfamilie festlegen: ",
            setFontFamilyPrompt: "Geben Sie die Schriftfamilie ein (Standard ist none): ",
            supportFontFamily: "Unterstützte Schriftarten: ",
            invalidFontFamilyAlert: "Die eingegebene Schriftart wird nicht unterstützt. Bitte wählen Sie eine gültige Schriftart.",
            saveConfigConfirm: "Bitte wählen Sie, wie Sie die Konfiguration speichern möchten!\n'OK' gilt nur für die aktuelle Website, 'Abbrechen' gilt für alle Websites.",
        },
        es: {
            fontSizeAdjustment: "Ajuste del tamaño de fuente: ",
            setFontIncrement: "Establecer incremento de fuente: ",
            increase: "Aumentar tamaño de fuente",
            decrease: "Disminuir tamaño de fuente",
            reset: "Restablecer fuente",
            reapply: "Reaplicar cambios de fuente",
            toggleWatch: "Alternar ajuste dinámico de fuente",
            toggleTimer: "Alternar ajuste de fuente basado en temporizador",
            firstAdjustmentEnabled: "Primer ajuste de fuente: ✔️",
            firstAdjustmentDisabled: "Primer ajuste de fuente: ✖️",
            dynamicAdjustmentEnabled: "Ajuste dinámico de fuente: ✔️",
            dynamicAdjustmentDisabled: "Ajuste dinámico de fuente: ✖️",
            timerAdjustmentEnabled: "Ajuste de fuente por temporizador: ✔️",
            timerAdjustmentDisabled: "Ajuste de fuente por temporizador: ✖️",
            usageLanguage: "Cambiar idioma del menú: ",
            saveConfig: "Guardar configuración",
            firstAdjustmentConfirm: "¿Está seguro de que desea cambiar el estado de la función de ajuste de fuente inicial? Después de activarla, la fuente se ajustará automáticamente 3 segundos después de la primera visita a la página.\n\nAtención: \n¡Esta operación requiere guardar la configuración y actualizar la página para que tenga efecto!",
            dynamicWatchConfirm: "¿Está seguro de que desea cambiar el estado de la función de ajuste dinámico de fuente? Después de activarla, la fuente se ajustará automáticamente cuando aparezca nuevo contenido en la página.\n\nAtención: ¡Activar esta función puede causar retrasos al navegar por páginas complejas!\n¡Esta operación requiere guardar la configuración y actualizar la página para que tenga efecto!",
            timerPrompt: "¿Está seguro de que desea cambiar el estado de la función de ajuste de fuente por temporizador? Introduzca el intervalo (en segundos) para aplicar los cambios de fuente de manera periódica (introduzca 0 para desactivarlo).\n\nAtención: ¡Activar esta función puede causar retrasos al navegar por páginas complejas!\n¡Esta operación requiere guardar la configuración y actualizar la página para que tenga efecto!",
            setFontIncrementPrompt: "Introduzca el incremento de fuente (por defecto 1px): ",
            setFontIncrementErrorAlert: "Valor de incremento inválido. Introduzca un número positivo.",
            setFontFamily: "Establecer familia de fuentes: ",
            setFontFamilyPrompt: "Introduzca la familia de fuentes (por defecto none): ",
            supportFontFamily: "Fuentes compatibles: ",
            invalidFontFamilyAlert: "La fuente que ha introducido no es compatible. Por favor, elija una fuente válida.",
            saveConfigConfirm: "¡Seleccione cómo desea guardar la configuración!\n'OK' solo se aplicará al sitio actual, 'Cancelar' se aplicará a todos los sitios.",
        },
        pt: {
            fontSizeAdjustment: "Ajuste de tamanho da fonte: ",
            setFontIncrement: "Definir incremento de fonte: ",
            increase: "Aumentar o tamanho da fonte",
            decrease: "Diminuir o tamanho da fonte",
            reset: "Redefinir fonte",
            reapply: "Reaplicar alterações da fonte",
            toggleWatch: "Alternar ajuste dinâmico de fonte",
            toggleTimer: "Alternar ajuste de fonte com base em temporizador",
            firstAdjustmentEnabled: "Primeiro ajuste de fonte: ✔️",
            firstAdjustmentDisabled: "Primeiro ajuste de fonte: ✖️",
            dynamicAdjustmentEnabled: "Ajuste dinâmico de fonte: ✔️",
            dynamicAdjustmentDisabled: "Ajuste dinâmico de fonte: ✖️",
            timerAdjustmentEnabled: "Ajuste de fonte com temporizador: ✔️",
            timerAdjustmentDisabled: "Ajuste de fonte com temporizador: ✖️",
            usageLanguage: "Alterar idioma do menu: ",
            saveConfig: "Salvar configuração",
            firstAdjustmentConfirm: "Tem certeza de que deseja alternar o estado da função de ajuste de fonte inicial? Após ativado, a fonte será ajustada automaticamente 3 segundos após a primeira visita à página.\n\nAtenção: \nEsta operação requer salvar as configurações e atualizar a página para que tenha efeito!",
            dynamicWatchConfirm: "Tem certeza de que deseja alternar o estado da função de ajuste dinâmico de fonte? Após ativado, a fonte será ajustada automaticamente quando aparecer novo conteúdo na página.\n\nAtenção: Ativar esta função pode causar lentidão ao navegar em páginas complexas!\nEsta operação requer salvar as configurações e atualizar a página para que tenha efeito!",
            timerPrompt: "Tem certeza de que deseja alternar o estado da função de ajuste de fonte com base em temporizador? Por favor, insira o intervalo (em segundos) para aplicar as mudanças de fonte periodicamente (insira 0 para desativar).\n\nAtenção: Ativar esta função pode causar lentidão ao navegar em páginas complexas!\nEsta operação requer salvar as configurações e atualizar a página para que tenha efeito!",
            setFontIncrementPrompt: "Digite o incremento da fonte (padrão é 1px): ",
            setFontIncrementErrorAlert: "Valor de incremento inválido. Por favor, insira um número positivo.",
            setFontFamily: "Definir família de fontes: ",
            setFontFamilyPrompt: "Digite a família de fontes (padrão é none): ",
            supportFontFamily: "Fontes suportadas: ",
            invalidFontFamilyAlert: "A fonte inserida não é suportada. Por favor, escolha uma fonte válida.",
            saveConfigConfirm: "Selecione como deseja salvar as configurações!\n'OK' aplica apenas ao site atual, 'Cancelar' aplica a todos os sites.",
        },
    };

    // 读取配置
    let localConfig = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    let globalConfig = GM_getValue(STORAGE_KEY, {});

    let currentLanguage = GM_getValue('language', navigator.language); // 获取用户的语言设置，默认语言为浏览器所设置的语言

    // 检查是否支持当前语言，如果不支持，则使用中文（zh）或英文（en）
    if (!translations[currentLanguage]) {
        if (currentLanguage.startsWith('zh')) {
            currentLanguage = 'zh';
        } else {
            currentLanguage = 'en';
        }
    }

    // 获取字体类型配置
    let fontIncrement = localConfig.increment || globalConfig.increment || 1;
    let currentFontFamily = localConfig.fontFamily || globalConfig.fontFamily || 'none';
    let currentAdjustment = localConfig.resize || globalConfig.resize || 0;
    let watchDOMChanges = localConfig.watcher ?? globalConfig.watcher ?? false;
    let intervalSeconds = localConfig.timer || globalConfig.timer || 0;
    let firstAdjustment = localConfig.first ?? globalConfig.first ?? false;

    let observer = null;
    let timer = null;

    let menuHandles = {}; // 用来存储油猴菜单项

    // 更新菜单命令
    updateMenuCommands();

    if (currentAdjustment !== 0 || currentFontFamily != 'none') {

        // 首次自动调整字体
        if (firstAdjustment) {
            setTimeout(() => {
                applyFontRecursively(document.body, currentAdjustment);
            }, 3000); // 延迟以确保页面加载完毕
        }

        // 启用动态调整字体
        if (watchDOMChanges) {
            // 如果启用了动态调整字体，禁用定时调整
            if (timer) clearInterval(timer);
            observer = new MutationObserver(() => {
                applyFontRecursively(document.body, currentAdjustment);
            });
            observer.observe(document.body, { childList: true, subtree: true });
        } else if (intervalSeconds > 0) {
            // 启用定时调整字体
            if (observer) observer.disconnect();  // 禁用动态调整
            timer = setInterval(() => {
                applyFontRecursively(document.body, currentAdjustment);
            }, intervalSeconds * 1000);
        }

    }

    // 保存字体调整配置到 localstorage
    function saveLocalConfig() {
        localConfig = {
            increment: fontIncrement || 1,
            resize: currentAdjustment || 0,
            watcher: watchDOMChanges || false,
            timer: intervalSeconds || 0,
            fontFamily: currentFontFamily || 'none',
            first: firstAdjustment || false
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(localConfig));
        console.log('localConfig', localConfig);
    }

    // 保存字体调整配置到 GM
    function saveGlobalConfig() {
        globalConfig = {
            increment: fontIncrement || 1,
            resize: currentAdjustment || 0,
            watcher: watchDOMChanges || false,
            timer: intervalSeconds || 0,
            fontFamily: currentFontFamily || 'none',
            first: firstAdjustment || false
        }
        GM_setValue(STORAGE_KEY, globalConfig);
        console.log('globalConfig', globalConfig);
    }

    // 修改字体大小并保存配置、更新菜单
    function changeFontSize(increment) {
        currentAdjustment += increment;
        applyFontRecursively(document.body, currentAdjustment);
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
        menuHandles.increase = GM_registerMenuCommand(`🔼 ${t.increase}`, () => changeFontSize(fontIncrement), { autoClose: false });

        // 缩小字体
        menuHandles.decrease = GM_registerMenuCommand(`🔽 ${t.decrease}`, () => changeFontSize(-fontIncrement), { autoClose: false });

        // 恢复默认字体
        menuHandles.reset = GM_registerMenuCommand(`🔁 ${t.reset}`, () => {
            resetFont(document.body);
            currentAdjustment = 0;
            watchDOMChanges = false;
            intervalSeconds = 0;
            if (observer) observer.disconnect();
            if (timer) clearInterval(timer);
            localStorage.removeItem(STORAGE_KEY);
            updateMenuCommands();
        });

        // 重新应用字体调整
        menuHandles.reapply = GM_registerMenuCommand(`♻️ ${t.reapply}`, () => {
            applyFontRecursively(document.body, currentAdjustment);
        }, { autoClose: false });

        // 设置增量值
        menuHandles.setIncrement = GM_registerMenuCommand(`⚙️ ${t.setFontIncrement} ${fontIncrement}px`, () => {
            const input = prompt(`${t.setFontIncrementPrompt}`, fontIncrement.toString());
            const newIncrement = parseInt(input, 10);
            if (!isNaN(newIncrement) && newIncrement > 0) {
                fontIncrement = newIncrement;
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
                currentFontFamily = input.trim();
                applyFontRecursively(document.body, currentAdjustment);
                updateMenuCommands();
            }
        });

        // 切换首次调整字体功能
        menuHandles.toggleFirstAdjustment = GM_registerMenuCommand(`${firstAdjustment ? '1️⃣ ' + t.firstAdjustmentEnabled : '1️⃣ ' + t.firstAdjustmentDisabled}`, () => {
            if (confirm(t.firstAdjustmentConfirm)) {
                firstAdjustment = !firstAdjustment;
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
                updateMenuCommands();
            }
        });

        // 切换定时调整字体功能
        menuHandles.toggleTimer = GM_registerMenuCommand(intervalSeconds > 0 ? `⏱️ ${t.timerAdjustmentEnabled}【${intervalSeconds}s】` : `⏱️ ${t.timerAdjustmentDisabled}`, () => {
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
                updateMenuCommands();
            }
        });

        // 切换语言功能
        menuHandles.switchLanguage = GM_registerMenuCommand(`🌐 ${t.usageLanguage} ${currentLanguage}`, () => {
            let input;
            do {
                input = prompt(`zh: 汉语 \t en: English \t ko: 한국어 \t ja: 日本語 \t ru: Русский \t fr: Français \t de: Deutsch \t es: Español \t pt: Português`, currentLanguage);
                if (input && Object.keys(translations).indexOf(input.trim()) === -1) {
                    alert('!!');
                }
            } while (input && Object.keys(translations).indexOf(input.trim()) === -1);

            if (input && input.trim() !== "") {
                currentLanguage = input;
                GM_setValue('language', currentLanguage);
                updateMenuCommands();
            }
        });

        // 保存配置
        menuHandles.saveConfig = GM_registerMenuCommand(`💾 ${t.saveConfig}`, () => {
            if (confirm(`${t.saveConfigConfirm}`)) {
                // 使用 localstorage 存储配置，局部生效
                saveLocalConfig();
            } else {
                // 使用 GM 油猴存储配置，全局生效
                saveGlobalConfig();
            }
        });
    }

    // 检查是否有可见文本
    function hasVisibleText(el) {
        return Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "");
    }

    // 批量更新字体
    function applyFontRecursively(el, increment) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;

        const style = window.getComputedStyle(el);
        const isVisible = style.display !== "none" && style.visibility !== "hidden";

        if (hasVisibleText(el) && isVisible) {
            let currentFontSize = el.style.fontSize || style.fontSize;

            // 标记默认字体大小
            if (!el.hasAttribute('data-default-fontsize')) {
                el.setAttribute('data-default-fontsize', currentFontSize);
            }

            const baseFontSize = parseFloat(convertToPx(el, el.getAttribute('data-default-fontsize')));

            if (!isNaN(baseFontSize)) {
                const newFontSize = baseFontSize + increment;
                el.style.fontSize = `${newFontSize}px`;
            }

            // 设置字体类型
            if (el.style.fontFamily !== currentFontFamily) {
                el.style.fontFamily = currentFontFamily;
                Array.from(el.getElementsByTagName('*')).forEach(child => {
                    child.style.fontFamily = currentFontFamily;
                });

            }
        }

        // 处理 iframe 中的 document.body
        if (el.tagName === 'IFRAME') {
            try {
                const iframeDocument = el.contentDocument || el.contentWindow.document;
                if (iframeDocument) {
                    applyFontRecursively(iframeDocument.body, increment);
                }
            } catch (e) {
                // console.warn('无法访问 iframe 内容', e);
            }
        }

        // 支持处理 Shadow DOM 中的字体调整。如果有 shadowRoot，递归处理 shadow DOM 中的元素
        if (el.shadowRoot) {
            const shadowChildren = el.shadowRoot.querySelectorAll('*');
            shadowChildren.forEach(child => applyFontRecursively(child, increment));
        }

        // 遍历子元素，异步更新字体大小
        Array.from(el.children).forEach(child => {
            requestAnimationFrame(() => applyFontRecursively(child, increment));
        });
    }

    // 重置字体
    function resetFont(el) {
        if (el.nodeType !== Node.ELEMENT_NODE) return;

        const defaultSize = el.getAttribute('data-default-fontsize');
        if (defaultSize) {
            el.style.fontSize = defaultSize;
            el.removeAttribute('data-default-fontsize');
            currentFontFamily = 'none'
            el.style.fontFamily = currentFontFamily;
        }

        Array.from(el.children).forEach(child => resetFont(child));
    }

    // 转换字体单位（支持 px, em, rem, pt）
    function convertToPx(el, fontSize) {
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
            // 1pt = 1.3333px
            return parseFloat(fontSize) * 1.3333;
        }
        if (fontSize.includes("vw")) {
            // 根据视口宽度来转换
            return parseFloat(fontSize) * window.innerWidth / 100;
        }
        if (fontSize.includes("vh")) {
            // 根据视口高度来转换
            return parseFloat(fontSize) * window.innerHeight / 100;
        }
        return fontSize;
    }

})();
