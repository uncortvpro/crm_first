<script setup lang="ts">
import { ref, computed, watch } from "vue";
import CommonInput from "../components/common/CommonInput.vue";
import MailingsearchItem from "../components/common/MailingsearchItem.vue";
import UiModalWarning from "../components/ui/UiModalWarning.vue";
import UiButton from "../components/ui/UiButton.vue";
import { useSettingsStore } from "../stores";

const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);

const mailingList = ref<any[]>([]);
const endRange = ref();
const startRange = ref();
const totalList = ref();

const filters = ref({
  page: 1,
  perPage: "10",
});

const newMailingSearch = ref({
  link: "",
  name: "",
});

const isModalRemove = ref<boolean>(false);
const changeModalRemove = (value: boolean) => {
  isModalRemove.value = value;
};

const currentId = ref<string>("");
const changeCurrentId = (id: string) => {
  currentId.value = id;
};

const deleteAction = (id: string) => {
  changeCurrentId(id);
  changeModalRemove(true);
};

const deleteMailingSearch = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/delete_mailing_search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      search_id: currentId.value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === true) {
        changeModalRemove(false);
        fetchMailingList();
      }
    });
};

const addMailingSearch = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/add_mailing_search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      link: newMailingSearch.value.link,
      name: newMailingSearch.value.name,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === true) {
        fetchMailingList();
      }
    });
};

const fetchMailingList = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/mailing_search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
      page: +filters.value.page,
      per_page: +filters.value.perPage,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      mailingList.value = res.documents;
      endRange.value = res.end_range;
      startRange.value = res.start_range;
      totalList.value = res.total_documents;
    });
};

const changeFilters = (filterType: string, filterValue: any) => {
  switch (filterType) {
    case "page":
      if (endRange.value === totalList.value) {
        break;
      }
      filters.value[filterType] = filterValue;
      break;
    case "perPage":
      filters.value[filterType] = filterValue;
      break;
    default:
      break;
  }
};

watch(
  [() => filters.value.page, () => filters.value.perPage],
  () => {
    fetchMailingList();
  },
  { deep: true }
);

fetchMailingList();
</script>

<template>
  <div>
    <UiModalWarning v-model="isModalRemove" @confirm="deleteMailingSearch">
      Видалити?
    </UiModalWarning>

    <h3 class="text-[26px] md:text-[36px] font-light">Розсилка</h3>
    <form action="#" @submit.prevent="addMailingSearch" class="mt-[24px]">
      <div
        class="flex flex-col md:flex-row items-start md:items-end gap-[20px]"
      >
        <CommonInput
          v-model="newMailingSearch.name"
          required
          class="shrink-1"
          placeholder="Активна Привати..."
          type="text"
          >Назва:</CommonInput
        >
        <CommonInput
          v-model="newMailingSearch.link"
          required
          class="shrink-1"
          placeholder="10..."
          type="text"
          >Посилання:</CommonInput
        >
        <UiButton class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
          >Додати</UiButton
        >
      </div>
    </form>
    <div>
      <div
        class="bg-primary-600 rounded-[20px] lg:max-w-[1000px] mt-[59px] pb-[30px] px-[5px] md:px-[15px] max-w-[75vw] overflow-auto lg:overflow-visible custom_no_scroll_bar"
      >
        <table
          class="table-auto lg:table-fixed w-full text-left border-collapse"
        >
          <thead class="top-[0px] sticky z-10 bg-primary-600">
            <tr>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Назва
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              >
                Посилання
              </th>
              <th
                class="text-[14px] font-medium text-white whitespace-nowrap p-[30px] px-[20px]"
              ></th>
            </tr>
          </thead>
          <tbody class="">
            <MailingsearchItem
              v-for="mailingItem in mailingList"
              :mailingSearchItem="mailingItem"
              :key="mailingItem._id"
              @deleteAction="deleteAction(mailingItem._id)"
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
              <span class="text-white">{{ totalList }}</span>
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
