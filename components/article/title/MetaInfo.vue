<template>
    <div
        :class="[' pl-1 block pt-1 text-xs w-full leading-4 truncate text-ellipsis overflow-hidden', $theme().text3]"
    >
        <span v-if="article.isLink">Link</span>
        <span v-if="article.isImage">Image</span>
        <span v-if="article.isGif || article.isGifv || article.isVideoGif">Gif</span>
        <span v-if="article.isGallery">Gallery</span>
        <span v-if="article.isText">Text</span>
        <span v-if="article.isVideo || article.isEmbed">Video</span>
        <a
            target="blank"
            :href="'https://old.reddit.com' + article.data.permalink"
            rel="nofollow noopener"
            :class="['font-italic ml-1', $theme().text5]"
            v-if="!article.data.pinned"
        >posted</a>
        <a
            target="blank"
            :href="'https://old.reddit.com' + article.data.permalink"
            rel="nofollow noopener"
            :class="['font-italic ml-1', $theme().text5]"
            v-if="article.data.pinned"
        >pinned</a>
        {{ $timeSince(article.data.created) }} ago to
        <NuxtLink
            :class="$theme().text5"
            target="blank"
            rel="noopener noreferer"
            :href="$buildUrl({query: article.data.subreddit})"
        >{{article.data.subreddit_name_prefixed}}</NuxtLink>
        <tailwind-badge
            theme="static"
            :class="['py-0 pt-0.5 px-5 leading-4 float-right block', $theme().text8]"
        >({{ article.data.domain }})</tailwind-badge>
    </div>
</template>



<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
});
</script>