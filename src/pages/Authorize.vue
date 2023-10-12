<script setup lang="ts">
import UiInput from "../components/ui/UiInput.vue";
import UiButton from "../components/ui/UiButton.vue";
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const successAuth = (token: string) => authStore.successAuth(token);
const form = reactive({
  username: "",
  password: "",
});
const errorAuth = ref("");

const login = () => {
  authStore
    .login(form)
    .then((res: any) => {
      if (!res.access_token) {
        errorAuth.value = "Користувач не існує";
      }
      successAuth(res.access_token);
      router.push({ name: "Profile" });
    })
    .catch(() => {
      errorAuth.value = "Користувач не існує";
    });
};
</script>

<template>
  <div
    class="w-full flex justify-center items-start text-black py-[32px] !font-raleway"
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
        <form action="#" class="w-full" @submit.prevent="login">
          <div class="flex w-full flex-col gap-[25px]">
            <div>
              <label class="flex flex-col w-full text-[14px]">
                Електронна пошта або логін
                <UiInput v-model="form.username" class="mt-[6px]" />
              </label>
            </div>
            <div>
              <label class="flex flex-col w-full text-[14px]">
                Пароль
                <UiInput
                  v-model="form.password"
                  class="mt-[6px]"
                  type="password"
                />
              </label>
            </div>
            <div
              v-if="errorAuth"
              class="text-red-700 px-4"
              role="alert"
            >
              <p class="text-sm">
               {{ errorAuth }}
              </p>
            </div>
            <UiButton class="font-raleway mt-[5px]">Вхід</UiButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
