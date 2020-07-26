<template>
  <div class="col-12">
    <div class="card shadow p-3 mb-5 bg-white rounded">
      <div class="card-header">
        Listado de Producto
      </div>

      <div id="list_ajax" class="card-body">
        <div id="list_ajax" class="card-body">
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li
                class="page-item"
                v-bind:class="{ disabled: prev_page_url == null }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="getProductos(-1, prev_page_url)"
                  >Anterior</a
                >
              </li>
              <li
                v-for="page in this.last_page"
                :key="page"
                class="page-item"
                v-bind:class="{ active: page == current_page }"
                @click="getProductos(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>
              <li
                class="page-item"
                v-bind:class="{ disabled: next_page_url == null }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="getProductos(-1, next_page_url)"
                  >Siguiente</a
                >
              </li>
            </ul>
          </nav>

          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Imagen</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="body_list_producto">
              <tr v-for="p in productos" :key="p.id">
                <td>{{ p.nombre }}</td>
                <td>{{ p.descripcion }}</td>
                <td>
                  <img
                    :src="'data:image/gif;base64,' + p.img"
                    class="img_Thumbnail"
                  />
                </td>
                <td class="btn-group btn-group-sm">
                  <button class="btn btn-primary"  @click="amProducto(p)">
                    <i class="material-icons md-12">edit</i>
                  </button>

                  <button class="btn btn-danger">
                    <i class="material-icons md-12">delete</i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="modal fade bd-example-modal-lg" id="id_mod_producto" tabindex="-1" role="dialog" aria-labelledby="lb_mod_producto" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ this.producto_titulo }}</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
          </div>
          <div id="mod_producto" class="modal-body">
            <ProductosForm :tipo_movimiento="this.tipo_movimiento" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProductosForm from '@/components/private/Productos-form';  

export default {
  created() {
    this.getProductos(1);
  },
  data() {
      return {
          producto_titulo: "", 
          tipo_movimiento: ''
      }
  }, 
  components: {
    ProductosForm
  },
  methods: {
    // mapeo funciones para no utilizar this.$store...
    ...mapActions('productos', ['listProductos', 'setProducto']),

    getProductos(pagina, url = null) {
      let nueva_pagina = -1;
      if (url != null) {
        nueva_pagina = url.split("page=")[1];
      } else {
        nueva_pagina = pagina;
      }

      this.listProductos(nueva_pagina);
    },
    amProducto(producto) {
      this.setProducto(producto);
      if (producto == null) {
            this.tipo_movimiento = 'alta'; 
            this.producto_titulo = 'Alta de Producto';
        } else {
            this.tipo_movimiento = 'modificacion'
            this.producto_titulo = 'Modificacion de Producto';
        }

        $('#id_mod_producto').modal('show');
    },
  },
  computed: {
    ...mapState('productos', [
      'productos',
      'prev_page_url',
      'next_page_url',
      'last_page',
      'current_page',
    ]),
  },
};
</script>

<style></style>
