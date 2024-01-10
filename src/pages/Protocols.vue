<script setup lang="ts">
import CommonInput from "../components/common/CommonInput.vue";
import CommonSelect from "../components/common/CommonSelect.vue";
import UiButton from "../components/ui/UiButton.vue";
import DoubleCalendar from "../components/common/DoubleCalendar.vue";
import ModalProtocol from "../components/common/ModalProtocol.vue";
import ProtocolItem from "../components/common/ProtocolItem.vue";
import ButtonSorting from "../components/common/ButtonSorting.vue";
import { ref, computed, reactive, watch } from "vue";
import { useSettingsStore, useAuthStore } from "../stores";
import { useRouter } from "vue-router";

const router = useRouter();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const API_URL = computed(() => settingsStore.API_URL);
const protocols = ref<Protocol[]>([]);
const endRange = ref();
const startRange = ref();
const totalClients = ref();
const isProtocolModal = ref<boolean>(false);
const currentIdProtocol = ref<string>();
const newStatusOptions = ref([]);
const sortingType = ref<SortingProtocol>("");
const reverseSort = ref(false);

const sorting = (value: SortingProtocol) => {
  sortingType.value = value;
  if (sortingType.value === value) {
    reverseSort.value = !reverseSort.value;
    return false;
  }
};

const switchProtocol = (value: boolean) => {
  isProtocolModal.value = value;
};
const setCurrentIdProtocol = (id: string) => {
  currentIdProtocol.value = id;
};

const getCurrentProtocol = computed(() =>
  protocols.value?.find((protocol) => protocol.id === currentIdProtocol.value)
);

const isFailedToken = (message: string) => authStore.isFailedToken(message);

const filters = reactive({
  page: 1,
  perPage: "10",
  keywords: "",
  code: "",
  newstatus: "",
  tenderID: "",
  auctionDateStart: "",
  auctionDateEnd: "",
  newprotokolStart: "",
  newprotokolEnd: "",
  protocolEnddateStart: "",
  protocolEnddateEnd: "",
  contractEnddateStart: "",
  contractEnddateEnd: "",
  shortName: "",
});

const onCleanFilters = () => {
  filters.page = 1;
  filters.perPage = "10";
  filters.keywords = "";
  filters.code = "";
  filters.newstatus = "";
  filters.tenderID = "";
  filters.auctionDateStart = "";
  filters.auctionDateEnd = "";
  filters.newprotokolStart = "";
  filters.newprotokolEnd = "";
  filters.protocolEnddateStart = "";
  filters.protocolEnddateEnd = "";
  filters.contractEnddateStart = "";
  filters.contractEnddateEnd = "";
  filters.shortName = "";

  fetchProtocols();
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
    case "newstatus":
      filters[filterType] = filterValue;
      break;
    case "tenderID":
      filters[filterType] = filterValue;
      break;
    case "auctionDateStart":
      filters[filterType] = filterValue;
      break;
    case "auctionDateEnd":
      filters[filterType] = filterValue;
      break;
    case "newprotokolStart":
      filters[filterType] = filterValue;
      break;
    case "newprotokolEnd":
      filters[filterType] = filterValue;
      break;
    case "protocolEnddateStart":
      filters[filterType] = filterValue;
      break;
    case "protocolEnddateEnd":
      filters[filterType] = filterValue;
      break;
    case "contractEnddateStart":
      filters[filterType] = filterValue;
      break;
    case "contractEnddateEnd":
      filters[filterType] = filterValue;
      break;

    default:
      break;
  }
};

