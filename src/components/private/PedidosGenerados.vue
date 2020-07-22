<template>
  <div>
    {{ pedidos }}
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