<template>
        <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-header">
            Usuarios registrados
        </div>
        <div class="card-body">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="body_list_mp">
                    
                    <tr v-for="u in usuarios" :key="u.id">
                        <td>{{u.nombre}}</td>
                        <td>{{u.email}}</td>
                        <td> 
                            <span v-if="u.estado == 0">Activo</span>
                            <span v-if="u.estado != 0">Pendiente</span>
                        <td>
                            <button v-if="u.estado == 0" class="btn btn-danger modi_mp" @click="desactivarUsuario(u)">
                                Desactivar
                            </button>
                            
                            <button v-if="u.estado != 0" class="btn btn-primary modi_mp" @click="activarUsuario(u)">
                                Activar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    created() {
        this.listUsuarios(); 
    },
    methods: {
        // mapeo funciones para no utilizar this.$store...
        ...mapActions('usuarios', ['listUsuarios','setUsuario','activar','desactivar']),
        desactivarUsuario(usuario) {
            this.setUsuario(usuario);
            this.desactivar();
        }, 
        activarUsuario(usuario) {
            this.setUsuario(usuario);
            this.activar();
        }
    },
    computed: {
        ...mapState('usuarios', [
        'usuarios',
        ]),
    },
}
</script>

<style>

</style>