<template>
    <div class="leading-squared">
        <div>
            Theme:
            <div
                v-for="(color, index) in theme.colors"
                :key="index"
                :class="`align-middle rounded-lg text-sm leading-9 inline-block w-10 h-10 mx-3 bg-${color}-500 ${theme.color === color ? `border-2 border-${color}-300 trigger shadow` : ''}`"
                v-on:click="onColorClick(color, $event)"
            ></div>
        </div>
        <div>
            Accent:
            <div
                v-for="(color, index) in theme.colors"
                :key="index"
                :class="`rounded-lg text-2xl leading-9 text-center inline-block w-10 h-10 m-3 bg-${theme.color}-500 text-${color}-500 ${theme.accent === color ? `border-2 border-${color}-500 trigger shadow` : ''}`"
                v-on:click="onAccentClick(color, $event)"
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
        };
    },
    methods: {
        // animate(element) {
        //     element.classList.remove("trigger");
        //     void element.offsetWidth;
        //     element.classList.add("trigger");
        // },
        onColorClick(color, event) {
            if (this.theme.accent === this.theme.color) {
                this.theme.accent = color;
            }
            this.theme.color = color;
            this.$localstorage.saveUserTheme();
            // this.animate(event.target);
        },

        onAccentClick(accent, event) {
            this.theme.accent = accent;
            this.$localstorage.saveUserTheme();
            // this.animate(event.target);
        },
    },
});
</script>

<style scoped>
.leading-squared {
    line-height: 4.3rem;
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

