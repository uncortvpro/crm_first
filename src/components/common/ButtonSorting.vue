<script setup lang="ts">
defineProps<{
  checkSorting: boolean;
}>();

const emits = defineEmits(["sorting"]);

const sorting = () => {
  emits("sorting");
};
</script>

<template>
  <button @click="sorting()" class="inline-flex text-left items-center gap-[10px]">
    <span>
      <slot />
    </span>
    <svg
      v-if="checkSorting"
      width="9"
      height="13"
      viewBox="0 0 9 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 12V1M4.5 1L1 4.77143M4.5 1L8 4.77143"
        stroke="#ffffff"
        stroke-linecap="square"
      />
    </svg>
  </button>
</template>

<style scoped></style>
