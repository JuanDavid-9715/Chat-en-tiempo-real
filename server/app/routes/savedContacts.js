const { searchUserTell } = require("../controller/user");
const { searchContact, updateContact } = require("../controller/contact");
const { addChat, deleteChat } = require("../controller/chat");

const savedContacts = async (data) => {
    const message = {
        status: "400",
        message: "",
    };

    // Realizar búsqueda del usuario especificado
    const UserTellContact = await searchUserTell(data.contact);

    if (UserTellContact.user) {
        // Obtener todos los contactos del usuario actual
        const UserContact = await searchContact(data);

        // Si el contacto no existe, crea un chat y busca el usuario y crea el contacto, tanto para el usuario como para el usuario del contacto
        if (!UserContact.user) {
            const chat = await addChat(data);
            const user = await searchUserTell(data);

            /* console.log("datos a enviar ====>");
            console.log(user.user[0]);
            console.log(UserTellContact.user[0]);
            console.log(data.contact);
            console.log(chat.chat); */

            if (chat.chat) {
                const contactUser = await updateContact(
                    user.user[0],
                    data.contact,
                    chat.chat,
                    true
                );

                const contactContact = await updateContact(
                    UserTellContact.user[0],
                    user.user[0],
                    chat.chat,
                    false
                );

                if (contactUser && contactContact) {
                    message.status = "201";
                    message.message = "Users were created";
                    message.user = data;
                    message.response = contactUser;
                } else {
                    const chatDelete = await deleteChat(chat.chat._id);
                    message.message = "Could not create contacts";
                }
            } else {
                message.message = "The chat already exists";
            }
        } else {
            message.message = "The contact already exists";
        }
    } else {
        message.message = "The contact to add does not exist";
    }

    return message;
};

module.exports = savedContacts;
