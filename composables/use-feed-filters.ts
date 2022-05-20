
export default function () {
    return {
        focusWord: useState('focus-word', () => ''),
        focusSubreddit: useState('focus-subreddit', () => ''),
        invertFilter: useState('invert-filter', () => false),
        filterCount: useState('filter-count', () => 0),
        blockedCount: useState('blocked-count', () => 0),
        articleCount: useState('article-count', () => 0),
        showBlocked: useState('show-blocked', () => false),
        blocked: useState('blocked-ids', () => []),
        mutedSubs: useState('muted-subs', () => []),
        mutedWords: useState('muted-words', () => []),
    }
}