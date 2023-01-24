const socket = require("socket.io");

const signUp = require("./signUp");
const logIn = require("./logIn");
const savedContacts = require("./savedContacts");
const savedMessage = require("./savedMessage");

const { searchContactAll } = require("../controller/contact");
const { searchChatId } = require("../controller/chat");

const socketRouter = (server) => {
    const io = socket(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("Se conecto un cliente");

        socket.on("signUp", async (data) => {
            const message = await signUp(data);
            socket.emit("response", message);
        });

        socket.on("login", async (data) => {
            const message = await logIn(data);
            socket.emit("response", message);
        });

        socket.on("addContact", async (data) => {
            const message = await savedContacts(data);
            socket.emit("response", message);
        });

        socket.on("message", async (data) => {
            const message = await savedMessage(data);
            socket.emit("response", message);
        });

        socket.on("getContacts", async (tell) => {
            const listContact = await searchContactAll(tell);
            socket.emit("ListContact", listContact);
        });

        socket.on("getChat", async (id) => {
            const chat = await searchChatId(id);
            socket.emit("chatMessage", chat);
        });

        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente");
        });
    });
};

module.exports = socketRouter;
