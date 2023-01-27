import { useState } from "react";

function useForm(initial = {}) {
    const [values, setValues] = useState(initial);

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const clearForm = () => {
        const valuesArray = Object.entries(values);
        const clearValuesArray = valuesArray.map(([key]) => [key, ""]);
        const valuesJason = Object.fromEntries(clearValuesArray);

        setValues(valuesJason);
    };

    const clearTellPassword = () => {
        setValues({
            ...values,
            tell: "",
            password: "",
        });
    };

    return {
        values,
        handleChange,
        clearForm,
        clearTellPassword,
    };
}

export default useForm;
