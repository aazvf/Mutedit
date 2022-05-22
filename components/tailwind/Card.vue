<template>
    <div :class="classNames" v-bind="$attrs">
        <slot />
    </div>
</template>

<script>
const base =
    "block py-1 px-2 md:px-4 my-2 mb-2 mx-3 rounded-lg border border-transparent shadow-md  ";
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
            const baseclasses = [base, this.userTheme.bg2].join(" ");
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
