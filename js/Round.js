const Deck = require('./Deck.js')
class Round {
    constructor(game, socketEngine) {
        this.community_cards = []
        this.socketEngine = socketEngine
        this.pot = 0
        this.game = game;
        this.deck = new Deck()
        this.state = states[0] //set the init state to preflop
        this.players = this.game.getTable().getPlayers()
        console.log("new round started")
        this.deck.shuffle()
    }
    start() {

        if (this.state == states[0]) { //PREFLOP
            this.preflop()
            //console.log(this.players)
            this.getBets()
          //  this.nextState()
        }
        //if round is over
        //this.game.newRound()
    }
    getBets() {
        var data = {
            options:["FOLD","BET","CHECK"]
        }
        for (var i = 0; i < this.players.length; i++) {
            //this.socketEngine.emit("bet_options")
            //ask each player options
            //options go in player class,like player.fold, .bet ..
        }

    }
   
    preflop() { //give hole cards
        //deal 2 cardsv
        var deck_array = this.deck.getDeck()
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].giveHoleCard(deck_array.shift()) //2 cards
            this.players[i].giveHoleCard(deck_array.shift())
        }
    }
    flop() {
        
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
module.exports = Round