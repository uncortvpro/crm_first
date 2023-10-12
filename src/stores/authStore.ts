import { defineStore } from 'pinia'
import { useSettingsStore } from "../stores/";

type Credentials = {
  username: string,
  password: string,
}

export const useAuthStore = defineStore('auth', () => {
    const settingsStore = useSettingsStore();
    
    async function checkToken() {
      const token =  localStorage.getItem('token');
      
      let response = false;
      await fetch(`${settingsStore.API_URL}/validate_tokens`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({access_token:token}),
      })
      .then(res => res.json())
      .then(res=> {
        response = res.valid || false;
      })
      return response;
    }

    function successAuth(token: string) {
      if(!token) return false;
      localStorage.setItem('token', token)
      return true
    }

    function isFailedToken(message: string) {
        if(message === "Token has expired" || message === "Access token is missing" || message === "Invalid token") {
          localStorage.removeItem('token');
          return true;
        }
        return false;
    } 

    function login(form: Credentials) {
       return fetch(`${settingsStore.API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        })
          .then((res) => res.json())
      };
  
    return { login, successAuth, checkToken, isFailedToken };
  })