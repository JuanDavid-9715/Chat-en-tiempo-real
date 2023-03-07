function HeaderChat({ contact }) {
    return (
        <>
            <div className="chat__contact--name">
                <div className="chat__img">
                    <img src="/img/perfilDelUsuario.png" alt="icon-contact" />
                </div>
                <h3 className="chat__h3">{contact.name}</h3>
            </div>
            <div className="let__content">
                <div className="let__let"></div>
                <p className="let__p">line</p>
            </div>
        </>
    );
}

export default HeaderChat;
