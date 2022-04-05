import { createContext, useContext, useState } from "react";

const DataStorage = createContext();

function AppState(props) {
    const initialValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirm_password: "",
        city: "",
        country: "",
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    return (
        <DataStorage.Provider
            value={{
                initialValues,
                formValues,
                setFormValues,
                formErrors,
                setFormErrors,
            }}
        >
            {props.children}
        </DataStorage.Provider>
    );
}

function useAppData() {
    return useContext(DataStorage);
}

export { AppState, useAppData, DataStorage };
