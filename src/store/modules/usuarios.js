import axios from "axios"; 
const url_api=process.env.VUE_APP_URL_API+'usuario/';

const state = () => ({
    usuarios: [],
    usuario: null, 
    error: false
})

const mutations = {
    SET_USUARIOS_LIST(state,list) {
        state.usuarios = list
    }, 
    SET_USUARIO(state,usuario) {
        state.usuario = usuario; 
    }, 
    SET_ERROR(state, error) {
        state.error = error; 
    }
}

const actions = {
    async listUsuarios({ commit }) {
        await axios.get(url_api+"index").then(res => {
            commit('SET_USUARIOS_LIST', res.data.usuarios); 
        }).catch(() => {
            commit('SET_USUARIOS_LIST', []); 
        });         
    }, 

    setUsuario({ commit }, usuario) {
        commit('SET_USUARIO', usuario); 
    }, 

    activar({ dispatch, state }) {
        axios.put(url_api+"activar/"+state.usuario.id)
        .then(res => {
            state.usuario.estado = res.data.usuario.estado; 
            dispatch('setUsuario',null); 
        })
        .catch(error => {
            dispatch('setUsuario',null); 
        }); 
    }, 
    desactivar({ dispatch, state }) {
        axios.put(url_api+"desactivar/"+state.usuario.id)
        .then(res => {
            state.usuario.estado = res.data.usuario.estado; 
            dispatch('setUsuario',null); 
        })
        .catch(error => {
            dispatch('setUsuario',null); 
        }); 
    }

    
    
  }

  const getters = {
  }

  export default {
    namespaced: true,
      state, 
      mutations, 
      actions, 
      getters
  }