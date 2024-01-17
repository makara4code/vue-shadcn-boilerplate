import { ref, unref } from 'vue';

import api from "@/services/ApiService";
import { defineStore } from 'pinia';

export interface UserCredentials {
    email: string;
    password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: ref(false),
    isLoading: ref(false),
    user: ref({}),
    error: "",
  }),
  actions: {
    async login(credentials: UserCredentials) {
      try {
        this.isLoading = true;
        this.error = "";
        const res = await api.post('/auth/login', unref(credentials));

        if (res?.data?.token) {
          this.user = res.data;
          this.isAuthenticated = true;
        }
      } catch (error: any) {
        this.error = error?.message ?? "Something went wrong, unable to authenticate."
      } finally {
        this.isLoading = false;
      }
    },
    logout() {},
    reset() {
        this.isAuthenticated = false;
        this.isLoading = false;
        this.user = {};
    }
  },
});
