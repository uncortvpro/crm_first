<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps<{
  to: { name: string };
  type?: string;
}>();

const route = useRoute();
const isActive = computed(() => {
  if (props.type === "Mailing") {
    return route.name === "MailingSearch" || route.name === "SendMail"
      ? true
      : false;
  }
  return route.name === props.to.name;
});
</script>

<template>
  <router-link
    :to="to"
    class="flex flex-col max-w-[60px] w-full items-center p-[2px] group"
  >
    <span
      class="flex items-center justify-center w-[42px] h-[42px] rounded-[50%] group-hover:bg-primary-200 group-hover:hover_svg_primary_700"
      :class="{ 'hover_svg_primary_700 bg-primary-200': isActive }"
    >
      <slot name="icon"></slot>
    </span>
    <p class="w-full break-words font-medium text-[10px] text-center mt-[6px]">
      <slot name="title"></slot>
    </p>
    <slot name="dropdown"></slot>
  </router-link>
</template>

<style scoped></style>
