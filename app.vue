<template>
    <div :class="themeClassList">
        <Head>
            <Link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <Link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <Link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <Link rel="manifest" href="/site.webmanifest" />
            <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <Meta name="msapplication-TileColor" content="#da532c" />
            <Meta name="theme-color" content="#ffffff" />
        </Head>
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
            const { bg1, text1, align, transform } = this.theme;
            return [
                "w-full min-h-screen subpixel-antialiased",
                bg1,
                text1,
                `text-${align}`,
                transform,
            ].join(" ");
        },
    },
    mounted() {
        this.$localstorage.restoreAll();
    },
});
</script>
