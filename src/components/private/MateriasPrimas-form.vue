<template>
  <div>
    <div v-if="error" class="alert alert-danger" role="alert">
      Error en los datos cargados!
    </div>
    <form name="mp_form" v-on:submit.prevent="guardarDatos" action="#">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          name="nombre"
          type="text"
          placeholder="Ingrese el nombre"
          id="nombre"
          class="form-control"
          v-model="mp_nueva.nombre"
        />
        <div class="invalid-feedback"></div>
      </div>
      <div class="form-group">
        <label for="categoria_mp_id">Categoria:</label>
        <select
          name="categoria_mp_id"
          id="categoria_mp_id"
          class="form-control"
          v-model="mp_nueva.id_categoria"
          required
        >
          <option v-bind:value="-1" disabled selected>Seleccione una categoria...</option>
          <option v-for="c in this.categorias" :key="c.id" v-bind:value="c.id">
            {{ c.nombre }}
          </option>
        </select>
        <div class="invalid-feedback"></div>
      </div>
      <div class="form-group">
        <label for="unidad_medida_id">Unidad de Medida:</label>
        <select
          name="unidad_medida_id"
          id="unidad_medida_id"
          class="form-control"
          v-model="mp_nueva.id_um"
          required
        >
          <option v-bind:value="-1" disabled selected
            >Seleccione unidad de medida...</option
          >
          <option
            v-for="um in this.unidad_medida"
            :key="um.id"
            v-bind:value="um.id"
          >
            {{ um.descripcion }}
          </option>
        </select>
        <div class="invalid-feedback"></div>
      </div>
      <div class="form-group">
        <label for="cantidad">Cantidad:</label>
        <input
          name="cantidad"
          id="cantidad"
          type="number"
          placeholder="Ingrese la cantidad"
          class="form-control"
          v-model.number="mp_nueva.cantidad"
          required
        />
        <div class="invalid-feedback"></div>
      </div>

      <button id="btn-aceptar-mp" class="btn btn-primary mr-1">Aceptar</button>
      <button id="btn-cancelar-mp" class="btn btn-primary" data-dismiss="modal">
        Cancelar
      </button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    tipo_movimiento: {
      type: String,
      default: "", // valores : alta / modificacion
    },
  },
  methods: {
    // mapeo funciones para no utilizar this.$store...
    ...mapActions('mps', ['actualizarMP', 'guardarMP', 'setError']),

    async guardarDatos() {
      
      if (this.tipo_movimiento == 'alta') {
        this.guardarMP();
        if (!this.error) {
          // cierro modal
          $('#btn-cancelar-mp').click();
        }
      } else if (this.tipo_movimiento == 'modificacion') {
        // chequeo si hay cambios para enviar solicitud de guardarMP
        let hay_cambios =
          this.mp_seleccionada.nombre.trim() !== this.mp_nueva.nombre.trim() ||
          this.mp_seleccionada.id_categoria !== this.mp_nueva.id_categoria ||
          this.mp_seleccionada.id_um !== this.mp_nueva.id_um ||
          this.mp_seleccionada.cantidad !== this.mp_nueva.cantidad;

        if (hay_cambios) {
          await this.actualizarMP(); 
          if (!this.error) {
            // cierro modal
            $('#btn-cancelar-mp').click();
          }
        } else {
          this.setError(false);
          // cierro modal
          $('#btn-cancelar-mp').click();
        }
      }
    }
  },
  computed: {
    ...mapState(
      'mps',
      [
        'mp_seleccionada',
        'mp_nueva',
        'categorias',
        'unidad_medida',
        'error'
      ]),
  },
};
</script>

<style></style>
