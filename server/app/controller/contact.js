const User = require("../models/user");

// add
const updateContact = async (user, userContact, chat, save) => {
    try {
        // busca el usuario existente con el numero de teléfono especificado, crea y guarda un la basa de datos un contacto
        const savedContact = await User.updateOne(
            { tell: user.tell },
            {
                $push: {
                    contacts: {
                        name: userContact.name,
                        tell: userContact.tell,
                        savedContact: save,
                        chat: chat._id,
                    },
                },
            }
        );

        console.log("********** Contact created **********");
        console.log("chat created ---> ", savedContact);

        return {
            contact: savedContact,
            status: "201",
            message: "Contact created",
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

//search
const searchContactAll = async (data) => {
    try {
        // Buscar todos los contactos existente del usuario especificado
        const savedContacts = await User.find(
            { tell: data.tell },
            { contacts: 1 }
        );

        return {
            status: "200",
            message: "Contacts found",
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

module.exports = { updateContact, searchContactAll };
