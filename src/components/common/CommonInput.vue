<script setup lang="ts">
import UiInput from "../ui/UiInput.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  placeholder?: string;
  type?: any;
  modelValue: string;
}>();

const emits = defineEmits(["update:modelValue"]);

const value = ref("");

watch(
  value,
  () => {
    emits("update:modelValue", value.value);
  },
  { deep: true }
);

watch(
  () => props.modelValue,
  () => {
    value.value = props.modelValue;
  },
  { deep: true }
);
</script>

<template>
  <label class="text-[12px] flex flex-col gap-[7px]" for="">
    <span class="ml-[10px]"><slot /></span>
    <UiInput
      v-model="value"
      class="!h-[38px] !border-primary-50 placeholder:text-white remove_arrow_input"
      :placeholder="placeholder"
      :type="type"
    />
  </label>
</template>

<style scoped></style>
