import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import Dashboard from "./pages/admin/Dashboard.vue";
import DashboardLayout from "./components/DashboardLayout.vue";
import useUserStore from "./store/user.js";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [{ path: "/", name: "Home", component: Home }],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [{ path: "", name: "Dashboard", component: Dashboard }],
    beforeEnter: async(to,from,next)=>{
      try {
        const useStore = useUserStore();
        useStore.fetchUser();
        next();
      } catch (error) {
        console.error('Failed to fetch data:',error);
        next(false);
      }
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
