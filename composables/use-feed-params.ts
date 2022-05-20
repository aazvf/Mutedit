
// Here we'll store data from the url that will end up forming parts of
//  the reddit api url called in /plugins/fetchArticles, as well as being
//  used in various parts of the ui such as button active states and pieces
//  of dynamic text about the types of articles currently being shown.



// The requested subreddit query if present. eg the 'news' from /r/news/
export const useFeedQueryParam = () => {
    return useState('feed-subs-param', () => '/')
}

// Whether to get articles sorted by top/best/etc
export const useFeedSortParam = () => {
    return useState('feed-sort-param', () => 'best')
}

// The time scale of articles to get eg month/year/all
export const useFeedTimeperiodParam = () => {
    return useState('feed-timeperiod-param', () => 'day')
};

// Types of articles to show eg image, video, text
export const useFeedTypeParam = () => {
    return useState('feed-type-param', () => 'all')
};
