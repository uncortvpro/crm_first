<script setup lang="ts">
import { ref, computed } from "vue";

import UiModal from "../ui/UiModal.vue";
import CommonInput from "./CommonInput.vue";
import SelectStreams from "./SelectStreams.vue";
import UiButton from "../ui/UiButton.vue";
import { useSettingsStore } from "../../stores";
const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);

defineProps<{
  emails: string[];
}>();

const emits = defineEmits(["update:emails"]);

const updateModelValue = (value: string[]) => {
  emits("update:emails", value);
};
const error = ref();
const inputs = ref({
  minPrice: "",
  maxPrice: "",
  keyword: "",
  stream: "",
});

const clearError = () => {
  error.value = "";
};

const fetchRecipients = (closeModal: Function) => {
  const token = localStorage.getItem("token");

  const requestBody = {
    access_token: token,
    keyword: inputs.value.keyword,
    stream: inputs.value.stream,
  };

  if (+inputs.value.minPrice) {
    Object.assign(requestBody, {
      min_price: +inputs.value.minPrice,
    });
  }
  if (+inputs.value.maxPrice) {
    Object.assign(requestBody, {
      max_price: +inputs.value.maxPrice,
    });
  }

  fetch(`${API_URL.value}/new_mailing_list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.emails.length < 1) {
        error.value = "Отримувачів не знайдено";
        return false;
      }
      clearError();
      inputs.value.minPrice = "";
      inputs.value.maxPrice = "";
      inputs.value.keyword = "";
      inputs.value.stream = "";
      updateModelValue(res.emails);
      closeModal();
    });
};
</script>

<template>
  <UiModal :ui="{ width: '!max-w-[600px]' }">
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
      <form action="#" @submit.prevent="fetchRecipients(closeModal)">
        <div class="grid px-[30px] grid-cols-2 gap-[10px]">
          <CommonInput type="number" v-model="inputs.minPrice"
            >Мінімальна ціна</CommonInput
          >
          <CommonInput type="number" v-model="inputs.maxPrice"
            >Максимальна ціна</CommonInput
          >
          <CommonInput v-model="inputs.keyword">Ключове слово</CommonInput>
          <SelectStreams v-model="inputs.stream"></SelectStreams>
          <div class="col-span-2 text-center pt-[10px]">
            <UiButton
              class="w-fit text-center !rounded-[26px] !bg-primary-300 hover:!bg-primary-500 !text-[12px] !py-[7px] !px-[25px]"
              >Додати отримувачів
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
