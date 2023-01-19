require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");

const { dbConnect } = require("./config/mongo");
const socketRouter = require("./app/routes/index");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

dbConnect();
socketRouter(server);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
