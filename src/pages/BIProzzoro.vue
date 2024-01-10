<script setup lang="ts">
import CommonInput from "../components/common/CommonInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import ModalBiProzoro from "../components/common/ModalBiProzoro.vue";
import BiProzoroItem from "../components/common/BiProzoroItem.vue";
import { ref, computed, reactive, watch } from "vue";
import { useSettingsStore, useAuthStore } from "../stores";
import { useRouter } from "vue-router";

const router = useRouter();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const API_URL = computed(() => settingsStore.API_URL);
const clients = ref<any[]>([]);
const endRange = ref();
const startRange = ref();
const totalClients = ref();
const isCardClient = ref<boolean>(false);
const currentIdCard = ref<number>();

const switchCard = (value: boolean) => {
  isCardClient.value = value;
};
const setCurrentIdCard = (id: number) => {
  currentIdCard.value = id;
};

const getCurrentClient = computed(() =>
  clients.value?.find((client) => client._id.$oid === currentIdCard.value)
);

const isFailedToken = (message: string) => authStore.isFailedToken(message);

const filters = reactive({
  page: 1,
  perPage: "10",
  name: "",
  code: "",
  representative: "",
  telephone: "",
  email: "",
  auctions: "",
  keywords: "",
});

const onCleanFilters = () => {
  filters.page = 1;
  filters.perPage = "10";
  filters.keywords = "";
  filters.code = "";
  filters.name = "";
  filters.telephone = "";
  filters.email = "";
  filters.auctions = "";
  filters.representative = "";

  fetchClients();
};

const changeFilters = (filterType: string, filterValue: any) => {
  switch (filterType) {
    case "page":
      filters[filterType] = filterValue;
      break;
    case "perPage":
      filters[filterType] = filterValue;
      break;
    case "keywords":
      filters[filterType] = filterValue;
      break;
    case "code":
      filters[filterType] = filterValue;
      break;
    case "name":
      filters[filterType] = filterValue;
      break;
    case "telephone":
      filters[filterType] = filterValue;
      break;
    case "email":
      filters[filterType] = filterValue;
      break;
    case "representative":
      filters[filterType] = filterValue;
      break;
    case "auctions":
      filters[filterType] = filterValue;
      break;
    default:
      break;
  }
};

const fetchClients = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/biprozorro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      page: +filters.page,
      per_page: +filters.perPage,
      name: filters.name,
      code: filters.code,
      representative: filters.representative,
      phone: filters.telephone,
      email: filters.email,
      auctions: filters.auctions,
      keyword: filters.keywords,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (isFailedToken(res.message)) {
        router.push({ name: "Authorize" });
        return false;
      }

      clients.value = res.clients;
      endRange.value = res.end_range;
      startRange.value = res.start_range;
      totalClients.value = res.total_clients;
    });
};

const onSendFilters = () => {
  fetchClients();
};

watch(
  [() => filters.page, () => filters.perPage],
  () => {
    fetchClients();
  },
  { deep: true }
);

fetchClients();
</script>

