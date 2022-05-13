<template>
    <div>
        <small class="mb-0 text-md font-light tracking-tight text-gray-900 dark:text-gray-500">
            <span v-if="article.isLink">Link</span>
            <span v-if="article.isImage">Image</span>
            <span v-if="article.isGif">Gif</span>
            <span v-if="article.isGallery">Gallery</span>
            <span v-if="article.isText">Text</span>
            <span v-if="article.isVideo">Video</span>
            <span v-if="article.isVideoGif">Gif</span>
            <a
                target="blank"
                :href="'https://old.reddit.com' + article.data.permalink"
                rel="nofollow noopener"
                class="font-italic ml-1 dark:text-violet-300"
            >posted</a>
            {{ $timeSince(article.data.created) }} ago to
            <a
                class="dark:text-violet-300"
                target="blank"
                rel="noopener noreferer"
                :href="'/' + article.data.subreddit_name_prefixed"
            >{{article.data.subreddit_name_prefixed}}</a>
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