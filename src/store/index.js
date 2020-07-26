import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'; 
import mps from './modules/mps'; 
import productos from './modules/productos'; 
import usuarios from './modules/usuarios'; 
import pedidos from './modules/pedidos'; 

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, 
    mps, 
    productos, 
    usuarios, 
    pedidos
  }
});
