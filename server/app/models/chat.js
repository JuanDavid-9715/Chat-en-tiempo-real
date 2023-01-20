const mongoose = require("mongoose");
const { MessageSchema } = require("./message");

const ChatScheme = new mongoose.Schema(
    {
        tellUser: {
            type: String,
            require: true,
        },
        tellContact: {
            type: String,
            require: true,
        },
        messages: [MessageSchema],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Chat", ChatScheme, "chat");
