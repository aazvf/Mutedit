const videoSizes = [360, 480, 720, 240, 1080];

// this.$getVideoSources(url)
// Returns an array of urls where the "DASH_720"
//  is replaced with each of the values from videoSizes
// eg "domain.com/DASH_720.mp4" becomes ["domain.com/DASH_360.mp4", "domain.com/DASH_480.mp4" ... etc]

export default defineNuxtPlugin(() => {
    return {
        provide: {
            getVideoSources: (url) => videoSizes.map((s) => `${url.split("DASH")[0]}DASH_${s}.mp4`),
            getAudioSource: (url) => `${url.split("DASH")[0]}DASH_audio.mp4`,
        },
    };
});
