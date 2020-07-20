<template>
  <div>
    <NavBar v-if="$store.getters.getUser == null" />
    <NavBarPrivate v-if="$store.getters.getUser != null" />
  </div>
</template>

<script>
import NavBar from "@/components/public/Navbar-public.vue";
import NavBarPrivate from "@/components/private/Navbar-private.vue";
export default {
    components: {
    
    NavBar, 
    NavBarPrivate
  }
};
</script>

<style>
</style>
