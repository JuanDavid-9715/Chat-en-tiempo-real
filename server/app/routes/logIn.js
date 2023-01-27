const { updateLineUser, searchUserTell } = require("../controller/user");

const logIn = async (dataUser) => {
    const message = {
        token: dataUser.token,
        user: "",
        response: "",
    };

    // Realizar búsqueda del usuario
    const loginUser = await searchUserTell(dataUser);

    // Si el usuario existe, verifica la contraseña y actualiza el usuario a linea
    if (loginUser.user) {
        if (loginUser.user[0].password == dataUser.password) {
            // realiza la actualización del el usuario a linea
            const updateUser = await updateLineUser(loginUser, true);

            message.user = loginUser.user[0];
            message.response = updateUser;
        } else {
            message.response = {
                status: "400",
                message: "password incorrect",
            };
        }
    } else {
        message.response = loginUser;
    }

    return message;
};

module.exports = logIn;
