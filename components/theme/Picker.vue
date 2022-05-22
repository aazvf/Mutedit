<template>
    <div class="leading-squared px-3">
        <div>
            Theme:
            <div
                :class="`rounded-lg text-2xl leading-9 text-center inline-block w-10 h-10 m-3 bg-${theme.color}-500 text-${theme.accent}-500 border-2 border-${theme.color}-500 trigger shadow`"
            >⬤</div>
            <div
                v-for="([color, accent], index) in randThemes"
                :key="index"
                :class="`cursor-pointer rounded-lg text-2xl leading-9 text-center inline-block w-10 h-10 m-3 bg-${color}-500 text-${accent}-500 ${spinblur ? 'spinblur' : ''}`"
                v-on:click="onThemeClick(color, accent)"
            >⬤</div>
            <tailwind-badge
                v-on:click="expanded = !expanded"
                :theme="expanded ? 'active' : 'bordered'"
            >{{ expanded ? 'less' : 'more' }} settings</tailwind-badge>
        </div>
        <div v-if="expanded">
            Dark Mode:
            <theme-dark-switch />
        </div>
        <div v-if="expanded">
            Background:
            <div
                v-for="(color, index) in theme.colors"
                :key="index"
                :class="`cursor-pointer align-middle rounded-lg text-sm leading-9 inline-block w-10 h-10 mx-3 bg-${color}-500 ${theme.color === color ? `border-2 border-${color}-300 trigger shadow` : ''}`"
                v-on:click="onColorClick(color)"
            ></div>
        </div>
        <div v-if="expanded">
            Accent:
            <div
                v-for="(color, index) in theme.colors"
                :key="index"
                :class="`cursor-pointer rounded-lg text-2xl leading-9 text-center inline-block w-10 h-10 m-3 bg-${theme.color}-500 text-${color}-500 ${theme.accent === color ? `border-2 border-${color}-500 trigger shadow` : ''}`"
                v-on:click="onAccentClick(color)"
            >⬤</div>
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

.spinblur {
    -webkit-animation-name: cssSpinblur;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: ease;
    -webkit-animation-fill-mode: forwards;
    transform-origin: center center;
}

@-webkit-keyframes cssSpinblur {
    0% {
        filter: blur(0px);
        -webkit-transform: rotate(0deg) scale(1);
    }
    50% {
        filter: blur(5px);
    }
    100% {
        filter: blur(0px);
        -webkit-transform: rotate(180deg) scale(1);
    }
}

.trigger {
    -webkit-animation-name: cssAnimation;
    -webkit-animation-duration: 0.3s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: ease;
    -webkit-animation-fill-mode: forwards;
    transform-origin: center center;
}

@-webkit-keyframes cssAnimation {
    0% {
        filter: blur(0px);
        -webkit-transform: rotate(0deg) scale(1) skew(0deg);
        border-radius: 0.5rem;
    }
    50% {
        filter: blur(5px);
    }
    100% {
        border-radius: 1rem;
        filter: blur(0px);
        -webkit-transform: rotate(180deg) scale(1.5) skew(0deg);
    }
}
</style>

