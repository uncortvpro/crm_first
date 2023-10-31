<script setup lang="ts">
const props = defineProps<{
  client: any;
}>();
const emits = defineEmits(["switchModal", "setCurrentIdCard"]);

const openModal = () => {
  emits("setCurrentIdCard", props.client._id.$oid);
  emits("switchModal");
};
</script>

<template>
  <tr class="border-b border-primary-100">
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      <button class="p-0 truncate w-full" @click="openModal">
        {{ client?.name }}
      </button>
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ client?.code }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ client?.representative }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ client?.phone }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ client?.email }}
    </td>
    <td
      class="text-[14px] text-light truncate max-w-[300px] whitespace-nowrap font-normal p-[20px]"
    >
      {{ client?.comment }}
    </td>
  </tr>
</template>
<style scoped></style>
