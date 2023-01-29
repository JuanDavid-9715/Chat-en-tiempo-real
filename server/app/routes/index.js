const socket = require("socket.io");

const signUp = require("./signUp");
const logIn = require("./logIn");
const savedContacts = require("./savedContacts");
const savedMessage = require("./savedMessage");
const getContacts = require("./getContacts");

const { searchUserTell } = require("../controller/user");
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
            socket.emit("user", message);
        });

        socket.on("login", async (data) => {
            const message = await logIn(data);
            socket.emit("user", message);
        });

        socket.on("addContact", async (data) => {
            const message = await savedContacts(data);
            socket.emit("contact", message);
        });

        socket.on("message", async (data) => {
            const message = await savedMessage(data);
            socket.emit("message", message);
        });

        socket.on("getContacts", async (UserContact) => {
            const message = await getContacts(UserContact);
            socket.emit("ListContact", message);
        });

        socket.on("getChat", async (id) => {
            const chat = await searchChatId(id);
            socket.emit("chatMessage", chat);
        });

        socket.on("Availability", async (tell) => {
            const user = await searchUserTell(tell);

            console.log(user);
            if (!user.user) {
                socket.emit("enabled", false);
            } else {
                socket.emit("enabled", true);
            }
        });

        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente");
        });
    });
};

module.exports = socketRouter;
