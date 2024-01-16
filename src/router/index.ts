import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
    history: createWebHistory("/"),
    routes,
})

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();


    if (to.meta.middleware == "auth") {
        if (authStore.isAuthenticated) {
            next();
        } else {
            next({ name: "sign-in" });
        }
    } else {
        next();
    }
})

export default router;