const Table = require('./Table.js')
const Round = require('./Round.js')
class Game {
    constructor(socketEngine) { //sets up table
        this.table = new Table(2, socketEngine) //x players
        this.round = null
        this.socketEngine = socketEngine

    }
    start() { //begins the game.
        this.newRound()
    }
    
    newRound() {
        console.log("you started a game")
        if (this.round == null) {
            this.round = new Round(this, this.socketEngine) //PASS GAME to round to recursively call
            this.round.start()
        }
    }

    //getters
    getTable() {
        return this.table
    }
    getRound() {
        return this.round
    }




}
module.exports = Game

//table.getPlayers()[0].giveHoleCard(table.getDeck()[0]) //first card in deck
//console.log(table.getPlayers())