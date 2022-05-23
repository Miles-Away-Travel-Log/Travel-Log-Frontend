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
import { useAppData } from "../Context/DataStorage.js";
import Geocoder from "./Geocoder.jsx";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";
import { WebMercatorViewport } from "@deck.gl/core";
import { ImLocation2 } from "react-icons/im";
import DiaryMaskComponent from "./Trip.DiaryMaskComponent.jsx";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const TripAPI = process.env.NEXT_PUBLIC_FETCH_URL_TRIP;

function SetTripRoute({ tripData }) {
    const {
        user,
        diaryLocation,
        setDiaryLocation,
        cancelDiaryCreation,
        setCancelDiaryCreation,
        getTripData,
        createDiarySidebar,
        setCreateDiarySidebar,
        savedDiary,
        setSavedDiary,
    } = useAppData();
    let bounds;
    const TripID = tripData.id;
    const [newSearchLocation, setNewSearchLocation] = useState(false);
    const [startPoint, setStartPoint] = useState(false);
    const [home, setHome] = useState(false);
    // const [tripData, setTripData] = useState(false);
    const [active, setActive] = useState(false);
    const [toSave, setToSave] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    // const [dragAndDrop, setDragAndDrop] = useState(false);
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
    const [windowWidth, setWindowWidth] = useState(800);
    const [windowHeight, setWindowHeight] = useState(600);

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
            padding: Math.round(windowWidth * 0.09) || 30,
        });
        const { longitude, latitude, zoom } = viewport;
        if (points.length <= 1) zoom = 10.5;
        return { longitude, latitude, zoom };
    };

    // async function fetchTrip() {
    //     const rawResponse = await fetch(
    //         fetch(`${TripAPI}${TripID}`, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${Cookies.get("token")}`,
    //             },
    //         })
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 const startArray = [
    //                     data.trip.startPoint,
    //                     ...data.trip.route,
    //                 ];
    //                 bounds = GetBoundsForPoints(startArray);
    //                 setViewState({ ...bounds, width: "100%", height: "100%" });
    //                 setStartPoint(data.trip.startPoint);
    //                 setTripData(data.trip);
    //             })
    //     );
    // }

    function setInitialCoordinates() {
        const start = tripData.startPoint ? tripData.startPoint : user.home;
        const startArray = [start, ...tripData.route];
        bounds = GetBoundsForPoints(startArray);
        setViewState({ ...bounds, width: "100%", height: "100%" });
        setStartPoint(tripData.startPoint);
    }

    useEffect(() => {
        setSidebar(false);
        setSavedDiary(false);
        setCreateDiarySidebar(false);
        setToSave(false);
        if (mapRef.current) {
            setWindowHeight(mapRef.current.offsetHeight);
            setWindowWidth(mapRef.current.offsetWidth);
        }
        setInitialCoordinates();
        dispatchPointArray({
            type: "restore",
            payload: tripData.route,
        });
    }, []);

    useEffect(() => {
        if (
            user.home &&
            startPoint.longitude !== user.home.longitude &&
            startPoint.latitude !== user.home.latitude
        )
            setHome(user.home);
        else setHome(false);
    }, [home]);

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

    // useEffect(() => {
    //     if (tripData) {
    //         dispatchPointArray({
    //             type: "restore",
    //             payload: tripData.route,
    //         });
    //         // console.log("tripData", tripData);
    //     }
    //     // if (cancelDiaryCreation) {
    //     //     dispatchPointArray({
    //     //         type: "removeDiaryStatus",
    //     //         payload: cancelDiaryCreation,
    //     //     });
    //     // }
    //     console.log("restored route ", tripData.route);
    // }, [tripData]);

    useEffect(() => {
        if (cancelDiaryCreation) {
            // const removeDiary = {
            //     id: diaryLocation.id,
            //     longitude: diaryLocation.longitude,
            //     latitude: diaryLocation.latitude,
            //     diary: diaryLocation.diary,
            // };
            // dispatchPointArray({
            //     type: "removeDiaryStatus",
            //     payload: removeDiary,
            // });
            setCancelDiaryCreation(false);
            setDiaryLocation(false);
        }
    }, [cancelDiaryCreation]);

    useEffect(() => {
        async function update() {
            const newDiary = {
                id: diaryLocation.id,
                longitude: diaryLocation.longitude,
                latitude: diaryLocation.latitude,
                diary: diaryLocation.diary,
            };
            dispatchPointArray({
                type: "createDiary",
                payload: newDiary,
            });
            await setToSave(true);
            // await saveUpdatedTrip();
            // await getTripData();
        }
        if (savedDiary) update();
    }, [savedDiary]);

    useEffect(() => {
        if (toSave) {
            saveUpdatedTrip();
            setSavedDiary(false);
            setToSave(false);
        }
    }, [toSave]);

    function handleClick(e) {
        const payload = {
            id: Date.now(),
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
            diary: false,
        };
        dispatchPointArray({
            type: "add",
            payload: payload,
        });
        // console.log("New point: ", payload);
        setActive(false);
        // setDragAndDrop(false);
        setDeleteClick(false);
    }

    const [events, logEvents] = useState({});

    const onMarkerDragEnd = useCallback((event, id) => {
        logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
        const payload = {
            id: id,
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
            diary: false,
        };
        dispatchPointArray({
            type: "update",
            payload: payload,
        });
        // console.log("New point: ", payload);
        // setDragAndDrop(false);
    }, []);

    // const startPointDragEnd = useCallback((event) => {
    //     logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    //     setStartPoint({
    //         longitude: event.lngLat.lng,
    //         latitude: event.lngLat.lat,
    //     });
    // }, []);

    function handleDeleteClick(e, id) {
        dispatchPointArray({
            type: "remove",
            payload: id,
        });
        // console.log("Delete point: ", id);
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
                return [...tripData.route];
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
        mapRef.current.getSource("polylineLayer") &&
            mapRef.current.getSource("polylineLayer").setData(routeJSON);
    }

    useEffect(() => {
        mapRef.current && updateRoute();
        // console.log("Route: ", routeJSON.geometry.coordinates);
        // console.log("pointArray: ", pointArray);
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

    async function handleCreateDiaryClick(event, location) {
        // await dispatchPointArray({
        //     type: "createDiary",
        //     payload: location,
        // });
        const newLocation = await getLocationName(location);
        await setDiaryLocation({
            ...newLocation,
            id: location.id,
            diary: true,
        });
        await saveUpdatedTrip();
        setCreateDiarySidebar(true);
        setSidebar(true);
        // router.replace(`/user/diaryMask`);
    }

    async function saveUpdatedTrip(event) {
        // event.preventDefault();
        let start =
            startPoint !== tripData.startPoint
                ? startPoint
                : tripData.startPoint;
        if (!start) start = user.home;
        const rawResponse = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_TRIP + `${TripID}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                body: JSON.stringify({
                    // tripName: newTripData.tripName,
                    // tripType: newTripData.tripType,
                    // description: newTripData.description,
                    // startDate: newTripData.startDate,
                    // endDate: newTripData.endDate,
                    // mapStyle: mapStyle,
                    startPoint: start,
                    // participants: participants,
                    // visible: newTripData.visible,
                    route: pointArray,
                }),
            }
        );

        if (rawResponse.status === 200) {
            // falls erfolgreich, dann:
            // alert("Trip successfully created!");
            // router.replace(`/user/${user.userName}`);
            // setStartPoint(false);
            // setDefaultMapStyle(false);
            // setNewTripData(userInitialValues);
            // setInviteFriends(false);
            // setInviteFriendsVisibility(false);
            // handleGetUser();
        } else {
            const err = await rawResponse.json();
            // console.log("backend error", err);
        }
        getTripData(TripID);
    }

    const startPointDragEnd = useCallback((event) => {
        logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
        const requestLocation = {
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        };
        async function getAndUpdateStartPoint(requestLocation) {
            const newStartPoint = await getLocationName(requestLocation);
            setStartPoint(newStartPoint);
        }
        getAndUpdateStartPoint(requestLocation);
    }, []);

    // console.log("startPoint: ", startPoint);

    async function getLocationName(location) {
        let city = "";
        let country = "";
        await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?types=place&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
        )
            .then((response) => response.json())
            .then((data) => {
                if (
                    data.features[0] &&
                    data.features[0].text &&
                    data.features[0].place_name
                ) {
                    city = data.features[0].text;
                    country = data.features[0].place_name
                        .split(",")
                        .pop()
                        .slice(1);
                }
            });
        const newPlace = {
            longitude: location.longitude,
            latitude: location.latitude,
            city: city,
            country: country,
        };
        // console.log("newPlace is fatched: ", newPlace);
        return newPlace;
    }

    return (
        // <div className="pt-[23px] h-[65vh] w-screen">
        <div
            className={
                createDiarySidebar && sidebar
                    ? "h-[100%] w-screen grid grid-cols-3 overflow-hidden "
                    : "h-[100%] w-screen overflow-hidden"
            }
        >
            {!user.userName && !tripData && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {user.userName && tripData && (
                // <div className="w-screen h-screen">
                <div
                    className={
                        createDiarySidebar && sidebar
                            ? "col-span-2 w-[100%] h-[100%] overflow-hidden relative"
                            : "w-[100%] h-[100%] overflow-hidden relative"
                    }
                >
                    <div
                        ref={geocoderContainerRef}
                        style={{
                            position: "absolute",
                            top: 6,
                            left: 6,
                            zIndex: 1,
                        }}
                    />
                    <Map
                        {...viewport}
                        mapboxAccessToken={TOKEN}
                        mapStyle={
                            tripData.mapStyle
                                ? tripData.mapStyle.link
                                : "mapbox://styles/mapbox/streets-v11"
                        }
                        onClick={(e) => active && handleClick(e)}
                        // reuseMaps
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
                        {pointArray.map(
                            (result) =>
                                result.diary !== true && (
                                    <div key={result.id}>
                                        <Marker
                                            longitude={result.longitude}
                                            latitude={result.latitude}
                                            draggable
                                            onDragEnd={(e) =>
                                                onMarkerDragEnd(e, result.id)
                                            }
                                            onClick={(e) =>
                                                (deleteClick &&
                                                    !createDiary &&
                                                    handleDeleteClick(
                                                        e,
                                                        result.id
                                                    )) ||
                                                (createDiary &&
                                                    !deleteClick &&
                                                    handleCreateDiaryClick(
                                                        e,
                                                        result
                                                    ))
                                            }
                                        >
                                            <p
                                                className={`cursor-pointer text-4xl ${
                                                    tripData
                                                        ? tripData.mapStyle
                                                              .iconColor
                                                        : "text-black"
                                                    // "text-blue-500"
                                                }`}
                                            >
                                                <GoPrimitiveDot />
                                            </p>
                                        </Marker>
                                    </div>
                                )
                        )}
                        {tripData.diary.length > 0 &&
                            tripData.diary.map((diary) => (
                                <div key={diary.id}>
                                    <Marker
                                        longitude={diary.location.longitude}
                                        latitude={diary.location.latitude}
                                        draggable={false}
                                        offset={[0, -18]}
                                    >
                                        <p
                                            className={`cursor-pointer text-4xl ${
                                                tripData
                                                    ? tripData.mapStyle
                                                          .iconColor
                                                    : "text-black"
                                                // "text-blue-500"
                                            }`}
                                            // animate-bounce
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
                        <div className="relative top-0 left-0 right-0 w-auto font-bold text-base pt-2">
                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        // setDragAndDrop(false),
                                        setDeleteClick(false),
                                        setCreateDiary(false),
                                        setActive(!active)
                                    )}
                                >
                                    Click to Add Location
                                </button>
                                {/* <span className="ml-4  my-auto">
                                    Active: {active.toString()}
                                </span> */}
                                {/* <button
                                    className="bg-blue-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        setActive(false),
                                        setDragAndDrop(!dragAndDrop)
                                    )}
                                >
                                    Drag & Drop
                                </button> */}
                                {/* <span className="ml-4 my-auto">
                                    Drag & Drop: {dragAndDrop.toString()}
                                </span> */}
                                <button
                                    className="bg-purple-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        setActive(false),
                                        // setDragAndDrop(false),
                                        setCreateDiary(false),
                                        setDeleteClick(!deleteClick)
                                    )}
                                >
                                    Delete Point
                                </button>
                                {/* <span className="ml-4 my-auto">
                                    Delete: {deleteClick.toString()}
                                </span> */}

                                <button
                                    className="bg-green-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => {
                                        setActive(false);
                                        // setDragAndDrop(false);
                                        setDeleteClick(false);
                                        setCreateDiary(true);
                                    }}
                                >
                                    Create Diary
                                </button>
                                <button
                                    className="bg-red-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => (
                                        // setNewLocation(false),
                                        setActive(false),
                                        // setDragAndDrop(false),
                                        setCreateDiary(false),
                                        setStartPoint(tripData.startPoint),
                                        dispatchPointArray({
                                            type: "clear",
                                            payload: null,
                                        })
                                    )}
                                >
                                    RESET
                                </button>
                                <button
                                    className="bg-yellow-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={(e) => saveUpdatedTrip(e)}
                                >
                                    Save Changes
                                </button>
                                {/* TripSicebar Button */}
                                {/* <button
                                    className="bg-orange-500 rounded-md py-1 px-3 ml-4 font-bold"
                                    onClick={() => {
                                        setCreateDiarySidebar(!createDiarySidebar);
                                    }}
                                >
                                    Trip Sidebar
                                </button> */}
                            </div>
                        </div>
                    </Map>
                </div>
            )}
            {createDiarySidebar && sidebar && (
                <DiaryMaskComponent className="col-span-2" />
            )}
        </div>
    );
}

export default SetTripRoute;
