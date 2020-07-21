import Vue from "vue";
import Vuex from "vuex";
import auth from './modules/auth'; 
import mp_actualizacion from './modules/mp_actualizacion'; 
import productos from './modules/productos'; 

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, 
    mp_actualizacion, 
    productos
  }
});
