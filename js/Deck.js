const Card = require('./Card.js')
class Deck {
    constructor() {
        this.deck = this.generateDeck()
    }
    generateDeck() {
        var temp = []
        for (var i = 0; i < suits.length; i++) {
            for (var j = 1; j <= 13; j++) {
                temp.push(new Card(suits[i], j))
            }
        }
        return temp
    }
      //getters
      getDeck() {
        return this.deck
    }
}
module.exports = Deck