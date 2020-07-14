import axios from "axios"; 
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.VUE_APP_URL_API;

const state = () => ({
    user: null
})

const mutations = {
    SET_USER(state,user) {
      state.user = user; 
    }
}

const actions = {
    async logout({ dispatch }) {
      await axios.post("logout");

      Cookies.remove("token");
      
      // seteo info del usuario
      await dispatch("getUser");
    },

    async login({ dispatch }, datos_usuario) {
      let result = await axios.post("login", datos_usuario);
      
      // seteo info del usuario
      await dispatch("getUser");
    },

    async getUser({ commit }) {
      // busco usuario
      await axios.get("/user")
      .then(res => {
        commit("SET_USER",res.data.usuario)
      })
      .catch(() => {
            commit("SET_USER",null); 
      });
    }
  }

  const getters = {
    getUser: state => {
        return state.user
    },

    isAdmin: state => {
      return state.user
    }
  }

  export default {
      state, 
      mutations, 
      actions, 
      getters
  }