class Game {
    constructor() { //sets up table
        this.table = new Table(2) //x players
        this.round = null
    }
    start() { //begins the game.
       this.newRound()
    }
    newRound() {
        console.log("you started a game")
        if (this.round == null) {
            this.round = new Round(this) //PASS GAME to round to recursively call
            this.round.start()
        }
    }




}


//table.getPlayers()[0].giveHoleCard(table.getDeck()[0]) //first card in deck
//console.log(table.getPlayers())
