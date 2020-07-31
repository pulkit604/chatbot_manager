import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js';
import VueEditableGrid from 'vue-editable-grid'
import 'vue-editable-grid/dist/VueEditableGrid.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.component('vue-editable-grid', VueEditableGrid);
new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
