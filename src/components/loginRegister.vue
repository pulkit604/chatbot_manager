<template>
  <div>
      <v-btn color="error" dark large @click="showRegister = !showRegister">Register</v-btn>
      <v-btn class="ml-2" color="error" dark large @click="showRegister = !showRegister">Login</v-btn>
      <div v-show="showRegister">
          <h1 class="h3 mb-3 font-weight-normal">Create Account</h1>
          <v-text-field
                  v-model="registerForm.name"
                  label="Name"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="registerForm.email"
                  label="Email address"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="registerForm.pass"
                  label="Password"
                  required
          ></v-text-field>
          <v-btn class="mr-4" @click="doRegister" color="green">Register</v-btn>
      </div>
      <div v-show="!showRegister">
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <v-text-field
                  v-model="loginForm.email"
                  label="Email address"
                  required
          ></v-text-field>
          <v-text-field
                  v-model="loginForm.pass"
                  label="Password"
                  required
          ></v-text-field>
          <v-btn class="mr-4" @click="doLogin" color="green">Sign in</v-btn>
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
             fetch(CONST.API_HOST + '?login',  {
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
