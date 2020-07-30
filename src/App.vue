<template>
  <div>
    <router-view></router-view>
    <div id="app"></div>
  </div>
</template>

<script>
  import router from './router.js';
export default {
  name: 'App',
  router,
  created() {
    this.isLoggedIn();
  },
  methods: {
    isLoggedIn() {
      fetch('http://sporadic-rod.000webhostapp.com/api/?check_token', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
                    token: localStorage.getItem('loginToken')
        })
      })
          .then(response => response.json())
          .then(response => {if (response.valid) this.loggedIn = true;});
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
