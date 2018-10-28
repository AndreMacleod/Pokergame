
class Table {
    constructor(player_num) {
        this.pot = 0
        this.player_num = player_num
        this.community_cards = []
        this.deck = this.generateDeck()
    }

    generateDeck() {
        var deck_array = []
        for (var i = 0; i < suits.length; i++) {
            for (var j = 1; j <= 13; j++) {
                deck_array.push(new Card(suits[i], j))
            }
        }
        return deck_array
    }
    getDeck() {
        return this.deck
    }
} 