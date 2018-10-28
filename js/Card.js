class Card {
    constructor(suit, number) {
        this.suit = suit
        this.number = number
    }
    getDescription(){
        return(this.number + ' of ' + this.suit)
    }
} 