
class Table {
    constructor(player_num) {
        this.pot = 0
        this.player_num = player_num
        this.community_cards = []
        this.deck = this.generateDeck()
        this.players = this.generatePlayers();
        this.state = null
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


    //helpers
    nextState() {
        if(this.state == null) //if not yet init
            this.state = states[0]

        for (var i = 0; i < states.length - 1; i++) { //-1 because dont check if at end state
            if (this.state == states[i]) {
               return this.state = states[i + 1] //exit
            }
        }
    }

    //getters
    getDeck() {
        return this.deck
    }
    getPlayers() {
        return this.players
    }
    getState() {
        return this.state
    }
} 