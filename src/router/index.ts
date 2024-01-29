import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Main.vue"),
  },
  {
    path: "/task/:id",
    name: "TaskDetails",
    component: () => import("@/components/TaskDetails.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "text-blue-700",
  routes,
});

export default router;
