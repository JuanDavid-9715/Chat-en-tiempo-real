import { useState } from "react";

import FormContact from "./FormContact";

function ButtonNewContact() {
    const [viewForm, setViewFrom] = useState(false);

    return (
        <div>
            {viewForm ? <FormContact /> : ""}

            <button
                onClick={() => {
                    setViewFrom(!viewForm);
                }}
            >
                <img src="" alt="icono-newContact" />
            </button>
        </div>
    );
}

export default ButtonNewContact;
