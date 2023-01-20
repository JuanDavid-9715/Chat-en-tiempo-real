const Chat = require("../models/chat");

const updateMessage = async (data) => {
    try {
        await Chat.updateOne(
            { _id: data._id.$oid },
            {
                $push: {
                    messages: {
                        tell: data.tell,
                        message: data.message,
                    },
                },
            },
            (err) => {
                if (!err) {
                    console.log("--- Se guardo correctamente ---");
                } else {
                    console.log("*** error ***");
                    console.log(err);
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports = { updateMessage };
