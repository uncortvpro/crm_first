<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  placeholder?: string;
  type?: any;
  inputType?: string;
  options: string[];
  modelValue?: any;
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

    <select
      @change="($event: any) => value = $event.target.value"
      class="rounded-[26px] border bg-transparent px-[20px] pr-[30px] h-[38px] border-primary-50 remove_arrow_input"
    >
      <option class="bg-primary-600" :selected="!modelValue" value="">
        Виберіть варіант
      </option>
      <option class="bg-primary-600" v-for="option in options" :value="option">
        {{ option }}
      </option>
    </select>
  </label>
</template>

<style scoped></style>
