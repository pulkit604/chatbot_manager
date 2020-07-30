import Vue from 'vue';
import VueRouter from 'vue-router';
import botEdit from "./components/botEdit";
import HomePage from "./components/HomePage.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: HomePage },
    { path: '/edit-bot/:name', component: botEdit, params: name },
];

const router = new VueRouter({routes: routes});

export default router;