<script setup lang="ts">
defineProps<{
  modelValue?: boolean;
  ui?: {
    width: string;
  };
}>();

const emits = defineEmits(["update:modelValue"]);

const closeModal = () => {
  emits("update:modelValue", false);
};
</script>

<template>
  <div
    v-if="modelValue"
    @click="closeModal"
    class="fixed top-0 z-[100] left-0 w-full h-full bg-dark-transparent flex justify-center items-center"
  >
    <div
      @click.stop=""
      :class="`bg-primary-600 relative mx-[10px] max-w-[400px] py-[50px] flex flex-col items-center w-full rounded-[10px] ${ui?.width}`"
    >
      <slot name="content" :closeModal="closeModal"></slot>
    </div>
  </div>
</template>

<style scoped></style>
