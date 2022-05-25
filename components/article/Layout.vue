<template>
    <tailwind-card>
        <scrolled-past v-on:seen="article.seen = true">
            <template #content>
                <article-title-meta-info :article="article" />
                <article-title :article="article" />
                <article-media :article="article" />
                <div class="px-1 pb-2 leading-7">
                    <article-comments-fetch-buttons :article="article" />

                    <article-meta-badges :article="article" />
                </div>
                <article-comments :article="article" class="mb-1" />
            </template>
            <template #replace>
                <tailwind-badge theme="focused" v-on:click="scrolledPast = false">auto hidden (show)</tailwind-badge>
                <span class="text-xs">
                    <span :class="$theme().text3">[{{ article.data.subreddit.toLowerCase() }}]</span>
                    {{ article.data.title.substr(0,30) }}{{ article.data.title.length > 30 ? '...' : '' }}
                </span>
            </template>
        </scrolled-past>
    </tailwind-card>
</template>



<script>
export default {
    name: "Article layout",
    props: {
        article: { type: Object, default: {} },
    },
};
</script>
