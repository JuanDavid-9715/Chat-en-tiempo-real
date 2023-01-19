require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { dbConnect } = require("./config/mongo");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

dbConnect();

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
