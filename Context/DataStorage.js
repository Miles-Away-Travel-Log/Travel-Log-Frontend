import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

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
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState("");
    const [budgetItems, setBudgetItems] = useState([]);
    const [outIn, setOutIn] = useState("income");
    const [category, setCategory] = useState("");

    function handleGetUser() {
        fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_USER + `/${Cookies.get("user")}`
        )
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user);
                setBudgetItems(data.user.budget);
                setUserId(data.user.id);
            });
    }

    async function handlePostBudgetItem(e) {
        e.preventDefault();

        const budgetItem = {
            type: outIn,
            value: e.target.amount.value,
            date: e.target.date.value,
            category: category,
            description: e.target.description.value,
            user: Cookies.get("user"),
        };

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_BUDGET,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(budgetItem),
                }
            );

            if (response.status === 200) {
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DataStorage.Provider
            value={{
                initialValues,
                formValues,
                setFormValues,
                formErrors,
                setFormErrors,
                setUserId,
                userId,
                handlePostBudgetItem,
                budgetItems,
                user,
                setOutIn,
                outIn,
                category,
                setCategory,
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
