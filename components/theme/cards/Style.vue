<template>
    <tailwind-card>
        <div class="my-2">
            <span :class="['px-1 mr-1 inline-block sm:w-32', $theme.text3]">align:</span>
            <tailwind-badge
                v-for="(align, index) in ['left', 'center', 'right']"
                :key="index"
                v-on:click="$theme.align = align ; $localstorage.saveUserTheme()"
                :theme="align === $theme.align ? 'active' : 'inactive'"
            >{{ align }}</tailwind-badge>
        </div>

        <div class="my-2">
            <span :class="['px-1 mr-1 inline-block sm:w-32', $theme.text3]">transform:</span>
            <tailwind-badge
                v-for="(transform, index) in ['uppercase', 'lowercase', 'capitalize']"
                :key="index"
                :class="transform"
                v-on:click="$theme.transform = transform ; $localstorage.saveUserTheme()"
                :theme="transform === $theme.transform ? 'active' : 'inactive'"
            >{{ transform }}</tailwind-badge>
        </div>

        <div class="my-2">
            <span :class="['px-1 mr-1 inline-block sm:w-32', $theme.text3]">layout:</span>
            <tailwind-badge
                v-for="(layout, index) in ['contained', 'full width']"
                :key="index"
                v-on:click="$theme.container = layout === 'contained' ; $localstorage.saveUserTheme()"
                :theme="$theme.container == index ? 'inactive' : 'active'"
            >{{ layout }}</tailwind-badge>
        </div>

        <div class="my-2 hidden lg:block">
            <span :class="['px-1 mr-1 inline-block sm:w-32', $theme.text3]">columns:</span>
            <tailwind-badge
                v-for="(columns, index) in ['one', 'two', 'three']"
                :key="index"
                v-on:click="$theme.columns = index ; $localstorage.saveUserTheme()"
                :theme="$theme.columns === index ? 'active' : 'inactive'"
            >{{ columns }}</tailwind-badge>
        </div>
        <div class="my-2">
            <span :class="['px-1 mr-1 inline-block sm:w-32', $theme.text3]">show/hide ui:</span>
            <tailwind-badge
                v-for="(component, index) in ['sort', 'type', 'description', 'subs', 'words', 'status']"
                :key="index"
                v-on:click="$theme.toggleUi(component) ; $localstorage.saveUserTheme()"
                :theme="$theme.showing(component) ? 'active' : 'inactive'"
            >{{ component }}</tailwind-badge>
        </div>
    </tailwind-card>
</template>



<script>
export default defineComponent({
    name: "Theme style options",
});
</script>
