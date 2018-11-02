const Card = require('./Card.js')
class Deck {
    constructor() {
        this.deck = this.generateDeck()
    }
    generateDeck() {
        var temp = []
        for (var i = 0; i < suits.length; i++) {
            for (var j = 2; j <= 14; j++) {
                temp.push(new Card(suits[i], j))
            }
        }
        return temp
    }
    //getters
    getDeck() {
        return this.deck
    }
    shuffle() {
        var j, x, i;
        for (i = this.deck.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = this.deck[i];
            this.deck[i] = this.deck[j];
            this.deck[j] = x;
        }
    }
}
module.exports = Deck