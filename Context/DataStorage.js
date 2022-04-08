import { createContext, useContext, useState, useReducer } from "react";

const DataStorage = createContext();

function AppState(props) {
    const initialRegisterValues = {
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

    const [registerFormValues, setRegisterFormValues] = useState(
        initialRegisterValues
    );
    const [registerFormErrors, setRegisterFormErrors] = useState({});
    const [mapLayoutTest, setMapLayoutTest] = useState(
        "mapbox://styles/mapbox/streets-v9"
    );
    const [mapMarkerTest, dispatchMapMarkerTest] = useReducer(mapMarkerTestReducer ,markerTest);

    return (
        <DataStorage.Provider
            value={{
                registerFormValues,
                setRegisterFormValues,
                registerFormErrors,
                setRegisterFormErrors,
                mapLayoutTest,
                setMapLayoutTest,
                mapMarkerTest,
                dispatchMapMarkerTest,
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
