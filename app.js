const express = require('express')
const app = express()
const expressValidator = require('express-validator');
const path = require('path')
const bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const port = 3000

const Game = require('./js/Game.js')
const Deck = require('./js/Deck.js')

app.use(expressValidator())
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

server.listen(process.env.PORT || port);
console.log("Server started")
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/poker_client.html'))
})
//GLOBALS
suits = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']
states = ['PREFLOP', 'FLOP', 'TURN', 'RIVER']
global_deck = new Deck() //on start lets gen a deck that tables can clone


//NEW GAME STARTED
var game = new Game() //new game
game.start()
console.log(game.table)
io.on('connection', function (socket) {
    console.log("heya coneection")
    console.log(game.table)
    var data = {
        table:game.table
        }
    //socket.broadcast.emit('sendData', game)
    socket.emit('send_data',data)

})
module.exports = this