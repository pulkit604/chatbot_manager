<template>
  <div>
    <h1>BOT Edit: {{ botName }}</h1>
    <h4>Add using CSV</h4>
    <v-file-input
        id="file"
        multiple
        label="File input"
        accept=".csv"
        @change="extractQuestionBank">
    </v-file-input>
    <h2>Question List</h2>
    <vue-editable-grid
        :column-defs="tableCols"
        ref="questionGrid"
        id="questionGrid"
        row-data-key="qID"
        :page-count=10
        :row-data="questionBank">
      <template v-slot:header> Question Bank</template>
    </vue-editable-grid>
    <h4 class="mt-10">Update To DB</h4>
    <v-btn
        @click="updateToDB()"
        color="yellow"
        :disabled="questionsToUpdate.length < 1"
        :loading="updateDBButtonLoad"
        class="mt-5">
      Update Database
    </v-btn>
    <br>
    <v-btn
        v-show="showGetProjectScriptButton"
        @click="getCiscoProjectScript()"
        color="orange"
        class="mt-5">
      Get Cisco Project Script
    </v-btn>
  </div>
</template>

<script>
import router from '../router.js';
import CONST from "../const";
export default {
  name: "botEdit",
  data() {
    return {
      showGetProjectScriptButton: false,
      questionBank: [],
      questionsToUpdate: [],
      updateDBButtonLoad: false,
      tableCols: [ { field: 'question', headerName: 'Question', editable: true, sortable: true }, { field: 'answer', headerName: 'Answer', editable: true, sortable: true}]
    };
  },
  router,
  computed: {
    botName: function() {
      return this.$route.params.name;
    }
  },
  created() {
    this.getBotData();
  },
  methods: {
    updateToDB() {
      this.updateDBButtonLoad = true;
      fetch( CONST.API_HOST + '?add_to_bot',  {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          name: this.botName,
          questionAndAnswers: JSON.stringify(this.questionsToUpdate),
        })
      })
      .then(response => response.json())
      .then(response => {
        this.updateDBButtonLoad = false;
        if(response.success){
          this.showGetProjectScriptButton = true;
        }
      })
    },
    getBotData() {
      fetch( CONST.API_HOST + '?get_bot_data',  {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          name: this.botName,
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response.botData){
          this.showGetProjectScriptButton = true;
          this.questionBank = response.botData;
          setTimeout(() => { document.querySelector('.header-content').click(); }, 2000);
        }
      })
    },
    getCiscoProjectScript() {
      fetch( CONST.API_HOST + '?get_bot_script',  {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          name: this.botName,
        })
      })
      .then(response => response.json())
      .then(response => {
          location = response.projectLink;
      })
    },
    extractQuestionBank() {
      const file = document.querySelector("#file").files[0];
      const reader = new FileReader();
      reader.onload = e => e.target.result.split('\n').forEach(v => this.questionsToUpdate.push({ question: v.split(',')[0], answer: v.split(',')[1]}));
      reader.readAsText(file);
      setTimeout(() => { document.querySelector('.header-content').click(); }, 2000);
    }
  },
}
</script>

<style scoped>

</style>
