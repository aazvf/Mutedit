
class Theme {

    color: string;

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

    constructor(theme) {
        this.color = theme;
    }

    text(i) {
        return `text-${this.color}-${i}`
    }

    bg(i) {
        return `bg-${this.color}-${i}`
    }

    get lightText() {
        return this.text(900);
    }

    get lightBg () {
        return this.bg(100);
    }

    get lightBg2 () {
        return this.bg(200);
    }

    get darkText () {
        return "dark:" + this.text(100);
    }

    get darkBg () {
        return "dark:" + this.bg(900);
    }
    get darkBg2 () {
        return "dark:" + this.bg(800);
    }
}

export default () => {
    return useState('user-theme', () => new Theme('pink'))
}