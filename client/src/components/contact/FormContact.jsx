import { useState } from "react";
import useForm from "../../utilities/useForm";

import socket from "../../services/Socket";

function FormContact() {
    const { values, handleChange, clearForm, clearTellPassword } = useForm({
        name: "",
        tell: "",
    });

    const [validations, setValidations] = useState({ tell: "", form: "" });

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (validations.tell) {
            setValidations({
                ...validations,
                form: false,
            });

            const buildContact = {
                tell: sessionStorage.getItem("tell"),
                contact: {
                    name: values.name,
                    tell: values.tell,
                },
            };

            socket.emit("addContact", buildContact);
            clearForm();
        } else {
            setValidations({
                tell: true,
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
        <div>
            <h2>Contact</h2>
            <p
                className="signup__p"
                aria-live="assertive"
                style={{
                    visibility: validations.form ? "visible" : "hidden",
                }}
            >
                please add an existing contact
            </p>
            <form onSubmit={handleSubmit}>
                <label
                    className="contact__name"
                    htmlFor="contact__name"
                ></label>
                <input
                    id="contact__name"
                    className="contact__name"
                    name="name"
                    type="text"
                    placeholder="Contact name"
                    value={values.name}
                    onChange={handleChange}
                    required
                />
                <label
                    className="contact__tell"
                    htmlFor="contact__tell"
                ></label>
                <input
                    id="contact__tell"
                    className="contact__tell"
                    name="tell"
                    type="text"
                    placeholder="Contact phone"
                    value={values.tell}
                    onChange={handleChange}
                    onBlur={handleBlurTell}
                    required
                />
                <p
                    className="signup__p"
                    aria-live="assertive"
                    style={{
                        visibility: !validations.tell ? "visible" : "hidden",
                    }}
                >
                    Contact does not exist
                </p>
                <button className="contact__button" type="submit">
                    Add contact
                </button>
            </form>
        </div>
    );
}

export default FormContact;
