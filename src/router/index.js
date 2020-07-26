import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/InicioView.vue";
import Login from "../views/LoginView.vue"; 
import Registro from "../views/RegistroView.vue"; 

import Home from "@/components/private/Home"; 
import Productos from "@/components/private/Productos"; 
import MP from "@/components/private/MateriasPrimas"; 
import Usuarios from "@/components/private/Usuarios"; 
import GenerarPedidos from "@/components/private/GenerarPedidos"; 
import PedidosGenerados from "@/components/private/PedidosGenerados"; 

import store from '@/store/index.js'

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
    path: "/datos-personales",
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
  }, 
  {
    path: "/generar-pedido",
    name: "Generar Pedidos",
    meta: {
      requiresAuth: true
    },
    component: GenerarPedidos
  }, 
  {
    path: "/pedidos-generados",
    name: "Pedidos Generados",
    meta: {
      requiresAuth: true
    },
    component: PedidosGenerados
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes, 
  linkActiveClass: "active",
  linkExactActiveClass: "",
});

router.beforeEach( async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    await store.dispatch("getUser"); 
    let user = store.getters.getUser; 
    if (user) {
      next(); 
    } else {
      next('/');
    }
  } else {
    next();
  }
})

export default router;
