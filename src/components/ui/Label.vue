<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <label class="text-[12px] flex flex-col gap-[7px]" for="">
    <span class="ml-[10px]">{{ label }}</span>
    <div>
      <slot />
    </div>
  </label>
</template>
<style scoped></style>
