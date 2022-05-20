import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    css: [
        '~/assets/sass/app.scss'
    ],
    buildModules: ['@nuxtjs/tailwindcss',],
    // components: {
    //     global: true,
    //     dirs: [
    //       '~/components',
    //       {
    //         path: '~/components/tailwind',
    //         extensions: ['vue'],
    //         prefix: 'T'
    //       }
    //     ]
    //   },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: true,
        config: {},
        injectPosition: 0,
        viewer: true,
      },
})
