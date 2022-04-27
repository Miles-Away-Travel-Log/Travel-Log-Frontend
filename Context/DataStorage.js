import {
    createContext,
    useContext,
    useState,
    useEffect,
    useReducer,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const DataStorage = createContext();

function AppState(props) {
    const router = useRouter();

    const registerInitialValues = {
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        confirm_password: "",
        city: "",
        country: "",
        status: "",
    };

    const markerTest = [
        {
            name: "Andreas",
            visible: false,
            coordinates: {
                latitude: 51.3233680719318,
                longitude: 12.372418865370589,
            },
        },
        {
            name: "Albert",
            visible: false,
            coordinates: {
                latitude: 51.33907051907917,
                longitude: 12.401449243834573,
            },
        },
        { name: "Connect", visible: false },
    ];

    const mapMarkerTestReducer = (originalArray, action) => {
        switch (action.type) {
            case "toggle":
                const toggleArray = [...originalArray];
                return toggleArray.map((item) => {
                    if (item.name === action.name) {
                        return { ...item, visible: !action.visible };
                    }
                    return item;
                });
                break;

            default:
                return originalArray;
                break;
        }
    };

    const [mapLayoutTest, setMapLayoutTest] = useState(
        "mapbox://styles/mapbox/streets-v9"
    );
    const [mapMarkerTest, dispatchMapMarkerTest] = useReducer(
        mapMarkerTestReducer,
        markerTest
    );
    const [registerFormValues, setRegisterFormValues] = useState(
        registerInitialValues
    );
    const [registerFormErrors, setRegisterFormErrors] = useState({});
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState("");
    const [budgetItems, setBudgetItems] = useState([]);
    const [outIn, setOutIn] = useState("expense");
    const [category, setCategory] = useState("");
    const [seedMoney, setSeedMoney] = useState("");
    const [homeCurrency, setHomeCurrency] = useState("EUR");
    const [friends, setFriends] = useState([]);

    async function addToFriends(id) {
        const rawResponse = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_FRIEND,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sentRequest: user.id,
                    receivedRequest: id,
                    status: false,
                }),
            }
        );
        if (rawResponse.status === 200) {
            handleGetUser();
            setSearchStringFriends([]);
            setWordEntered("");
        }
    }

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
                setHomeCurrency(
                    data.user.seedMoney[0]
                        ? data.user.seedMoney[0].currency
                        : "EUR"
                );
                setFriends(data.user.friends);
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
                        Accept: "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
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

        e.target.date.value = "";
        e.target.description.value = "";
        e.target.localcurrency.value = "";
    }

    async function handlePostSeedMoney(e) {
        e.preventDefault();

        const budgetItem = {
            total: e.target.seedmoney.value,
            currency: homeCurrency,
            user: Cookies.get("user"),
        };

        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_SEEDMONEY,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
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
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            if (response.status === 200) {
                setHomeCurrency("EUR");
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function logout() {
        Cookies.remove("token");
        Cookies.remove("user");
        setUser("");
        setUserId("");
        router.replace("/");
    }

    async function deleteOneItem(id) {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_BUDGET + `/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
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
                registerInitialValues,
                registerFormValues,
                setRegisterFormValues,
                registerFormErrors,
                setRegisterFormErrors,
                setUserId,
                userId,
                handlePostBudgetItem,
                budgetItems,
                user,
                setUser,
                setOutIn,
                outIn,
                category,
                setCategory,
                seedMoney,
                setSeedMoney,
                handlePostSeedMoney,
                handleDeleteSeedMoney,
                homeCurrency,
                setHomeCurrency,
                logout,
                deleteOneItem,
                addToFriends,
                friends,
                setFriends,
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
