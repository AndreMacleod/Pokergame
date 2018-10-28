
class Table {
    constructor(player_num) {
        this.player_num = player_num
        this.deck = this.generateDeck()
        this.players = this.generatePlayers();
    }
    //gen funcs
    generateDeck() {
        var temp = []
        for (var i = 0; i < suits.length; i++) {
            for (var j = 1; j <= 13; j++) {
                temp.push(new Card(suits[i], j))
            }
        }
        return temp
    }
    generatePlayers() {
        var temp = []
        for (var i = 0; i < this.player_num; i++) {
            temp.push(new Player("Player " + i)) //new player 1,2 etc..
        }
        return temp;
    }


    //getters
    getDeck() {
        return this.deck
    }
    getPlayers() {
        return this.players
    }
} 