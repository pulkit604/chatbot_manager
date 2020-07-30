import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router.js';
import VueEditableGrid from 'vue-editable-grid'
import 'vue-editable-grid/dist/VueEditableGrid.css'

Vue.config.productionTip = false;
Vue.component('vue-editable-grid', VueEditableGrid);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
