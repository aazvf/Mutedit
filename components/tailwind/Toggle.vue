<template>
    <label
        for="default-toggle"
        class="inline-flex relative items-center cursor-pointer mr-5 whitespace-nowrap truncate text-ellipsis overflow-hidden max-w-full"
        v-bind="$attrs"
    >
        <input type="checkbox" class="sr-only peer" v-model="value" />
        <div :class="classNames" v-on:click="$emit('toggle')"></div>
        <span class="ml-3 text-sm font-medium">
            <slot></slot>
        </span>
    </label>
</template>

<script>
const base =
    "w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all transition-opacity";
export default defineComponent({
    name: "Toggle",
    props: { value: { type: Boolean, required: true } },
    computed: {
        classNames() {
            return [
                base,
                "peer-focus:ring-slate-700 dark:peer-focus:ring-slate-200 after:bg-slate-700 dark:after:bg-slate-400",
                this.value ? "opacity-100" : "opacity-40",
                this.$theme.bg(500, true),
                this.$theme.border5,
            ].join(" ");
        },
    },
});
</script>
