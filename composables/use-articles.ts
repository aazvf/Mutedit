

// The current &after= parameter for the reddit feed
export const useFeedAfter = () => {
    return useState('feed-after', () => '')
}

// Whether more articles are currently being requested.
// Used to hide/show the loading animation when loading articles.
export const useWaitingForArticles = () => {
    return useState('waiting-for-articles', () => true)
}

// The array of article objects loaded from the api so far.
// See the FilteredArticles component for how these articles are filtered.
export default function () {
    return useState('articles', () => [])
}