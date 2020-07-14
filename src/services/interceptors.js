import axios from "axios"; 
import Cookies from "js-cookie";

const url_publicas = ['login', 'logout' ];

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    if( url_publicas.indexOf(config.url) == -1 ) {
      let access_token = Cookies.get("token");
      config.headers = { 
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json', 
          'X-Requested-With': 'XMLHttpRequest'
      }
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // si devuelve un token -> actualizo token!
    if ( response.data.token ) {
      let access_token = response.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}` ;
      Cookies.set("token", access_token);
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

  