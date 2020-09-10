<template>
  <v-app>
    <v-app-bar
        app
        elevate-on-scroll
        color="teal lighten-3"
        dark
        hide-on-scroll
        scroll-target="#scrolling-techniques-4"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title @click="gotToHome">Chatbot Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
          class="ma-2"
          tile
          color="indigo"
          @click="doLogout"
          v-show="loggedIn"
          dark>
        Logout
      </v-btn>
    </v-app-bar>
    <v-container class="mt-15 align-self-center">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import CONST from './const.js';
import router from './router.js';
export default {
  name: 'App',
  created() {
    this.isLoggedIn();
    this.$on('update_component', this.updateComponent);
  },
  computed: {
    loggedIn: function () {
      return localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn') != "false";
    }
  },
  methods: {
    isLoggedIn() {
      fetch(CONST.API_HOST + '?check_token', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          token: localStorage.getItem('loginToken'),
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response.tokenValid) {
          localStorage.setItem('loggedIn', true);
        }
      })
      .catch(() => {
        localStorage.setItem('loggedIn', false);
      });
      router.push({ path: '/home'});
    },
    doLogout() {
      fetch(CONST.API_HOST + '?logout', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          token: localStorage.getItem('loginToken'),
        })
      })
       .then(response => response.json())
       .then(response => {
         if(response.success) {
           localStorage.setItem('loginToken', null);
           localStorage.setItem('loggedIn', false);
           location.reload();
         }
       });
    },
    gotToHome() {
      router.push({path: '/home'});
    },
    updateComponent() {
      this.$forceUpdate();
    },
  },
};
</script>
<style></style>
