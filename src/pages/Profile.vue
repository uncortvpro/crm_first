<script setup lang="ts">
import NavigationItem from "../components/common/NavigationItem.vue";
</script>

<template>
  <div
    class="w-full h-full pt-[29px] flex-1 px-[11px] md:px-[20px] md:pt-[69px] flex flex-col"
  >
    <div class="grid grid-cols-12 gap-[10px] md:gap-[30px] h-full">
      <div
        class="w-[60px] col-span-1 top-0 sticky bg-primary-700 rounded-[10px] flex flex-col items-center gap-2 max-h-[651px]"
      >
        <div
          class="max-w-[60px] flex self-stretch justify-center py-[10px] bg-primary-600 rounded-[10px]"
        >
          <span class="font-light text-[26px] md:text-[36px]">GK</span>
        </div>
        <NavigationItem :to="{ name: 'Clients' }">
          <template v-slot:icon>
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
            >
              <path
                d="M11 4C11 6.206 9.206 8 7 8C4.794 8 3 6.206 3 4C3 1.794 4.794 0 7 0C9.206 0 11 1.794 11 4ZM9 4C9 2.897 8.103 2 7 2C5.897 2 5 2.897 5 4C5 5.103 5.897 6 7 6C8.103 6 9 5.103 9 4Z"
              />
              <path
                d="M0 17C0 13.14 3.141 10 7 10C10.859 10 14 13.14 14 17C14 17.552 13.553 18 13 18C12.447 18 12 17.552 12 17C12 14.243 9.757 12 7 12C4.243 12 2 14.243 2 17C2 17.552 1.553 18 1 18C0.447 18 0 17.552 0 17Z"
              />
            </svg>
          </template>
          <template v-slot:title>Клієнти</template>
        </NavigationItem>
        <NavigationItem :to="{ name: 'Protocols' }">
          <template v-slot:icon>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16V12H16L16.001 16H12ZM16 10H12C10.897 10 10 10.897 10 12V16C10 17.103 10.897 18 12 18H16C17.103 18 18 17.103 18 16V12C18 10.897 17.103 10 16 10ZM2 16V12H6L6.001 16H2ZM6 10H2C0.897 10 0 10.897 0 12V16C0 17.103 0.897 18 2 18H6C7.103 18 8 17.103 8 16V12C8 10.897 7.103 10 6 10ZM12 6V2H16L16.001 6H12ZM16 0H12C10.897 0 10 0.897 10 2V6C10 7.103 10.897 8 12 8H16C17.103 8 18 7.103 18 6V2C18 0.897 17.103 0 16 0ZM2 6V2H6L6.001 6H2ZM6 0H2C0.897 0 0 0.897 0 2V6C0 7.103 0.897 8 2 8H6C7.103 8 8 7.103 8 6V2C8 0.897 7.103 0 6 0Z"
              />
            </svg>
          </template>
          <template v-slot:title>Протоколи</template>
        </NavigationItem>
        <NavigationItem :to="{ name: 'MailingList' }">
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
        </NavigationItem>
        <NavigationItem :to="{ name: 'BIProzzoro' }">
          <template v-slot:icon>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.56067 5.43987C8.14667 6.02487 8.14667 6.97587 7.56067 7.56087C6.97467 8.14687 6.02567 8.14687 5.43967 7.56087C4.85367 6.97587 4.85367 6.02487 5.43967 5.43987C6.02567 4.85387 6.97467 4.85387 7.56067 5.43987ZM2.83417 9.89196L8.86617 15.925L15.9242 8.86696L9.89217 2.83397L2.10717 2.10797L2.83417 9.89196ZM8.86617 17.999C8.40117 17.999 7.93717 17.822 7.58217 17.469L1.16517 11.051C1.00017 10.887 0.89817 10.669 0.87617 10.437L0.00417029 1.09297C-0.0228297 0.796971 0.0821703 0.503971 0.29317 0.292971C0.50417 0.0819712 0.79617 -0.0250288 1.09317 0.0049712L10.4372 0.876971C10.6692 0.897971 10.8862 0.999971 11.0512 1.16497L17.4682 7.58197C17.8112 7.92497 18.0002 8.38097 18.0002 8.86697C18.0002 9.35297 17.8112 9.80897 17.4682 10.152L10.1512 17.468C9.79717 17.822 9.33217 17.999 8.86617 17.999Z"
              />
            </svg>
          </template>
          <template v-slot:title>BI Prozzoro</template>
        </NavigationItem>
      </div>
      <div
        class="flex-1 col-span-11 flex flex-col h-full  pb-[30px] pr-[5px]"
      >
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
