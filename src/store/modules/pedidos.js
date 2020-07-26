import axios from "axios"; 
const url_api=process.env.VUE_APP_URL_API+'pedido/';

const state = () => ({
    pedidos: [],
    error: false, 
    msn: ''
})

const mutations = {
    SET_PEDIDOS_LIST(state,list) {
        state.pedidos = list
    },
    SET_ERROR(state, error) {
        state.error = error; 
    }, 
    SET_MSN(state,msn) {
        state.msn = msn; 
    }
}

const actions = {
    async listPedidos({ commit }) {
        await axios.get(url_api+"index").then(res => {
            commit('SET_PEDIDOS_LIST', res.data.pedidos); 
        }).catch(() => {
            commit('SET_PEDIDOS_LIST', []); 
        });
    }, 

    async guardarPedido({commit, state}, productos) {
        await axios.post(url_api+"store",{"productos" : productos})
        .then(res => {
            commit('SET_MSN',res.data.msn); 
            commit('SET_ERROR',res.data.error); 
        })
        .catch(err => {

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