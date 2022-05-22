<template>
    <div class="px-3 select-none">
        <div>
            theme:
            <theme-color :color="theme.color" :accent="theme.accent" :border="theme.accent" />
            <theme-color
                v-for="([color, accent], index) in randThemes"
                :key="index"
                :color="color"
                :accent="accent"
                v-on:click="onThemeClick(color, accent)"
            />

            <tailwind-badge
                v-on:click="expanded = !expanded"
                :theme="expanded ? 'active' : 'bordered'"
            >{{ expanded ? 'less' : 'more' }} settings</tailwind-badge>
        </div>
        <div v-if="expanded">
            <div class="my-2">
                dark Mode:
                <theme-dark-switch />
            </div>
            <div class="my-2">
                align:
                <tailwind-badge
                    v-for="(align, index) in ['left', 'center', 'right']"
                    :key="index"
                    v-on:click="theme.align = align ; $localstorage.saveUserTheme()"
                    :theme="align === theme.align ? 'active' : 'inactive'"
                >{{ align }}</tailwind-badge>
            </div>

            <div class="my-2">
                transform:
                <tailwind-badge
                    v-for="(transform, index) in ['uppercase', 'lowercase', 'capitalize']"
                    :key="index"
                    v-on:click="theme.textTransform = transform ; $localstorage.saveUserTheme()"
                    :theme="transform === theme.textTransform ? 'active' : 'inactive'"
                >{{ transform }}</tailwind-badge>
            </div>

            <div class="my-2">
                layout:
                <tailwind-badge
                    v-for="(layout, index) in ['contained', 'full width']"
                    :key="index"
                    v-on:click="theme.container = layout === 'contained' ; $localstorage.saveUserTheme()"
                    :theme="theme.container == index ? 'inactive' : 'active'"
                >{{ layout }}</tailwind-badge>
            </div>

            <div class="my-2 hidden lg:block">
                columns:
                <tailwind-badge
                    v-for="(columns, index) in ['one', 'two', 'three']"
                    :key="index"
                    v-on:click="theme.columns = index ; $localstorage.saveUserTheme()"
                    :theme="theme.columns === index ? 'active' : 'inactive'"
                >{{ columns }}</tailwind-badge>
            </div>

            <div class="leading-squared">
                primary:
                <theme-color
                    v-for="(color, index) in theme.colors"
                    :key="index"
                    :color="color"
                    v-on:click="onColorClick(color)"
                />
            </div>
            <div class="leading-squared">
                accent:
                <theme-color
                    v-for="(color, index) in theme.colors"
                    :key="index"
                    :color="theme.color"
                    :accent="color"
                    v-on:click="onAccentClick(color)"
                />
            </div>
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
            expanded: false,
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