import Vue from "vue";
import vuex from "@/store"
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/files",
    name: "layout",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "/files/:id?",
        name: "files",
        component: () => import("@/components/files/FileContainer")
      }
    ],
    meta: {
      isLogin: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register")
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.matched.some(res => res.meta.isLogin)){
    if (sessionStorage["user"]) {
      next();
    }else{
      next({
        path:"/login",
        query:{
          redirect: to.fullPath
        }
      });
    }
  }else{
    next()
  }
});

export default router;
