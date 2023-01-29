import FormContact from "./FormContact";
import Contact from "./Contact";

function ContainerContact({ contacts, onClick }) {
    const listContact = contacts?.contacts.map((contact, i) => (
        <Contact key={i} contact={contact} onClick={onClick} />
    ));

    return (
        <div>
            {contacts?.contacts.length != 0 ? (
                listContact
            ) : (
                <FormContact onClick={onClick} />
            )}
        </div>
    );
}

export default ContainerContact;
