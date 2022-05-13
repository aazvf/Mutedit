<template>
    <div :class="classNames" v-bind="$attrs">
        <slot />
    </div>
</template>

<script>
const base =
    "block py-1 px-4 my-2 mb-2 mx-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ";
const classes = {
    default: "",
};

export default defineComponent({
    name: "Card",
    props: {
        theme: { type: String, required: false, default: "default" },
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
