<template>
    <tailwind-badge
        :theme="hidden ? 'focused' : 'bordered'"
        class="rounded-full absolute top-2 -right-5"
    >{{ hidden ? 'hidden' : 'hide?'}}</tailwind-badge>
</template>



<script>
export default {
    props: { hidden: { type: Boolean, required: true } },
};
</script>