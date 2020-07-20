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
          <option disabled selected value>Seleccione una categoria...</option>
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
          <option disabled selected value
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
import mpService from "@/services/materiasPrimas";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      error: false,
    };
  },
  props: {
    categorias: {
      type: Array,
      default: () => [],
    },

    unidad_medida: {
      type: Array,
      default: () => [],
    },

    mp: {
      type: Object,
      default: null,
    },
  },
  methods: {
    // mapeo funciones para no utilizar this.$store...
    ...mapActions("mp_actualizacion", ["setMP"]),

    guardarDatos() {
      // chequeo si hay cambios para enviar solicitud de guardarMP
      let hay_cambios =
        this.mp_seleccionada.nombre.trim() !== this.mp_nueva.nombre.trim() ||
        this.mp_seleccionada.id_categoria !== this.mp_nueva.id_categoria ||
        this.mp_seleccionada.id_um !== this.mp_nueva.id_um ||
        this.mp_seleccionada.cantidad !== this.mp_nueva.cantidad;

      if (hay_cambios) {
        mpService
          .actualizarMP(this.mp_nueva.id, this.mp_nueva)
          .then((res) => {
            let mp_res = res.data;

            // actualizo info en el registro seleccionado para que se reflejen los cambios
            this.mp_seleccionada.nombre = mp_res.nombre;
            this.mp_seleccionada.categoria = mp_res.categoria;
            this.mp_seleccionada.uni_medida = mp_res.uni_medida;
            this.mp_seleccionada.cantidad = mp_res.cantidad;
            this.mp_seleccionada.id_um = this.mp_nueva.id_um;
            this.mp_seleccionada.id_categoria = this.mp_nueva.id_categoria;

            this.error = false;

            // cierro modal
            $("#btn-cancelar-mp").click();
          })
          .catch((err) => {
            this.error = true;
          });
      } else {
        this.error = false;
        // cierro modal
        $("#btn-cancelar-mp").click();
      }
    },
  },
  computed: {
    ...mapState("mp_actualizacion", ["mp_seleccionada", "mp_nueva"]),
  },
};
</script>

<style></style>
