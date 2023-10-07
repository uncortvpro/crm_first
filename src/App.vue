<script setup lang="ts">
import { provide } from "vue";

const URL = import.meta.env.VITE_URL;

console.log(URL);


provide("URL", URL);
</script>

<template>
  <div
    class="h-[100vh] w-full bg-primary-800 flex flex-col text-white"
  >
    <router-view> </router-view>
  </div>
</template>

<style scoped></style>
