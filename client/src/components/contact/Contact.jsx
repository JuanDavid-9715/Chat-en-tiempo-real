function Contact({ contact, onClick }) {
    return (
        <button
            onClick={() => {
                onClick(contact);
            }}
        >
            <div>
                <img src="" alt="icon-contact" />
            </div>
            <div>
                <p>{contact.name}</p>
                <div>
                    <div></div>
                    <p>line</p>
                </div>
            </div>
        </button>
    );
}

export default Contact;
