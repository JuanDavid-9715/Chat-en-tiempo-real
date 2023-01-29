import FormContact from "./FormContact";
import Contact from "./Contact";

function ContainerContact({ contacts }) {
    const listContact = contacts?.contacts.map((contact, i) => (
        <Contact key={i} contact={contact} />
    ));

    return (
        <div>
            {contacts?.contacts.length != 0 ? listContact : <FormContact />}
        </div>
    );
}

export default ContainerContact;
