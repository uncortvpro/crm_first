<script setup lang="ts">
import UiButton from "../ui/UiButton.vue";
import AuctionHistory from "./AuctionHistory.vue";
import { useSettingsStore } from "../../stores";
import { computed, ref, watch } from "vue";

const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);
const props = defineProps<{
  isModal: boolean;
  client: any;
}>();
const displayedComponent = ref("card");

const switchComponent = (value: "card" | "AuctionHistory") => {
  displayedComponent.value = value;
};

const emits = defineEmits(["closeModal", "updateClients"]);

const closeModal = () => {
  emits("closeModal");
};
const comment = ref(props.client?.comment);

watch(
  () => props.client,
  () => {
    if (props.client?.comment) {
      comment.value = props.client?.comment;
    }
  },
  { deep: true }
);

const onLeaveComment = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/add_comment_biprozorro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      code: props.client.code,
      comment: comment.value,
    }),
  }).then(() => {
    emits("updateClients");
    comment.value = "";
  });
};
</script>

<template>
  <div
    class="fixed max-w-[720px] px-[38px] pb-[20px] w-full h-[95%] overflow-x-hidden overflow-scroll custom_no_scroll_bar bg-primary-500 z-20 bottom-0 right-[-110%] rounded-t-[15px] duration-300"
    :class="{ '!right-0': isModal }"
  >
    <button
      @click="closeModal"
      class="inline-block my-[28px] text-[20px] text-white font-medium"
    >
      &lt;&lt;
    </button>
    <div v-if="displayedComponent === 'card'" class="mt-[25px]">
      <div class="flex items-center gap-[33px]">
        <h4 class="text-[26px] md:text-[36px] font-light">Карта клієнта</h4>
        <svg
          width="27"
          height="34"
          viewBox="0 0 14 18"
          xmlns="http://www.w3.org/2000/svg"
          fill="#ffffff"
        >
          <path
            d="M11 4C11 6.206 9.206 8 7 8C4.794 8 3 6.206 3 4C3 1.794 4.794 0 7 0C9.206 0 11 1.794 11 4ZM9 4C9 2.897 8.103 2 7 2C5.897 2 5 2.897 5 4C5 5.103 5.897 6 7 6C8.103 6 9 5.103 9 4Z"
          />
          <path
            d="M0 17C0 13.14 3.141 10 7 10C10.859 10 14 13.14 14 17C14 17.552 13.553 18 13 18C12.447 18 12 17.552 12 17C12 14.243 9.757 12 7 12C4.243 12 2 14.243 2 17C2 17.552 1.553 18 1 18C0.447 18 0 17.552 0 17Z"
          />
        </svg>
      </div>
      <div class="mt-[23px] max-w-[482px]">
        <p class="text-white text-[14px] font-medium px-[16px] py-[6px]">
          Ім'я: ”{{ client.name }}”
        </p>
        <ul
          class="px-[16px] flex flex-col gap-[12px] py-[10px] bg-primary-700 rounded-[10px] shadow-inner shadow-primary-800"
        >
          <li class="text-white text-[14px] font-medium">
            Код: {{ `”${client.code}”` }}
          </li>
          <li class="text-white text-[14px] font-medium">
            Представник: {{ `”${client.representative}”` }}
          </li>
          <li class="text-white text-[14px] font-medium">
            Телефон: {{ `”${client.phone}”` }}
          </li>
          <li class="text-white text-[14px] font-medium">
            Email: {{ `”${client.email}”` }}
          </li>
        </ul>
        <form action="#" @submit.prevent="onLeaveComment">
          <div
            class="flex flex-col h-[120px] gap-[10px] bg-primary-700 rounded-[10px] mt-[20px] shadow-inner shadow-primary-800 py-[14px] px-[16px]"
          >
            <p class="text-white text-[14px] font-medium">Коментар:</p>
            <textarea
              v-model="comment"
              class="bg-transparent resize-none flex-1 border-none placeholder:text-white text-[14px] font-medium focus:ring-0 p-0"
              placeholder="Вводьте текст..."
            ></textarea>
          </div>
          <UiButton
            class="mt-3 max-w-[200px] w-full !text-[12px] !py-[10px] !px-[10px]"
            >Залишити коментар</UiButton
          >
        </form>
      </div>
    </div>
    <AuctionHistory
      :client="client"
      v-if="displayedComponent === 'AuctionHistory'"
    ></AuctionHistory>
    <UiButton
      v-if="displayedComponent === 'card'"
      @click="switchComponent('AuctionHistory')"
      class="mt-3 max-w-[200px] w-full !text-[12px] !py-[10px] !px-[10px]"
      >Історія аукціонів</UiButton
    >
    <UiButton
      v-if="displayedComponent === 'AuctionHistory'"
      @click="switchComponent('card')"
      class="mt-3 max-w-[200px] w-full !text-[12px] !py-[10px] !px-[10px]"
      >Картка клієнта</UiButton
    >
  </div>
</template>

<style scoped></style>
