import { useState, useEffect } from "react";

import SignIn from "./components/signIn/SignIn";

import dataUser from "./adapters/user";

function App() {
    const { user, ReceiveDate } = dataUser();

    const [validationsLogIn, setValidationsLogIn] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        ReceiveDate();
        console.log(validationsLogIn);
    });

    useEffect(() => {
        console.log(user);
        const STATUS_NOT_FOUND = 404;
        const STATUS_SERVER_ERROR = 500;
        if (user.user) {
            if (user.user.tell == sessionStorage.getItem("tell")) {
                setShow(!show);
                sessionStorage.setItem("name", user.user.name);
            }
        } else {
            if (
                user.status == STATUS_NOT_FOUND ||
                user.status == STATUS_SERVER_ERROR
            ) {
                setValidationsLogIn(true);
            }
        }
    }, [user]);

    return (
        <main className="main">
            <div className="user"></div>
            <div className="contact"></div>
            <div className="header"></div>
            <div className="message"></div>
            <div className="chat"></div>

            {show && SignIn(validationsLogIn)}

            {/* <PruebaSocket /> */}
        </main>
    );
}

export default App;
