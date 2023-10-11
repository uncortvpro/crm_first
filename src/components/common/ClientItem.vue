<script setup lang="ts">
defineProps<{
  client: any;
}>();
</script>

<template>
  <tr class="border-b border-primary-100">
    <td class="text-[14px] text-light font-normal truncate max-w-[300px] whitespace-nowrap p-[20px]">
        {{ client.code }}
    </td>
    <td class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]">
      <button class="p-0" @click="">{{ client.short_name }}</button>
    </td>
    <td class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]">
      {{ client.login }}
    </td>
    <td class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]">
      {{ client.telephone }}
    </td>
    <td class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]">
      {{ client.register_date }}
    </td>
    <td class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]">
      {{ client.create_date }}
    </td>
    <td class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]">
      {{ client.StateText }}
    </td>
  </tr>
</template>
<style scoped></style>
