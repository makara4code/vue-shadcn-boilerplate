import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isAuthenticated: ref(false)
    }),
    actions: {
        login() {
            console.log("login");
        },
        logout() {
            console.log("logout");
        },
    }
})