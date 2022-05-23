
class Theme {

    color: string;
    accent: string;
    dark = false;
    align = 'left';
    container = true;
    columns = 0;
    transform = 'lowercase';

    showSort = true;
    showTypes = true;
    showDescription = true;
    showMutedSubs = true;

    show = "sort,types,description,subs,words,status";


    showing(component) {
        return this.show.includes(component);
    }

    toggleUi(component) {
        this.show = this.showing(component) ? 
        this.show.split(',').filter(c => c !== component).join(',') :
        this.show + ',' + component;
    }

    persistent = [
        'color', 'accent', 'dark', 'align',
        'container', 'columns', 'transform', 'show'
    ]

    get export () {
        this.setMetaTheme();
        return this.persistent.map(t => [t, this[t]]);
    }

    import (theme: Array<[string, string|number|boolean]>) {
        try {
            theme.forEach(t => {
                if (typeof this[t[0]] !== undefined) {
                    if (t[0] === 'dark') {
                        this.setDark(t[1]);
                    } else {
                        this[t[0]] = t[1];
                    }
                }
            });
            this.setMetaTheme();
        } catch (e) {
            console.error(e);
        }
    }

    colors = [
        'slate', 
        'gray',
        'zinc',
        'neutral',
        'stone',
        'red',
        'orange',
        'amber',
        'yellow',
        'lime',
        'green',
        'emerald',
        'teal',
        'cyan',
        'sky',
        'blue',
        'indigo',
        'violet',
        'purple',
        'fuchsia',
        'pink',
        'rose',
    ];

    colorMap = {
        slate: ["cbd5e1", "0f172a"],
        gray: ["d1d5db", "111827"],
        zinc: ["d4d4d8", "18181b"],
        neutral: ["d4d4d4", "171717"],
        stone: ["d6d3d1", "1c1917"],
        red: ["fca5a5", "7f1d1d"],
        orange: ["fdba74", "7c2d12"],
        amber: ["fcd34d", "78350f"],
        yellow: ["fde047", "713f12"],
        lime: ["bef264", "365314"],
        green: ["86efac", "14532d"],
        emerald: ["6ee7b7", "064e3b"],
        teal: ["5eead4", "134e4a"],
        cyan: ["67e8f9", "164e63"],
        sky: ["7dd3fc", "0c4a6e"],
        blue: ["93c5fd", "1e3a8a"],
        indigo: ["a5b4fc", "312e81"],
        violet: ["c4b5fd", "4c1d95"],
        purple: ["d8b4fe", "581c87"],
        fuchsia: ["f0abfc", "701a75"],
        pink: ["f9a8d4", "831843"],
        rose: ["fda4af", "881337"],
    };

    constructor() {
        this.color = this.randColor();
        this.accent = this.randColor();
    }

    randColor (except = []) {
        const colors = this.colors.filter((c) => except.length > this.colors.length-1 || !except.includes(c));
        return colors[(colors.length * Math.random()) | 0];
    }

    randTheme (except = []) {
        return [this.randColor(except), this.randColor(except)];
    }

    toggleDark() {
        document.documentElement.classList.toggle("dark");
        this.dark = !this.dark;
    }

    setDark(dark) {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        this.dark = dark;
    }

    setMetaTheme () {
        const meta = document.querySelector("[name=theme-color]");
        const value = "#" + (this.dark ? this.colorMap[this.color][1] : this.colorMap[this.color][0]);
        if (meta) {
            meta.setAttribute("content", value);
        } else {
            const el = document.createElement("meta");
            el.setAttribute("name", "theme-color");
            el.setAttribute("content", value);
            document.querySelector('head').appendChild(el);
        }
    }

    get text1 () {
        return this.text(900);
    }
    get text2 () {
        return this.text(800);
    }
    get text3 () {
        return this.text(700);
    }
    get text4 () {
        return this.text(600);
    }
    get text5 () {
        return this.text(500);
    }
    get text8 () {
        return this.text(200);
    }
    get text9 () {
        return this.text(100);
    }

    get bg1 () {
        return this.bg(100);
    }
    get bg2 () {
        return this.bg(200);
    }
    get bg3 () {
        return this.bg(300);
    }
    get bg4 () {
        return this.bg(400);
    }
    get bg5 () {
        return this.bg(500);
    }

    get bg8 () {
        return this.bg(800);
    }

    get border1 () {
        return this.border(100);
    }
    get border2 () {
        return this.border(200);
    }
    get border3 () {
        return this.border(300);
    }
    get border4 () {
        return this.border(400);
    }
    get border5 () {
        return this.border(500);
    }


    text(i, accent = true) {
        const color = accent ? this.accent : this.color;
        return `text-${color}-${i} dark:text-${color}-${1000-i}`;
    }

    bg(i, accent = false) {
        const color = accent ? this.accent : this.color;
        return `bg-${color}-${i} dark:bg-${color}-${1000-i}`;
    }

    border(i) {
        return `border-${this.accent}-${i} dark:border-${this.accent}-${1000-i}`;
    }

    fill(i) {
        return `fill-${this.color}-${i} dark:fill-${this.color}-${1000-i}`;
    }

}

// Whether the settings are open or not
export const useSettingsOpen = () => {
    return useState('settings-open', () => false);
}

// Return an instance of the Theme class (above) accessible anywhere with useTheme()
export default () => {
    return useState('user-theme', () => new Theme())
}