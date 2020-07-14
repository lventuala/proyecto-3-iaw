import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/InicioView.vue";
import Login from "../views/LoginView.vue"; 
import Registro from "../views/RegistroView.vue"; 

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "Inicio",
    component: Inicio
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/registro",
    name: "Registro",
    component: Registro
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
