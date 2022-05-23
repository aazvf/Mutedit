# Mutedit

It's all vue.
This project started as a single vue2 component in an empty laravel app.
The single component became a few and a mixin. It found a new home after
some decorations in a fresh nuxt 3 app. With aspirations to become fully
static and hosted without a backend on s3, it slowly adapted to the
new patterns and paradigms set forth by example in the nuxt 3 docs.

The author invites you, the reader, to view, modify, critique, learn from, re-host, and generally do anything with this code.

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

---

### Opinions, thoughts, wonders and comments

Some ramblings of mine about nuxt3 having never used it before.

I'm pretty happy how it compiles to a static site and worked perfectly when delpoyed to s3, it's exactly what I was looking for. The pages auto loading naming scheme is very flexible, but it took a moment at first to figure out the exact naming for what I wanted, in combination with middleware I was able to impose restrictions and validation on what data reaches the app from the url.

-   components
    I don't know if I'm supposed to use defineComponent or not, seen it somewhere online and used it.

-   composables
    These were used a couple different ways. I found that when using them in the vue `data()` function it worked as you might expect, but from a plugin or middleware I found myself having to use `.value` for it to work, and frequently hit fatal errors trying to figure out the exact syntax for what I wanted.

I also found if the composable returns an object, like in use-feed-filters, it can be destructured easily in the vue component. like so.

```
data() {
    const { focusWord } = useFeedFilters();
    return {
        ...useFeedFilters()
    };
}
```

I tried storing an object as a composable, but it would not destructure and keep reactivity.

-   dev server
    Found myself having to restart the dev server every so often, especially after creating/removing files

-   plugins
    I figured this is where I should put helper bits of code that many components might want to use. Globally accessible methods that don't make sense being a component.

### Todo & future ideas

toggles & switches
option compact mode
option hide tags
nsfw : allow, blur, hide
mute domains
mute users
auto load more
option for load amount
regional front page

hide ui : sorts, types, feed description, muted subs, muted words, filter status

switches for hiding ui

fix auto hide on mobile or new header

new sticky header

show sub meta info

multireddit system & import from api & predefined
search subreddits and normal search
sticky muter - make stuck on mobile

favicon
secrets

padding on right align

dont transform title

subreddit muter options floating

auto change background & fade slowly

cleanup on load more

match url to reddit and show single article

fake votes
live comments

watch mode - invert filter and load more on interval

hire me / donate button

allow auth with reddit ?
