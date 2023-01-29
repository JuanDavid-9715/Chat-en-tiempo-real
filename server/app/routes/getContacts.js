const { searchUserTell } = require("../controller/user");
const { searchContactAll } = require("../controller/contact");

const getContacts = async (UserContact) => {
    const listContact = await searchContactAll(UserContact);
    const userContact = await Promise.all(
        listContact.user.contacts.map(async (contact) => {
            const user = await searchUserTell(contact);

            const userContact = {
                contact: contact,
                line: user.user[0].line,
            };

            return userContact;
        })
    );

    const message = {
        user: userContact,
        status: listContact.status,
        message: listContact.message,
    };

    return message;
};

module.exports = getContacts;
