const Deck = require('./Deck.js')
const Card = require('./Card.js')
const Player = require('./Player.js')
class Round {
    constructor(game, socketEngine) {
        this.community_cards = []
        this.socketEngine = socketEngine
        this.pot = 0
        this.game = game;
        this.deck = new Deck()
        this.state = states[0] //set the init state to preflop
        this.players = this.clonePlayers()
        this.deck.shuffle()
        this.player_index = 0
        this.required_bet = 0
    }
    clonePlayers() {
        var players = this.game.getTable().getPlayers()
        var arr = []
        for (var i = 0; i < players.length; i++) {
            arr.push(new Player(players[i].id, players[i].stack, players[i].blind_type, players[i].has_folded))
        }
        return arr
    }
    stateAction() {
        this.required_bet = 0 //reset for each round
        if (this.state == states[0]) { //PREFLOP
            console.log("going preflop")
            this.preflop()

        } else if (this.state == states[1]) { //FLOP
            this.addCardsToCommunity(3)
            var data = { community_cards: this.community_cards }
            for (var i = 0; i < this.players.length; i++) {
                this.socketEngine.emit("community_cards", data, this.players[i].id)
            }

        } else if (this.state == states[2]) { //TURN
            this.addCardsToCommunity(1)
            var data = { community_cards: this.community_cards }
            for (var i = 0; i < this.players.length; i++) {
                this.socketEngine.emit("community_cards", data, this.players[i].id)
            }

        } else if (this.state == states[3]) { //RIVER
            this.addCardsToCommunity(1)
            var data = { community_cards: this.community_cards }
            for (var i = 0; i < this.players.length; i++) {
                this.socketEngine.emit("community_cards", data, this.players[i].id)
            }
        }

        this.getActions()
        console.log(this.community_cards)
    }
    addCardsToCommunity(amount) {
        var deck_array = this.deck.getDeck()
        for (var i = 0; i < amount; i++) {
            this.community_cards.push(deck_array.shift())
        }
    }

    applyAction(action, bet_amount, socket_id) {
        if (this.players[this.player_index].id != socket_id)
            return //not this players turn

        if (action == global_actions[0]) { //FOLD {}
            this.players[this.player_index].fold()
            console.log("player folded")

        } else if (action == global_actions[1]) {//CHECK
            console.log("checked")
        } else if (action == global_actions[2]) { //BET
            if (this.players[this.player_index].isBetValid(bet_amount)) {
                this.game.getTable().getPlayers()[this.player_index].subtractStack(bet_amount) //remove from player
                this.players[this.player_index].subtractStack(bet_amount) //remove from player
                this.addToPot(bet_amount) //add to pot
                if (bet_amount >= this.required_bet) {
                    this.required_bet = bet_amount
                    this.players[this.player_index].bet_amount = bet_amount
                }
                console.log("Remaining stack " + this.players[this.player_index].getStack())
            }
        }
        console.log("pot is " + this.pot)
        this.resendData()
        this.goNextPlayer()
    }
    getActions() {
        var data = {
            options: global_actions
        }
        if (this.required_bet > 0) {
            data.options = ["FOLD", "BET"]
        }

        console.log("emitting actions to id " + this.players[this.player_index].id)
        this.socketEngine.emit("send_actions", data, this.players[this.player_index].id)
    }
    resendData() {
        var deck_array = this.deck.getDeck()
        var obf = this.obfuscatePlayerCards()
        for (var i = 0; i < this.players.length; i++) {


            var new_data = {
                players: obf,
                my_player: this.players[i]
            }
            this.socketEngine.emit("send_data", new_data, this.players[i].id)
        }
    }
    preflop() { //give hole cards
        //deal 2 cardsv

        var deck_array = this.deck.getDeck()
        var obf = this.obfuscatePlayerCards()
        for (var i = 0; i < this.players.length; i++) {
            console.log("before new preflop ")
            console.log(this.players[i])
            this.players[i].giveHoleCard(deck_array.shift()) //2 cards
            this.players[i].giveHoleCard(deck_array.shift())
            var new_data = {
                players: obf,
                my_player: this.players[i]
            }
            this.socketEngine.emit("send_data", new_data, this.players[i].id)
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
            console.log("starting a new round SINCE WINNER ")
            this.getWinner().addStack(this.getPot())
            return this.game.newRound()
        }
        this.player_index++
        if (this.required_bet > 0) {
            if (this.players[this.player_index].bet_amount < this.required_bet) {
                //have not matched bet so send actions
                this.getActions() // call get bets on next player
            } else { //full circle
                console.log("going next STATE")
                this.player_index = 0
                console.log(this.nextState())
                this.stateAction() //finished iterating players so go next state
            }
        } else {
            if (this.player_index < this.players.length - 1) {
                console.log("going next player")
                this.getActions() // call get bets on next player
            }
        }
        /* console.log("index " + this.player_index)
         if (this.player_index < this.players.length - 1) {
             console.log("going next player")
             this.player_index++
             this.getActions() // call get bets on next player
         } else {
             console.log("going next STATE")
             this.player_index = 0
             console.log(this.nextState())
             this.stateAction() //finished iterating players so go next state
         }*/


    }

    getWinner() {
        console.log("getting winner " + this.players.length)
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].getFoldedState() == false) {
                return this.game.getTable().getPlayers()[i]
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
    getDeck() {
        return this.deck
    }
    obfuscatePlayerCards() {
        var players = this.players
        var arr = []
        var hidden_cards = [new Card("HIDDEN", "HIDDEN"), new Card("HIDDEN", "HIDDEN")]

        for (var i = 0; i < this.players.length; i++) {
            arr.push(new Player(players[i].id, players[i].stack, players[i].blind_type, players[i].has_folded, hidden_cards))
        }
        return arr
    }
}
module.exports = Round