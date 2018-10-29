const Player = require('./Player.js')
class Table {
    constructor(player_num,socketEngine) {
        this.player_num = player_num
        //this.players = this.generatePlayers();
        this.players = []
        this.socketEngine = socketEngine
       // this.socketEngine.listen()
    }
    //gen funcs

    generatePlayers() {
        var temp = []
        for (var i = 0; i < this.player_num; i++) {
            temp.push(new Player("Player " + i)) //new player 1,2 etc..
        }
        return temp;
    }
    addPlayer(id) {
        this.players.push(new Player(id))
        console.log(this.players)
       
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