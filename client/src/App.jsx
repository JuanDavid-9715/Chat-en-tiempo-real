import { useState, useEffect } from "react";

import SignIn from "./components/signIn/SignIn";
import User from "./components/user";
import ContainerContact from "./components/contact/ContainerContact";
import ButtonNewContact from "./components/contact/buttonNewContact";
import HeaderChat from "./components/chat/HeaderChat";
import Chat from "./components/chat/Chat";
import Message from "./components/chat/message";

import dataUser from "./adapters/user";
import dataContact from "./adapters/contact";
import dataChat from "./adapters/chat";

import socket from "./services/Socket";

function App() {
    const { user, receiveDateUser } = dataUser();
    const { contacts, receiveDateContact } = dataContact();
    const { chat, receiveDateChat } = dataChat();

    const [validationsLogIn, setValidationsLogIn] = useState(false);
    const [show, setShow] = useState(true);
    const [loadPage, setLoadPage] = useState(false);
    const [selectContact, setSelectContact] = useState();

    useEffect(() => {
        receiveDateUser();

        if (loadPage) {
            socket.on("ListContact", (data) => {
                receiveDateContact(data);
            });

            socket.on("chatMessage", (data) => {
                receiveDateChat(data);
            });

            if (loadPage) {
                const interval = setInterval(() => {
                    socket.emit("getContacts", sessionStorage.getItem("tell"));
                    if (selectContact) {
                        socket.emit("getChat", selectContact.chat);
                    }
                }, 1000);

                return () => clearInterval(interval);
            }
        }
    });

    useEffect(() => {
        const STATUS_NOT_FOUND = 404;
        const STATUS_SERVER_ERROR = 500;
        if (user.user) {
            if (user.user.tell == sessionStorage.getItem("tell")) {
                setShow(!show);
                sessionStorage.setItem("name", user.user.name);
                setLoadPage(true);
            }
        } else {
            if (
                user.status == STATUS_NOT_FOUND ||
                user.status == STATUS_SERVER_ERROR
            ) {
                setValidationsLogIn(true);
            }
        }
    }, [user]);

    /* useEffect(() => {
        console.log(messageChat);
    }, [messageChat]); */

    /* useEffect(() => {
        console.log(contacts);
    }, [contacts]); */

    const contactSelector = (data) => {
        setSelectContact(data);
    };

    return (
        <main className="main">
            <div className="user">{loadPage ? <User /> : ""}</div>
            <div className="contact">
                {loadPage ? (
                    <ContainerContact
                        contacts={contacts}
                        onClick={contactSelector}
                    />
                ) : (
                    ""
                )}
                {loadPage ? (
                    contacts?.contacts.length != 0 ? (
                        <ButtonNewContact />
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
            </div>
            <div className="header">
                {loadPage ? (
                    selectContact ? (
                        <HeaderChat contact={selectContact} />
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
            </div>
            <div className="message">
                {loadPage ? (
                    selectContact ? (
                        <Message contact={selectContact} />
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
            </div>
            <div className="chat">
                {loadPage ? (
                    <Chat contact={selectContact} dataChat={chat} />
                ) : (
                    ""
                )}
            </div>

            {show && SignIn(validationsLogIn)}
        </main>
    );
}

export default App;
