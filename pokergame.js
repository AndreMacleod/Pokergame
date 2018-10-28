var suits = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']

var table = new Table(2)
for(var i = 0; i < table.getDeck().length; i++){
    console.log(table.getDeck()[i].getDescription())
}
console.log(table.getDeck().length)


