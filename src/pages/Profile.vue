<script setup lang="ts"></script>

<template>
  <div class="w-full py-[29px] px-[11px] md:py-[69px] flex flex-col">
    <button
      class="self-end relative rounded-[26px] font-medium text-[14px] border border-white py-[10px] pl-[16px] pr-[63px]"
    >
      <span>Привіт, Назар Старук</span>
      <span
        class="absolute w-[30px] h-[30px] bg-primary-200 right-[5px] top-0 bottom-0 my-auto rounded-[50%]"
      ></span>
    </button>
    <div>
      <div></div>
      <div></div>
    </div>
    <router-link :to="{ name: 'Authorize' }">auth</router-link>
  </div>
</template>

<style scoped></style>
