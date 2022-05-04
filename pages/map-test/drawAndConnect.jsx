import Map, {
    Marker,
    Popup,
    NavigationControl,
    Source,
    Layer,
} from "react-map-gl";
import { useState, useEffect, useCallback, useReducer, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function ClickToAdd() {
    const [newLocation, setNewLocation] = useState(false);
    const [active, setActive] = useState(false);
    const [dragAndDrop, setDragAndDrop] = useState(false);
    const [deleteClick, setDeleteClick] = useState(false);
    const mapRef = useRef();

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

        // setNewLocation({
        //     longitude: event.lngLat.lng,
        //     latitude: event.lngLat.lat,
        // });
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

    function handleDeleteClick(e, id) {
        dispatchPointArray({
            type: "remove",
            payload: id,
        });
        console.log("Delete point: ", id);
        setDeleteClick(false);
    }

    const route = {
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

            case "clear":
                return [];
                break;

            // case "restore":
            //     return [...action.data]
            //     break;

            default:
                return originalArray;
                break;
        }
    };

    const [pointArray, dispatchPointArray] = useReducer(pointArrayReducer, []);

    function updateRoute() {
        // route = Object.assign({}, route)
        // route.geometry.coordinates = [];
        pointArray.forEach((item) => {
            route.geometry.coordinates.push([item.longitude, item.latitude]);
        });
        mapRef.current &&
            mapRef.current.getSource("polylineLayer").setData(route);
    }

    useEffect(() => {
        updateRoute();
        console.log("Route: ", route.geometry.coordinates);
        console.log("pointArray: ", pointArray);
        // }, [pointArray]);
    }, [route]);
    // }, [active]);

    // useEffect(() => {}, [pointArray]);

    return (
        <div className="h-screen w-screen">
            <Map
                initialViewState={{
                    longitude: 12.3730747,
                    latitude: 51.3396955,
                    zoom: 12,
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onClick={(e) => active && handleClick(e)}
                reuseMaps
                ref={mapRef}
            >
                {pointArray.map((result) => (
                    <div key={result.id}>
                        <Marker
                            longitude={result.longitude}
                            latitude={result.latitude}
                            draggable={dragAndDrop}
                            // draggable
                            onDragEnd={(e) =>
                                dragAndDrop && onMarkerDragEnd(e, result.id)
                            }
                            onClick={(e) =>
                                deleteClick && handleDeleteClick(e, result.id)
                            }
                            // onMouseUp={(e) => dragAndDrop && handleClick(e)}
                        >
                            <p className="cursor-pointer text-2xl">📍</p>
                        </Marker>
                    </div>
                ))}
                <Source id="polylineLayer" type="geojson" data={route}>
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
                <NavigationControl />
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
                            Longitude: {newLocation && newLocation.longitude}
                        </span>
                        <span className="ml-4 my-auto">
                            Latitude: {newLocation && newLocation.latitude}
                        </span> */}
                        <button
                            className="bg-blue-500 rounded-md py-1 px-3 ml-4 font-bold"
                            onClick={() => (
                                setActive(false), setDragAndDrop(!dragAndDrop)
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
                                setNewLocation(false),
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
    );
}

export default ClickToAdd;
