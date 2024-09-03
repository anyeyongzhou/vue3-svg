import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: () => import("../view/login.vue"),
  },

];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 挂载路由导航守卫：to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  // 修改页面 title
  if (to.meta.title) {
    document.title = "知否技术 - " + to.meta.title;
  }
  // 放行登录页面
  if (to.path === "/login") {
    return next();
  } else {
    const token = sessionStorage.getItem("token");
    // if (!token) {
    //     return next("/login");
    // } else {
    //     const menuList = JSON.parse(sessionStorage.getItem("menuList"));
    //     const menus = filterRouter(menuList);
    //     menus.forEach((route) => {
    //         router.addRoute(route);
    //     });
    //     return next();
    // }
    return next();
  }
});


const filterRouter = (menuList) => {
  const modules = import.meta.glob("../view/**/*.vue");
  for (let index = 0; index < menuList.length; index++) {
    const e = menuList[index];
    e.component = modules["../view/Home.vue"];
    for (let index = 0; index < e.children.length; index++) {
      const item = e.children[index];
      item.component = modules[`../view/${item.component}.vue`];
    }
  }
  return menuList;
};
// 导出路由
export default router;
