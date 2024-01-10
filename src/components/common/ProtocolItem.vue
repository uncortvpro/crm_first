<script setup lang="ts">
import { useDate } from "../../utils/useDate";
import { useCheckEndDate } from "../../utils/useCheckEndDate";
const props = defineProps<{
  protocol: Protocol;
}>();
const emits = defineEmits(["switchModal", "setCurrentIdProtocol"]);

const openModal = () => {
  emits("setCurrentIdProtocol", props.protocol.id);
  emits("switchModal");
};
</script>

<template>
  <tr class="border-b border-primary-100">
    <td
      class="text-[14px] text-light font-normal truncate max-w-[300px] whitespace-nowrap p-[20px]"
    >
      {{ useDate(protocol.auction_date) }}
    </td>
    <td
      class="text-[14px] text-light font-normal truncate max-w-[300px] whitespace-nowrap p-[20px]"
    >
      <a class="underline" :href="protocol.link_gc">{{ protocol.tenderID }}</a>
    </td>
    <td
      class="text-[14px] truncate max-w-[300px] text-light font-normal p-[20px]"
    >
      <button
        class="p-0 inline-block underline whitespace-nowrap"
        @click="openModal"
      >
        {{ protocol.short_name }}
      </button>
    </td>
    <td class="text-[14px] text-light font-normal p-[20px]">
      {{ protocol.newstatus }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ useDate(protocol.newprotokol) }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
      :class="{
        'text-red-600':
          useCheckEndDate(protocol.protocol_enddate) &&
          protocol.newstatus === 'Очікується опублікування протоколу',
      }"
    >
      {{ useDate(protocol.protocol_enddate) }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
      :class="{
        'text-red-600':
          useCheckEndDate(protocol.contract_enddate) &&
          protocol.newstatus === 'Очікується підписання договору',
      }"
    >
      {{ useDate(protocol.contract_enddate) }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
      :class="{
        'text-red-600': useCheckEndDate(protocol.sign_enddate) && protocol.newstatus === 'Очікується опублікування протоколу',
      }"
    >
      {{ useDate(protocol.sign_enddate) }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ protocol.comment }}
    </td>
  </tr>
</template>
<style scoped></style>
