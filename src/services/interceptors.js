import axios from "axios"; 
import Cookies from "js-cookie";

const url_publicas = ['login', 'user', 'logout' ];

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent

    if( url_publicas.indexOf(config.url) == -1 ) {
      let access_token = Cookies.get("token");
      config.headers = { 
          'Authorization': `Bearer ${access_token}`,
          /*'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'*/

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
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

  