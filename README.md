# Mutedit - A reddit browser where you can ignore topics and subreddits

- nuxt3, vue, tailwind

Live demo static site: [http://mutedit.icey.one.s3-website.eu-west-1.amazonaws.com/](http://mutedit.icey.one.s3-website.eu-west-1.amazonaws.com/)


Browse reddit front page and subreddits while ignoring posts containing words you define.

Tired of hearing about the latest news story? Simply mute those words and never see posts about them as you browse.

Have absolutely no interest in a particular subreddit? Just mute it and never see their posts again.

Despise the privacy invading surveillance tactics used by reddit? Mutedit is serverless, open source and has no tracking whatsoever, not even cookies.




## Features

 - Browse the front page, a subreddit or multireddit using a url like /r/sub+sub 
 - Lazy loading previews for links, images & videos. 
 - Comments! Shows top level comments, click to expand the tree of child comments and load more.
 - Sort by best,top,new,controversial,rising,hot
 - Limit posts to a certain type like links, imgaes, videos and text posts.
 - Mute custom words and subreddits from ever showing up in your feed, or toggle to show what it's hiding.
 - Customize the theme to how you like it, choosing colours, alignments, layouts and more.
 - Videos are played natively using html5 video and audio tags.
 - Posts collapse after you've scrolled past so you can get back to the top quickly.
 - Auto load more articles as you scroll



The author invites you to view, modify, critique, learn from, re-host, and generally do anything with this code 


### How to mute words/subreddits

Wait for the posts to load, then draw your attention to the "mute words" area near the top, it shows you all the popular words from the posts that have loaded so far, clicking a word here will add it to your personal list of muted words. Similarly, the "mute subreddits" will work the same way.

Additionally, you can highlight a word or phrase and use the popup to mute custom words

### Theme ????

My favourite feature. Click the coloured boxes at the top to set a random theme, or "more settings" to manually set colours and more.

These settings and your muted words settings are stored in your browser's localstorage, if something gets really broken you might need to clear it.



## app.vue

Sets some global meta data and uses `<NuxtPage>` to trigger the nuxt3 pages system and auto load the correct component from /pages/

## assets

    data - various sets of static data required by the app
    sass - global styling (old)

## components

    article - holds everything needed to display and interact with a single article
    feed - holds everything to do with getting articles
    pills - the menu that lets you navigate and mute things
    tailwind - reusable tailwind components taken from flowbite.com
    HeaderMenu - the very top navigation bar
    MuteditApp - the main app entry point that acts as a layout for the other components

## composables

    use-articles - acts as a global array of all the articles got by the api, and related data
    use-feed-filters - global state about what articles are being filtered
    use-feed-params - global state of what url params were requested. query, sort, time and type

## middleware

    front-redirect - enforces the url path `/{sort?}/{time?}/{type?}`
    sub-redirect - enforces the url path `/r/{query}/{sort?}/{time?}/{type?}`

Both middlewares also set the use-feed-params composables after validation.

## pages

    `r/[...slug].vue` - catches any requests starting with `/r/` and names the params `slug` when accessing `to.params` in middleware
    `[...slug].vue` - catches any request apart from the other named pages. names the params as `slug` when accessing `to.params` in middleware
    `muted-subs.vue` - shown when visiting /muted-subs
    `muted-words.vue` - shown when visiting /muted-words

## plugins

    abbreviateNumber - turns 1285389 into '1.2m'
    buildFeedUrl - creates new url path based on current url path
    fetchArticles - gets the articles from reddit api and appends to composable
    htmlDecode - converts encoded html characters in a string to human readable
    localstorage - wrapper to access persistent data using localforage
    markdown - wrapper around showdown.js to convert markdown
    s - simple function for plural(s)
    timeSince - get a readable time since a date in the past
    ucfirst - turns words into Words and things into Things
    ucwords - turns gfycat id acclaimedwiltedwhippoorwill into AcclaimedWiltedWhipPoorwill

## public

    images - just a play icon for the video preview



### Todo & future ideas


 - option compact mode
 - option hide tags
 - nsfw : allow, blur, hide
 - mute domains
 - mute users
 - option for load amount
 - regional front page
 - show sub meta info
 - multireddit system & import from api & predefined
 - search subreddits and normal search
 - favicon
 - secrets
 - cleanup on load more
 - match url to reddit and show single article
 - fake votes
 - live comments
 - watch mode - invert filter and load more on interval

