import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from "vue2-google-maps";

/* eslint-disable */
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDQ-aesOz_ut1yBv_d6FG-0N60uqDwgLZs",
    //bbri apimap
    // key: "AIzaSyDCkbMJcZIIS_REhArmRj1D5qS3-54cw6g",
    libraries: ["places"]

  },
  installComponents: true,
});

new Vue({
  render: h => h(App),
}).$mount('#app')
