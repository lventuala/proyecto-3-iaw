<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-3">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="@/assets/logo.png" width="50" height="50" alt="" />
          {{titulo}}
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav nav-pills">
            <li v-for="f in funciones" class="nav-item">
              <router-link class="nav-link" :to=f.url>{{ f.nombre }}</router-link>
            </li>
          </ul>
        </div>

        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
                <a
                  id="navbarDropdown"
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ nombre_usuario }}
                  <span class="caret"></span>
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <a class="dropdown-item" href="#" @click="logout">
                    Salir
                  </a>
                </div>
              </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
    created: async function () {
      //await this.$store.dispatch("getUser");
      let usuario = this.$store.getters.getUser; 
      if (usuario) {
        this.nombre_usuario = usuario.nombre; 
        this.funciones = usuario.funciones; 
      }
    },
   data() {
    return {
      titulo : process.env.VUE_APP_NAME, 
      nombre_usuario : "", 
      funciones : []
    };
  }, 
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
