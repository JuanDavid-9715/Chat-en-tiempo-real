import { useState, useEffect } from "react";

import socket from "../services/Socket";

function dataContact() {
    const [messageContact, setMessageContact] = useState();

    const receiveDateContact = (data) => {
        if (data?.user != null) {
            const listContact = data.user.map((contact) => {
                return {
                    name: contact.contact.name,
                    tell: contact.contact.tell,
                    chat: contact.contact.chat,
                    line: contact.line,
                };
            });

            setMessageContact(() => {
                return {
                    contacts: listContact,
                    message: data.message,
                    status: data.status,
                };
            });
        } else {
            setMessageContact(() => {
                return {
                    message: data.message,
                    status: data.status,
                };
            });
        }
    };

    return { messageContact, receiveDateContact };
}

export default dataContact;
