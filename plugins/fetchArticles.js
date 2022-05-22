import dictwords from "~/assets/data/ignoredWordlist";
import { htmlDecode } from "./htmlDecode";

const videoSizes = [360, 480, 720, 240, 1080];

// This class describes any 'article' from the reddit api.
//  It accepts the original data object and provides some
//  additional properties/methods that are useful for the app
//  such as extracting the youtube id from the url.
// Each of these Articles end up in the array at /composables/use-articles
class Article {
    constructor(data) {
        this.data = data;
        this.words = this.toWordsArr; // store this array to reduce memory during loops
        this.loadingComments = false;
        this.comments = []; // Gets populated by /components/article/comments/FetchButtons
        this.galleryIndex = 0; // Tracks which gallery image currently being shown
        this.hasPreview =
            typeof this.data.preview === "object" &&
            typeof this.data.preview.images === "object" &&
            this.data.preview.images.length > 0;
        // These 'is' properties tell us which of our components should be
        //  used to display the main content of the article.
        this.isText = data.is_self || false;
        this.isImage = this.urlEndsWith(".jpg", ".jpeg", ".png");
        this.isGallery = data.is_gallery || false;
        this.isGif = this.urlEndsWith(".gif");
        this.isGifv = this.urlEndsWith(".gifv");
        this.isVideo = this.data.is_video;
        this.isVideoGif = this.data.is_video && this.data.secure_media.reddit_video.is_gif;
        this.isEmbed = this.streamableId || this.youtubeId || this.gfycatId || this.redgifId;
        this.isPlayable = this.isVideo || this.isGif || this.isGifv || this.isEmbed;
        this.isLink = !(this.isText || this.isPlayable || this.isImage || this.isGallery);
    }

    get galleryCount() {
        return typeof this.data.media_metadata === "object" ? Object.keys(this.data.media_metadata).length : 0;
    }

    get gallerySource() {
        if (!this.data.is_gallery) {
            return "";
        }
        const keys = Object.keys(this.data.media_metadata);
        const key = keys[this.galleryIndex % keys.length];

        const res = this.data.media_metadata[key].p.filter((r) => r.x < 650);

        return htmlDecode(res[res.length - 1].u);
    }

    get videoSources() {
        return videoSizes.map((s) => `${this.data.url.split("DASH")[0]}/DASH_${s}.mp4`);
    }

    get audioSource() {
        return `${this.data.url.split("DASH")[0]}/DASH_audio.mp4`;
    }

    get id() {
        return this.data.id;
    }

    // An array of unique and uncommon words contained in the article title.
    get toWordsArr() {
        const matches = this.data.title.match(/\b(\w+)\b/g);
        if (null === matches) {
            return ["error"];
        }
        return [
            ...new Set(
                matches
                    .filter((w) => {
                        if (/^\d+$/.test(w)) {
                            return false;
                        }
                        return dictwords.indexOf(w.toLowerCase()) < 0;
                    })
                    .map((w) => w.toLowerCase())
            ),
        ];
    }

    get previewSource() {
        if (typeof this.data.preview !== "object") {
            return "";
        }
        const image = this.data.preview.images[0];
        if (image.resolutions.length === 0) {
            return htmlDecode(image.source.url);
        }
        const res = image.resolutions.filter((p) => p.width < 650);
        return htmlDecode(res[res.length - 1].url);
    }

    get countGalleryItems() {
        return Object.keys(this.data.media_metadata || []).length;
    }

    get streamableId() {
        return this.urlRegex(/^https:\/\/streamable\.com\/([a-zA-Z0-9]{3,9})$/);
    }

    get youtubeId() {
        return this.urlRegex(/^.*((youtu.be\/)|(youtube.*v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, 7);
    }

    get gfycatId() {
        return this.urlRegex(/^https:\/\/gfycat\.com\/([a-zA-Z]{8,50})$/);
    }

    get redgifId() {
        return this.urlRegex(/^https:\/\/.*redgifs\.com\/watch\/([a-zA-Z]{8,100})$/);
    }
    // Tests whether the article url ends with any number of strings
    urlEndsWith(...exts) {
        return exts.includes(this.data.url.toLowerCase().trim().substr(-exts[0]?.length));
    }

    // Tests the article url with a given regex
    //  returns the matching part or false if didnt match.
    urlRegex(regex, part = 1) {
        const match = this.data.url.match(regex);
        return match !== null && typeof match[part] === "string" ? match[part] : false;
    }
}

// Gets articles from the reddit api and appends them to the useArticles composable
//  It builds the api url based on the params at /composables/use-feed-params
//  @param reset = whether to clear the article feed and load from the start.
const fetchArticles = (reset = false) => {
    const articles = useArticles();
    const waitingForArticles = useWaitingForArticles();
    const after = useFeedAfter();
    const query = useFeedQueryParam().value;
    const sort = useFeedSortParam().value;
    const timeperiod = useFeedTimeperiodParam().value;
    const q = query === "/" ? query : "/r/" + query + "/";

    const url =
        "https://www.reddit.com" +
        q +
        sort +
        ".json" +
        "?limit=100" +
        (after.length > 1 ? "&after=" + after : "") +
        "&t=" +
        timeperiod;

    if (reset) {
        articles.value = [];
    }
    waitingForArticles.value = true;
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            if (reset) {
                articles.value = [];
            }

            console.info("Got response from api", { response });

            after.value = response.data.after;

            const children = response.data.children
                .filter((a) => articles.value.find((article) => article.data.id === a.data.id) === undefined)
                // .filter((a) => !a.data.stickied && !a.data.pinned) // ignore stickied and pinned articles
                .map((a) => {
                    return new Article(a.data);
                });
            console.log(children);

            console.log(articles);
            articles.value.push(...children);
            waitingForArticles.value = false;
        });
};

// export the function so that we can call this.$fetchArticles from any vue component.
export default defineNuxtPlugin(() => {
    return {
        provide: {
            fetchArticles,
        },
    };
});
