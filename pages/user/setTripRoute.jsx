import Map, {
    Marker,
    Popup,
    NavigationControl,
    Source,
    Layer,
} from "react-map-gl";
import React, {
    useState,
    useEffect,
    useCallback,
    useReducer,
    useRef,
} from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { GoPrimitiveDot } from "react-icons/go";
import { FaHome, FaWalking } from "react-icons/fa";
import { useAppData } from "../../Context/DataStorage.js";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "../../components/Geocoder.jsx";
import Navbar from "../../components/Navbar.jsx";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const TripAPI = process.env.NEXT_PUBLIC_FETCH_URL_TRIP;
const TripID = "627b66b255c99b21f76a506b"; // erstmal nur hard-gecoded!!!

function SetTripRoute() {
    const { user } = useAppData();
    const [newSearchLocation, setNewSearchLocation] = useState(false); // noch ein State, da man einen für die Suche und die Marker braucht?
    const [startPoint, setStartPoint] = useState(false);
    const [home, setHome] = useState(false);
    const [tripData, setTripData] = useState(false);
    const [active, setActive] = useState(false);
    const [dragAndDrop, setDragAndDrop] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const [viewport, setViewState] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
    });
    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewState(newViewport),
        []
    );

    async function fetchTrip() {
        const rawResponse = await fetch(
            fetch(`${TripAPI}${TripID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setStartPoint(data.trip.startPoint);
                    setTripData(data.trip);
                })
        );
    }

    useEffect(() => {
        setHome(user.home);
    }, [user]);

    useEffect(() => {
        fetchTrip();
    }, []);

    useEffect(() => {
        if (startPoint)
            setViewState({
                ...viewport,
                latitude: startPoint.latitude,
                longitude: startPoint.longitude,
            });
        else if (user.home && user.home.latitude !== NaN)
            setViewState({
                ...viewport,
                latitude: user.home.latitude,
                longitude: user.home.longitude,
            });
    }, [startPoint, user]);

    useEffect(() => {
        if (tripData) {
            dispatchPointArray({
                type: "restore",
                payload: tripData.route,
            });
        }
        console.log("restored route ", tripData.route);
    }, [tripData]);

    // useEffect(() => {
    //     console.log("tripData", tripData);
    // }, [tripData]);

    // useEffect(() => {
    //     console.log("home", home);
    // }, [home]);

    // useEffect(() => {
    //     console.log("startPoint", startPoint);
    // }, [startPoint]);

    function handleClick(e) {
        const payload = {
            id: Date.now(),
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
        };
        dispatchPointArray({
            type: "add",
            payload: payload,
        });
        // console.log("New point: ", payload);
        setActive(false);
        setDragAndDrop(false);
        setDeleteClick(false);
    }

    const [events, logEvents] = useState({});

    const onMarkerDragEnd = useCallback((event, id) => {
        logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
        const payload = {
            id: id,
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        };
        dispatchPointArray({
            type: "update",
            payload: payload,
        });
        // console.log("New point: ", payload);
        setDragAndDrop(false);
    }, []);

    const startPointDragEnd = useCallback((event) => {
        logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
        setStartPoint({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
    }, []);

    function handleDeleteClick(e, id) {
        dispatchPointArray({
            type: "remove",
            payload: id,
        });
        console.log("Delete point: ", id);
        setDeleteClick(false);
    }

    const routeJSON = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: [
                // [12.372418865370589, 51.3233680719318],
                // [12.401449243834573, 51.33907051907917],
                // [12.370997422085791, 51.348486599994935],
            ],
        },
    };

    const pointArrayReducer = (originalArray, action) => {
        switch (action.type) {
            case "add":
                const addArray = [...originalArray];
                return [...addArray, action.payload];
                break;

            case "remove":
                const removeArray = [...originalArray];
                return removeArray.filter((item) => item.id !== action.payload);
                break;

            case "update":
                const moveArray = [...originalArray];
                return moveArray.map((item) => {
                    if (item.id === action.payload.id) {
                        return { ...action.payload };
                    }
                    return item;
                });
                break;

            case "restore":
                return [...action.payload];
                break;

            case "clear":
                return [];
                break;

            default:
                return originalArray;
                break;
        }
    };

    const [pointArray, dispatchPointArray] = useReducer(pointArrayReducer, []);

    function updateRoute() {
        if (startPoint) {
            routeJSON.geometry.coordinates.push([
                startPoint.longitude,
                startPoint.latitude,
            ]);
        }
        pointArray.forEach((item) => {
            routeJSON.geometry.coordinates.push([
                item.longitude,
                item.latitude,
            ]);
        });
        mapRef.current &&
            mapRef.current.getSource("polylineLayer").setData(routeJSON);
    }

    useEffect(() => {
        updateRoute();
        console.log("Route: ", routeJSON.geometry.coordinates);
        console.log("pointArray: ", pointArray);
        // }, [pointArray]);
    }, [routeJSON]);
    // }, [active]);

    // useEffect(() => {}, [pointArray]);

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 2000 };
            setNewSearchLocation({
                longitude: newViewport.longitude,
                latitude: newViewport.latitude,
            });
            // const searchResult = {
            //     lngLat: {
            //         lng: newViewport.longitude,
            //         lat: newViewport.latitude,
            //     },
            // };
            // handleClick(searchResult);
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    return (
        <div className="h-screen w-screen">
            {!user.userName && !tripData && !home && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {user.userName && tripData && home && (
                <div className="w-screen h-screen">
                    <div
                        ref={geocoderContainerRef}
                        style={{
                            position: "absolute",
                            top: 2,
                            left: 4,
                            zIndex: 1,
                        }}
                    />
                    <Map
                        // initialViewState={viewport}
                        {...viewport}
                        mapboxAccessToken={TOKEN}
                        mapStyle={
                            tripData.mapStyle
                                ? tripData.mapStyle.link
                                : "mapbox://styles/mapbox/streets-v11"
                        }
                        onClick={(e) => active && handleClick(e)}
                        reuseMaps
                        styleDiffing={true}
                        width="100%"
                        height="100%"
                        ref={mapRef}
                        onMove={(e) => setViewState(e.viewState)}
                    >
                        <Geocoder
                            mapRef={mapRef}
                            containerRef={geocoderContainerRef}
                            onViewportChange={handleGeocoderViewportChange}
                            mapboxApiAccessToken={TOKEN}
                            position="top-left"
                        />
                        <NavigationControl />
                        {home && (
                            <Marker
                                key={home.id}
                                longitude={home.longitude}
                                latitude={home.latitude}
                            >
                                <p
                                    className={`cursor-pointer text-4xl ${
                                        tripData
                                            ? tripData.mapStyle.iconColor
                                            : "text-black"
                                    }`}
                                >
                                    <FaHome />
                                </p>
                            </Marker>
                        )}
                        {startPoint && (
                            <Marker
                                key={startPoint.id}
                                longitude={startPoint.longitude}
                                latitude={startPoint.latitude}
                                draggable={true}
                                onDragEnd={(e) => {
                                    startPointDragEnd(e);
                                }}
                            >
                                <p
                                    className={`cursor-pointer text-4xl ${
                                        tripData
                                            ? tripData.mapStyle.iconColor
                                            : "text-black"
                                    }`}
                                >
                                    <FaWalking />
                                </p>
                            </Marker>
                        )}
                        {pointArray.map((result) => (
                            <div key={result.id}>
                                <Marker
                                    longitude={result.longitude}
                                    latitude={result.latitude}
                                    draggable={dragAndDrop || true}
                                    // draggable
                                    onDragEnd={(e) =>
                                        (dragAndDrop || true) &&
                                        onMarkerDragEnd(e, result.id)
                                    }
                                    onClick={(e) =>
                                        deleteClick &&
                                        handleDeleteClick(e, result.id)
                                    }
                                    // onMouseUp={(e) => dragAndDrop && handleClick(e)}
                                >
                                    <p className="cursor-pointer text-2xl">
                                        <GoPrimitiveDot />
                                    </p>
                                </Marker>
                            </div>
                        ))}
                        <Source
                            id="polylineLayer"
                            type="geojson"
                            data={routeJSON}
                        >
                            <Layer
                                id="lineLayer"
                                type="line"
                                source="my-data"
                                layout={{
                                    "line-join": "round",
                                    "line-cap": "round",
                                }}
                                paint={{
                                    "line-color": "rgba(255, 0, 0, 0.8)",
                                    "line-width": 3,
                                }}
                            />
                        </Source>
                        <div className="absolute top-0 left-0 right-0 w-auto font-bold text-base">
                            <div className="bg-gray-500/[.65] flex justify-center">
                                <button
                                    className="bg-slate-500 rounded-md py-1 px-3 font-bold"
                                    onClick={() => (
                                        setDragAndDrop(false),
                                        setDeleteClick(false),
                                        setActive(!active)
                                    )}
                                >
                                    Click to Add Location
                                </button>
                                <span className="ml-4  my-auto">
                                    Active: {active.toString()}
                                </span>
                                {/* <span className="ml-4 my-auto">
                            Longitude: {newSearchLocation && newSearchLocation.longitude}
                        </span>
                        <span className="ml-4 my-auto">
                            Latitude: {newSearchLocation && newSearchLocation.latitude}
                        </span> */}
                                <button
                                    className="bg-blue-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        setActive(false),
                                        setDragAndDrop(!dragAndDrop)
                                    )}
                                >
                                    Drag & Drop
                                </button>
                                <span className="ml-4 my-auto">
                                    Drag & Drop: {dragAndDrop.toString()}
                                </span>
                                <button
                                    className="bg-purple-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        setActive(false),
                                        setDragAndDrop(false),
                                        setDeleteClick(!deleteClick)
                                    )}
                                >
                                    Delete Point
                                </button>
                                <span className="ml-4 my-auto">
                                    Delete: {deleteClick.toString()}
                                </span>
                                <button
                                    className="bg-red-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        // setNewLocation(false),
                                        setActive(false),
                                        setDragAndDrop(false),
                                        dispatchPointArray({
                                            type: "clear",
                                            payload: null,
                                        })
                                    )}
                                >
                                    RESET
                                </button>
                            </div>
                        </div>
                    </Map>
                </div>
            )}
        </div>
    );
}

export default SetTripRoute;
