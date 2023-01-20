const User = require("../models/user");

// add
const addUser = async (data) => {
    try {
        const doc = await User.findOne({ tell: data.tell });

        console.log(doc);
        if (!doc) {
            let user = new User({
                name: data.name,
                password: data.password,
                tell: data.tell,
                urlImages: data.urlImages,
                line: data.line,
            });

            await user.save((err) => {
                if (!err) {
                    console.log("--- Se guardo correctamente ---");
                } else {
                    console.log("*** error ***");
                    console.log(err);
                }
            });
        } else {
            console.log("*** ERROR : El documento ya existe ***");
        }
    } catch (err) {
        console.log(err);
    }
};

// update
const updateLineUser = async (data) => {
    try {
        await User.updateOne(
            { tell: data.tell },
            { line: data.line },
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

// search
const searchUserTell = async (data) => {
    try {
        const post = await User.findOne({
            tell: data.tell,
        });

        console.log("resultado ---> ", post);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { addUser, updateLineUser, searchUserTell };
