<template>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 pt-2.5 pb-1 rounded dark:bg-gray-800">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
            <feed-description />

            <button
                data-collapse-toggle="mobile-menu"
                type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu"
                v-on:click="$refs.menu.classList.toggle('hidden')"
                aria-expanded="false"
            >
                <span class="sr-only">Open main menu</span>
                <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
                <svg
                    class="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" ref="menu">
                <ul
                    class="flex flex-col mt-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
                >
                    <li>
                        <div :class="menuClass('/')">
                            <NuxtLink :href="$buildUrl({query: '/'})">
                                <tailwind-badge theme="purple">front page</tailwind-badge>
                            </NuxtLink>
                        </div>
                    </li>
                    <li>
                        <div :class="menuClass('/muted-words')">
                            <NuxtLink href="/muted-words">
                                <tailwind-badge theme="purple">muted words</tailwind-badge>
                            </NuxtLink>
                        </div>
                    </li>
                    <li>
                        <div :class="menuClass('/muted-subs')">
                            <NuxtLink href="/muted-subs">
                                <tailwind-badge theme="purple">muted subs</tailwind-badge>
                            </NuxtLink>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default defineComponent({
    name: "Header Menu",
    methods: {
        menuClass(path) {
            return this.$route.fullPath === path
                ? "block py-2 pr-4 pl-1 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                : "block py-2 pr-4 pl-1 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
        },
    },
});
</script>
