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
import { FaHome, FaWalking } from "react-icons/fa";
import { useAppData } from "../Context/DataStorage.js";
import Geocoder from "./Geocoder.jsx";
import { TailSpin } from "react-loader-spinner";
import { WebMercatorViewport } from "@deck.gl/core";
// import { useWindowSize } from "@react-hook/window-size";
// import { useRouter } from "next/router";
import { ImLocation2 } from "react-icons/im";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function ViewTripRoute({ tripData }) {
    // console.log("tripData:", tripData);
    const { user } = useAppData();
    let bounds;
    // const router = useRouter();
    const [newSearchLocation, setNewSearchLocation] = useState(false);
    const [home, setHome] = useState(false);
    const [selectedDiary, setSelectedDiary] = useState({});
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

    function setInitialCoordinates() {
        const startArray = [tripData.startPoint, ...tripData.route];
        bounds = GetBoundsForPoints(startArray);
        setViewState({ ...bounds, width: "100%", height: "100%" });
    }

    useEffect(() => {
        if (mapRef.current) {
            setWindowHeight(mapRef.current.offsetHeight);
            setWindowWidth(mapRef.current.offsetWidth);
        }
        setInitialCoordinates();
    }, []);

    useEffect(() => {
        if (
            user.home &&
            tripData.startPoint.longitude !== user.home.longitude &&
            tripData.startPoint.latitude !== user.home.latitude
        )
            setHome(user.home);
        else setHome(false);
    }, [user]);

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

    function updateRoute() {
        if (tripData.startPoint) {
            routeJSON.geometry.coordinates.push([
                tripData.startPoint.longitude,
                tripData.startPoint.latitude,
            ]);
        }
        tripData.route.forEach((item) => {
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
    }, [routeJSON]);

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
        <div className="pt-[23px] h-[65vh] w-screen">
            {!user.userName && !tripData && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {user.userName && tripData && (
                // <div className="w-screen h-screen">
                <div
                    className={
                        // tripSidebar ? "col-span-2" :
                        "w-[100%] h-[100%] mt-[-36px]"
                    }
                >
                    <div
                        ref={geocoderContainerRef}
                        style={{
                            position: "relative",
                            top: 42,
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
                        {tripData.startPoint && (
                            <Marker
                                key={tripData.startPoint.id}
                                longitude={tripData.startPoint.longitude}
                                latitude={tripData.startPoint.latitude}
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
                                            className={`cursor-pointer text-4xl 
                                            ${
                                                tripData
                                                    ? tripData.mapStyle
                                                          .iconColor
                                                    : "text-black"
                                                // "text-blue-500"
                                            }`}
                                            // animate-bounce
                                            onClick={(e) => {
                                                e.stopPropagation();        // super wichtig, sonst funktionieren die Popups nicht!
                                                setSelectedDiary(diary);
                                            }}
                                        >
                                            <ImLocation2 />
                                        </p>
                                    </Marker>
                                    {selectedDiary.location && selectedDiary.location.longitude ===
                                        diary.location.longitude && (
                                        <div>
                                            <Popup
                                                // className="w-[120px]"
                                                // onClose={() => setSelectedLocation({})}
                                                // closeOnClick={true}
                                                latitude={diary.location.latitude}
                                                longitude={diary.location.longitude}
                                                closeButton={false}
                                                anchor="top"
                                                // onClose={() => console.log("close")}
                                            >
                                                <div className="font-bold text-lg underline mb-3 text-center">
                                                    {diary.diaryName}
                                                </div>
                                                <div className="text-clip mb-2">
                                                    {diary.description}
                                                </div>
                                                {/* <img
                                                    src="https://e6.pngbyte.com/pngpicture/138188/png-Hiking-Backpack-Clip-Art-Clip-Art-Picture-Download-Huge-backpack-clipart_thumbnail.png"
                                                    alt="picture"
                                                    className="w-[100px] place-content-center"
                                                /> */}
                                            </Popup>
                                        </div>
                                    )}
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
