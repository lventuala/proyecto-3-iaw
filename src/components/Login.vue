<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Ingresar</div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                            <div class="col-md-6">
                                <input v-model="email"
                                  id="email"
                                  type="email"
                                  class = "form-control"
                                  v-bind:class="{ 'is-invalid': error }"
                                  name="email"
                                  required autocomplete="email" autofocus>
                              <span class="invalid-feedback" role="alert">
                                <strong>{{ msn_error }}</strong>
                              </span>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Contraseña</label>

                            <div class="col-md-6">
                                <input
                                v-model="password" 
                                id="password" 
                                type="password" 
                                class="form-control" 
                                v-bind:class="{ 'is-invalid': error }"
                                name="password" 
                                required autocomplete="current-password">
                            </div>
                        </div>

                        <div class="form-group row">
                            <div class="col-md-6 offset-md-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember">

                                    <label class="form-check-label" for="remember">
                                        Recordar Contraseña
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    Ingresar
                                </button>
                                <a class="btn btn-link" href="#">
                                    ¿Olvidó la contraseña?
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    email: "", 
    password: "", 
    error: false, 
    msn_error: ""
  }),
  methods: {
    async login() {
      try {
        let email = this.email; 
        let password = this.password; 
        await this.$store.dispatch('login',{email,password});
        this.$router.push("/");
        /*if (result.data.error) {
          this.error = true; 
          this.msn_error = result.data.msn_error; 
        } else {
          let token = result.data.token; 
          this.error = false; 
        }*/
      } catch (ex) {
      }
    }
  },
  props: {
  }
};
</script>
