class Round {
    constructor() {
        this.community_cards = []
        this.pot = 0
        this.state = states[0] //set the init state to preflop
        console.log("new round started")
    }

    //helpers
    nextState() {
        if (this.state == null) //if not yet init
            this.state = states[0]

        for (var i = 0; i < states.length - 1; i++) { //-1 because dont check if at end state
            if (this.state == states[i]) {
                return this.state = states[i + 1] //exit
            }
        }
    }

    //getters
    getState() {
        return this.state
    }
}