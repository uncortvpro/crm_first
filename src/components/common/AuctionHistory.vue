<script setup lang="ts">
import UiButton from "../ui/UiButton.vue";
import { useSettingsStore } from "../../stores";
import { computed, ref, watch } from "vue";
import { useDate } from "../../utils/useDate";

const props = defineProps<{
  client: any;
}>();
const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);
const auctions = ref<any>([]);

const fetchHistoryClient = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/protocols`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      code: props.client.code,
    }),
  })
    .then((res) => res.json())
    .then((res: any) => {
      auctions.value = res.protocols;
    });
};
fetchHistoryClient();

watch(
  () => props.client,
  () => {
    fetchHistoryClient();
  },
  { deep: true }
);
</script>

<template>
  <div>
    <h3 class="text-[28px] md:text-[30px] lg:text-[36px] font-light">
      Історія аукціонів Користувача:
    </h3>
    <p class="text-[28px] md:text-[30px] lg:text-[36px] font-light">
      {{ client?.short_name }}
    </p>
    <p class="text-white text-[14px] font-medium py-[6px] mt-[30px]">
      ID Клієнта: ”{{ client.id }}”
    </p>
    <div
      class="px-[16px] mt-[24px] flex flex-col gap-[12px] py-[10px] bg-primary-700 rounded-[10px] shadow-inner shadow-primary-800"
    >
      <table class="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th
              class="text-[14px] text-center font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
            >
              Дата аукціону
            </th>
            <th
              class="text-[14px] text-center font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
            >
              Номер аукціону
            </th>
            <th
              class="text-[14px] text-center font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
            >
              Посилання
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr v-for="auction in auctions" :key="auction.id">
            <td
              class="text-[14px] text-center text-light font-normal truncate max-w-[300px] whitespace-nowrap p-[20px]"
            >
              {{ useDate(auction.auction_date) }}
            </td>
            <td
              class="text-[14px] text-center text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
            >
              {{ auction.tenderID }}
            </td>
            <td
              class="text-[14px] text-center text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
            >
              <UiButton
                :href="auction.link_gc"
                class="!text-[14px] !px-[17px] !py-[3px] normal-case hover:!bg-primary-400"
                >Посилання</UiButton
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
