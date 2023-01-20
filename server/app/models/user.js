const mongoose = require("mongoose");
const { ContactSchema } = require("./contact");

const UserScheme = new mongoose.Schema(
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
        contacts: [ContactSchema],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Users", UserScheme, "users");
