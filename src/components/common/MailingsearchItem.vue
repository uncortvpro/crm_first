<script setup lang="ts">
import UiButton from "../ui/UiButton.vue";

type MailingSearchItem = {
  link: string;
  name: string;
  _id: string;
};

const emits = defineEmits(["deleteAction"]);

const deleteAction = () => {
  emits("deleteAction");
};

defineProps<{
  mailingSearchItem: MailingSearchItem;
}>();
</script>

<template>
  <tr class="border-b border-primary-100">
    <td
      class="text-[14px] text-light font-normal truncate max-w-[300px] whitespace-nowrap p-[20px]"
    >
      {{ mailingSearchItem?.name }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      <a :href="mailingSearchItem?.link" class="p-0 underline">
        {{ mailingSearchItem?.link }}
      </a>
    </td>
    <td
      class="text-light font-normal text-right truncate max-w-[300px] whitespace-nowrap p-[20px]"
    >
      <UiButton
        @click="deleteAction"
        class="!rounded-[26px] !bg-primary-500 hover:!bg-primary-700 !text-[12px] !py-[7px] !px-[25px]"
        >Видалити</UiButton
      >
    </td>
  </tr>
</template>
<style scoped></style>
