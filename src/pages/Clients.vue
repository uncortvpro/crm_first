<script setup lang="ts">
import CommonInput from "../components/common/CommonInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import Calendar from "../components/common/Calendar.vue";
</script>

<template>
  <div class="flex-1">
    <h3 class="text-[26px] md:text-[36px] font-light">Клієнти</h3>
    <div class="mt-[24px]">
      <div class="max-w-[1090px] w-full">
        <div class="grid grid-cols-5 items-end justify-between gap-[10px]">
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
          <div class="col-span-3 flex justify-end">
            <UiButton
              class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
              >Пошук</UiButton
            >
          </div>
        </div>
        <!-- <div class="mt-[20px] flex items-center justify-between">
          <div>
            <Calendar>Дата реєстрації:</Calendar>
          </div>
          <UiButton class="!rounded-[26px] !text-[14px] !py-[9px] !px-[45px]"
            >Пошук</UiButton
          >
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped></style>
