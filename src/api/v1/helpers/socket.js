const { Server } = require('socket.io');
const io = new Server();
// io.path("/innovation/")

var Socket = {
    emit: function (event, data) {
        console.log(event, data);
        io.sockets.emit(event, data);
    }
};

io.on("connection", function (socket) {
    console.log("A user connected");
});




module.exports = {
    Socket, io
}