const fetchProtocols = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/protocols`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      sort_by: sortingType.value,
      reverse_sort: reverseSort.value,
      page: +filters.page,
      per_page: +filters.perPage,
      newstatus: filters.newstatus,
      tenderID: filters.tenderID,
      keyword: filters.keywords,
      code: filters.code,
      auction_date_start: filters.auctionDateStart,
      auction_date_end: filters.auctionDateEnd,
      newprotokol_start: filters.newprotokolStart,
      newprotokol_end: filters.newprotokolEnd,
      protocol_enddate_start: filters.protocolEnddateStart,
      protocol_enddate_end: filters.protocolEnddateEnd,
      contract_enddate_start: filters.contractEnddateStart,
      contract_enddate_end: filters.contractEnddateEnd,
      short_name: filters.shortName,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (isFailedToken(res.message)) {
        router.push({ name: "Authorize" });
        return false;
      }

      protocols.value = res.protocols;
      endRange.value = res.end_range;
      startRange.value = res.start_range;
      totalClients.value = res.total_clients;
      newStatusOptions.value = res.newstatus_list;
    });
};

const onSendFilters = () => {
  fetchProtocols();
};

watch(
  [() => filters.page, () => filters.perPage, sortingType, reverseSort],
  () => {
    fetchProtocols();
  },
  { deep: true }
);

fetchProtocols();
</script>

<template>
  <div class="flex-1 overflow-x-hidden md:overflow-x-visible">
    <ModalProtocol
      v-if="getCurrentProtocol"
      :isModal="isProtocolModal"
      :protocol="getCurrentProtocol"
      @closeModal="switchProtocol(false)"
      @updateProtocols="fetchProtocols"
    />
    <h3 class="text-[26px] md:text-[36px] font-light">Протоколи</h3>
    <div class="mt-[24px]">
      <div class="lg:max-w-[80%]">
        <form action="#" @submit.prevent="onSendFilters">
          <div
            class="flex flex-col gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-5 lg:items-end lg:justify-between lg:gap-[10px]"
          >
            <CommonInput
              v-model="filters.keywords"
              class="shrink-1"
              placeholder=""
              type="text"
              >Ключове слово:</CommonInput
            >
            <CommonInput
              v-model="filters.shortName"
              class="shrink-1"
              placeholder=""
              type="text"
              >Назва учасника:</CommonInput
            >
            <DoubleCalendar
              v-model:start="filters.auctionDateStart"
              v-model:end="filters.auctionDateEnd"
              >Дата аукціону:</DoubleCalendar
            >
            <CommonInput
              v-model="filters.tenderID"
              class="shrink-1"
              placeholder=""
              type="text"
              >Аукціон</CommonInput
            >
            <CommonInput
              v-model="filters.code"
              class="shrink-1"
              placeholder=""
              type="number"
              >Код учасника:</CommonInput
            >
            <CommonSelect
              v-model="filters.newstatus"
              @changeValue="changeFilters"
              inputType="newstatus"
              :options="newStatusOptions"
              class="shrink-1"
              placeholder=""
              type="text"
              >Статус аукціону</CommonSelect
            >
            <div>
              <DoubleCalendar
                v-model:start="filters.newprotokolStart"
                v-model:end="filters.newprotokolEnd"
                >Дата формування протоколу:</DoubleCalendar
              >
            </div>
            <div>
              <DoubleCalendar
                v-model:start="filters.protocolEnddateStart"
                v-model:end="filters.protocolEnddateEnd"
                >Підписання протоколу до:</DoubleCalendar
              >
            </div>
            <div>
              <DoubleCalendar
                v-model:start="filters.contractEnddateStart"
                v-model:end="filters.contractEnddateEnd"
                >Підписання договору до:</DoubleCalendar
              >
            </div>
          </div>
          <div
            class="gap-[10px] my-[10px] flex-col sm:flex-row items-end flex justify-end"
          >
            <UiButton class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
              >Пошук</UiButton
            >
            <UiButton
              type="button"
              @click="onCleanFilters"
              class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px] col-span-2 lg:col-span-5 w-fit justify-self-end"
              >Очистити фільтри</UiButton
            >
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
                <ButtonSorting
                  :checkSorting="sortingType === 'auction_date' && reverseSort"
                  @sorting="sorting('auction_date')"
                >
                  Дата аукціону
                </ButtonSorting>
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Аукціон
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Учасник
              </th>
              <th
                class="text-[14px] font-medium text-white p-[30px] px-[20px]"
              >
                Статус аукціону
              </th>
              <th
                class="text-[14px] font-medium text-white p-[30px] px-[20px]"
              >
                <ButtonSorting
                  :checkSorting="sortingType === 'newprotokol' && reverseSort"
                  @sorting="sorting('newprotokol')"
                >
                  Формування протоколу
                </ButtonSorting>
              </th>
              <th
                class="text-[14px] font-medium text-white p-[30px]"
              >
                <ButtonSorting
                  :checkSorting="
                    sortingType === 'protocol_enddate' && reverseSort
                  "
                  @sorting="sorting('protocol_enddate')"
                >
                  Підписання протоколу до
                </ButtonSorting>
              </th>
              <th
                class="text-[14px] font-medium text-white p-[30px]"
              >
                <ButtonSorting
                  :checkSorting="
                    sortingType === 'contract_enddate' && reverseSort
                  "
                  @sorting="sorting('contract_enddate')"
                >
                  Підписання договору до
                </ButtonSorting>
              </th>
              <th
                class="text-[14px] font-medium  text-white p-[30px]"
              >
                <ButtonSorting 
                  :checkSorting="sortingType === 'sign_enddate' && reverseSort"
                  @sorting="sorting('sign_enddate')"
                >
                  Підписання протоколу учасником до
                </ButtonSorting>
              </th>
              <th
                class="text-[14px] font-medium whitespace-nowrap text-white p-[30px]"
              >
                comment
              </th>
            </tr>
          </thead>
          <tbody class="">
            <ProtocolItem
              v-for="protocol in protocols"
              :protocol="protocol"
              :key="protocol.code"
              @switchModal="switchProtocol(true)"
              @setCurrentIdProtocol="setCurrentIdProtocol"
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
              class="pr-[40px] bg-primary-600 text-white border-none focus:shadow-none"
            >
              <option selected>{{ filters.perPage }}</option>
              <option v-if="filters.perPage !== '10'" value="10">10</option>
              <option v-if="filters.perPage !== '25'" value="25">25</option>
              <option v-if="filters.perPage !== '50'" value="50">50</option>
              <option v-if="filters.perPage !== '100'" value="100">100</option>
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
