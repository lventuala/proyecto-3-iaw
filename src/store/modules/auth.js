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
    async login({ dispatch }, datos_usuario) {
      //await axios.post("login", datos_usuario);
      let result = await axios.post("login", datos_usuario);
      let access_token = result.data.token

      // seteo el token 
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 
      Cookies.set("token", access_token);
      
      // seteo info del usuario
      await dispatch("getUser");
    },

    async getUser({ commit }) {
      // recupero token para buscar el usuario
      let access_token = Cookies.get("token");
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` 

      // busco usuario
      await axios.get("/user")
      .then(res => {
            console.log("USER = ", res.data); 
            //commit("SET_USER",res.data); 
            commit("SET_USER",res.data)
      })
      .catch(() => {
            console.log("ERROR!!!");
            commit("SET_USER",null); 
      });
    }
  }

  const getters = {
    getUser: state => {
        return state.user
    }
  }

  export default {
      state, 
      mutations, 
      actions, 
      getters
  }