<script setup lang="ts">
import UiButton from "../ui/UiButton.vue";
import { useDate } from "../../utils/useDate";
import { useSettingsStore } from "../../stores";
import { computed, ref, watch } from "vue";

const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);
const props = defineProps<{
  isModal: boolean;
  protocol: any;
}>();

const emits = defineEmits(["closeModal", "updateProtocols"]);

const closeModal = () => {
  emits("closeModal");
};
const comment = ref(props.protocol?.comment);

watch(
  () => props.protocol,
  () => {
    comment.value = props.protocol.comment;
  },
  { deep: true }
);

const onLeaveComment = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/add_comment_protocols`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      id: props.protocol.id,
      comment: comment.value,
    }),
  }).then(() => {
    emits("updateProtocols");
    comment.value = "";
  });
};
</script>

<template>
  <div
    class="fixed max-w-[720px] px-[38px] w-full h-[95%] overflow-x-hidden pb-[20px] overflow-scroll custom_no_scroll_bar bg-primary-500 z-20 bottom-0 right-[-110%] rounded-t-[15px] duration-300"
    :class="{ '!right-0': isModal }"
  >
    <button
      @click="closeModal"
      class="inline-block my-[28px] text-[20px] text-white font-medium"
    >
      &lt;&lt;
    </button>
    <div class="mt-[25px]">
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
        <ul
          class="px-[16px] flex flex-col gap-[12px] py-[10px] bg-primary-700 rounded-[10px] shadow-inner shadow-primary-800"
        >
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Дата аукціону: {{ `”${useDate(protocol?.auction_date)}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Назва аукціону: {{ `”${protocol?.title}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Стартова ціна: {{ `”${protocol?.value_amount}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Код організатора: {{ `”${protocol?.procuringEntity_id}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Назва організатора: {{ `”${protocol?.procuringEntity_name}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Номер аукціону: {{ `”${protocol?.tenderID}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Період прийому пропозицій:
            {{ `”${protocol?.tenderPeriod_endDate}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Гарантійний внесок: {{ `”${protocol?.guarantee_amount}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Статус пропозиції: {{ `”${protocol?.StateText}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Код учасника: {{ `”${protocol?.code}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Назва учасника : {{ `”${protocol?.short_name}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Статус аукціону: {{ `”${protocol?.newstatus}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Дата формування протоколу:
            {{ `”${useDate(protocol?.newprotokol)}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Підписання протоколу до:
            {{ `”${useDate(protocol?.protocol_enddate)}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Підписання договору до:
            {{ `”${useDate(protocol?.contract_enddate)}”` }}
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Посилання Прозорро:
            <a :href="protocol?.link_prozorro">{{
              `”${protocol?.link_prozorro}”`
            }}</a>
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Посилання Галконтракт:
            <a :href="protocol?.link_gc">{{ `”${protocol?.link_gc}”` }}</a>
          </li>
          <li class="text-white leading-[120%] text-[14px] font-medium">
            Коментар: {{ `”${protocol?.comment}”` }}
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
            >
            </textarea>
          </div>
          <UiButton
            class="mt-3 max-w-[200px] w-full !text-[12px] !py-[10px] !px-[10px]"
            >Залишити коментар</UiButton
          >
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
