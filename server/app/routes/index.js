const socket = require("socket.io");

const socketRouter = (server) => {
    const io = socket(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("Se conecto un cliente");

        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente");
        });
    });
};

module.exports = socketRouter;
