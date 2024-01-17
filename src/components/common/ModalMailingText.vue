<script setup lang="ts">
import { ref, computed } from "vue";

import UiModal from "../ui/UiModal.vue";
import CommonInput from "./CommonInput.vue";
import UiButton from "../ui/UiButton.vue";
import { useSettingsStore } from "../../stores";
const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);

defineProps<{
  text: string;
}>();

const emits = defineEmits(["update:text"]);

const updateModelValue = (value: string) => {
  emits("update:text", value);
};
const error = ref();
const inputTenderId = ref("");

const clearError = () => {
  error.value = "";
};

const fetchRecipients = (closeModal: Function) => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/mailing_text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      tenderID: inputTenderId.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      updateModelValue(res.message || "");
      inputTenderId.value = "";
      closeModal();
    });
};
</script>

<template>
  <UiModal :ui="{ width: '!max-w-[300px]' }">
    <template #content="{ closeModal }">
      <button
        type="button"
        @click="
          () => {
            closeModal();
            clearError();
          }
        "
        class="absolute right-[15px] top-[15px]"
      >
        X
      </button>
      <form
        action="#"
        class="w-full"
        @submit.prevent="fetchRecipients(closeModal)"
      >
        <div class="grid px-[30px] grid-cols-2 gap-[10px]">
          <CommonInput type="text" class="col-span-2" v-model="inputTenderId"
            >Номер аукціону</CommonInput
          >
          <div class="col-span-2 text-center pt-[10px]">
            <UiButton
              class="w-fit text-center !rounded-[26px] !bg-primary-300 hover:!bg-primary-500 !text-[12px] !py-[7px] !px-[25px]"
              >Вставити
            </UiButton>
          </div>
          <p v-if="error" class="text-[14px] col-span-2 text-red-400">
            {{ error }}
          </p>
        </div>
      </form>
    </template>
  </UiModal>
</template>

<style scoped></style>
