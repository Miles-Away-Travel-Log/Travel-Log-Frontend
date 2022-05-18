import React, { useState, useRef, useCallback, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { useAppData } from "../../Context/DataStorage.js";
import Geocoder from "../../components/Geocoder.jsx";
import SetMapStyle from "../../components/SetTripMapStyle.jsx";
import mapStyleList from "../../components/MapStyleList.jsx";
import { FaHome, FaWalking } from "react-icons/fa";
import Navbar from "../../components/Navbar.jsx";
import { TailSpin } from "react-loader-spinner";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function SetHome() {
    const { user, defaultMapStyle, startPoint, setStartPoint } = useAppData();
    const [viewport, setViewState] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
    });

    useEffect(() => {
        if (startPoint) {
            setViewState({
                ...viewport,
                latitude: startPoint.latitude,
                longitude: startPoint.longitude,
            });
        } else if (user.home && user.home.latitude !== NaN)
            setViewState({
                ...viewport,
                latitude: user.home.latitude,
                longitude: user.home.longitude,
            });
    }, []);

    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewState(newViewport),
        []
    );
    const [mapStyle, setMapStyle] = useState(false);
    const [place, setPlace] = useState(false);

    useEffect(() => {
        setMapStyle(
            mapStyleList.find((style) => style.link === defaultMapStyle.link)
        );
    }, []);

    useEffect(() => {
        setMapStyle(
            mapStyleList.find((style) => style.link === defaultMapStyle.link)
        );
    }, [defaultMapStyle]);

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 2000 };
            setStartPoint({
                longitude: newViewport.longitude,
                latitude: newViewport.latitude,
            });
            const searchResult = {
                lngLat: {
                    lng: newViewport.longitude,
                    lat: newViewport.latitude,
                },
            };
            handleClick(searchResult);
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    const [events, logEvents] = useState({});

    const onMarkerDragEnd = useCallback((event) => {
        logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
        if (event.lngLat.lng === NaN || event.lngLat.lat === NaN) return;
        else {
            setStartPoint({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
            });
            handleClick(event);
        }
    }, []);

    async function handleClick(e) {
        await setStartPoint({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
        });
        let city = "";
        let country = "";
        await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.lngLat.lng},${e.lngLat.lat}.json?types=place&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY}`
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
                    setPlace({
                        city: city,
                        country: country,
                    });
                } else {
                    setPlace(false);
                }
            });
        const target = {
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
            city: city,
            country: country,
        };
        await setStartPoint(target);
    }

    return (
        <div className="h-screen w-screen">
            {!user.userName && !defaultMapStyle.link && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {user.userName && defaultMapStyle.link && (
                <div className="h-screen w-screen grid grid-cols-5">
                    <SetMapStyle />
                    <div className="col-span-3">
                        <div
                            ref={geocoderContainerRef}
                            style={{
                                position: "absolute",
                                top: 20,
                                left: "41vw",
                                zIndex: 1,
                            }}
                        />
                        <Map
                            ref={mapRef}
                            {...viewport}
                            reuseMaps
                            styleDiffing={true}
                            width="100%"
                            height="100%"
                            mapStyle={
                                defaultMapStyle
                                    ? defaultMapStyle.link
                                    : user.mapStyle.link
                            }
                            mapboxAccessToken={TOKEN}
                            onClick={(e) => handleClick(e)}
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
                            {startPoint && (
                                <div
                                    key={startPoint.longitude
                                        .toString()
                                        .concat(startPoint.latitude.toString())}
                                >
                                    <Marker
                                        longitude={startPoint.longitude}
                                        latitude={startPoint.latitude}
                                        draggable
                                        onDragEnd={(e) => onMarkerDragEnd(e)}
                                    >
                                        <p
                                            className={`cursor-pointer text-4xl ${
                                                mapStyle
                                                    ? mapStyle.iconColor
                                                    : "text-black"
                                            }`}
                                        >
                                            <FaWalking />
                                        </p>
                                    </Marker>
                                </div>
                            )}
                            {user.home && (
                                <div
                                    key={user.home.longitude
                                        .toString()
                                        .concat(user.home.latitude.toString())}
                                >
                                    <Marker
                                        longitude={user.home.longitude}
                                        latitude={user.home.latitude}
                                    >
                                        <p
                                            className={`text-4xl ${
                                                mapStyle
                                                    ? mapStyle.iconColor
                                                    : "text-black"
                                            }`}
                                        >
                                            <FaHome />
                                        </p>
                                    </Marker>
                                </div>
                            )}
                        </Map>
                    </div>
                    {/* <Navbar/> */}
                </div>
            )}
        </div>
    );
}

export default SetHome;
