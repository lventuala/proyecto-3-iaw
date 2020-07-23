<template>
      <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-header">
            Pedidos Generados
        </div>
        <div class="card-body">

            

            <div id="accordion">

                @foreach($pedidos as $pedido)

                <div v-for="pedido in pedidos" :key="pedido.id" class="card">
                    <div class="card-header" :id="'id_'+pedido.id">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" :data-target="'#collapse_'+pedido.id" aria-expanded="true" :aria-controls="'collapse_'+pedido.id">
                                Pedido #{{pedido.id}}
                            </button>
                        </h5>
                    </div>

                    <div :id="'collapse_'+pedido.id" class="collapse show" :aria-labelledby="'id_'+pedido.id" data-parent="#accordion">
                        <div class="card-body">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripcion</th>
                                        <th scope="col">Imagen</th>
                                        <th scope="col">Cantidad Pedida</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="producto in pedido.productos" :key="producto.id">
                                        <td>{{producto.nombre}}</td>
                                        <td>{{producto.descripcion}}</td>
                                        <td><img :src="'data:image/gif;base64,'+producto.img" class="img_Thumbnail"></td>
                                        <td>{{producto.cantidad}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    created() {
      this.listPedidos(); 
    },
    methods: {
        // mapeo funciones para no utilizar this.$store...
        ...mapActions('pedidos', ['listPedidos']),
    },
    computed: {
        ...mapState('pedidos', [
        'pedidos',
        ]),
    },
}
</script>

<style>

</style>