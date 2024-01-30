import type { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/main-layout/MainLayout.vue'),
    children: [
      {
        path: "",
        name: "lading-page",
        component: () => import("@/pages/www/index.vue"),
        meta: {
          pageTitle: 'Login',
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/app/login/Login.vue'),
        meta: {
          pageTitle: 'Login',
        },
      },
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404NotFound.vue'),
    meta: {
      pageTitle: 'Error 404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];
