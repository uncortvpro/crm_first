<script setup lang="ts">
import UiButton from "../ui/UiButton.vue";
import UiModal from "./UiModal.vue";

const emits = defineEmits(["confirm"]);

const confirm = () => {
  emits("confirm");
};
</script>

<template>
  <UiModal>
    <template #content="{ closeModal }">
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
          class="w-full text-center max-w-[100px] !rounded-[26px] !bg-primary-300 hover:!bg-primary-500 !text-[12px] !py-[7px] !px-[25px]"
          >Так</UiButton
        >
        <UiButton
          @click="closeModal"
          class="w-full text-center max-w-[100px] !rounded-[26px] !bg-primary-300 hover:!bg-primary-500 !text-[12px] !py-[7px] !px-[25px]"
          >Ні
        </UiButton>
      </div>
    </template>
  </UiModal>
</template>

<style scoped></style>
