<template>
  <login-register v-if="!loggedIn"></login-register>
  <bot-select v-else></bot-select>
</template>

<script>
import loginRegister from "../components/loginRegister.vue";
import botSelect from "../components/botSelect.vue";
export default {
  name: "HomePage",
  components: {
    botSelect,
    loginRegister,
  },
    computed: {
      loggedIn: function () {
        return localStorage.getItem('loggedIn') != "false";
        }
    }
}
</script>

<style scoped>

</style>
