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

                                  <button class="btn btn-danger" @click="mostrarMSNEliminar(mp)">
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
                            
                            <MPForm :tipo_movimiento="this.tipo_movimiento"/>

                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="id_elim_mp" tabindex="-1" role="dialog" aria-labelledby="lb_elim_mp" aria-hidden="true">
            <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Eliminar Materia Prima</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                x
                            </button>
                        </div>
                        <div id="mod_mp" class="modal-body">
                            <p>Se va a eliminar la Materia Prima seleccionada. Desea continuar?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="eliminarMPSeleccionada()">Si</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelarEliminarMP()">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
</template>

<script>

import MPForm from '@/components/private/MateriasPrimas-form'; 
import { mapState, mapActions } from 'vuex'; 

export default {
    created() {
      this.getMPPage(1);
    },
    data() {
        return {
            amMP_titulo: "", 
            tipo_movimiento: ''
        }
    }, 
    components: {
        MPForm
    }, 
    methods: {
        // mapeo funciones para no utilizar this.$store...
        ...mapActions('mps', ['listMateriasPrimas','setMP','eliminarMP']),

        // recupero mps de una pagina particular
        getMPPage(pagina, url = null) {
            let nueva_pagina = -1; 
            if (url != null) {
                nueva_pagina = url.split('page=')[1];
            } else {
                nueva_pagina = pagina; 
            }
            this.listMateriasPrimas(nueva_pagina); 
        },

        // muestro componente para editar/agregar mps -> seteo la mp en vuex para 
        // pasar parametros al componente hijo
        amMP(mp = null) {
            // seteo variable global para que la obtenga el hijo
            //this.$store.dispatch('setMP', mp); 
            this.setMP(mp);
            if (mp == null) {
                this.tipo_movimiento = 'alta'; 
                this.amMP_titulo = 'Alta Materia Prima';
            } else {
                this.tipo_movimiento = 'modificacion'
                this.amMP_titulo = 'Modificacion Materia Prima';
            }

            $('#id_mod_mp').modal('show');
        }, 
        mostrarMSNEliminar(mp) {
            this.setMP(mp);
            $('#id_elim_mp').modal('show'); 
        }, 
        eliminarMPSeleccionada() {
            this.eliminarMP();
        }, 
        cancelarEliminarMP() {
            this.setMP(null);
        }
    },
    computed: {
        ...mapState('mps', ['materias_primas', 'categorias', 'unidad_medida', 'prev_page_url', 'next_page_url', 'last_page', 'current_page', 'mp_seleccionada', 'mp_nueva']),
    },
}
</script>

<style>

</style>