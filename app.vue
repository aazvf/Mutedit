<template>
    <div :class="themeClassList">
        <div class="container mx-auto p-1 md:p-5">
            <theme-picker />
            <theme-dark-switch />
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
        themeClassList() {
            const { bg1, text1 } = this.theme;
            return ["w-full min-h-screen ", bg1, text1].join(" ");
        },
    },
    mounted() {
        console.log("MOUNTTINNNNGGG");
        this.$localstorage.restoreAll();
    },
});
</script>
