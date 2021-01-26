const routes = [
  {
    path: "/",
    name: "myApp",
    component: () => import("../components/HelloWorld.vue"),
  },
  {
    path: "/children",
    name: "children",
    component: () => import("../components/subApp01.vue"),
  }
];


export default routes;
