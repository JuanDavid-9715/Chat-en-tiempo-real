const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
    {
        tell: {
            type: String,
            require: true,
        },
        message: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = { MessageSchema };
