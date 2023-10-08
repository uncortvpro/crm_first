<script setup lang="ts">
import CommonInput from "../components/common/CommonInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import Calendar from "../components/common/Calendar.vue";
import ModalCardClient from "../components/common/ModalCardClient.vue";
import { ref } from "vue";

const isCard = ref(false);

const switchCard = (value: boolean) => {
  isCard.value = value;
};
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
</script>

<template>
  <div class="flex-1 overflow-x-hidden md:overflow-x-visible">
    <ModalCardClient :isModal="isCard" @closeModal="switchCard(false)" />
    <h3 class="text-[26px] md:text-[36px] font-light">Клієнти</h3>
    <div class="mt-[24px]">
      <div class="lg:max-w-[80%]">
        <div
          class="flex flex-col gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-5 lg:items-end lg:justify-between lg:gap-[10px]"
        >
          <CommonInput class="shrink-1" placeholder="ФОП..." type="text"
            >Ключове слово:</CommonInput
          >
          <CommonInput class="shrink-1" placeholder="10..." type="number"
            >Код:</CommonInput
          >
          <CommonInput class="shrink-1" placeholder="Дмитро..." type="text"
            >Ім’я користувача:</CommonInput
          >
          <CommonInput class="shrink-1" placeholder="+38 0..." type="number"
            >Телефон:</CommonInput
          >
          <CommonInput class="shrink-1" placeholder="..." type="email"
            >E-mail:</CommonInput
          >
          <div>
            <Calendar>Дата реєстрації:</Calendar>
          </div>
          <div>
            <Calendar>Дата створення:</Calendar>
          </div>
          <div class="md:col-span-2 items-end lg:col-span-3 flex justify-end">
            <UiButton class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
              >Пошук</UiButton
            >
          </div>
        </div>
      </div>
      <div
        class="bg-primary-600 rounded-[20px] mt-[59px] pb-[30px] px-[5px] md:px-[15px] max-w-[75vw] lg:max-w-[80%] xl:max-w-[100%] overflow-x-auto"
      >
        <table class="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th class="text-[14px] font-medium text-white p-[30px]">code</th>
              <th class="text-[14px] font-medium text-white p-[30px]">
                Користувач
              </th>
              <th class="text-[14px] font-medium text-white p-[30px]">Логін</th>
              <th class="text-[14px] font-medium text-white p-[30px]">
                Телефон
              </th>
              <th class="text-[14px] font-medium text-white p-[30px]">
                Дата реєстрації
              </th>
              <th class="text-[14px] font-medium text-white p-[30px]">
                Дата створення
              </th>
              <th class="text-[14px] font-medium text-white p-[30px]">
                Коментар
              </th>
            </tr>
          </thead>
          <tbody class="">
            <tr v-for="item in array" class="border-b border-primary-100">
              <td class="text-[14px] text-light font-normal p-[20px]">
                1010101010
              </td>
              <td class="text-[14px] text-light font-normal p-[20px]">
                <button class="p-0" @click="switchCard(true)">
                  ФОП Курило Дмитро Васильович
                </button>
              </td>
              <td class="text-[14px] text-light font-normal p-[20px]">
                barbea@gmail.com
              </td>
              <td class="text-[14px] text-light font-normal p-[20px]">
                +380993883108
              </td>
              <td class="text-[14px] text-light font-normal p-[20px]">
                21.06.2021
              </td>
              <td class="text-[14px] text-light font-normal p-[20px]">
                21.06.2021
              </td>
              <td class="text-[14px] text-light font-normal p-[20px]">Новий</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-[40px] flex gap-[50px] justify-end">
          <p class="text-white text-[14px]">Елементів на сторінці: 9</p>
          <p class="text-white text-[14px]">1-9 з 45</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
