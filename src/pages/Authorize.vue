<script setup lang="ts">
import UiInput from "../components/ui/UiInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div
    class="w-full flex justify-center items-start text-black py-[32px]  !font-raleway"
  >
    <div
      class="flex flex-col items-center w-[90%] md:w-[700px] pt-[41px] pb-[21px] px-[20px] bg-light rounded-[40px]"
    >
      <div class="max-w-[300px] w-[100%] flex flex-col items-center">
        <img src="/img/logo.png" alt="" />
        <h3
          class="text-center text-black font-medium text-[32px] md:text-[46px] mb-[35px] mt-[35px]"
        >
          Авторизація
        </h3>
        <form action="#" class="w-full">
          <div class="flex w-full flex-col gap-[25px]">
            <div>
              <label class="flex flex-col w-full text-[14px]">
                Електронна пошта або логін
                <UiInput class="mt-[6px]" />
              </label>
            </div>
            <div>
              <label class="flex flex-col w-full text-[14px]">
                Пароль
                <UiInput class="mt-[6px]" type="password" />
              </label>
            </div>
            <UiButton
              class="font-raleway mt-[5px]"
              @click="router.push({ name: 'Profile' })"
            >Вхід</UiButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
