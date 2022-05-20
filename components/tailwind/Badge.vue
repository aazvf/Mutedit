<template>
    <span type="button" :class="classNames" v-bind="$attrs">
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

export default defineComponent({
    name: "Badge",
    props: {
        theme: { type: String, required: true },
        attrs: { type: Object, required: false, default: {} },
    },
    computed: {
        classNames() {
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
