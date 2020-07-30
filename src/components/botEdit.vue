<template>
    <div>
        <h1>BOT Edit: {{ botName }}</h1>
        <h4>Add using CSV</h4>
        <input id="file" type="file" accept=".csv" @change="extractQuestionBank"/>
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
        <h3>Update To DB</h3>
        <button @click="updateToDB()">Update Database</button>
        <br>
        <button v-show="showGetProjectScriptButton" @click="getCiscoProjectScript()">Get Cisco Project Script</button>
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
                tableCols: [ { field: 'question', headerName: 'Question', editable: true, sortable: true }, { field: 'answer', headerName: 'Answer', editable: true, sortable: true}]
            };
        },
        router,
        computed: {
          botName: function() {
              return this.$route.params.name;
          }
        },
        methods: {
            updateToDB() {
                fetch( CONST.API_HOST + '?add_to_bot',  {
                    method : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body   : JSON.stringify({
                        name: this.botName,
                        questionAndAnswers: this.questionBank,
                    })
                })
                    .then(response => response.json())
                    .then(response => {
                        if(response == 1) this.showGetProjectScriptButton = true;
                    })
            },
            getCiscoProjectScript() {

            },
            extractQuestionBank(e) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onload = e => e.target.result.split('\n').forEach(v => this.questionBank.push({ question: v.split(',')[0], answer: v.split(',')[1]}));
                reader.readAsText(file);
                setTimeout(() => { document.querySelector('.header-content').click(); }, 2000);
            }
        },
    }
</script>

<style scoped>

</style>