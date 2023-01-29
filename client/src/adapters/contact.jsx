import { useState, useEffect } from "react";

function dataContact() {
    const [contacts, setContacts] = useState();

    const receiveDateContact = (data) => {
        setContacts(() => {
            if (data?.user != null) {
                const listContact = data?.user.map((contact) => {
                    return {
                        name: contact.contact.name,
                        tell: contact.contact.tell,
                        chat: contact.contact.chat,
                        line: contact.line,
                    };
                });

                return {
                    contacts: listContact,
                    message: data.message,
                    status: data.status,
                };
            } else {
                return {
                    message: data.message,
                    status: data.status,
                };
            }
        });
    };

    return { contacts, receiveDateContact };
}

export default dataContact;
