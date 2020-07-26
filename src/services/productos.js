import axios from "axios"; 
axios.defaults.baseURL = process.env.VUE_APP_URL_API;

export default {

    /**
     * Recupero los servicios -> si necesidad de autenticacion
     */
    productosAll() {
        return axios.get("productosAll"); 
    }            

}