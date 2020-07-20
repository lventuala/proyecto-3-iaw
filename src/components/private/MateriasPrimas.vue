<template>
        <div class="col-12">
            <div class="card shadow p-3 mb-5 bg-white rounded">
                <div class="card-header">
                    Listado de Materias Primas
                </div>

                <button id="btn-aceptar-mp" class="btn btn-primary" @click="amMP()">Agregar Nueva MP</button>

                <div id="list_ajax" class="card-body">

                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li class="page-item" v-bind:class="{ disabled: prev_page_url == null }">
                                <a class="page-link" href="#" @click="getMPPage(-1,prev_page_url)">Anterior</a>
                            </li>
                            <li 
                                v-for="page in this.last_page"  :key="page"
                                class="page-item" 
                                v-bind:class="{ active: page == current_page }"
                                @click="getMPPage(page)"
                            > 
                                <a class="page-link" href="#">{{page}}</a>
                            </li>
                            <li class="page-item" v-bind:class="{ disabled: next_page_url == null }">
                                <a class="page-link" href="#" @click="getMPPage(-1,next_page_url)">Siguiente</a>
                            </li>
                        </ul>
                    </nav>

                    <table class="table table-hover">
                      <thead>
                          <tr>
                              <th scope="col">Nombre</th>
                              <th scope="col">Categoria</th>
                              <th scope="col">Uni. Medida</th>
                              <th scope="col">Cantidad Actual</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody id="body_list_mp">
                          <tr v-for="mp in materias_primas" :key="mp.id">
                              <td>{{mp.nombre}}</td>
                              <td>{{mp.categoria}}</td>
                              <td>{{mp.uni_medida}}</td>
                              <td>{{mp.cantidad}}</td>
                              <td class="btn-group btn-group-sm">
                                  <button class="btn btn-primary" @click="amMP(mp)">
                                      <i class="material-icons md-12">edit</i>
                                  </button>

                                  <button class="btn btn-danger">
                                      <i class="material-icons md-12">delete</i>
                                  </button>
                              </td>

                          </tr>
                      </tbody>
                  </table>

                </div>
            </div>

            <div class="modal fade" id="id_mod_mp" tabindex="-1" role="dialog" aria-labelledby="lb_mod_mp" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title"> {{ this.amMP_titulo }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                x
                            </button>
                        </div>
                        <div id="mod_mp" class="modal-body">
                            <MPForm :categorias="this.categorias" :unidad_medida="this.unidad_medida"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

import mpService from '@/services/materiasPrimas'; 
import MPForm from '@/components/private/MateriasPrimas-form'; 
import { mapState, mapActions } from 'vuex'; 


export default {
    created() {
      this.getMPPage(1);
    },
    data() {
        return {
            materias_primas : [], 
            prev_page_url: null, 
            next_page_url: null, 
            last_page: 0, 
            current_page: 0, 
            categorias:[], 
            unidad_medida: [], 
            amMP_titulo: ""
        }
    }, 
    components: {
        MPForm
    }, 
    methods: {
        // mapeo funciones para no utilizar this.$store...
        ...mapActions('mp_actualizacion', ['setMP']), 

        // recupero mps de una pagina particular
        getMPPage(pagina, url = null) {
            let nueva_pagina = -1; 
            if (url != null) {
                nueva_pagina = url.split('page=')[1];
            } else {
                nueva_pagina = pagina; 
            }

            mpService.listMaetriasPrimas(nueva_pagina).then(res => {
                this.materias_primas = res.data.materias_primas.data; 
                this.categorias = res.data.categorias; 
                this.unidad_medida = res.data.unidad_medida; 

                // seteo info parala paginacion
                this.prev_page_url = res.data.materias_primas.prev_page_url, 
                this.next_page_url = res.data.materias_primas.next_page_url, 
                this.last_page = res.data.materias_primas.last_page, 
                this.current_page = res.data.materias_primas.current_page
            }); 
        },

        // muestro componente para editar/agregar mps -> seteo la mp en vuex para 
        // pasar parametros al componente hijo
        amMP(mp = null) {
            // seteo variable global para que la obtenga el hijo
            //this.$store.dispatch('setMP', mp); 
            this.setMP(mp);
            if (mp == null) {
                this.amMP_titulo = "Alta Materia Prima";
            } else {
                this.amMP_titulo = "Modificacion Materia Prima";
            }
            
            $('#id_mod_mp').modal('show');
        }
    },
}
</script>

<style>

</style>