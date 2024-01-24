import type { UserLoginType, UserType } from '@/api/login/types';

import { defineStore } from 'pinia';
import router from '@/router';
import { store } from '../index';

interface UserState {
  userInfo?: UserType;
  tokenKey: string;
  token: string;
  roleRouters?: string[] | AppCustomRouteRecordRaw[];
  rememberMe: boolean;
  loginInfo?: UserLoginType;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userInfo: undefined,
      tokenKey: 'Authorization',
      token: '',
      roleRouters: undefined,
      rememberMe: true,
      loginInfo: undefined,
    };
  },
  getters: {
    getTokenKey(): string {
      return this.tokenKey;
    },
    getToken(): string {
      return this.token;
    },
    getUserInfo(): UserType | undefined {
      return this.userInfo;
    },
    getRoleRouters(): string[] | AppCustomRouteRecordRaw[] | undefined {
      return this.roleRouters;
    },
    getRememberMe(): boolean {
      return this.rememberMe;
    },
    getLoginInfo(): UserLoginType | undefined {
      return this.loginInfo;
    },
  },

  actions: {
    setTokenKey(tokenKey: string) {
      this.tokenKey = tokenKey;
    },
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo?: UserType) {
      this.userInfo = userInfo;
    },
    setRoleRouters(roleRouters: string[] | AppCustomRouteRecordRaw[]) {
      this.roleRouters = roleRouters;
    },
    logoutConfirm() {},
    reset() {
      this.setToken('');
      this.setUserInfo(undefined);
      this.setRoleRouters([]);

      router.replace('/login');
    },
    logout() {
      this.reset()
    },
    setRememberMe(rememberMe: boolean) {
      this.rememberMe = rememberMe;
    },
    setLoginInfo(loginInfo: UserLoginType | undefined) {
      this.loginInfo = loginInfo;
    },
  },
  persist: true,
});

export const useUserStoreWithout = () => {
  return useUserStore(store);
};
