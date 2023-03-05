import { useState, useEffect } from "react";

import useForm from "../../utilities/useForm";

import { motion } from "framer-motion";

import socket from "../../services/Socket";

function LogIn({ validationsLogIn, onClick, button }) {
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
            <motion.h2
                className="signin__h2"
                initial={{ x: 500 }}
                transition={{ duration: 1 }}
                animate={button ? { x: 0 } : { x: 500 }}
            >
                LOG IN
            </motion.h2>
            <motion.p
                className="signin__p signin__p--header"
                aria-live="assertive"
                style={{
                    visibility: validationsLogIn ? "visible" : "hidden",
                }}
            >
                the phone number or password is incorrect
            </motion.p>
            <form className="signin__form" onSubmit={handleSubmit}>
                <motion.label
                    className="signin__label"
                    htmlFor="logIn__tell"
                    initial={{ x: 500 }}
                    transition={{ duration: 1.8 }}
                    animate={button ? { x: 0 } : { x: 500 }}
                >
                    phone number
                </motion.label>
                <motion.input
                    id="logIn__tell"
                    className="signin__input"
                    name="tell"
                    type="tell"
                    initial={{ x: 500 }}
                    transition={{ duration: 1.8 }}
                    animate={button ? { x: 0 } : { x: 500 }}
                    value={values.tell}
                    onChange={handleChange}
                    required
                />
                <motion.label
                    className="signin__label"
                    htmlFor="logIn__password"
                    initial={{ x: 500 }}
                    transition={{ duration: 1.6 }}
                    animate={button ? { x: 0 } : { x: 500 }}
                >
                    password
                </motion.label>
                <motion.input
                    id="logIn__password"
                    className="signin__input"
                    name="password"
                    type="password"
                    initial={{ x: 500 }}
                    transition={{ duration: 1.6 }}
                    animate={button ? { x: 0 } : { x: 500 }}
                    value={values.password}
                    onChange={handleChange}
                    pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
                    title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                    required
                />
                <motion.button
                    className="signin__button signin__button--right"
                    type="submit"
                    initial={{ x: 500 }}
                    transition={{ duration: 2 }}
                    animate={button ? { x: 0 } : { x: 500 }}
                >
                    Log In
                </motion.button>
            </form>
            <motion.button
                className="signin__button signin__button--left"
                onClick={onClick}
                initial={{ x: 500 }}
                transition={{ duration: 2 }}
                animate={button ? { x: 0 } : { x: 500 }}
            >
                Sign Up
            </motion.button>
        </>
    );
}

export default LogIn;
