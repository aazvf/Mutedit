<template>
    <div class="select-none">
        <tailwind-card>
            <span :class="['px-1 mr-1', theme.text3]">theme:</span>
            <theme-color :color="theme.color" :accent="theme.accent" :border="theme.accent" />
            <theme-color
                v-for="([color, accent], index) in randThemes"
                :key="index"
                :color="color"
                :accent="accent"
                v-on:click="onThemeClick(color, accent)"
            />

            <tailwind-badge
                class="ml-2"
                v-on:click="expanded = !expanded"
                :theme="expanded ? 'active' : 'bordered'"
            >{{ expanded ? 'less' : 'more' }} settings</tailwind-badge>
        </tailwind-card>
        <div v-if="expanded">
            <tailwind-card class="my-2 pt-3 pb-3 mb-0">
                <theme-dark-switch />
            </tailwind-card>
            <div class="md:columns-2 mt-4 gap-0">
                <tailwind-card class="leading-squared mt-0">
                    <span :class="['px-1 mr-1', theme.text3]">primary:</span>
                    <theme-color
                        v-for="(color, index) in theme.colors"
                        :key="index"
                        :color="color"
                        v-on:click="onColorClick(color)"
                    />
                </tailwind-card>
                <tailwind-card class="leading-squared break-inside-avoid">
                    <span :class="['px-1 mr-1 mt-0', theme.text3]">accent:</span>
                    <theme-color
                        v-for="(color, index) in theme.colors"
                        :key="index"
                        :color="theme.color"
                        :accent="color"
                        v-on:click="onAccentClick(color)"
                    />
                </tailwind-card>
            </div>
            <tailwind-card class="mx-3 mt-0 mb-1 pt-3">
                <feed-toggle-options />
            </tailwind-card>
            <tailwind-card>
                <div class="my-2">
                    <span :class="['px-1 mr-1', theme.text3]">align:</span>
                    <tailwind-badge
                        v-for="(align, index) in ['left', 'center', 'right']"
                        :key="index"
                        v-on:click="theme.align = align ; $localstorage.saveUserTheme()"
                        :theme="align === theme.align ? 'active' : 'inactive'"
                    >{{ align }}</tailwind-badge>
                </div>

                <div class="my-2">
                    <span :class="['px-1 mr-1', theme.text3]">transform:</span>
                    <tailwind-badge
                        v-for="(transform, index) in ['uppercase', 'lowercase', 'capitalize']"
                        :key="index"
                        :class="transform"
                        v-on:click="theme.transform = transform ; $localstorage.saveUserTheme()"
                        :theme="transform === theme.transform ? 'active' : 'inactive'"
                    >{{ transform }}</tailwind-badge>
                </div>

                <div class="my-2">
                    layout:
                    <span :class="['px-1 mr-1', theme.text3]">layout</span>
                    <tailwind-badge
                        v-for="(layout, index) in ['contained', 'full width']"
                        :key="index"
                        v-on:click="theme.container = layout === 'contained' ; $localstorage.saveUserTheme()"
                        :theme="theme.container == index ? 'inactive' : 'active'"
                    >{{ layout }}</tailwind-badge>
                </div>

                <div class="my-2 hidden lg:block">
                    <span :class="['px-1 mr-1', theme.text3]">columns:</span>
                    <tailwind-badge
                        v-for="(columns, index) in ['one', 'two', 'three']"
                        :key="index"
                        v-on:click="theme.columns = index ; $localstorage.saveUserTheme()"
                        :theme="theme.columns === index ? 'active' : 'inactive'"
                    >{{ columns }}</tailwind-badge>
                </div>
            </tailwind-card>
            <tailwind-card>
                <div class="my-2">
                    <span :class="['px-1 mr-1', theme.text3]">show/hide ui:</span>
                    <tailwind-badge
                        v-for="(component, index) in ['description', 'sort', 'type', 'status', 'subs', 'words']"
                        :key="index"
                        v-on:click="theme.toggleUi(component) ; $localstorage.saveUserTheme()"
                        :theme="theme.showing(component) ? 'active' : 'inactive'"
                    >{{ component }}</tailwind-badge>
                </div>
            </tailwind-card>
        </div>
    </div>
</template>

<script>
export default defineComponent({
    data() {
        return {
            theme: useTheme(),

            showThemes: false,
            randThemes: [],
            spinblur: false,
            expanded: useSettingsOpen(),
        };
    },
    mounted() {
        this.makeRandomThemes();
    },
    computed: {},
    methods: {
        makeRandomThemes() {
            this.spinblur = true;
            setTimeout(() => (this.spinblur = false), 400);
            this.randThemes = [];
            while (this.randThemes.length < 3) {
                this.randThemes.push(
                    this.theme.randTheme(this.randThemes.flat())
                );
            }
        },
        onColorClick(color) {
            if (this.theme.accent === this.theme.color) {
                this.theme.accent = color;
            }
            this.theme.color = color;
            this.$localstorage.saveUserTheme();
        },

        onAccentClick(accent) {
            this.theme.accent = accent;
            this.$localstorage.saveUserTheme();
        },

        onThemeClick(color, accent) {
            if (this.spinblur) {
                return;
            }
            this.theme.color = color;
            this.theme.accent = accent;
            this.$localstorage.saveUserTheme();
            this.makeRandomThemes();
        },
        rand(items) {
            return items[(items.length * Math.random()) | 0];
        },
    },
});
</script>

<style scoped>
.leading-squared {
    line-height: 4.3rem;
}
</style>