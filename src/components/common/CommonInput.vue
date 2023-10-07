<script setup lang="ts">
import UiInput from "../ui/UiInput.vue";
defineProps<{
  placeholder: string;
  type: any;
}>();
</script>

<template>
  <label class="text-[12px] flex flex-col gap-[7px]" for="">
    <span class="ml-[10px]"><slot /></span>
    <UiInput
      class="!h-[38px] !border-primary-50 placeholder:text-white remove_arrow_input"
      :placeholder="placeholder"
      :type="type"
    />
  </label>
</template>

<style scoped></style>
