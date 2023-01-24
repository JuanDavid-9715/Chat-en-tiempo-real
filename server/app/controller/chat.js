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
const searchChatId = async (id) => {
    try {
        const chat = await Chat.findById(id);

        if (chat) {
            /* console.log("Chat found:", chat); */
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
    } catch (error) {
        console.log("********** ERROR **********");
        console.log(error);

        return {
            status: "500",
            message: "Something went wrong, please try again",
        };
    }
};

// delete
const deleteChat = async (data) => {
    try {
        const savedChat = await Chat.deleteOne({ _id: data });

        return {
            status: "400",
            message: "The chat already existes",
        };
    } catch (error) {
        console.log("********** ERROR **********");
        console.log(error);

        return {
            status: "500",
            message: "Something went wrong, please try again",
        };
    }
};

module.exports = { addChat, searchChatId, deleteChat };
