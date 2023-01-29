import { useState, useEffect } from "react";
import useForm from "../../utilities/useForm";

import socket from "../../services/Socket";

function LogIn({ validationsLogIn }) {
    const { values, handleChange, clearForm } = useForm({
        tell: "",
        password: "",
    });

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        socket.emit("login", values);
        sessionStorage.setItem("tell", values.tell);
        clearForm();
    };

    return (
        <>
            <h2 className="login__h2">LOG IN</h2>
            <p
                className="login__p"
                aria-live="assertive"
                style={{
                    visibility: validationsLogIn ? "visible" : "hidden",
                }}
            >
                the phone number or password is incorrect
            </p>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__label" htmlFor="login__tell">
                    phone number
                </label>
                <input
                    id="login__tell"
                    className="login__input"
                    name="tell"
                    type="tell"
                    placeholder="phone number"
                    value={values.tell}
                    onChange={handleChange}
                    required
                />
                <label className="login__label" htmlFor="login__password">
                    password
                </label>
                <input
                    id="login__password"
                    className="login__input"
                    name="password"
                    type="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
                    title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                    required
                />
                <button className="login__button">Sign Up</button>
                <button className="login__button" type="submit">
                    Log In
                </button>
            </form>
        </>
    );
}

export default LogIn;
