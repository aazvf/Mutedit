
class Theme {

    color: string;
    accent: string;
    dark = false;

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
        slate: ["f1f5f9", "0f172a"],
        gray: ["f3f4f6", "111827"],
        zinc: ["f4f4f5", "18181b"],
        neutral: ["f5f5f5", "171717"],
        stone: ["f5f5f4", "1c1917"],
        red: ["fee2e2", "7f1d1d"],
        orange: ["ffedd5", "7c2d12"],
        amber: ["fef3c7", "78350f"],
        yellow: ["fef9c3", "713f12"],
        lime: ["ecfccb", "365314"],
        green: ["dcfce7", "14532d"],
        emerald: ["d1fae5", "064e3b"],
        teal: ["ccfbf1", "134e4a"],
        cyan: ["cffafe", "164e63"],
        sky: ["e0f2fe", "0c4a6e"],
        blue: ["dbeafe", "1e3a8a"],
        indigo: ["e0e7ff", "312e81"],
        violet: ["ede9fe", "4c1d95"],
        purple: ["f3e8ff", "581c87"],
        fuchsia: ["fae8ff", "701a75"],
        pink: ["fce7f3", "831843"],
        rose: ["ffe4e6", "881337"],
    };

    constructor(color, accent) {
        this.color = color;
        this.accent = accent;
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


    text(i) {
        return `text-${this.accent}-${i} dark:text-${this.accent}-${1000-i}`;
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

export default () => {
    return useState('user-theme', () => new Theme('pink', 'pink'))
}