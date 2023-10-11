import { defineStore } from 'pinia'
import { useSettingsStore } from "../stores/";
import { useRouter } from 'vue-router';

type Credentials = {
  username: string,
  password: string,
}

export const useAuthStore = defineStore('auth', () => {
    const settingsStore = useSettingsStore();
    const router = useRouter();
    const saveToken = (token: string) => {
      localStorage.setItem('token', token)
    }

    function successAuth(token: string) {
      saveToken(token);
      router.push({name:'Profile'});
    }

    function failedToken(message: string) {
        if(message === "Token has expired" || message === "Access token is missing" || message === "Invalid token") {
          localStorage.removeItem('token');
          router.push({name:'Authorize'});
        }
    } 

    function login(form: Credentials) {
        fetch(`${settingsStore.API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
          .then((res) => res.json())
          .then((res) => {
            successAuth(res.access_token);
          });
      };
  
    return { login, successAuth, failedToken };
  })