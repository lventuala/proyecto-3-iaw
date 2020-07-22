import axios from "axios"; 
axios.defaults.baseURL = process.env.VUE_APP_URL_API;
const url_api=process.env.VUE_APP_URL_API+'mp/';

const state = () => ({
    materias_primas: [],
    categorias: [], 
    unidad_medida: [], 
    prev_page_url: '', 
    next_page_url: '', 
    last_page: 0, 
    current_page: 0, 

    mp_seleccionada: {
        'id': null, 
        'nombre': "", 
        'cantidad': null,
        'id_categoria': null, 
        'categoria': null,
        'id_um': null, 
        'uni_medida': null
    }, 
    mp_nueva: {
        'id': null, 
        'nombre': "", 
        'cantidad': null,
        'id_categoria': -1, 
        'categoria': null,
        'id_um': -1, 
        'uni_medida': null
    }, 
    error: false
})

const mutations = {
    SET_MP_LIST(state,list) {
        state.materias_primas = list
    }, 
    SET_CATEGORIAS(state,list) {
        state.categorias = list
    }, 
    SET_UNIDAD_MEDIDA(state,list) {
        state.unidad_medida = list
    },
    SET_PREV_PAGE(state,page) {
        state.prev_page_url = page
    }, 
    SET_NEXT_PAGE(state,page) {
        state.next_page_url = page
    }, 
    SET_LAST_PAGE(state,page) {
        state.last_page = page
    }, 
    SET_CURRENT_PAGE(state,page) {
        state.current_page = page
    }, 
    SET_MP(state,mp,mp_nueva = null) {
        if (mp == null) {
            mp = {
                'id': null, 
                'nombre': "", 
                'cantidad': null,
                'id_categoria': -1, 
                'categoria': null,
                'id_um': -1, 
                'uni_medida': null
            }
        }

        if (mp_nueva == null) {
            // uso mp_nueva para modificar y si todo esta bien finalmente actualizar
            mp_nueva = {...mp}; 
        }

        state.mp_seleccionada = mp; 
        state.mp_nueva = mp_nueva; 
    }, 
    SET_ERROR(state, error) {
        state.error = error; 
    }
}

const actions = {
    async listMateriasPrimas({ commit }, page = 1) {
        await axios.get(url_api+"index?page="+page).then(res => {
            commit('SET_MP_LIST', res.data.materias_primas.data); 
            commit('SET_CATEGORIAS', res.data.categorias); 
            commit('SET_UNIDAD_MEDIDA',res.data.unidad_medida); 
            commit('SET_PREV_PAGE', res.data.materias_primas.prev_page_url); 
            commit('SET_NEXT_PAGE', res.data.materias_primas.next_page_url); 
            commit('SET_LAST_PAGE', res.data.materias_primas.last_page); 
            commit('SET_CURRENT_PAGE', res.data.materias_primas.current_page); 
        }).catch(() => {
            commit('SET_MP_LIST', []); 
            commit('SET_CATEGORIAS', []); 
            commit('SET_UNIDAD_MEDIDA', []); 
            commit('SET_PREV_PAGE', ''); 
            commit('SET_NEXT_PAGE', ''); 
            commit('SET_LAST_PAGE', 0); 
            commit('SET_CURRENT_PAGE', 0); 
        });         
    }, 
    setMP({ commit }, mp) {
        commit('SET_MP', mp); 
    }, 
    async actualizarMP({ dispatch, state }) {
        await axios.put(url_api+"update/"+state.mp_nueva.id, state.mp_nueva)
            .then(res => {
                let mp_res = res.data; 

                // seteo info para reflejarlo en la mp seleccionada
                state.mp_seleccionada.nombre = mp_res.nombre;
                state.mp_seleccionada.categoria = mp_res.categoria;
                state.mp_seleccionada.uni_medida = mp_res.uni_medida;
                state.mp_seleccionada.cantidad = mp_res.cantidad;
                state.mp_seleccionada.id_um = mp_res.id_um;
                state.mp_seleccionada.id_categoria = mp_res.id_categoria;

                // reset de la mp y error en false : termno todo ok
                dispatch('setMP',null);
                dispatch('setError',false);
            })
            .catch(() => {
                dispatch('setError',false)
            }); 
    }, 

    async guardarMP({ dispatch, state }) {
        await axios.post(url_api+"store", state.mp_nueva)
            .then(res => {
                let mp_res = res.data; 
                dispatch('listMateriasPrimas');
                
                // reset de la mp y error en false : termno todo ok
                dispatch('setMP',null);
                dispatch('setError',false);
            })
            .catch(() => {
                dispatch('setError',false)
            }); 
    },

    async eliminarMP({ dispatch, state }) {
        await axios.delete(url_api+"destroy/"+state.mp_seleccionada.id)
        .then(res => {
            dispatch('listMateriasPrimas', state.current_page);
            // reset de la mp y error en false : termno todo ok
            dispatch('setMP',null);
            dispatch('setError',false);
        })
        .catch(() => {
            dispatch('setError',false)
        });
    },

    setError({ commit }, error) {
        commit('SET_ERROR', error); 
    }
  }

  const getters = {
    getMP: state => {
        return state.mp_seleccionada; 
    },
  }

  export default {
    namespaced: true,
      state, 
      mutations, 
      actions, 
      getters
  }