const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;

    mongoose.set("strictQuery", true);

    mongoose.connect(DB_URI, (err) => {
        if (!err) {
            console.log("---------- CONEXIÓN CORRECTA ----------");
        } else {
            console.log("********** ERROR DE CONEXIÓN **********");
            console.log(err);
        }
    });
};

module.exports = { dbConnect };
