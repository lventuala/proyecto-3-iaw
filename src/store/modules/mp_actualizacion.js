
const state = () => ({
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
        'id_categoria': null, 
        'categoria': null,
        'id_um': null, 
        'uni_medida': null
    }, 
})

const mutations = {
    SET_MP(state,mp,mp_nueva = null) {
        if (mp == null) {
            mp = {
                'id': null, 
                'nombre': "", 
                'cantidad': null,
                'id_categoria': null, 
                'categoria': null,
                'id_um': null, 
                'uni_medida': null
            }
        }

        // uso mp_nueva para modificar y si todo esta bien finalmente actualizar
        mp_nueva = {...mp}; 

        state.mp_seleccionada = mp; 
        state.mp_nueva = mp_nueva; 
    }
}

const actions = {
    setMP({ commit }, mp) {
        commit('SET_MP', mp); 
    }, 
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