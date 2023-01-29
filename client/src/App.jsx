import { useState, useEffect } from "react";

import SignIn from "./components/signIn/SignIn";
import User from "./components/user";
import ContainerContact from "./components/contact/ContainerContact";
import ButtonNewContact from "./components/contact/buttonNewContact";

import dataUser from "./adapters/user";
import dataContact from "./adapters/contact";

import socket from "./services/Socket";

function App() {
    const { user, receiveDateUser } = dataUser();
    const { messageContact, receiveDateContact } = dataContact();

    const [validationsLogIn, setValidationsLogIn] = useState(false);
    const [show, setShow] = useState(true);
    const [loadPage, setLoadPage] = useState(false);

    const [contacts, setContacts] = useState({
        contacts: [],
        status: "",
        message: "",
    });

    useEffect(() => {
        receiveDateUser();
        socket.on("ListContact", (data) => {
            receiveDateContact(data);
        });

        if (loadPage) {
            const interval = setInterval(() => {
                socket.emit("getContacts", sessionStorage.getItem("tell"));
                /* socket.emit("getChat", "63d026dc8de16b4258c1935f"); */
            }, 1000);

            return () => clearInterval(interval);
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

    useEffect(() => {
        if (messageContact?.contacts) {
            setContacts(messageContact);
        }
    }, [messageContact]);

    /* useEffect(() => {
        console.log(contacts);
    }, [contacts]); */

    return (
        <main className="main">
            <div className="user">{loadPage ? <User /> : ""}</div>
            <div className="contact">
                {loadPage ? <ContainerContact contacts={contacts} /> : ""}
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
            <div className="header"></div>
            <div className="message"></div>
            <div className="chat"></div>

            {show && SignIn(validationsLogIn)}

            {/* <PruebaSocket /> */}
        </main>
    );
}

export default App;
