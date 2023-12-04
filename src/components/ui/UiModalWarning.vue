<script setup lang="ts">
import UiButton from "../ui/UiButton.vue";
defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits(["confirm", "update:modelValue"]);

const closeModal = () => {
  emits("update:modelValue", false);
};

const confirm = () => {
  emits("confirm");
};
</script>

<template>
  <div
    v-if="modelValue"
    @click="closeModal"
    class="fixed top-0 left-0 w-full h-full bg-dark-transparent flex justify-center items-center z-50"
  >
    <div
      @click.stop=""
      class="bg-primary-600 max-w-[400px] py-[50px] flex flex-col items-center w-full rounded-[10px]"
    >
      <div
        class="flex h-[20px] w-[20px] items-center justify-center rounded-[50%] border border-status_red text-[15px] text-status_red md:h-[30px] md:w-[30px]"
      >
        <span>!</span>
      </div>
      <p
        class="mt-[15px] text-center text-[15px] font-medium md:mt-[15px] md:text-[20px]"
      >
        <slot />
      </p>
      <div class="mt-[20px] flex justify-center gap-[20px] self-stretch">
        <UiButton
          @click="confirm"
          class="w-full text-center max-w-[100px] !rounded-[26px] bg-primary-300 !text-[12px] !py-[7px] !px-[25px]"
          >Так</UiButton
        >
        <UiButton
          @click="closeModal"
          class="w-full text-center max-w-[100px] !rounded-[26px] bg-primary-300 !text-[12px] !py-[7px] !px-[25px]"
          >Ні
        </UiButton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
