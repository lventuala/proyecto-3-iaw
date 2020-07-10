<template>
  <div>
    <login></login>
  </div>
</template>
<script>
// @ is an alias to /src
import login from "@/components/Login.vue";

export default {
  name: "LoginView",
  components: {
    login
  }
};
</script>
