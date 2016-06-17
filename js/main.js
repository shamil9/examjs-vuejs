'use strict';
new Vue({
    el: '#app',
    data: {
        question: 0,
        proposition: {},
        reponses: [],
        next: false,
        results: false
    },
    computed: {
        nextCheck() {
            if (this.next)
                return true;
            return false;
        }
    },
    ready() {
        this.getData(this.question);
    },
    methods: {
        getData(question) {
            this.next = false;
            //if previous button is hit show stored response
            if (this.reponses[question]) {
                this.next = true;
                this.showChoice(question);
                return this.proposition = this.reponses[question];
            }

            //fetch new question
            this.$http.get('quizz.php?question=' + question, (question) => {
                this.proposition = question;
            });
        },

        //push answer into answers array
        storeResponse(question, choix) {
            question.choix = choix;
            this.reponses[this.question] = question;
        },

        //select the chosen checkbox if showin previous answer
        showChoice(question) {
            setTimeout(() => {
                let inputs = document.getElementsByTagName("input");
                for (let input of inputs) {
                    if (input.value == this.reponses[question].choix)
                        input.setAttribute("checked", "checked");
                }
            }, 10);
        },

        //toggle results display
        showResults() {
            this.results = true;
        }
    }
});
