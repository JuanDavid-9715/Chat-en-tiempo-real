const Chat = require("../models/chat");

// add
const addChat = async (data) => {
    try {
        const doc = await Chat.findOne({
            tellUser: data.tellUser,
            tellContact: data.tellContact,
        });

        console.log(doc);
        if (!doc) {
            let chat = new Chat({
                tellUser: data.tellUser,
                tellContact: data.tellContact,
            });

            await chat.save((err) => {
                if (!err) {
                    console.log("--- Se guardo correctamente ---");
                } else {
                    console.log("*** error ***");
                    console.log(err);
                }
            });
        } else {
            console.log("*** ERROR : El documento ya existe ***");
        }
    } catch (err) {
        console.log(err);
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
        const post = await Chat.findOne({
            tellUser: data.tellUser,
            tellContact: data.tellContact,
        });

        console.log("resultado ---> ", post);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { addChat, searchChatId, searchChatTell };
