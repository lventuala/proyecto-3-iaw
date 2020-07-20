<template>
  <div>
    <Inicio />
  </div>
</template>

<script>
// @ is an alias to /src
import Inicio from "@/components/Inicio.vue";
import NavBar from "@/components/public/Navbar-public.vue";

export default {
  name: "InicioView",
  components: {
    Inicio, 
    NavBar
  }
};
</script>
