const Player = require('./Player.js')
class Table {
    constructor(player_num, starting_stack, table_max, socketEngine) {
        this.player_num = player_num
        //this.players = this.generatePlayers();
        this.table_max = table_max
        this.players = []
        this.starting_stack = starting_stack
        this.socketEngine = socketEngine
        // this.socketEngine.listen()
    }
    //gen funcs

    addPlayer(id) {
        
        if (this.players.length < this.table_max) {
            this.players.push(new Player(id, this.starting_stack))
        }
    }
    removePlayer(id) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id == id)
                return this.players.splice(this.players[i], 1)
        }
    }
    getSeatLimit() {
        return this.table_max
    }
    getPlayer(id) {
        for (var i = 0; i < this.players.length; i++) {
            if (this.players[i].id == id)
                return this.players[i]
        }
    }
    getPlayers() {
        return this.players
    }
}

module.exports = Table