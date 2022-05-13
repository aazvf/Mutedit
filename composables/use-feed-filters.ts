
export default function () {
    return {
        focusArticleType: useState('focus-article-type', () => ''),
        focusWord: useState('focus-word', () => ''),
        focusSubreddit: useState('focus-subreddit', () => ''),
        invertFilter: useState('invert-filter', () => false),
        filterCount: useState('filter-count', () => 0),
        blockedCount: useState('blocked-count', () => 0),
        showBlocked: useState('show-blocked', () => false),
        blocked: useState('blocked-ids', () => []),
    }
}