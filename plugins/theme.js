// Globally accessible class which acts as a wrapper around the useTheme composable
//  for converting settings into tailwind classes like bg-blue-200 dark:bg-blue-800
class Theme {
    get color() {
        return this.store.value.color;
    }
    get accent() {
        return this.store.value.accent;
    }
    get dark() {
        return this.store.value.dark;
    }
    get align() {
        return this.store.value.align;
    }
    get container() {
        return this.store.value.container;
    }
    get columns() {
        return this.store.value.columns;
    }
    get transform() {
        return this.store.value.transform;
    }
    get hideAfterSeen() {
        return this.store.value.hideAfterSeen;
    }
    get show() {
        return this.store.value.show;
    }

    set color(color) {
        return (this.store.value.color = color);
    }
    set accent(accent) {
        return (this.store.value.accent = accent);
    }
    set dark(dark) {
        return (this.store.value.dark = dark);
    }
    set align(align) {
        return (this.store.value.align = align);
    }
    set container(container) {
        return (this.store.value.container = container);
    }
    set columns(columns) {
        return (this.store.value.columns = columns);
    }
    set transform(transform) {
        return (this.store.value.transform = transform);
    }
    set hideAfterSeen(hideAfterSeen) {
        return (this.store.value.hideAfterSeen = hideAfterSeen);
    }
    set show(show) {
        return (this.store.value.show = show);
    }

    store = {};

    constructor() {
        this.store = useTheme();
    }

    colors = [
        "slate",
        "gray",
        "zinc",
        "neutral",
        "stone",
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose",
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

    persistent = ["color", "accent", "dark", "align", "container", "columns", "transform", "show"];

    showing(component) {
        return component.split(",").some((c) => this.show.includes(c));
    }

    toggleUi(component) {
        this.show = this.showing(component)
            ? this.show
                  .split(",")
                  .filter((c) => c !== component)
                  .join(",")
            : this.show + "," + component;
    }

    randColor(except = []) {
        const colors = this.colors.filter((c) => except.length > this.colors.length - 1 || !except.includes(c));
        return colors[(colors.length * Math.random()) | 0];
    }

    randTheme(except = []) {
        return [this.randColor(except), this.randColor(except)];
    }

    toggleDark() {
        this.dark = !this.dark;
        this.setDark(this.dark);
    }

    setDark(dark) {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        this.dark = dark;
    }

    get metaColor() {
        return "#" + this.colorMap[this.color][+this.dark];
    }

    get text1() {
        return this.text(900);
    }
    get text2() {
        return this.text(800);
    }
    get text3() {
        return this.text(700);
    }
    get text4() {
        return this.text(600);
    }
    get text5() {
        return this.text(500);
    }
    get text8() {
        return this.text(200);
    }
    get text9() {
        return this.text(100);
    }

    get bg1() {
        return this.bg(100);
    }
    get bg2() {
        return this.bg(200);
    }
    get bg3() {
        return this.bg(300);
    }
    get bg4() {
        return this.bg(400);
    }
    get bg5() {
        return this.bg(500);
    }

    get bg8() {
        return this.bg(800);
    }

    get border1() {
        return this.border(100);
    }
    get border2() {
        return this.border(200);
    }
    get border3() {
        return this.border(300);
    }
    get border4() {
        return this.border(400);
    }
    get border5() {
        return this.border(500);
    }

    text(i, accent = true) {
        const color = accent ? this.accent : this.color;
        return `text-${color}-${i} dark:text-${color}-${1000 - i}`;
    }

    bg(i, accent = false) {
        const color = accent ? this.accent : this.color;
        return `bg-${color}-${i} dark:bg-${color}-${1000 - i}`;
    }

    border(i) {
        return `border-${this.accent}-${i} dark:border-${this.accent}-${1000 - i}`;
    }

    fill(i) {
        return `fill-${this.color}-${i} dark:fill-${this.color}-${1000 - i}`;
    }
}

export default defineNuxtPlugin(() => {
    return {
        provide: {
            theme: new Theme(),
        },
    };
});
