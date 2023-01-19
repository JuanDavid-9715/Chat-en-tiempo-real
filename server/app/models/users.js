const mongoose = require("mongoose");

const UsersScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        tell: {
            type: String,
            require: true,
            unique: true,
        },
        urlImages: {
            type: String,
            default: "./client/src/assets/img/perfil-del-usuario.png",
        },
        contact: {
            type: [mongoose.Types.ObjectId],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Users = new mongoose.model("users", UsersScheme);

module.exports = { Users };
