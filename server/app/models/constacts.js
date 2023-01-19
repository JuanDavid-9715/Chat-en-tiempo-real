const mongoose = require("mongoose");

const ContactsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        tell: {
            type: String,
            require: true,
            unique: true,
        },
        chat: {
            type: mongoose.Types.ObjectId,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Contacts = new mongoose.model("contacts", ContactsSchema);

module.exports = { Contacts };
