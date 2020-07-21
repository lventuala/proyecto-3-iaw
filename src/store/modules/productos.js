import axios from "axios"; 
const url_api=process.env.VUE_APP_URL_API+'producto/';

const state = () => ({
    productos: [],
    materias_primas: [], 
    prev_page_url: '', 
    next_page_url: '', 
    last_page: 0, 
    current_page: 0, 

    producto_seleccionado: {
        'id': null, 
        'nombre': '', 
        'descripcion': '', 
        'img': '', 
        'mps': [], 
        'nombre_img': 'Seleccioanr imagen...'
    }, 
    producto_nuevo: {
        'id': null, 
        'nombre': '', 
        'descripcion': '', 
        'img': '', 
        'mps': [], 
        'nombre_img': 'Seleccioanr imagen...'
    }, 
    error: false
})

const mutations = {
    SET_PRODUCTOS_LIST(state,list) {
        state.productos = list
    }, 
    SET_MATERIAS_PRIMAS_LIST(state,list) {
        state.materias_primas = list
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
    SET_PRODUCTO(state,producto,producto_nuevo = null) {
        if (producto == null) {
            producto = {
                'id': null, 
                'nombre': '', 
                'descripcion': '', 
                'img': '', 
                'mps': [], 
                'nombre_img': 'Seleccioanr imagen...'
            }
        }

        if (producto_nuevo == null) {
            // uso mp_nueva para modificar y si todo esta bien finalmente actualizar
            producto_nuevo = {...producto}; 
        }

        state.producto_seleccionada = producto; 
        state.producto_nuevo = producto_nuevo; 
    }, 
    SET_ERROR(state, error) {
        state.error = error; 
    }
}

const actions = {
    async listProductos({ commit }, page = 1) {
        await axios.get(url_api+"index?page="+page).then(res => {
            console.log(res);
            commit('SET_PRODUCTOS_LIST', res.data.productos.data); 
            commit('SET_MATERIAS_PRIMAS_LIST', res.data.materias_primas); 
            commit('SET_PREV_PAGE', res.data.productos.prev_page_url); 
            commit('SET_NEXT_PAGE', res.data.productos.next_page_url); 
            commit('SET_LAST_PAGE', res.data.productos.last_page); 
            commit('SET_CURRENT_PAGE', res.data.productos.current_page); 
            
        }).catch(() => {
            /*
            commit('SET_PRODUCTOS_LIST', []); 
            commit('SET_PREV_PAGE', ''); 
            commit('SET_NEXT_PAGE', ''); 
            commit('SET_LAST_PAGE', 0); 
            commit('SET_CURRENT_PAGE', 0); 
            */
        });         
    }, 

    setProducto({ commit }, producto) {
        commit('SET_PRODUCTO', producto); 
    }, 
    /*
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
    */
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