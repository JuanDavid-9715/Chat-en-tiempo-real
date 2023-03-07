import useForm from "../../utilities/useForm";

import socket from "../../services/Socket";

function Message({ contact }) {
    const { values, handleChange, clearForm } = useForm({
        message: "",
    });

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const message = {
            chat: contact.chat,
            tell: sessionStorage.getItem("tell"),
            message: values.message,
        };

        console.log(message);
        socket.emit("message", message);

        clearForm();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="form__message">
                <input
                    className="message__input"
                    name="message"
                    type="text"
                    placeholder="Write a message here"
                    value={values.message}
                    onChange={handleChange}
                    required
                />
                <button className="message__submit" type="submit">
                    <img src="/img/send.png" alt="icon-submit" />
                </button>
            </form>
        </>
    );
}

export default Message;
