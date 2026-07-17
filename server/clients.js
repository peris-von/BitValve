const clients = {};

io.on("connection", (socket) => {
    console.log(socket.id);

    clients[socket.id] = socket;

    socket.on("disconnect", () => {
        delete clients[socket.id];
    });
});