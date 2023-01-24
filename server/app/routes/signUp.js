const { addUser } = require("../controller/user.js");

const signUp = async (dataUser) => {
    // Realizar búsqueda del usuario y sin no existe crea el usuario
    const signUpUser = await addUser(dataUser);
    message = {
        token: dataUser.token,
        response: signUpUser,
    };

    return message;
};

module.exports = signUp;
