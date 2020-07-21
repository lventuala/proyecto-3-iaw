<template>

    <tr id="mp_tr_1">
        <td>
            <div class="form-group">
                <select
                    id="mp_1_materia_prima_id"
                    name="mp[1][materia_prima_id]"
                    v-bind:value="mp.materia_prima_id"
                    class="form-control"
                >

                    <option v-bind:value="-1" disabled selected>Seleccione una mp...</option>

                    <option 
                        v-for="m in this.materias_primas"
                        v-bind:value="m.id">
                        {{m.nombre}} | {{m.uni_medida}}
                    </option>

                </select>

                <div id="mp_1_materia_prima_id_err" class="invalid-feedback">
                    El campo MP es obligatorio
                </div>
            </div>
        </td>
        <td>
            <div class="form-group">
                <input
                id="mp_1_cantidad"
                name="mp[1][cantidad]"
                class="form-control"
                v-bind:value="mp.cantidad"
                type="number"
                step="0.1"
            >
                <div id="mp_1_cantidad_err" class="invalid-feedback">
                    El campo cantidad es obligatorio
                </div>
            </div>
        </td>
        <td>
            <button v-if="mostrar_eliminar"
                type="button"
                class="btn btn-danger btn-sm pl-2 pr-2"
            >
                <i class="material-icons md-12">
                    remove
                </i>
            </button>
        </td>
    </tr>

</template>

<script>
export default {

    props: {
        mostrar_eliminar: {
            type: Boolean,
            default: false, 
        },
        materias_primas:{
            type: Array, 
            default: (() => [])
        }, 
        mp:{
            type: Object, 
            default: (() => ({}))
        }
    },

}
</script>

<style>

</style>