// Plugin for getting comments from reddit api and attaching to article.

// Recursively map comments into a flatter object.
const mapComment = (c, articleId) => {
    const meta = ` == - ${c.data.author} (${c.data.score}) ==`;

    const more =
        typeof c.data.body !== "string" && c.data.children.length > 0
            ? { id: articleId, ids: c.data.children, loaded: false }
            : false;

    const text = more ? `Load ${c.data.count} more repl${c.data.count === 1 ? "y" : "ies"}` : c.data.body + meta;
    return {
        text: text,
        expanded: false,
        more: more,
        children:
            c.data.replies?.data?.children
                ?.filter(
                    (comment) =>
                        typeof comment.data.body === "string" || (comment.kind === "more" && comment.data.children.length > 0)
                )
                .map((comment) => mapComment(comment, articleId)) || [],
    };
};

// Fetch the top level comments for an article
const fetchComments = (article, sort) => {
    article.loadingComments = true;
    const url = "https://www.reddit.com" + article.data.permalink + ".json?sort=" + sort;
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            const comments = response[1].data.children
                .filter((c) => {
                    return true;
                })
                .map((comment) => mapComment(comment, article.data.name));
            article.comments = comments;
            article.loadingComments = false;
        });
};

// Fetch the comment replies to a particular comment.
const fetchCommentReplies = (comment, commentList) => {
    const url =
        "https://www.reddit.com/api/morechildren.json?api_type=json&limit_children=false&sort=confidence&link_id=" +
        comment.more.id +
        "&children=" +
        comment.more.ids.join(",");
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            const comments = response.json.data.things
                ?.filter(
                    (comment) =>
                        typeof comment.data.body === "string" || (comment.kind === "more" && comment.data.children.length > 0)
                )
                .map((c) => mapComment(c, comment.more.id));
            commentList.push(...comments);
            comment.more.loaded = true;
        });
};

export default defineNuxtPlugin(() => {
    return {
        provide: {
            fetchComments,
            fetchCommentReplies,
        },
    };
});
