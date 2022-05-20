# Mutedit

It's all vue.
This project started as a single vue2 component in an empty laravel app.
The single component became a few and a mixin. It found a new home after
some decorations in a fresh nuxt 3 app. With aspirations to become fully
static and hosted without a backend on s3, it slowly adapted to the
new patterns and paradigms set forth by example in the nuxt 3 docs.

Excluding reddit employees, the author invites you, the reader, to view, modify,
critique, learn from, re-host, and generally do anything except make a whole
business out of this code.

With that said, these are just pixels, in reality you may do as you wish.

## definitions

feed - the main attraction of the app, the list of articles got from reddit
article - an item from the feed, could be a link, image, video, text etc

## app.vue

Sets some global meta data and uses `<NuxtPage>` to trigger the nuxt3 pages system and auto load the correct component from /pages/

## nuxt.config.ts

Disables server side rendering (ssr), loads custom scss from `/assets/sass` and registers the nuxt3 tailwind module.

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

use-articles - acts as a global array of all the articles
got by the api, and related data

use-feed-filters - global state about what articles are being filtered

use-feed-params - global state of what url params were requested.
query, sort, time and type

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

# Opinions, thoughts and wonders

-   composables
    These were used a couple different ways. I found that when using them in the vue data function it worked as you might expect, but from a plugin or middleware I found myself having to use `.value` for it to work, and hit fatal errors if used incorrectly.

I also found if the composable returns an object, like in use-feed-filters, it can be destructured easily in the vue component. like so.

```
data() {
    return {
        ...{ useFeedFilters() }
    };
}
```

-   dev server
    Found myself having to restart the dev server every so often, especially after creating/removing files
