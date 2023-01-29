const Chat = require("../models/chat");

const updateMessage = async (data) => {
    try {
        // busca el chat existente con el id especificado, crea y guarda un la basa de datos un mensaje
        const savedMessage = await Chat.updateOne(
            { _id: data.chat },
            {
                $push: {
                    messages: {
                        tell: data.tell,
                        message: data.message,
                    },
                },
            }
        );

        console.log("********** Message created **********");

        return {
            status: "201",
            message: "message created",
        };
    } catch (error) {
        console.log("********** ERROR **********");
        console.log(error);

        return {
            status: "500",
            message: "Something went wrong, please try again",
        };
    }
};

module.exports = { updateMessage };
