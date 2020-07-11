<template>
  <div id="app">
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-2">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="" width="50" height="50" alt="">
                </a>
                <button class="navbar-toggler" type="button" 
                  data-toggle="collapse" data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" aria-expanded="false" 
                    aria-label="">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                          <router-link to="/"></router-link>

                          <template v-if="$store.getters.getUser == null">
                        
                            <li class="nav-item">
                                <router-link class="nav-link" to="/login">Login</router-link>
                            </li>
                        
                            <li class="nav-item">
                                <router-link class="nav-link" to="/registro">Registro</router-link>
                            </li>
                          </template>
                          <template v-else>
                            

                            <li class="nav-item dropdown">
                              <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {{ $store.getters.getUser.nombre }} <span class="caret"></span>
                              </a>
                              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                  <a class="dropdown-item" href="#">
                                      Ir al panel
                                  </a>


                                  <a class="dropdown-item" href="#" @click="logout">
                                      Salir
                                  </a>
                              </div>
                            </li>
                            
                          </template>
                        
                    </ul>
                </div>
            </div>
        </nav>


    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
