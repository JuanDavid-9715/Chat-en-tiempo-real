function Contact({ contact, onClick }) {
    return (
        <button
            className="contact__button"
            onClick={() => {
                onClick(contact);
            }}
        >
            <div className="contact__img">
                <img src="/img/perfilDelUsuario.png" alt="icon-contact" />
            </div>
            <div className="contact__name">
                <p className="contact__p">{contact.name}</p>
                <div className="let__content">
                    <div className="let__let"></div>
                    <p className="let__p">line</p>
                </div>
            </div>
        </button>
    );
}

export default Contact;
