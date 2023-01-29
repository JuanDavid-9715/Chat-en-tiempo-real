import { useState } from "react";
import useForm from "../../utilities/useForm";

import socket from "../../services/Socket";

function SignUp() {
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
            <h2 className="signup__h2">SIGN UP</h2>
            <p
                className="signup__p"
                aria-live="assertive"
                style={{
                    visibility: validations.form ? "visible" : "hidden",
                }}
            >
                Please use another phone number
            </p>
            <form className="signup__form" onSubmit={handleSubmit}>
                <label className="signup__label" htmlFor="signup__name">
                    name
                </label>
                <input
                    id="signup__name"
                    className="signup__input"
                    name="name"
                    type="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    required
                />
                <label className="signup__label" htmlFor="signup__tell">
                    phone number
                </label>
                <input
                    id="signup__tell"
                    className="signup__input"
                    name="tell"
                    type="tell"
                    placeholder="phone number"
                    value={values.tell}
                    onChange={handleChange}
                    onBlur={handleBlurTell}
                    aria-errormessage="emailErrorID"
                    aria-invalid={validations.tell}
                    required
                />
                <p
                    className="signup__p"
                    aria-live="assertive"
                    style={{
                        visibility: validations.tell ? "visible" : "hidden",
                    }}
                >
                    this tell is already registered
                </p>
                <label className="signup__label" htmlFor="signup__password">
                    password
                </label>
                <input
                    id="signup__password"
                    className="signup__input"
                    name="password"
                    type="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    pattern="(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ].*"
                    title="Debe tener al menos una mayúscula, una minúscula y un dígito"
                    required
                />
                <button className="signup__button">Log In</button>
                <button className="signup__button" type="submit">
                    Sign Up
                </button>
            </form>
        </>
    );
}

export default SignUp;
