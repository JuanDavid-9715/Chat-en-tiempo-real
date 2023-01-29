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
                <img src="" alt="icon-newContact" />
            </button>
        </div>
    );
}

export default ButtonNewContact;
