import { useState, useEffect } from "react";
import useForm from "../../utilities/useForm";

import socket from "../../services/Socket";

function LogIn({ validationsLogIn }) {
    const { values, handleChange, clearForm } = useForm({
        tell: "",
        password: "",
    });

    useEffect(() => {});

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        socket.emit("login", values);
        sessionStorage.setItem("tell", values.tell);
    };

    return (
        <div className="signin__login">
            <h2>LOG IN</h2>
            <p
                className="signup__p"
                aria-live="assertive"
                style={{
                    visibility: validationsLogIn ? "visible" : "hidden",
                }}
            >
                the phone number or password is incorrect
            </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tell">phone number</label>
                <input
                    id="tell"
                    name="tell"
                    type="tell"
                    placeholder="phone number"
                    value={values.tell}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
                    title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                    required
                />
                <button>Sign Up</button>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default LogIn;
