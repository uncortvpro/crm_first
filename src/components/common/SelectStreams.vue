<script setup lang="ts">
import { computed, ref } from "vue";
import CommonSelect from "./CommonSelect.vue";
import { useSettingsStore } from "../../stores";
const settingsStore = useSettingsStore();
const API_URL = computed(() => settingsStore.API_URL);

type Stream = {
  name: string;
  _id: string;
};

const streams = ref<Stream[]>([]);

const options = computed(() => streams.value.map((el) => el.name));

const fetchStreams = () => {
  const token = localStorage.getItem("token");
  fetch(`${API_URL.value}/get_streams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_token: token,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      streams.value = res.streams;
    });
};

fetchStreams();
</script>

<template>
  <CommonSelect :options="options" type="text">Stream</CommonSelect>
</template>

<style scoped></style>
