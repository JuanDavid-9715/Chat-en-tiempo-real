import { useState } from "react";

import FormContact from "./FormContact";
import Contact from "./Contact";

function ContainerContact({ contacts, onClick }) {
    const [viewForm, setViewFrom] = useState(false);

    const listContact = contacts?.contacts.map((contact, i) => (
        <Contact key={i} contact={contact} onClick={onClick} />
    ));

    return (
        <div className="contact__container">
            {viewForm ? <FormContact /> : ""}

            {contacts?.contacts.length != 0 ? (
                listContact
            ) : (
                <FormContact onClick={onClick} />
            )}

            {contacts?.contacts.length != 0 ? (
                <button
                    className="from__button"
                    onClick={() => {
                        setViewFrom(!viewForm);
                    }}
                >
                    Add
                </button>
            ) : (
                ""
            )}
        </div>
    );
}

export default ContainerContact;
