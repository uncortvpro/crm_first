<script setup lang="ts">
import NavigationItem from "./NavigationItem.vue";
</script>

<template>
  <NavigationItem class="group relative" type="Mailing" :to="{ name: '' }">
    <template v-slot:icon>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="#ffffff"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.617 17.552C13.666 16.054 14.757 13.851 14.975 11H17.93C17.547 14.052 15.441 16.57 12.617 17.552ZM2.069 11H5.061C5.267 13.862 6.344 16.056 7.407 17.561C4.57 16.584 2.454 14.061 2.069 11ZM7.438 2.42899C6.386 3.92699 5.285 6.13699 5.065 9H2.069C2.455 5.92799 4.586 3.39699 7.438 2.42899ZM7.079 9C7.385 5.728 9.059 3.45 10.026 2.397C11.026 3.468 12.674 5.725 12.959 9H7.079ZM7.08 11H12.962C12.656 14.277 10.978 16.555 10.012 17.608C8.965 16.498 7.359 14.272 7.08 11ZM17.93 9H14.978C14.773 6.151 13.708 3.964 12.65 2.461C15.458 3.451 17.549 5.96 17.93 9ZM20 10C20 4.496 15.529 0.018 10.028 0.002C10.024 0.002 10.02 0.001 10.015 0.001C10.011 0.001 10.005 0 10 0C4.486 0 0 4.487 0 10C0 15.514 4.486 20 10 20C10.006 20 10.011 19.999 10.015 19.999C10.017 19.999 10.018 20 10.02 20C10.023 20 10.026 19.998 10.028 19.998C15.529 19.983 20 15.504 20 10Z"
        />
      </svg>
    </template>
    <template v-slot:title>Розсилка</template>
    <template #dropdown>
      <div
        class="absolute hidden group-hover:flex left-full z-[100] rounded-r-[10px] p-[5px] flex-col gap-[5px] w-[150px] h-fit bg-primary-700"
      >
        <router-link
          class="w-full font-medium text-[10px] inline-block p-[10px] hover:bg-primary-500 rounded-[5px]"
          :to="{ name: 'MailingSearch' }"
          >Список розсилки</router-link
        >
        <router-link
          class="w-full font-medium text-[10px] inline-block p-[10px] hover:bg-primary-500 rounded-[5px]"
          :to="{ name: 'SendMail' }"
          >Надіслати повідомлення</router-link
        >
      </div>
    </template>
  </NavigationItem>
</template>

<style scoped></style>
