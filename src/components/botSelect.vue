<template>
  <div>
    <h2>Select your Bot or Create new</h2>
    <div class="container">
      <div>Already existing</div>
      <ul style="list-style: none">
        <li class="bot_list_item" v-for="botName in botList" :key="'existing_bot' + botName"><div @click="goToBotEdit(botName)">{{ botName }}</div></li>
      </ul>
      <div>Create New Bot</div>
        <form>
          <label>Bot Name</label>
          <input v-model="botName"/>
          <label>Purpose</label>
          <input v-model="purpose"/>
          <button @click="createBot()">Create</button>
        </form>
    </div>
  </div>
</template>

<script>
  import router from '../router.js';
  import CONST from '../const.js';
    export default {
        name: "botSelect",
        router,
        data() {
            return {
                botList: ['a', 'b', 'c'],
              botName: '',
              purpose: '',
            };
        },
      methods: {
        goToBotEdit(name){
          router.push({ path: 'edit-bot/' + name});
        },
        createBot() {
          fetch( CONST.API_HOST + '?create_bot',  {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body   : JSON.stringify({
              name: this.botName,
              purpose: this.purpose,
            })
          })
          .then(response => response.json())
          .then(response => {
            if(response == 1) this.goToBotEdit(this.name);
          })
        },
      },
    }
</script>

<style scoped>
.bot_list_item {
  color: aqua;
}
</style>