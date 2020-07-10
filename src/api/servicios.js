import axios from "axios"; 

const URL_API = "http://proyecto-2-iaw.test/api/"; 

export default {
    login(email,password) {
        let data = {email,password};
        return axios.post(URL_API + "login", data);
    }
}