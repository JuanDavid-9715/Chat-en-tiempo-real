const user = require("../models/user");
const User = require("../models/user");

// add
const addUser = async (data) => {
    try {
        // Buscar un usuarios existente con el número de teléfono especificados
        const existingUser = await User.findOne({ tell: data.tell });

        // Si el usuario buscado no existe, crearlo y guardarlo en la base de datos
        if (!existingUser) {
            let newUser = new User({
                name: data.name,
                password: data.password,
                tell: data.tell,
                urlImages: data.urlImages,
                line: true,
            });

            const savedUser = await newUser.save();

            console.log("********** User created **********");
            console.log("chat created ---> ", savedUser);

            return {
                user: savedUser,
                status: "201",
                message: "User created",
            };
        } else {
            return {
                status: "400",
                message: "The User already existes",
            };
        }
    } catch (error) {
        console.log("********** ERROR **********");
        console.log(error);

        return {
            status: "500",
            message: "Something went wrong, please try again",
        };
    }
};

// update
const updateLineUser = async (data, line) => {
    try {
        // Buscar un usuario existente con el número de teléfono especificados y actualize el valor "line"
        const updateUser = await User.findOneAndUpdate(
            { _id: data.user._id },
            {
                $set: {
                    line: line,
                },
            },
            { new: true }
        );

        return {
            user: updateUser,
            status: "200",
            message: "User logIn",
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

// search
const searchUserTell = async (data) => {
    try {
        // Buscar un usuario existente con el número de teléfono especificados
        const saveUser = await User.findOne({
            tell: data.tell,
        });

        if (saveUser) {
            console.log("User found ---> ", saveUser);

            return {
                user: saveUser,
                status: "200",
                message: "User found",
            };
        } else {
            return {
                status: "404",
                message: "The user does not exist",
            };
        }
    } catch (error) {
        console.log("********** ERROR **********");
        console.log(error);

        return {
            status: "500",
            message: "Something went wrong, please try again",
        };
    }
};

module.exports = { addUser, updateLineUser, searchUserTell };
