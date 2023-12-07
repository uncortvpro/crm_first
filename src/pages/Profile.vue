<script setup lang="ts">
import NavigationList from "../components/common/NavigationList.vue";
</script>

<template>
  <div
    class="w-full h-full pt-[29px] flex-1 px-[11px] md:px-[20px] md:pt-[69px] flex flex-col"
  >
    <div class="grid grid-cols-profile-grid gap-[10px] md:gap-[30px] h-full">
      <NavigationList class="relative z-[100]"></NavigationList>
      <div class="flex-1 flex flex-col h-full pb-[30px] pr-[5px]">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
