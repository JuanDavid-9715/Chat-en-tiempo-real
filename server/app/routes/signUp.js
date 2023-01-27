const { addUser } = require("../controller/user.js");

const signUp = async (dataUser) => {
    // Realizar búsqueda del usuario y sin no existe crea el usuario
    const signUpUser = await addUser(dataUser);
    message = {
        token: dataUser.token,
        user: signUpUser.user,
        response: {
            status: signUpUser.status,
            message: signUpUser.message,
        },
    };

    return message;
};

module.exports = signUp;
