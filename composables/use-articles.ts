

// The current &after= parameter for the reddit feed
export const useFeedAfter = () => {
    return useState('feed-after', () => '')
}


export const useWaitingForArticles = () => {
    return useState('waiting-for-articles', () => true)
}


export default function () {
    return useState('articles', () => [])
}