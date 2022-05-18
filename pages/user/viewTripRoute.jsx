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
import { GoPrimitiveDot } from "react-icons/go";
import { FaHome, FaWalking } from "react-icons/fa";
import { useAppData } from "../../Context/DataStorage.js";
import Geocoder from "../../components/Geocoder.jsx";
import Navbar from "../../components/Navbar.jsx";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { WebMercatorViewport } from "@deck.gl/core";
import { useWindowSize } from "@react-hook/window-size";
import { useRouter } from "next/router";
import { ImLocation2 } from "react-icons/im";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const TripAPI = process.env.NEXT_PUBLIC_FETCH_URL_TRIP;
// const TripID = "627bdc88d164cba69e75a543"; // erstmal nur hard-gecoded!!!
// const TripID = router.asPath.split("/")[3];
const TripID = "627b66b255c99b21f76a506b";

function ViewTripRoute() {
    const { user } = useAppData();
    let bounds;
    const router = useRouter();
    const [newSearchLocation, setNewSearchLocation] = useState(false); // noch ein State, da man einen für die Suche und die Marker braucht?
    const [startPoint, setStartPoint] = useState(false);
    const [home, setHome] = useState(false);
    const [tripData, setTripData] = useState(false);
    const [active, setActive] = useState(false);
    const [dragAndDrop, setDragAndDrop] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const [createDiary, setCreateDiary] = useState(false);
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
    const [windowWidth, windowHeight] = useWindowSize();
    const [tripSidebar, setTripSidebar] = useState(false);

    const applyToArray = (func, array) => func.apply(Math, array);

    const GetBoundsForPoints = (points) => {
        // Calculate corner values of bounds
        const pointsLong = points.map((point) => point.longitude);
        const pointsLat = points.map((point) => point.latitude);
        const cornersLongLat = [
            [
                applyToArray(Math.min, pointsLong),
                applyToArray(Math.min, pointsLat),
            ],
            [
                applyToArray(Math.max, pointsLong),
                applyToArray(Math.max, pointsLat),
            ],
        ];

        // Use WebMercatorViewport to get center longitude/latitude and zoom
        const viewport = new WebMercatorViewport({
            width: windowWidth || 800,
            height: windowHeight || 600,
        }).fitBounds(cornersLongLat, {
            padding: Math.round(windowWidth * 0.05) || 30,
        });
        const { longitude, latitude, zoom } = viewport;
        if (points.length <= 1) zoom = 10.5;
        return { longitude, latitude, zoom };
    };

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
                    const startArray = [
                        data.trip.startPoint,
                        ...data.trip.route,
                    ];
                    bounds = GetBoundsForPoints(startArray);
                    setViewState({ ...bounds, width: "100%", height: "100%" });
                    setStartPoint(data.trip.startPoint);
                    setTripData(data.trip);
                })
        );
    }

    useEffect(() => {
        fetchTrip();
    }, []);

    useEffect(() => {
        if (
            user.home &&
            startPoint.longitude !== user.home.longitude &&
            startPoint.latitude !== user.home.latitude
        )
            setHome(user.home);
        else setHome(false);
    }, [user]);

    // useEffect(() => {
    //     if (startPoint)
    //         setViewState({
    //             ...viewport,
    //             latitude: startPoint.latitude,
    //             longitude: startPoint.longitude,
    //         });
    //     else if (user.home && user.home.latitude !== NaN)
    //         setViewState({
    //             ...viewport,
    //             latitude: user.home.latitude,
    //             longitude: user.home.longitude,
    //         });
    // }, [startPoint, user]);

    useEffect(() => {
        if (tripData) {
            dispatchPointArray({
                type: "restore",
                payload: tripData.route,
            });
            // console.log("tripData", tripData);
        }
        console.log("restored route ", tripData.route);
    }, [tripData]);

    const [events, logEvents] = useState({});

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

            case "createDiary":
                const diaryArray = [...originalArray];
                return diaryArray.map((item) => {
                    if (item.id === action.payload.id) {
                        action.payload.diary = true;
                        return { ...action.payload };
                    }
                    return item;
                });
                break;

            case "removeDiaryStatus":
                const diaryRemoveArray = [...originalArray];
                return diaryRemoveArray.map((item) => {
                    if (item.id === action.payload.id) {
                        action.payload.diary = false;
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
        // console.log("Route: ", routeJSON.geometry.coordinates);
        console.log("pointArray: ", pointArray);
        // }, [pointArray]);
    }, [routeJSON]);
    // }, [active]);

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 2000 };
            setNewSearchLocation({
                longitude: newViewport.longitude,
                latitude: newViewport.latitude,
            });
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    return (
        <div className="h-screen w-screen">
            {!user.userName && !tripData && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {user.userName && tripData && (
                // <div className="w-screen h-screen">
                <div
                    className={tripSidebar ? "col-span-2" : "w-screen h-screen"}
                >
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
                                draggable={false}
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
                        {/* {pointArray.map(
                            (result) =>
                                result.diary !== true && (
                                    <div key={result.id}>
                                        <Marker
                                            longitude={result.longitude}
                                            latitude={result.latitude}
                                            draggable={false}
                                        >
                                            <p className="cursor-pointer text-2xl">
                                                <GoPrimitiveDot />
                                            </p>
                                        </Marker>
                                    </div>
                                )
                        )} */}
                        {tripData.diary.length > 0 &&
                            tripData.diary.map((diary) => (
                                <div key={diary.id}>
                                    <Marker
                                        longitude={diary.location.longitude}
                                        latitude={diary.location.latitude}
                                        draggable={false}
                                    >
                                        <p
                                            className={`cursor-pointer text-4xl animate-bounce ${
                                                // tripData
                                                //     ? tripData.mapStyle
                                                //           .iconColor
                                                //     : "text-black"
                                                "text-blue-500"
                                            }`}
                                        >
                                            <ImLocation2 />
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
                    </Map>
                </div>
            )}
        </div>
    );
}

export default ViewTripRoute;
