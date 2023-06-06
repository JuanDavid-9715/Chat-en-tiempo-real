const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        tell: {
            type: String,
            require: true,
            unique: false,
        },
        savedContact: {
            type: Boolean,
            require: true,
            default: false,
        },
        chat: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = { ContactSchema };