<template>
  <div class="flex-1 overflow-x-hidden md:overflow-x-visible">
    <ModalBiProzoro
      v-if="getCurrentClient"
      :isModal="isCardClient"
      :client="getCurrentClient"
      @closeModal="switchCard(false)"
      @updateClients="fetchClients"
    />
    <h3 class="text-[26px] md:text-[36px] font-light">BI Prozzoro</h3>
    <div class="mt-[24px]">
      <div class="lg:max-w-[80%]">
        <form action="#" @submit.prevent="onSendFilters">
          <div
            class="flex flex-col gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-5 lg:items-end lg:justify-between lg:gap-[10px]"
          >
            <CommonInput
              v-model="filters.name"
              class="shrink-1"
              placeholder="..."
              type="text"
            >
              Ім'я:</CommonInput
            >
            <CommonInput
              v-model="filters.code"
              class="shrink-1"
              placeholder="10..."
              type="number"
            >
              Код:</CommonInput
            >
            <CommonInput
              v-model="filters.representative"
              class="shrink-1"
              placeholder="Дмитро..."
              type="text"
              >Представник:</CommonInput
            >
            <CommonInput
              v-model="filters.telephone"
              class="shrink-1"
              placeholder="+38 0..."
              type="number"
              >Телефон:</CommonInput
            >
            <CommonInput
              v-model="filters.email"
              class="shrink-1"
              placeholder="..."
              type="email"
            >
              E-mail:</CommonInput
            >
            <CommonInput
              v-model="filters.keywords"
              class="shrink-1"
              placeholder="..."
              type="text"
              >Ключове слово:</CommonInput
            >
            <CommonInput
              v-model="filters.auctions"
              class="shrink-1"
              placeholder="..."
              type="text"
              >Аукціон:</CommonInput
            >
            <div
              class="md:col-span-2 gap-[10px] flex-col sm:flex-row items-end lg:col-span-3 flex justify-end"
            >
              <UiButton
                class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
                >Пошук</UiButton
              >
              <UiButton
                type="button"
                @click="onCleanFilters"
                class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
                >Очистити фільтри</UiButton
              >
            </div>
          </div>
        </form>
      </div>
      <div
        class="bg-primary-600 rounded-[20px] mt-[59px] pb-[30px] px-[5px] md:px-[15px] max-w-[75vw] lg:max-w-[100%] xl:max-w-[100%] overflow-auto lg:overflow-visible custom_no_scroll_bar"
      >
        <table
          class="table-auto lg:table-fixed w-full text-left border-collapse"
        >
          <thead class="top-[0px] sticky z-10 bg-primary-600">
            <tr>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Ім'я
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Код
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Представник
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Телефон
              </th>
              <th
                class="text-[14px] font-medium whitespace-nowrap text-white p-[30px] px-[20px]"
              >
                email
              </th>
              <th
                class="text-[14px] font-medium whitespace-nowrap text-white p-[30px]"
              >
                коментар
              </th>
            </tr>
          </thead>
          <tbody class="">
            <BiProzoroItem
              v-for="client in clients"
              :client="client"
              :key="client._id.$oid"
              @switchModal="switchCard(true)"
              @setCurrentIdCard="setCurrentIdCard"
            />
          </tbody>
        </table>
        <div
          class="mt-[40px] flex flex-col sm:flex-row items-center gap-[50px] justify-end"
        >
          <div class="text-white text-[14px] flex items-center gap-[10px]">
            <label
              for="countries"
              class="block text-sm whitespace-nowrap font-medium text-white"
              >Елементів на сторінці:</label
            >
            <select
              @change="($event: any) => filters.perPage = $event.target.value"
              id="countries"
              class="pr-[40px] bg-primary-600 border-none focus:shadow-none"
            >
              <option selected>{{ filters.perPage }}</option>
              <option v-if="filters.perPage !== '10'" value="10">10</option>
              <option v-if="filters.perPage !== '25'" value="25">25</option>
              <option v-if="filters.perPage !== '50'" value="50">50</option>
              <option v-if="filters.perPage !== '100'" value="100">100</option>
            </select>
          </div>
          <div class="flex items-center gap-[10px]">
            <span class="text-sm text-white">
              <span class="text-white">{{ startRange }}</span>
              -
              <span class="text-white">{{ endRange }}</span>
              з
              <span class="text-white">{{ totalClients }}</span>
            </span>

            <div class="inline-flex mt-2 xs:mt-0">
              <button
                @click="changeFilters('page', filters.page - 1 || 1)"
                class="flex items-center text-[16px] justify-center px-[7px] text-sm font-medium text-white hover:text-blue"
              >
                {{ "<" }}
              </button>
              <button
                @click="changeFilters('page', filters.page + 1)"
                class="flex items-center text-[16px] justify-center px-[7px] text-sm font-medium text-white hover:text-blue"
              >
                {{ ">" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
