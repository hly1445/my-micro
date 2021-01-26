const routes = [
  {
    path: "/",
    name: "my-apps",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/child",
    name: "child",
    component: () => import("../components/subApp01.vue"),
  }
];

export default routes;
