require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");

const { dbConnect } = require("./config/mongo");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: "*",
    },
});

const PORT = process.env.PORT || 3000;

dbConnect();

io.on("connection", (socket) => {
    console.log("Se conecto un cliente");

    socket.on("disconnect", () => {
        console.log("Se desconecto un cliente");
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
