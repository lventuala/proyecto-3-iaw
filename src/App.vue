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
                            <span> {{ $store.getters.getUser.nombre }} </span>
                          </template>
                        
                    </ul>
                </div>
            </div>
        </nav>


    <router-view />
  </div>
</template>

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
