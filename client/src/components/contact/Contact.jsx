function Contact({ contact }) {
    return (
        <button>
            <div>
                <img src="" alt="icono-contact" />
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
