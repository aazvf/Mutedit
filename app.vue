<template>
    <div :class="classList">
        <div class="container mx-auto p-5 p-sm-2">
            <div>
                <div
                    v-for="(color, index) in theme.colors"
                    :key="index"
                    :class="`rounded-lg inline-block w-10 h-10 m-3 bg-${color}-500`"
                    v-on:click="onColorClick(color)"
                ></div>
            </div>
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </div>
</template>


<script setup>
// https://v3.nuxtjs.org/guide/features/head-management/
useHead({
    titleTemplate: "Mutedit - %s",
    title: "",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1.5",
    charset: "utf-8",
    meta: [
        {
            name: "Mutedit - Browse while ignoring topics",
            content:
                "Mutedit lets you browse reddit while ignoring a set of words and subreddits you configure.",
        },
    ],
    htmlAttrs: {
        class: "dark",
    },
    bodyAttrs: {
        // class: "bg-lime-100 dark:bg-gray-900 font-sans",
    },
});
</script>


<script>
export default defineComponent({
    data() {
        return {
            theme: useTheme(),
        };
    },
    computed: {
        classList() {
            const { lightBg, lightText, darkBg, darkText } = this.theme;
            const classes = [lightBg, lightText, darkBg, darkText].join(" ");
            return "w-full min-h-screen " + classes;
        },
    },

    methods: {
        onColorClick(color) {
            this.theme.color = color;
            this.$localstorage.saveUserTheme();
        },
    },
});
</script>
