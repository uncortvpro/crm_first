<script setup lang="ts">
import CommonInput from "../components/common/CommonInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import DoubleCalendar from "../components/common/DoubleCalendar.vue";
import ModalCardClient from "../components/common/ModalCardClient.vue";
import ClientItem from "../components/common/ClientItem.vue";
import { ref, computed, reactive, watch } from "vue";
import { useSettingsStore, useAuthStore } from "../stores";
import { useRouter } from "vue-router";

const router = useRouter();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const API_URL = computed(() => settingsStore.API_URL);
const clients = ref<any[]>();
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
  clients.value?.find((client) => client.id === currentIdCard.value)
);

const isFailedToken = (message: string) => authStore.isFailedToken(message);

const filters = reactive({
  page: 1,
  perPage: 9,
  keywords: "",
  code: "",
  name: "",
  telephone: "",
  email: "",
  registerDateStart: "",
  registerDateEnd: "",
  createDateStart: "",
  createDateEnd: "",
});

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
    case "registerDateStart":
      filters[filterType] = filterValue;
      break;
    case "registerDateEnd":
      filters[filterType] = filterValue;
      break;
    case "createDateStart":
      filters[filterType] = filterValue;
      break;
    case "createDateEnd":
      filters[filterType] = filterValue;
      break;

    default:
      break;
  }
};

const fetchClients = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      page: +filters.page,
      per_page: +filters.perPage,
      keyword: filters.keywords,
      code: filters.code,
      name: filters.name,
      telephone: filters.telephone,
      email: filters.email,
      register_date_start: filters.registerDateStart,
      register_date_end: filters.registerDateEnd,
      create_date_start: filters.createDateStart,
      create_date_end: filters.createDateEnd,
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
    <ModalCardClient
      v-if="currentIdCard"
      :isModal="isCardClient"
      :client="getCurrentClient"
      @closeModal="switchCard(false)"
      @updateClients="fetchClients"
    />
    <h3 class="text-[26px] md:text-[36px] font-light">Клієнти</h3>
    <div class="mt-[24px]">
      <div class="lg:max-w-[80%]">
        <form action="#" @submit.prevent="onSendFilters">
          <div
            class="flex flex-col gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-5 lg:items-end lg:justify-between lg:gap-[10px]"
          >
            <CommonInput
              @changeValue="changeFilters"
              inputType="keywords"
              class="shrink-1"
              placeholder="ФОП..."
              type="text"
              >Ключове слово:</CommonInput
            >
            <CommonInput
              @changeValue="changeFilters"
              inputType="code"
              class="shrink-1"
              placeholder="10..."
              type="number"
              >Код:</CommonInput
            >
            <CommonInput
              @changeValue="changeFilters"
              inputType="name"
              class="shrink-1"
              placeholder="Дмитро..."
              type="text"
              >Ім’я користувача:</CommonInput
            >
            <CommonInput
              @changeValue="changeFilters"
              inputType="telephone"
              class="shrink-1"
              placeholder="+38 0..."
              type="number"
              >Телефон:</CommonInput
            >
            <CommonInput
              @changeValue="changeFilters"
              inputType="email"
              class="shrink-1"
              placeholder="..."
              type="email"
              >E-mail:</CommonInput
            >
            <div>
              <DoubleCalendar
                @changeValue="changeFilters"
                :inputType="['registerDateStart', 'registerDateEnd']"
                >Дата реєстрації:</DoubleCalendar
              >
            </div>
            <div>
              <DoubleCalendar
                @changeValue="changeFilters"
                :inputType="['createDateStart', 'createDateEnd']"
                >Дата створення:</DoubleCalendar
              >
            </div>
            <div class="md:col-span-2 items-end lg:col-span-3 flex justify-end">
              <UiButton
                class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
                >Пошук</UiButton
              >
            </div>
          </div>
        </form>
      </div>
      <div
        class="bg-primary-600 rounded-[20px] mt-[59px] pb-[30px] px-[5px] md:px-[15px] max-w-[75vw] lg:max-w-[100%] xl:max-w-[100%] overflow-x-auto custom_no_scroll_bar"
      >
        <table class="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                code
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Користувач
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Логін
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Телефон
              </th>
              <th
                class="text-[14px] font-medium whitespace-nowrap text-white p-[30px] px-[20px]"
              >
                Дата реєстрації
              </th>
              <th
                class="text-[14px] font-medium whitespace-nowrap text-white p-[30px]"
              >
                Дата створення
              </th>
              <th
                class="text-[14px] font-medium whitespace-nowrap text-white p-[30px]"
              >
                Коментар
              </th>
            </tr>
          </thead>
          <tbody class="">
            <ClientItem
              v-for="client in clients"
              :client="client"
              :key="client.code"
              @switchModal="switchCard(true)"
              @setCurrentIdCard="setCurrentIdCard"
            />
          </tbody>
        </table>
        <div class="mt-[40px] flex flex-col sm:flex-row items-center gap-[50px] justify-end">
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
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="9">9</option>
            </select>
          </div>
          <div class="flex items-center gap-[10px]">
            <!-- Help text -->
            <span class="text-sm text-white">
              <span class="text-white">{{ startRange }}</span>
              -
              <span class="text-white">{{ endRange }}</span>
              з
              <span class="text-white">{{ totalClients }}</span>
            </span>
            <!-- Buttons -->
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
