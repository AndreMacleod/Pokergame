const express = require('express')
const app = express()
const expressValidator = require('express-validator');
const path = require('path')
const bodyParser = require('body-parser');

var server = require('http').Server(app);
var io = require('socket.io').listen(server)
var uuid = require('uuid');
const port = 3000

const Game = require('./js/Game.js')
const Deck = require('./js/Deck.js')
const Player = require('./js/Player.js')
const Card = require('./js/Card.js')

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
global_actions = ["FOLD", "CHECK","BET"]
var games = []
//NEW GAME STARTED
var socketEngine = new SocketEngine(io)


io.on('connection', (socket) => {
    socketEngine.addConnection(socket)
    var added = false;
    var ref_id
    for (var i = 0; i < games.length; i++) {
        if (games[i].getTable().getPlayers().length < games[i].getTable().getSeatLimit()) {
            console.log("added player to table " + i)
            added = true
            games[i].addConnection(socket.id)
            console.log(games[i].getConnected())
            games[i].getTable().addPlayer(socket.id)
            console.log("table now has " + games[i].getTable().getPlayers().length)
            console.log("max is " + games[i].getTable().getSeatLimit())
            break;
        }
    }

    if (!added) {
        var newGame = new Game(2, socketEngine)
        newGame.getTable().addPlayer(socket.id)
        newGame.addConnection(socket.id)
        //ref_id = uuid.v1()
        games.push(newGame)
        console.log("no games available so created new game.")
    }

    if (games[games.length - 1].getTable().getPlayers().length == games[games.length - 1].getTable().getSeatLimit()) {
        //full of players so lets start the game
        console.log("Starting game")
        games[games.length - 1].start()
        var obf = obfuscatePlayerCards(games[games.length - 1])
        for (var i = 0; i < games[games.length - 1].getTable().getPlayers().length; i++) {
            var data = {
                players: obf,
                my_player: games[games.length - 1].getTable().getPlayers()[i]
            }
          
            socketEngine.emit("send_data", data, games[games.length - 1].getTable().getPlayers()[i].id)
        }
    }


    socket.on('disconnect', (msg) => {
        //delete socketEngine.connected[socket.id] 
        //game.getTable().removePlayer(socket.id)
        //  game.cancelRound()
    });

    socket.on("choose_action", function (data) {
        console.log("CHOSE ACTION")
        var myGame = getMyGame(socket.id)
        console.log("Selected action is " + data.action)
        myGame.getRound().applyAction(data.action, data.bet_amount)

    })

})
function getMyGame(socket_id) {
    for (var i = 0; i < games.length; i++) {
        if (games[i].isConnected(socket_id)) {
            return games[i]
        }
    }
    return null
}
function obfuscatePlayerCards(game) {
    var players = game.getTable().getPlayers()
    arr = []
    var hidden_cards = [new Card("HIDDEN", "HIDDEN"), new Card("HIDDEN", "HIDDEN")]

    for (var i = 0; i < players.length; i++) {
        arr.push(new Player(players[i].id, players[i].stack, players[i].blind_type, players[i].has_folded, hidden_cards))
    }
    return arr
}
module.exports = this


// GAME LOGIC
//SETS

/*PLAYER_CARD_ARRAY = COMMUNITY + hole_cards
j=1
for(i=0; i+j<player_card_array.length; i++){
    if(player_card_array[i].number == player_card_array[i+j].number){
        return true
    } else {
        j++
    }

}*/