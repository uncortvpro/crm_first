<script setup lang="ts">
defineProps({
  modelValue: String,
});

const emits = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  emits("update:modelValue", inputValue);
};
</script>

<template>
  <input
    :value="modelValue"
    @input="handleInput"
    type="text"
    class="rounded-[26px] w-full border border-primary-600 bg-transparent px-[20px] h-[50px]"
  />
</template>

<style scoped></style>
