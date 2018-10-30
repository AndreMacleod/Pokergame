class Player {
    constructor(id) {
        this.id = id;
        this.stack = 0
        this.blind_type = null
        this.hole_cards = []
        this.has_folded = false;
    }

    //setters
    fold() {
        this.hasfolded = true;
    }
    addStack(value) {
        this.stack += value
    }
    subtractStack(value) {
        this.stack -= value
    }
    giveHoleCard(card) {
        if (this.hole_cards.length < 2) //only if less than 2 hole cards
            this.hole_cards.push(card)
    }
    //getters
    getID() {
        return this.id
    }
    getStack() {
        return this.stack
    }
    getBlindType() {
        return this.blind_type
    }
    getHoleCards() {
        return this.hole_cards
    }
    getFoldedState() {
        return this.has_folded
    }
    hidePlayerCards() {
     var hole_ref = this.hole_cards;
     for(var i=0;i<hole_ref.length;i++){
     hole_ref[i].suit = "HIDDEN"
     hole_ref[i].number = "HIDDEN"
     }
     return hole_ref
    }
}
module.exports = Player