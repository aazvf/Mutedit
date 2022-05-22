// Here we'll store data about what the feed is showing 
//  and might be needed by multiple components.

export default function () {
    return {
        focusWord: useState('focus-word', () => ''), // Only show articles containing this word
        focusSubreddit: useState('focus-subreddit', () => ''), // Only show articles from this subreddit
        invertFilter: useState('invert-filter', () => false), // Whether to invert the filter and show articles that are usually hidden
        filterCount: useState('filter-count', () => 0), // How many articles were hidden by the filters
        blockedCount: useState('blocked-count', () => 0), // How many articles has the user seen already
        articleCount: useState('article-count', () => 0), // How many articles have been loaded so far.
        hideAfterSeen: useState('hide-after-seen', () => false), // Whether to show articles already seen by the user
        showBlocked: useState('show-blocked', () => false), // Whether to show articles already seen by the user
        blocked: useState('blocked-ids', () => []), // Array of article ids already seen by the user
        mutedSubs: useState('muted-subs', () => []), // Array of words the user wants to mute
        mutedWords: useState('muted-words', () => []), // Array of subreddits the user wants to mute
    }
}