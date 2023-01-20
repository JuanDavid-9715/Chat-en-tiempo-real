const User = require("../models/user");

// add
const updateContact = async (data) => {
    try {
        const doc = await User.findOne({ contacts: { tell: data.tell } });

        console.log(doc);
        if (!doc) {
            await User.updateOne(
                { tell: data.tell },
                {
                    $push: {
                        contacts: {
                            name: data.contacts.name,
                            tell: data.contacts.tell,
                            savedContact: data.contacts.savedContact,
                            chat: data.contacts.chat,
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
        } else {
            console.log("*** ERROR : El documento ya existe ***");
        }
    } catch (err) {
        console.log(err);
    }
};

//search
const searchContactAll = async (data) => {
    try {
        const post = await User.find({ tell: data.tell }, { contacts: 1 });

        /* console.log("resultado ---> ", post); */
        console.log("resultado ---> ", JSON.stringify(post));
    } catch (err) {
        console.log(err);
    }
    
};

module.exports = { updateContact, searchContactAll };
