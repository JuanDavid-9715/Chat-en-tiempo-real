import { useState } from "react";

function useButton(initial) {
    const [button, setButton] = useState(initial);

    const handleChange = () => {
        setButton(!button);
    };

    return {
        button,
        handleChange,
    };
}

export default useButton;
