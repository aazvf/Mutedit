<template>
    <div :class="classNames">
        <slot />
    </div>
</template>

<script>
const base =
    "block py-1 px-2 md:px-4 my-4 mx-3 rounded-lg border border-transparent drop-shadow-md break-inside-avoid ";
const classes = {
    default: "",
};

export default defineComponent({
    name: "Card",
    props: {
        theme: { type: String, required: false, default: "default" },
        attrs: { type: Object, required: false, default: {} },
    },
    data() {
        return {
            userTheme: useTheme(),
        };
    },
    computed: {
        classNames() {
            const baseclasses = [base, this.$theme().bg2].join(" ");
            return (
                baseclasses +
                (typeof classes[this.theme] === "string"
                    ? classes[this.theme]
                    : classes["default"])
            );
        },
    },
});
</script>
