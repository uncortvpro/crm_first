import { routes } from "./routes";
import { createWebHistory, createRouter } from 'vue-router';


export const router = createRouter({
    history: createWebHistory('http://164.90.158.207/'),
    routes,
});

