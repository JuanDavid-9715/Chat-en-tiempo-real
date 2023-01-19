const mongoose = require("mongoose");

const ChatsSchema = new mongoose.Schema(
    {
        message: {
            type: [String],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Chats = new mongoose.model("chats", ChatsSchema);

module.exports = { Chats }
