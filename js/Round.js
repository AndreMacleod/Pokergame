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
        this.player_index = 0
    }
    stateAction() {

        if (this.state == states[0]) { //PREFLOP
            this.preflop()
            //console.log(this.players)
            //  this.nextState()
        } else if (this.state == states[1]) { //FLOP
            this.flop()
            var data = {community_cards : this.community_cards}
            for(var i =0;i<this.players.length;i++) {
            this.socketEngine.emit("community_cards",data, this.players[i].id)
            }
            console.log(this.community_cards)
        }
        this.getActions()
        //if round is over
        //this.game.newRound()
    }
    flop() {
        var deck_array = this.deck.getDeck()
        this.community_cards.push(deck_array.shift())
        this.community_cards.push(deck_array.shift())
        this.community_cards.push(deck_array.shift())
    }
    applyAction(action, bet_amount) {
        if (action == global_actions[0]) { //FOLD {}
            this.players[this.player_index].fold()
            console.log("player folded")

        } else if (action == global_actions[1]) {//CHECK
            console.log("checked")
        } else if (action == global_actions[2]) { //BET
            if (this.players[this.player_index].isBetValid(bet_amount)) {
                this.players[this.player_index].subtractStack(value) //remove from player
                this.addToPot(value) //add to pot
            }
        }
        this.goNextPlayer()
    }
    getActions() {

        var data = {
            options: global_actions
        }
        console.log("emitting actions to id " + this.players[this.player_index].id)
        this.socketEngine.emit("send_actions", data, this.players[this.player_index].id)
    }

    preflop() { //give hole cards
        //deal 2 cardsv
        var deck_array = this.deck.getDeck()
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].giveHoleCard(deck_array.shift()) //2 cards
            this.players[i].giveHoleCard(deck_array.shift())
        }
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
    addToPot(value) {
        this.pot += value
    }

    goNextPlayer() {
        if (this.isRoundOver()) { //round is over get winner and give them chips
            this.getWinner().addStack(this.getPot())
            this.game.newRound()
            console.log("starting a new round SINCE WINNER ")
        }
        console.log("index " + this.player_index)
        if (this.player_index < this.players.length - 1) {
            console.log("going next player")
            this.player_index++
            this.getActions() // call get bets on next player
        } else {
            console.log("going next STATE")
            this.player_index = 0
            console.log(this.nextState())
            this.stateAction() //finished iterating players so go next state
        }
    }

    getWinner() {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].getFoldedState() == false) {
                return this.players[i]
            }
        }
    }
    isRoundOver() {
        var not_folded = 0
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].getFoldedState() == false) {
                not_folded++
            }
        }
        if (not_folded < 2) {//only one player left, must be winner
            return true;
        }
        return null //more than 1
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