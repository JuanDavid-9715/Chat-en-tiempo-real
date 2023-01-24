const Chat = require("../models/chat");

// add
const addChat = async (data) => {
    try {
        // Buscar un chat existente con los números de teléfono especificados
        const existingChat = await Chat.findOne({
            tellUser: data.tell,
            tellContact: data.contact.tell,
        });

        // Si el chat buscado no existe, crearlo y guardarlo en la base de datos
        if (!existingChat) {
            let newChat = new Chat({
                tellUser: data.tell,
                tellContact: data.contact.tell,
            });

            const savedChat = await newChat.save();

            console.log("********** User created **********");
            console.log("Chat created ---> ", savedChat);

            return {
                chat: savedChat,
                status: "201",
                message: "Chat created",
            };
        } else {
            return {
                status: "400",
                message: "The chat already existes",
            };
        }
    } catch (error) {
        console.log("********** ERROR **********");
        console.log(error);

        return {
            status: "500",
            message: "Something went wrong, please try again",
        };
    }
};

// search
const searchChatId = async (data) => {
    try {
        const post = await Chat.findOne({
            _id: data._id.$oid,
        });

        console.log("resultado ---> ", post);
    } catch (err) {
        console.log(err);
    }
};

const searchChatTell = async (data) => {
    try {
        const chat = await Chat.findOne({
            tellUser: data.tell,
            tellContact: data.contact.tell,
        }).sort({ createdAt: "desc" });

        if (chat) {
            console.log("Chat found:", chat);
            return {
                status: "OK",
                message: "Chat found",
                chat: chat,
            };
        } else {
            return {
                status: "error",
                message: "Chat not found",
            };
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = { addChat, searchChatId, searchChatTell };
