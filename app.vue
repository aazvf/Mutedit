<template>
    <div :class="themeClassList">
        <div :class="containerClassList">
            <theme />
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
        containerClassList() {
            return [
                "p-1 md:p-5",
                this.theme.container ? "container mx-auto" : "",
            ];
        },
        themeClassList() {
            const { bg1, text1, align, textTransform } = this.theme;
            return [
                "w-full min-h-screen subpixel-antialiased",
                bg1,
                text1,
                `text-${align}`,
                textTransform,
            ].join(" ");
        },
    },
    mounted() {
        console.log("MOUNTTINNNNGGG");
        this.$localstorage.restoreAll();
    },
});
</script>
