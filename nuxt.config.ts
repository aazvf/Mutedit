import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: true,
    target: "static",
    telemetry: false,
    css: ["~/assets/sass/app.scss"],
    buildModules: ["@nuxtjs/tailwindcss"],
    tailwindcss: {
        cssPath: "~/assets/css/tailwind.css",
        configPath: "tailwind.config.js",
        exposeConfig: true,
        config: {},
        injectPosition: 0,
        viewer: true,
    },
    cdnURL: "https://mutedit.icey.one/",
    nitro: {
        preset: "aws-lambda",
        serveStatic: false,
    },
});
