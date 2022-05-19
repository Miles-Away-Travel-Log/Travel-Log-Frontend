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
        status: "",
        avatar: "",
        mapStyle: {
            name: "Basic",
            link: "mapbox://styles/mapbox/streets-v9",
            iconColor: "text-black",
        },
        home: {
            longitude: -0.091998,
            latitude: 51.515618,
            city: "London",
            country: "United Kingdom",
        },
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
        {
            name: "Zoo",
            visible: false,
            coordinates: {
                latitude: 51.348486599994935,
                longitude: 12.370997422085791,
            },
        },
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

    //-------------------------------------- REGISTER  --------------------------------------------------//
    //
    const [registerFormValues, setRegisterFormValues] = useState(
        registerInitialValues
    );
    const [registerFormErrors, setRegisterFormErrors] = useState({});

    //-------------------------------------- LOGIN  -----------------------------------------------------//
    //
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState("");

    //-------------------------------------- PROFILE PICTURE  -------------------------------------------//
    //

    const [accountPhoto, setAccountPhoto] = useState("");

    //-------------------------------------- SET HOME AND MAPSTYLE  -------------------------------------//
    //

    const [newHome, setNewHome] = useState(false);
    const [defaultMapStyle, setDefaultMapStyle] = useState(false);

    //-------------------------------------- NEW TRIP  --------------------------------------------------//
    //

    const [datePickerVisibility, setDatePickerVisibility] = useState(false);
    const [startPoint, setStartPoint] = useState(false);
    const [newTripData, setNewTripData] = useState(false);
    const [inviteFriends, setInviteFriends] = useState(false);
    const [inviteFriendsVisibility, setInviteFriendsVisibility] =
        useState(false);
    const [tripImages, setTripImages] = useState([]);
    const [tripDiary, setTripDiary] = useState([]);
    const [tripPeople, setTripPeople] = useState([]);
    const [tripData, setTripData] = useState({});
    const [tripImage, setTripImage] = useState("");

    //-------------------------------------- DIARY  -----------------------------------------------------//
    //

    const [diaryLocation, setDiaryLocation] = useState(false);
    const [cancelDiaryCreation, setCancelDiaryCreation] = useState(false);
    const [savedDiary, setSavedDiary] = useState(false);
    const [createDiarySidebar, setCreateDiarySidebar] = useState(false);

    //-------------------------------------- NAV BAR  ---------------------------------------------------//
    //

    const [buttonIndex, setButtonIndex] = useState(0);

    //-------------------------------------- BUDGET  ---------------------------------------------------//
    //
    const [isActivePageBudget, setIsActivePageBudget] = useState("budget");
    const [tripSeedMoney, setTripSeedMoney] = useState([]);
    const [tripBudget, setTripBudget] = useState([]);
    const [incomeOrExpense, setIncomeOrExpense] = useState("expense");
    const [category, setCategory] = useState("general");
    const [seedMoney, setSeedMoney] = useState("");
    const [homeCurrency, setHomeCurrency] = useState("EUR");
    const [
        localCurrencyValueInHomeCurrency,
        setLocalCurrencyValueInHomeCurrency,
    ] = useState(undefined);

    //--------------------------- POST ITEM ----------------------//
    async function handlePostBudgetItem(param) {
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
                    body: JSON.stringify(param),
                }
            );

            if (response.status === 200) {
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }

        setLocalCurrencyValueInHomeCurrency(undefined);
    }

    //--------------------------- POST SEED MONEY -----------------//

    async function handlePostSeedMoney(param) {
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
                    body: JSON.stringify(param),
                }
            );

            if (response.status === 200) {
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    //--------------------------- DELETE SEED MONEY ----------------//

    async function handleDeleteSeedMoney(param) {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_SEEDMONEY + param,
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

    //--------------------------- DELETE ITEM ----------------------//

    async function deleteOneItem(id) {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_BUDGET + `${id}`,
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

    //-------------------------------------- Trips  -----------------------------------------------------//
    //

    const [userTrips, setUserTrips] = useState([]);

    //-------------------------------------- FETCH USER  ------------------------------------------------//
    //

    async function handleGetUser() {
        const header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        };

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_USER + `${Cookies.get("user")}`,
            {
                method: "GET",
                headers: header,
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            setUser(data.user);
            setUserId(data.user.id);
            setAccountPhoto(data.user.avatar);
            setUserTrips(data.user.trips);
            setList_Friends_FriendRequests(data.user.friends);
        } else {
            setUser(null);
        }
    }

    //-------------------------------------- LOGOUT  ---------------------------------------------------//
    //

    function logout() {
        router.replace("/");
        Cookies.remove("token");
        Cookies.remove("user");
    }

    //-------------------------------------- DELETE USER  ----------------------------------------------//
    //

    async function deleteAccount() {
        if (confirm("Do you really want to delete your account?")) {
            const header = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            };

            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_USER +
                    `${Cookies.get("user")}`,
                {
                    method: "DELETE",
                    headers: header,
                }
            );

            if (response.status === 200) {
                logout();
            } else {
                console.log("error");
            }
        }
    }

    //-------------------------------------- FRIENDS  ---------------------------------------------------//
    //

    const [list_Friends_FriendRequests, setList_Friends_FriendRequests] =
        useState([]);

    const [
        dataOfFriends_or_dataOfRequest_to_Array,
        setDataOfFriends_or_dataOfRequest_to_Array,
    ] = useState([]);

    const [dataOfOneFriend, setDataOfOneFriend] = useState([]);

    //-------------------------------------- Get Trip Data  ----------------------------------------------//
    //

    async function getTripData(param) {
        const header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        };

        const rawResponse = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_TRIP + `${param}`,
            {
                method: "GET",
                headers: header,
            }
        );
        const data = await rawResponse.json();

        const getImages = data.trip.diary.map((diary) => {
            return diary.images;
        });

        setTripData(data.trip);
        setTripSeedMoney(data.trip.seedMoney);
        setTripDiary(data.trip.diary);
        setTripBudget(data.trip.budget);
        setTripImages(getImages);
        setTripPeople(data.trip.participants);

        const getPhotos = data.trip.diary.map((diary) => {
            return diary.images;
        });

        setTripImages(getPhotos);
    }

    //-------------------------------------- UseEffect ---------------------------------------------------//
    //

    useEffect(() => {
        const user = Cookies.get("user");
        if (!user) {
            return;
        }
        handleGetUser();
    }, []);

    //----------------------------------------------------------------------------------------------------//
    //

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
                user,
                setUser,
                setIncomeOrExpense,
                incomeOrExpense,
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
                list_Friends_FriendRequests,
                setList_Friends_FriendRequests,
                handleGetUser,
                accountPhoto,
                setAccountPhoto,
                dataOfFriends_or_dataOfRequest_to_Array,
                setDataOfFriends_or_dataOfRequest_to_Array,
                dataOfOneFriend,
                setDataOfOneFriend,
                newHome,
                setNewHome,
                defaultMapStyle,
                setDefaultMapStyle,
                datePickerVisibility,
                setDatePickerVisibility,
                buttonIndex,
                setButtonIndex,
                deleteAccount,
                localCurrencyValueInHomeCurrency,
                setLocalCurrencyValueInHomeCurrency,
                startPoint,
                setStartPoint,
                newTripData,
                setNewTripData,
                inviteFriends,
                setInviteFriends,
                inviteFriendsVisibility,
                setInviteFriendsVisibility,
                userTrips,
                setUserTrips,
                tripImages,
                setTripImages,
                tripDiary,
                setTripDiary,
                tripSeedMoney,
                setTripSeedMoney,
                tripPeople,
                setTripPeople,
                tripBudget,
                setTripBudget,
                isActivePageBudget,
                setIsActivePageBudget,
                tripData,
                setTripData,
                getTripData,
                diaryLocation,
                setDiaryLocation,
                cancelDiaryCreation,
                setCancelDiaryCreation,
                setTripImage,
                tripImage,
                createDiarySidebar,
                setCreateDiarySidebar,
                savedDiary,
                setSavedDiary,
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
