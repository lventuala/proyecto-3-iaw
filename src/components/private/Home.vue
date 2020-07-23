<template>
    <div>
        <template v-if="$store.getters.getUser == null || $store.getters.getUser.estado == 1">
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Atención!</h4>
                <hr>

                <p>El administrador no ha activado tu usuario!!</p>
                <p>En cuanto lo haga vas a poder visualizar las funciones del sistemas.</p>
            </div>
        </template>
        <template v-else>
            <div class="card shadow p-3 mb-5 bg-white rounded w-75 mx-auto">
                <div class="card-header">
                    Información del usuario
                </div>
                <div class="card-body">
                    <form action="#">
                        <div class="form-group">
                            <label for="nombre">Nombre:</label>
                            <input
                                name="nombre" type="text"
                                placeholder=""
                                id="nombre"
                                v-bind:value="$store.getters.getUser.nombre"
                                class="form-control"
                            >
                            <div class="invalid-feedback">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input
                                name="email" type="text"
                                placeholder=""
                                id="email"
                                v-bind:value="$store.getters.getUser.email"
                                class="form-control"
                            >
                            <div class="invalid-feedback">
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </template>
    
    </div>
</template>

<script>
import { mapState,mapActions } from "vuex";

export default {
}

</script>

<style>

</style>