import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import api from './plugins/api';
import router from './plugins/router';
import store from './plugins/vuex';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
