class SocketEngine {
    constructor(io) {
        this.io = io
        this.listen()
        this.connected = {}

    }
    listen() {
       console.log("MEEP")
    }
    emit(path, data, socket_id) {
        connected[socket_id].emit(path, data) //scope socket

    }
    broadcast(path, data) {
        this.io.sockets.emit(path, data)
    }
    getConnected() {
        return this.connected
    }
    getConnectedLength() {
       return Object.keys(this.connected).length
    }
    addConnection(socket) {
        this.connected[socket.id] = socket 
    }
    
}
module.exports = SocketEngine;
