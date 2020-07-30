<template>
  <div>
      <button @click="showRegister = !showRegister;">Register</button>
      <button @click="showLogin = !showLogin;">Login</button>
      <div v-show="showRegister">
          <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
          <label for="inputName" class="sr-only">Name</label>
          <input type="text" id="inputName" v-model="registerForm.name" class="form-control" placeholder="Name" required="" autofocus="">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" v-model="registerForm.email" class="form-control" placeholder="Email address" required="" autofocus="">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" v-model="registerForm.pass" class="form-control" placeholder="Password" required="">
          <button class="btn btn-lg btn-primary btn-block" @click="doRegister()">Register</button>
      </div>
      <div v-show="showLogin">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" v-model="loginForm.email"  id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" v-model="loginForm.pass" id="inputPassword" class="form-control" placeholder="Password" required="">
          <button class="btn btn-lg btn-primary btn-block" @click="doLogin()">Sign in</button>
      </div>
  </div>
</template>

<script>
    import CONST from '../const.js';
    export default {
        name: "loginRegister",
        data() {
            return {
            loggedIn: false,
            showRegister: false,
            showLogin: false,
            authToken: '',
            loginForm: {
              email: 'guppul@gmail.com',
              pass: '123321',
            },
            registerForm: {
                name: 'Pulkit Gupta',
                email: 'guppul@gmail.com',
                pass: '123321'
            },
            };
        },
        methods: {
            doRegister() {
             fetch(CONST.API_HOST + '?create_account',
                 { method : 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body   : JSON.stringify({
                            name: this.registerForm.name,
                            email: this.registerForm.email,
                            pass: this.registerForm.pass
                        })
                 })
                 .then(response => response.json())
                    .then(response => {
                        localStorage.setItem('loginToken', response.token);
                    })
             .catch(error => {console.log(error);})
             ;
            },
            doLogin() {
             fetch('http://sporadic-rod.000webhostapp.com/api/?login',  {
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body   : JSON.stringify({
                    name: this.registerForm.name,
                    email: this.registerForm.email,
                    pass: this.registerForm.pass
                })
             })
                 .then(response => response.json())
                 .then(response => {
                     localStorage.setItem('loginToken', response.token);
                 });
            },
        },
    }
</script>

<style scoped>

</style>