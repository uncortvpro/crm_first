<script setup lang="ts">
import UiInput from "../ui/UiInput.vue";
import { ref, watch } from "vue";

const props = defineProps<{
  placeholder: string;
  type: any;
  inputType: string;
}>();

const emits = defineEmits(["changeValue"]);

const value = ref("");

watch(value, () => {
  emits("changeValue", props.inputType, value.value), {deep: true};
});
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
