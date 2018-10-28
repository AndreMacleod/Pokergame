const Player = require('./Player.js')
class Table {
    constructor(player_num) {
        this.player_num = player_num
        this.players = this.generatePlayers();
    }
    //gen funcs

    generatePlayers() {
        var temp = []
        for (var i = 0; i < this.player_num; i++) {
            temp.push(new Player("Player " + i)) //new player 1,2 etc..
        }
        return temp;
    }

    getPlayers() {
        return this.players
    }
} 
module.exports = Table