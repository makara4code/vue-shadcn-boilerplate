import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/www/index.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/auth-layout/AuthLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/pages/app/Dashboard.vue"),
      }
    ]
  },
  {
    path: "/",
    component: () => import("@/layouts/auth-layout/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/pages/app/login/Login.vue"),
        meta: {
          pageTitle: "Login",
        },
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/404NotFound.vue"),
    meta: {
      pageTitle: "Error 404",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];
