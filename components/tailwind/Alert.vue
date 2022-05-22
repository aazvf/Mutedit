<template>
    <div :class="classNames" role="alert" v-bind="$attrs">
        <span class="font-medium" v-if="title.length > 0">{{ title }}</span>
        <slot />
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

const base =
    "py-2 px-3 mx-3 mt-2 text-sm rounded-lg text-left inline-block text-ellipsis rounded ";
const classes = {
    info: "text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800",
    danger: "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800",
    success:
        "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800",
    warning:
        "text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800",
    dark: "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300",
};

export default defineComponent({
    name: "Alert",
    props: {
        theme: { type: String, required: true },
        title: { type: String, required: false, default: "" },
    },
    data() {
        return {
            userTheme: useTheme(),
        };
    },
    computed: {
        classNames() {
            const themed = {
                active: [this.userTheme.bg(500, true), this.userTheme.text1],
                inactive: [this.userTheme.bg2, this.userTheme.text2],
                filled: [this.userTheme.bg3, this.userTheme.text1],
                bordered: [
                    "border",
                    this.userTheme.border3,
                    this.userTheme.text2,
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
