<template>
    <div class="card shadow p-3 mb-5 bg-white rounded">
        <div class="card-header">
            Generar un nuevo pedido
        </div>
        <div class="card-body">
            <form method="POST" v-on:submit.prevent="guardarDatos" action="#">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Imagen</th>
                            <th scope="col">Cantidad Maxima</th>
                            <th scope="col">Cantidad</th>
                        </tr>
                    </thead>
                    <tbody id="body_list_producto">
                        <tr v-for="p in productos" :key="p.id">
                            <td>{{p.nombre}}</td>
                            <td>{{p.descripcion}}</td>
                            <td><img :src="'data:image/gif;base64,'+p.img" class="img_Thumbnail"></td>
                            <td>{{p.cant_maxima}}</td>
                            <td>
                                <input
                                    id="cantidad"
                                    type="number"
                                    placeholder="Cantidad..."
                                    class="form-control"
                                    :onfocusout="reCalcularCantidad()"
                                    v-model.number="p.cantidad"
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <button class="btn btn-primary">Nuevo Pedido</button>
                
            </form>
        </div>

        <div id="id_ok" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Generar Pedido</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <p>{{this.msn}}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Aceptar</button>
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
      this.listProductosPedidos(); 
    },
    data() {
      return {
      };
    },
    methods: {
        // mapeo funciones para no utilizar this.$store...
        ...mapActions('pedidos', ['guardarPedido']),
        ...mapActions('productos', ['listProductosPedidos']),
        reCalcularCantidad() {
        }, 
        async guardarDatos() {
          await this.guardarPedido(this.productos); 
          await this.listProductosPedidos();
          $('#id_ok').modal('show');
        }
    },
    computed: {
        ...mapState('pedidos',['pedidos','msn','error']),
        ...mapState('productos',['productos']),
    },
}

</script>

<style>

</style>