const Table = require('./Table.js')
const Round = require('./Round.js')
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
        
            this.round = new Round(this, this.socketEngine) //PASS GAME to round to recursively call
            this.round.stateAction()
        
    }
    addConnection(id) {
        this.connected.push(id)
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
