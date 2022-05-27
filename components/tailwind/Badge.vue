<template>
    <span type="button" :attrs="$attrs" :class="classNames">
        <slot></slot>
    </span>
</template>

<script>
const base =
    "text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer select-none ";
const classes = {
    default: "bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800",
    dark: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    red: "bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900",
    green: "bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900",
    indigo: "bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900",
    pink: "bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900",
    darker: "bg-zinc-800 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-400",
};

// $theme is the global theme plugin that gives tailwind classes based on user preferences.
// this.theme is the prop like <tailwind-badge theme="active"
// it can be static,active,inactive,disabled,focused,bordered which will use user theme
//  based colors. otherwise can use the above keynames in `classes` for predefined colors.
export default defineComponent({
    name: "Badge",
    props: {
        theme: { type: String, required: true },
    },
    computed: {
        classNames() {
            const themed = {
                static: [this.$theme.bg(100, false), this.$theme.text3],
                active: [
                    this.$theme.bg(800, true),
                    this.$theme.text(100, false),
                ],
                inactive: [this.$theme.bg2, this.$theme.text1],
                disabled: [this.$theme.bg2, "text-transparent"],
                focused: [
                    this.$theme.bg(300, true),
                    this.$theme.text1,
                    // "underline decoration-2",
                ],
                bordered: [
                    "border",
                    this.$theme.border5,
                    this.$theme.text(900, false),
                    this.$theme.bg(400, false),
                    // this.$theme.bg3,
                ],
            };
            if (typeof themed[this.theme] === "object") {
                return [base, ...themed[this.theme]].join(" ");
            }

            return (
                base +
                (typeof classes[this.theme] === "string"
                    ? classes[this.theme]
                    : classes["default"])
            );
        },
    },
});
</script>
