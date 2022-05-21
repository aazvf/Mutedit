<template>
    <img :src="src" alt="Image" referrerpolicy="no-referrer" />
</template>

<script>
export default defineComponent({
    props: {
        src: { type: String, required: true },
    },
});
</script>


<style scoped>
img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    min-height: 300px;
    max-height: 150vh;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    @media (min-width: 300px) {
        min-width: 300px;
    }
}
</style>
