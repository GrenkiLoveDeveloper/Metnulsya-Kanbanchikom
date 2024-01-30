import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Main.vue"),
  },
  {
    path: "/task/:id",
    name: "TaskDetails",
    component: () => import("@/views/TaskDetails.vue"),
  },
  {
    path: "/chart",
    component: () => import("@/views/Chart.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "text-blue-500",
  routes,
});

export default router;
