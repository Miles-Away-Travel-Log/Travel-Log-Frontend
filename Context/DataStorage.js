import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const DataStorage = createContext();

function AppState(props) {
    const router = useRouter();

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

    const markerTest = [
        { name: "Andreas", visible: false, coordinates: {latitude: 51.3233680719318, longitude: 12.372418865370589} },
        { name: "Albert", visible: false, coordinates: {latitude: 51.33907051907917, longitude: 12.401449243834573} },
        { name: "Connect", visible: false },
    ];

    const mapMarkerTestReducer = (originalArray, action) => {
        switch (action.type) {
            case "toggle":
                const toggleArray = [...originalArray];
                return toggleArray.map(item => {
                    if (item.name === action.name) {
                        return {...item, visible: !action.visible}
                    }
                return item;})
                break;
          
            default:
                return originalArray
                break;
        }
    };

    const [mapLayoutTest, setMapLayoutTest] = useState(
        "mapbox://styles/mapbox/streets-v9"
    );
    const [mapMarkerTest, dispatchMapMarkerTest] = useReducer(mapMarkerTestReducer ,markerTest);
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState("");
    const [budgetItems, setBudgetItems] = useState([]);
    const [outIn, setOutIn] = useState("income");
    const [category, setCategory] = useState("");
    const [seedMoney, setSeedMoney] = useState("");

    function handleGetUser() {
        fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_USER + `/${Cookies.get("user")}`
        )
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user);
                setBudgetItems(data.user.budget);
                setUserId(data.user.id);
                setSeedMoney(data.user.seedMoney);
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

    async function handlePostSeedMoney(e) {
        e.preventDefault();

        const budgetItem = {
            total: e.target.seedmoney.value,
            user: Cookies.get("user"),
        };

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_SEEDMONEY,
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

    async function handleDeleteSeedMoney(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_SEEDMONEY +
                    `/${seedMoney[0]._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            if (response.status === 200) {
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        const user = Cookies.get("user");
        if (!user) {
            return;
        } else {
            console.log(seedMoney._id);
        }
        handleGetUser();
    }, []);

    return (
        <DataStorage.Provider
            value={{
                mapLayoutTest,
                setMapLayoutTest,
                mapMarkerTest,
                dispatchMapMarkerTest,
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
                seedMoney,
                setSeedMoney,
                handlePostSeedMoney,
                handleDeleteSeedMoney,
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
