import { routes } from "./routes";
import { createWebHistory, createRouter } from 'vue-router';


export const router = createRouter({
    history: createWebHistory('/crm_first'),
    routes,
});

