
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", redirect: "/character" },
      { path: "/character", component: () => import("pages/character.vue") },
      { path: "/weapon", component: () => import("pages/weapon.vue") },
      { path: "/party", component: () => import("pages/party.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes
