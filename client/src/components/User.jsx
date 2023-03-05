function User() {
    return (
        <>
            <div className="user__img">
                <img
                    src="../../public/img/perfilDelUsuario.png"
                    alt="icon-user"
                />
            </div>
            <div className="user__content">
                <div className="user__let"></div>
                <p className="user__p">Line</p>
            </div>
        </>
    );
}

export default User;
