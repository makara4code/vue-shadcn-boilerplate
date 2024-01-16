import type { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/LandingPage.vue"),
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
        path: "/sign-in",
        name: "sign-in",
        component: () => import("@/pages/app/authentication/SignIn.vue"),
        meta: {
          pageTitle: "Sign In",
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
