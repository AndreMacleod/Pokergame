class Player {
    constructor(name) {
        this.name = name;
        this.stack = 0
        this.blind_type = null
        this.hole_cards = []
        this.has_folded = false;
    }

    //setters
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
    getName() {
        return this.name
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
}
module.exports = Player