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
}
module.exports = SocketEngine;
