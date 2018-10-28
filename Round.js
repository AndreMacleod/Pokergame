class Round {
    constructor(game) {
        this.community_cards = []
        this.pot = 0
        this.game = game;
        this.deck = global_deck //copy global deck
        this.state = states[0] //set the init state to preflop
        console.log("new round started")
    }
    start() {
        //if round is over
        this.game.newRound()
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

    getPot() {
        return this.pot
    }
    //getters
    getState() {
        return this.state
    }
}