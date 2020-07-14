<template>
  <div class="container-fluid">


    <div class="card-deck mb-3">
        <div class="card">
            <img class="card-img-top" src="@/assets/chef-img-1.png" alt="Card image cap">
            <div class="card-body">
            <h2 class="card-title">Registrate completamente gratis!!</h2>
            <h4 class="card-text">Si todavía no sos usuario registrate y consulta todos lo menúes que tenemos para vos! </h4>
            </div>
        </div>
        <div class="card">
            <img class="card-img-top" src="@/assets/chef-img-2.png" alt="Card image cap">
            <div class="card-body">
            <h2 class="card-title">Comidas totalmente caseras!!</h2>
            <h4 class="card-text">Si no tenes ganas de cocinar te ofrecemos la mas grande variedad de comidas caseras! Realizá tu pedido por la página!</h4>
            </div>
        </div>
    </div>


    <div class="card">
        <div class="card-header text-white bg-info">
            Mirá los menús que tenemos para vos!
        </div>
        <div class="card-body">

<table class="table table-hover">
    <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Imagen</th>
        </tr>
    </thead>
    <tbody> 
        <tr v-for="p in productos">
            <td>{{p.nombre}}</td>
            <td>{{p.descripcion}}</td>
            <td><img :src="'data:image/gif;base64,'+p.img" class="img_Thumbnail"></td>
        </tr>
    </tbody>
</table>    
            
        </div>
    </div>

</div>

</template>



<script>
import prodService from '@/services/productos'; 

export default {
  created() {
    prodService.productosAll().then(res => {
        this.productos = res.data.productos; 
    }); 
   },
  data() {
      return {
        productos : []
      }
  }
};
</script>