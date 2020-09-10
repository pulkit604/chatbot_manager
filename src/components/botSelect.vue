<template>
  <div>
    <h2>Select your Bot or Create new</h2>
      <h4>Already existing</h4>
      <v-card
          class="mx-auto"
          max-width="400"
          tile
      >
        <v-list
            :dense=true
            :rounded=true
        >
          <v-subheader>BOT Name</v-subheader>
          <v-list-item-group v-model="botList" color="primary">
            <v-list-item
                v-for="botName in botList"
                :key="'existing_bot' + botName"
            >
              <v-list-item-content>
                <v-list-item-title @click.prevent="goToBotEdit(botName)" v-html="botName"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
      <h2>Or</h2>
      <div>Create New Bot</div>
        <form>
          <v-text-field
              v-model="botName"
              label="Bot Name"
              required
          ></v-text-field>
          <v-text-field
              v-model="purpose"
              label="Purpose"
              required
          ></v-text-field>
          <v-btn
              class="mr-4"
              @click="createBot"
              :loading="botCreateLoad"
              color="green">Create New</v-btn>
        </form>
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
      botList: [],
      botName: '',
      purpose: '',
      botCreateLoad: false,
    };
  },
  created() {
    this.getBotList();
  },
  methods: {
    goToBotEdit(name){
      if(!name) return;
      router.push({ path: 'edit-bot/' + name});
    },
    createBot() {
      this.botCreateLoad = true;
      fetch( CONST.API_HOST + '?create_bot',  {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          name: this.botName,
          purpose: this.purpose,
          token: localStorage.getItem('loginToken'),
        })
      })
        .then(response => response.json())
        .then(response => {
          if(response.success) this.goToBotEdit(this.botName);
        })
    },
    getBotList() {
      fetch( CONST.API_HOST + '?get_bots',  {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          token: localStorage.getItem('loginToken'),
        })
      })
      .then(response => response.json())
      .then(response => {
        this.botList = response.botList;
      })
    }
  },
}
</script>
