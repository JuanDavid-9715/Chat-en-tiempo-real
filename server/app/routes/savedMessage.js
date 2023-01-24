const { searchContact } = require("../controller/contact");
const { updateMessage } = require("../controller/message");

const savedMessage = async (dataMessage) => {
    // Realizar búsqueda del contacto especificado
    const messageCreated = await searchContact(dataMessage);

    if (messageCreated.user) {
        // obtiene el id del chat y crea un mensaje nuevo
        const chat = messageCreated.user.contacts[0].chat;
        const savedChat = await updateMessage(dataMessage, chat);
        return savedChat;
    } else {
        const message = {
            status: "400",
            message: "The contact does not exist",
        };
    }

    return message;
};

module.exports = savedMessage;
