import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/InicioView.vue";
import Login from "../views/LoginView.vue"; 
import Registro from "../views/RegistroView.vue"; 

import Home from "@/components/private/Home"; 
import Productos from "@/components/private/Productos"; 
import MP from "@/components/private/MateriasPrimas"; 
import Usuarios from "@/components/private/Usuarios"; 

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
  }, 
  {
    path: "/home",
    name: "Home",
    meta: {
      requiresAuth: true
    },
    component: Home
  },
  {
    path: "/productos",
    name: "Productos",
    meta: {
      requiresAuth: true
    },
    component: Productos
  },
  {
    path: "/materias-primas",
    name: "MateriasPrimas",
    meta: {
      requiresAuth: true
    },
    component: MP
  }, 
  {
    path: "/usuarios",
    name: "Usuarios",
    meta: {
      requiresAuth: true
    },
    component: Usuarios
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes, 
  linkActiveClass: "active",
  linkExactActiveClass: "",
});

export default router;
