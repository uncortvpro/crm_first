import { defineStore } from 'pinia'
import { computed } from 'vue';

export const useSettingsStore = defineStore('settings', () => {

    const URL = computed(() => import.meta.env.VITE_URL);
    const API_URL = computed(() => URL.value);
  
    return { URL, API_URL };
  })