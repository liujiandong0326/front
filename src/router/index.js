import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/demo",
    name: "demo",
    component: () => import("../views/demo"),
  },
  {
    path: "/articleCreate",
    name: "articleCreate",
    component: () => import("../views/articleCreate"),
  },
  {
    path: "/articleEdit/:aid",
    props: true,
    name: "articleEdit",
    component: () =>
      import(
        /* webpackChunkName: "articleCreate" */ "../views/articleCreate.vue"
      ),
  },
  {
    path: "/userinfo",
    name: "userinfo",
    component: () =>
      import(/* webpackChunkName: "userinfo" */ "../views/userinfo.vue"),
  },
  {
    path: "/articleLists",
    name: "articleLists",
    component: () => import("../views/articleLists"),
  },
  {
    path: "/articles/:id",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "articleSingle" */ "../views/articleSingle.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/login"),
  },
  {
    path: "/signup",
    name: "signup",

    component: () => import("../views/signup"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
