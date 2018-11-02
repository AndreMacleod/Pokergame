const Table = require('./Table.js')
const Round = require('./Round.js')
const Deck = require('./Deck.js')
const Card = require('./Card.js')
const Player = require('./Player.js')
class Game {
    constructor(table_max, socketEngine) { //sets up table
        this.table = new Table(2, 10000, table_max, socketEngine) //x players
        this.round = null
        this.socketEngine = socketEngine
        this.connected = []
    }
    start() { //begins the game.
        this.newRound()
    }

    newRound() {
        console.log("you started a round")
        var data = {
            display_bar: {},
            community_cards : []
        }
        for (var i = 0; i < this.getTable().getPlayers().length; i++) {
            this.socketEngine.emit("reset_round", data, this.getTable().getPlayers()[i].id)
        }
        this.round = new Round(this, this.socketEngine) //PASS GAME to round to recursively call
        this.round.stateAction()
       
       
    }
    addConnection(id) {
        this.connected.push(id)
    }
    obfuscatePlayerCards() {
        var players = this.getTable().getPlayers()
        var arr = []
        var hidden_cards = [new Card("HIDDEN", "HIDDEN"), new Card("HIDDEN", "HIDDEN")]

        for (var i = 0; i < this.getTable().getPlayers().length; i++) {
            arr.push(new Player(players[i].id, players[i].stack, players[i].blind_type, players[i].has_folded, hidden_cards))
        }
        return arr
    }
    isConnected(id) {
        if (this.connected.indexOf(id) > -1) {
            return true
        }
        return false
    }
    getConnected() {
        return this.connected
    }
    //getters
    getTable() {
        return this.table
    }
    cancelRound() {
        this.round = null;
    }
    getRound() {
        return this.round
    }




}
module.exports = Game

//table.getPlayers()[0].giveHoleCard(table.getDeck()[0]) //first card in deck
//console.log(table.getPlayers())
