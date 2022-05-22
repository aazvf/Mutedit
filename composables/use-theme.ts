
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

    constructor(color, accent) {
        this.color = color;
        this.accent = accent;
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