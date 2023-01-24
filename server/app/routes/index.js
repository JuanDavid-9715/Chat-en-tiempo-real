const socket = require("socket.io");

const {
    addUser,
    updateLineUser,
    searchUserTell,
} = require("../controller/user");
const { updateContact, searchContactAll } = require("../controller/contact");
const { addChat, searchChatId, searchChatTell } = require("../controller/chat");
const { updateMessage } = require("../controller/message.js");

const socketRouter = (server) => {
    const io = socket(server, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("Se conecto un cliente");

        socket.on("signUp", async (data) => {
            // Realizar búsqueda del usuario y sin no existe crea el usuario
            const signUpUser = await addUser(data);
            message = {
                token: data.token,
                response: signUpUser,
            };

            socket.emit("response", message);
        });

        socket.on("login", async (data) => {
            const message = {
                token: data.token,
                response: "",
            };

            // Realizar búsqueda del usuario
            const loginUser = await searchUserTell(data);

            // Si el usuario existe, verifica la contraseña y actualiza el usuario a linea
            if (loginUser.user) {
                if (loginUser.user.password == data.password) {
                    // realiza la actualización del el usuario a linea
                    const updateUser = await updateLineUser(loginUser, true);

                    message.response = updateUser;

                    socket.emit("response", message);
                } else {
                    message.response = {
                        status: "400",
                        message: "password incorrect",
                    };

                    socket.emit("response", message);
                }
            } else {
                message.response = loginUser;

                socket.emit("response", message);
            }
        });

        socket.on("addContact", async (data) => {
            const message = {
                status: "400",
                message: "",
            };

            // Realizar búsqueda del usuario especificado
            const UserTellContact = await searchUserTell(data.contact);

            if (UserTellContact.user) {
                // Obtener todos los contactos del usuario actual
                const UserListContact = await searchContactAll(data);

                // Filtrar contactos para verificar si ya existe el contacto especificado
                const existingContact = UserListContact.contacts.contacts?.find(
                    (contact) => {
                        contact.tell === data.tell;
                    }
                );

                // Si el contacto no existe, crea un chat y busca el usuario y crea el contacto, tanto para el usuario como para el usuario del contacto
                if (!existingContact) {
                    const chat = await addChat(data);
                    const user = await searchUserTell(data);

                    const contactUser = await updateContact(
                        user.user,
                        data.contact,
                        chat.chat,
                        true
                    );

                    const contactContact = await updateContact(
                        UserTellContact.user,
                        user.user,
                        chat.chat,
                        false
                    );

                    if (contactUser && contactContact) {
                        const message = {
                            user: data,
                            response: contactUser,
                        };
                        socket.emit("response", message);
                    }
                } else {
                    socket.emit(
                        "response",
                        (message.message = "The contact already exists")
                    );
                }
            } else {
                socket.emit(
                    "response",
                    (message.message = "The contact to add does not exist")
                );
            }
        });

        socket.on("disconnect", (user) => {
            /* updateLineUser({ tell: user.tell, line: false }); */
            console.log("Se desconecto un cliente");
        });
    });
};

module.exports = socketRouter;
