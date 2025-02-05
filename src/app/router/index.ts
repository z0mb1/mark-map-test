import { createWebHistory, createRouter, type RouteLocation } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    redirect: () => ({ path: "about" }),
    children: [
      {
        path: "about",
        name: "about",
        component: () => import("../../pages/about/AboutPage.vue"),
      },
      {
        path: "map/:id?",
        name: "map",
        component: () => import("../../pages/map/MapPage.vue"),
        props: ({ params: { id } }: RouteLocation) => ({ id }),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),

  routes,
});
