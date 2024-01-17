<script setup lang="ts">
import { ref, computed } from "vue";

import CommonInput from "../components/common/CommonInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import TextareaLabel from "../components/ui/TextareaLabel.vue";
import ModalAddRecipients from "../components/common/ModalAddRecipients.vue";
import LabelVue from "../components/ui/Label.vue";
import ModalMailingText from "../components/common/ModalMailingText.vue";

import { useSettingsStore } from "../stores";
const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);

const error = ref();
const message = ref();
const isModalAddRecipients = ref(false);
const isModalMailingText = ref(false);
const inputs = ref({
  subject: "",
  recipients: [],
  text: "",
});

const switchModalAddRecipients = (value: boolean) => {
  isModalAddRecipients.value = value;
};

const switchMailingText = (value: boolean) => {
  isModalMailingText.value = value;
};

const sendMail = () => {
  if (inputs.value.recipients.length < 1) {
    error.value = "Додайте отримувачів!";
    return false;
  }
  error.value = "";

  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/send_mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      subject: inputs.value.subject,
      recipients: inputs.value.recipients,
      text: inputs.value.text,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        message.value = "Повідомлення відправлено!";
      }
    });
};
</script>

<template>
  <div>
    <h3 class="text-[26px] md:text-[36px] font-light">
      Надіслати повідомлення
    </h3>
    <ModalMailingText
      v-model:text="inputs.text"
      v-model="isModalMailingText"
    ></ModalMailingText>
    <ModalAddRecipients
      v-model:emails="inputs.recipients"
      v-model="isModalAddRecipients"
    ></ModalAddRecipients>
    <div class="mt-[24px]">
      <div class="lg:w-[70%] lg:max-w-[600px]">
        <form action="#" @submit.prevent="sendMail">
          <div
            class="flex flex-col gap-[20px] md:grid md:grid-cols-3 lg:items-end lg:justify-between lg:gap-[10px]"
          >
            <CommonInput
              v-model="inputs.subject"
              class="shrink-1 col-span-2"
              placeholder="ФОП..."
              type="text"
              >Тема:</CommonInput
            >
            <div
              class="md:col-span-1 gap-[10px] order-1 md:order-none flex-col sm:flex-row items-end flex justify-end"
            >
              <UiButton
                type="submit"
                class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
                >Надіслати</UiButton
              >
            </div>
            <TextareaLabel v-model="inputs.text" class="col-span-2"
              >Текст:</TextareaLabel
            >
            <LabelVue
              class="col-span-2"
              label="Отримувачі:"
              v-if="inputs.recipients.length > 0"
            >
              <div class="ml-[20px]">
                <p
                  class="text-[16px] text-primary-100"
                  v-for="recipient in inputs.recipients"
                >
                  {{ recipient }}
                </p>
              </div>
            </LabelVue>
            <div
              class="col-span-2 gap-[10px] flex-col sm:flex-row items-start flex justify-start"
            >
              <UiButton
                type="button"
                @click="switchModalAddRecipients(true)"
                class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
                >Додати отримувачів</UiButton
              >
            </div>
            <div
              class="col-span-2 gap-[10px] flex-col sm:flex-row items-start flex justify-start"
            >
              <UiButton
                type="button"
                @click="switchMailingText(true)"
                class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
                >Вставити текст</UiButton
              >
            </div>
            <p v-if="error" class="text-[14px] col-span-2 text-red-700">
              {{ error }}
            </p>
            <p v-if="message" class="text-[14px] col-span-2 text-green-600">
              {{ message }}
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
