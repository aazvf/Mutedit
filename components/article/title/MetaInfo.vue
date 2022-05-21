<template>
    <div>
        <small
            class="mb-0 text-md font-light tracking-tight max-w-fit truncate text-ellipsis overflow-hidden"
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
                class="font-italic ml-1 dark:text-violet-300"
                v-if="!article.data.pinned"
            >posted</a>
            <a
                target="blank"
                :href="'https://old.reddit.com' + article.data.permalink"
                rel="nofollow noopener"
                class="font-italic ml-1 dark:text-green-500"
                v-if="article.data.pinned"
            >pinned</a>
            {{ $timeSince(article.data.created) }} ago to
            <NuxtLink
                class="dark:text-violet-300"
                target="blank"
                rel="noopener noreferer"
                :href="$buildUrl({query: article.data.subreddit})"
            >{{article.data.subreddit_name_prefixed}}</NuxtLink>
            <span class="ml-2 text-gray-500">({{ article.data.domain }})</span>
        </small>
    </div>
</template>



<script>
export default defineComponent({
    props: {
        article: { type: Object, required: true },
    },
});
</script>