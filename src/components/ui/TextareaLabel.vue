<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits(["update:modelValue"]);
const value = ref("");

const handleChange = () => {
  emits("update:modelValue", value.value);
};

const getStartValue = () => {
  value.value = props.modelValue;
};

watch(
  () => props.modelValue,
  () => {
    getStartValue();
  }
);
</script>
<template>
  <label class="text-[12px] flex flex-col gap-[7px]" for="">
    <span class="ml-[10px]"><slot /></span>
    <textarea
      v-model="value"
      @input="handleChange"
      class="!h-[100px] !border-primary-50 placeholder:text-white no_scroll_bar remove_arrow_input rounded-[26px] w-full border resize-none bg-transparent px-[20px]"
    ></textarea>
  </label>
</template>

<style scoped></style>
