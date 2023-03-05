import { useState } from "react";
import { motion } from "framer-motion";

import useForm from "../../utilities/useForm";

import socket from "../../services/Socket";

function SignUp({ onClick, button }) {
    const { values, handleChange, clearForm, clearTellPassword } = useForm({
        name: "",
        tell: "",
        password: "",
    });

    const [validations, setValidations] = useState({ tell: "", form: "" });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (!validations.tell) {
            setValidations({
                ...validations,
                form: false,
            });
            sessionStorage.setItem("tell", values.tell);
            socket.emit("signUp", values);
            clearForm();
        } else {
            setValidations({
                tell: false,
                form: true,
            });
            clearTellPassword();
        }
    };

    const handleBlurTell = () => {
        socket.emit("Availability", values);
        socket.on("enabled", (enabled) => {
            setValidations({
                ...validations,
                tell: enabled,
            });
        });
    };

    return (
        <>
            <motion.h2
                className="signin__h2"
                transition={{ duration: 1 }}
                animate={button ? { x: -500 } : { x: 0 }}
            >
                SIGN UP
            </motion.h2>
            <motion.p
                className="signin__p signin__p--header"
                aria-live="assertive"
                style={{
                    visibility: validations.form ? "visible" : "hidden",
                }}
            >
                Please use another phone number
            </motion.p>
            <form className="signin__form" onSubmit={handleSubmit}>
                <motion.label
                    className="signin__label"
                    htmlFor="signUp__name"
                    transition={{ duration: 1.8 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                >
                    name
                </motion.label>
                <motion.input
                    id="signUp__name"
                    className="signin__input"
                    name="name"
                    type="name"
                    transition={{ duration: 1.8 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                    value={values.name}
                    onChange={handleChange}
                    required
                />
                <motion.label
                    className="signin__label"
                    htmlFor="signUp__tell"
                    transition={{ duration: 1.6 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                >
                    phone number
                </motion.label>
                <motion.input
                    id="signUp__tell"
                    className="signin__input"
                    name="tell"
                    type="tell"
                    transition={{ duration: 1.6 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                    value={values.tell}
                    onChange={handleChange}
                    onBlur={handleBlurTell}
                    aria-errormessage="emailErrorID"
                    aria-invalid={validations.tell}
                    required
                />
                <p
                    className="signin__p"
                    aria-live="assertive"
                    style={{
                        visibility: validations.tell ? "visible" : "hidden",
                    }}
                >
                    this tell is already registered
                </p>
                <motion.label
                    className="signin__label"
                    htmlFor="signUp__password"
                    transition={{ duration: 1.4 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                >
                    password
                </motion.label>
                <motion.input
                    id="signUp__password"
                    className="signin__input"
                    name="password"
                    type="password"
                    transition={{ duration: 1.4 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                    value={values.password}
                    onChange={handleChange}
                    pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
                    title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                    required
                />
                <button
                    className="signin__button signin__button--right"
                    type="submit"
                    transition={{ duration: 2 }}
                    animate={button ? { x: -500 } : { x: 0 }}
                >
                    Sign Up
                </button>
            </form>
            <button
                className="signin__button signin__button--left"
                transition={{ duration: 3 }}
                animate={button ? { x: -500 } : { x: 0 }}
                onClick={onClick}
            >
                Log In
            </button>
        </>
    );
}

export default SignUp;
