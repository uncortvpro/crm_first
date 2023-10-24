<script setup lang="ts">
defineProps<{
  href?: string;
}>();
</script>

<template>
  <button
    v-if="!href"
    class="bg-primary-600 rounded-[36px] py-[26px] text-white text-[22px] font-medium uppercase hover:bg-primary-700"
  >
    <slot />
  </button>
  <a
    v-else
    :href="href"
    class="bg-primary-600 rounded-[36px] py-[26px] text-white text-[22px] font-medium uppercase hover:bg-primary-700"
  >
    <slot />
  </a>
</template>

<style scoped></style>
