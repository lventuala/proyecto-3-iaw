import axios from "axios"; 
axios.defaults.baseURL = process.env.VUE_APP_URL_API;

export default {

    /**
     * Recupero los servicios -> si necesidad de autenticacion
     */
    listMaetriasPrimas(page = 1) {
        return axios.get("mp?page="+page); 
    }, 

    actualizarMP(id,data) {
        return axios.put("updateMP/"+id, data); 
    }, 

    /** 
     * PRUEBA POST
    */
   pruebaPOST() {
    return axios.post("mpPrueba"); 
   }

}