
<template>
    <div class="relative" v-if="settingsOpen || show">
        <theme-hidden-badge v-if="settingsOpen && button" :hidden="!show" v-on:click="toggle" />
        <slot />
    </div>
</template>


<script>
export default defineComponent({
    name: "User toggled component",
    props: {
        uid: { type: String, required: true },
        button: { type: Boolean, default: true, required: false },
    },
    data() {
        return {
            settingsOpen: useSettingsOpen(),
            theme: useTheme(),
        };
    },
    computed: {
        show() {
            return this.theme.showing(this.uid);
        },
    },
    methods: {
        toggle() {
            this.theme.toggleUi(this.uid);
            this.$localstorage.saveUserTheme();
        },
    },
});
</script>
