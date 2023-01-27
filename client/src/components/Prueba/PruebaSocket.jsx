import { useState, useEffect } from "react";
import socket from "../../services/Socket";

function PruebaSocket() {
    const [mensajeServer, setMensajeServer] = useState("");
    const [messageUser1, setMessageUser1] = useState();
    const [messageUser2, setMessageUser2] = useState();
    const [contact, setContact] = useState();
    const [chat, setChat] = useState();

    useEffect(() => {
        socket;
        socket.on("response", (message) => {
            console.log(message);
            setMensajeServer(JSON.stringify(message));
        });
        socket.on("ListContact", (ListContact) => {
            if (ListContact != contact) {
                setContact(JSON.stringify(ListContact));
            }
        });
        socket.on("chatMessage", (ListChat) => {
            if (ListChat != chat) {
                setChat(JSON.stringify(ListChat));
            }
        });
        const interval = setInterval(() => {
            socket.emit("getContacts", "12345");
            socket.emit("getChat", "63d026dc8de16b4258c1935f");
        }, 1000);

        return () => clearInterval(interval);
    });

    const usuarioSingUP1 = {
        token: "1234",
        name: "Miguel",
        password: "1234",
        tell: "7677787980",
        urlImages: undefined,
    };

    const usuarioSingUP2 = {
        token: "1234",
        name: "Papita",
        password: "1234",
        tell: "8182838485",
        urlImages: undefined,
    };

    const usuarioLogin1 = {
        token: "1234",
        tell: "7677787980",
        password: "1234",
    };

    const usuarioLogin2 = {
        token: "1234",
        tell: "8182838485",
        password: "1234",
    };

    const contacto = {
        tell: "7677787980",
        contact: {
            name: "papita-papita",
            tell: "8182838485",
            savedContact: "",
        },
    };

    const enviarUsuario1 = (e) => {
        e.preventDefault();
        const dataMessage = {
            tell: "7677787980",
            message: messageUser1,
            contact: {
                tell: "8182838485",
            },
        };
        socket.emit("message", dataMessage);
    };

    const enviarUsuario2 = (e) => {
        e.preventDefault();
        const dataMessage = {
            tell: "8182838485",
            message: messageUser2,
            contact: {
                tell: "7677787980",
            },
        };
        socket.emit("message", dataMessage);
    };

    return (
        <div>
            <button
                onClick={() => {
                    socket.emit("signUp", usuarioSingUP1);
                }}
            >
                signUp 1
            </button>
            <button
                onClick={() => {
                    socket.emit("signUp", usuarioSingUP2);
                }}
            >
                signUp 2
            </button>
            <button
                onClick={() => {
                    socket.emit("login", usuarioLogin1);
                }}
            >
                logIn 1
            </button>

            <button
                onClick={() => {
                    socket.emit("login", usuarioLogin2);
                }}
            >
                logIn 2
            </button>
            <button
                onClick={() => {
                    socket.emit("addContact", contacto);
                }}
            >
                addContact
            </button>
            <form onSubmit={enviarUsuario1}>
                <input
                    id="messageUser1"
                    name="messageUser1"
                    type="text"
                    placeholder="messageUser1"
                    onChange={(e) => {
                        setMessageUser1(e.target.value);
                    }}
                />
                <button type="submit">Enviar</button>
            </form>
            <form onSubmit={enviarUsuario2}>
                <input
                    id="messageUser2"
                    name="messageUser2"
                    type="text"
                    placeholder="messageUser2"
                    onChange={(e) => {
                        setMessageUser2(e.target.value);
                    }}
                />
                <button type="submit">Enviar</button>
            </form>
            <hr />
            <hr />
            <div>{mensajeServer}</div>
            <hr />
            <hr />
            <div>{contact}</div>
            <hr />
            <hr />
            <div>{chat}</div>
        </div>
    );
}

export default PruebaSocket;
