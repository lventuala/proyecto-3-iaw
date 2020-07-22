<template>
  <div>
    <div v-if="error" class="alert alert-danger" role="alert">
      Error en los datos cargados!
    </div>
    
    <form name="producto_form" v-on:submit.prevent="guardarDatos" action="#">
      <div class="row mb-3">

        <div class="col-12 col-md-4">

            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input
                    name="nombre"
                    type="text"
                    placeholder="Ingrese el nombre"
                    id="nombre"
                    class="form-control"
                    v-model="producto_nuevo.nombre"
                    required
                >
            </div>

            <div class="form-group">
                <label for="descripcion">Descripcion:</label>
                <textarea
                    name="descripcion"
                    type="text"
                    placeholder="Ingrese una descripcion" id="descripcion"
                    class="form-control"
                    v-model="producto_nuevo.descripcion"
                    required
                ></textarea>
                <div id="descripcion_err" class="invalid-feedback">
                </div>
            </div>

            <div class="form-group">

                <div class="custom-file">
                    <input
                      id="in_imagen_prod"
                      @change="actualizaImagen($event)"
                      required
                      name="imagen"
                      type="file"
                      class="custom-file-input" lang="es"
                    >
                    <label
                        id="lbl_imagen"
                        class="custom-file-label"
                        for="validatedCustomFile">
                        {{ producto_nuevo.nombre_img }}
                        </label>
                    <div class="invalid-feedback">La imagen es obligatoria</div>
                </div>

                <img
                    id='img_upload'
                    style="width: 100%;"
                    :src=' "data:image/gif;base64,"+producto_nuevo.img '
                />
            </div>

        </div>

          <div class="col-12 col-md-8">
            <div class="card">
                <div class="card-header">
                    Listado de Materias Primas <small>(agregar 1 o mas mp)</small>
                </div>
                <div class="card-body">
                    <table name="tbl_materias_primas" class="table table-striped table-bordered table-s" >
                        <thead>
                            <tr>
                                <th class="w-75" scope="col">MP | Uni. Medida</th>
                                <th class="w-25" scope="col">Cantidad</th>
                                <th>
                                    <button
                                        type="button"
                                        class="btn btn-primary btn-sm"
                                    >
                                      <i class="material-icons md-12">
                                          add
                                      </i>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="body_mp">
                          <ProductoMP v-for="(mp, index) in producto_nuevo.mps" 
                            :key="mp.materia_prima_id" 
                            :materias_primas="materias_primas"
                            :mp="mp"
                            :mostrar_eliminar="index != 0"
                          />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductoMP from '@/components/private/Productos-mp'; 

export default {

    components: {
      ProductoMP
    },

    methods: {
        // mapeo funciones para no utilizar this.$store...
        ...mapActions('mps', ['actualizarMP', 'guardarMP', 'setError']),

        actualizaImagen(event) {
          var new_file = event.target.files[0];

          var reader = new FileReader();

          var img_tag = document.getElementById("img_upload");
          img_tag.title = new_file.name;
          $('#lbl_imagen').html(img_tag.title);

          reader.onload = function(event) {
            img_tag.src = event.target.result;
          };

          reader.readAsDataURL(new_file);
        }, 

        async guardarDatos() {
        }, 

        
    }, 

    computed: {
    ...mapState(
      'productos',
      [
        'materias_primas', 
        'producto_seleccionado', 
        'producto_nuevo', 
        'error'
      ]),
    },

}
</script>

<style>

</style>