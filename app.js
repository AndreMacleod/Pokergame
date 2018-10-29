const express = require('express')
const app = express()
const expressValidator = require('express-validator');
const path = require('path')
const bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io').listen(server)

const port = 3000

const Game = require('./js/Game.js')
const Deck = require('./js/Deck.js')
const SocketEngine = require('./js/SocketEngine')
app.use(expressValidator())
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static(path.join(__dirname, 'clientJS')));

server.listen(process.env.PORT || port);
console.log("Server started")


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/views/poker_client.html'))
})


//GLOBALS
suits = ['HEARTS', 'DIAMONDS', 'SPADES', 'CLUBS']
states = ['PREFLOP', 'FLOP', 'TURN', 'RIVER']

//NEW GAME STARTED
var socketEngine = new SocketEngine(io)
var game = new Game(socketEngine) //new game



io.on('connection', (socket) => {
    console.log("a user connected")
    console.log(socketEngine.getConnectedLength())
    socketEngine.addConnection(socket)
    console.log(socketEngine.getConnectedLength())
    game.table.addPlayer(socket.id)
    
    var data = {
        players: game.getTable().getPlayers(),
        my_player: game.getTable().getPlayer(socket.id)
    }
    socket.emit('send_data', data)

   
    if(socketEngine.getConnectedLength()> 1) { //2 players, lets start the game
        console.log("Starting game")
        game.start()
        var data = {
            players: game.getTable().getPlayers(),
            my_player: game.getTable().getPlayer(socket.id)
        }
        socketEngine.broadcast("send_data", data)
    }

    socket.on('disconnect', (msg) => {
        socketEngine.connected[socket.id] = null
    });
   
})

module.exports = this