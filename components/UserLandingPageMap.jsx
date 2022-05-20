import React, { useState, useRef, useCallback, useEffect } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import { useAppData } from "../Context/DataStorage.js";
import Geocoder from "../components/Geocoder.jsx";
import { FaHome } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

function UserLandingPageMap({ dataOfOneFriend }) {
    // const { user } = useAppData();
    const [viewport, setViewState] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 12,
    });

    useEffect(() => {
        if (dataOfOneFriend.home && dataOfOneFriend.home.latitude)
            setViewState({
                ...viewport,
                latitude: dataOfOneFriend.home.latitude,
                longitude: dataOfOneFriend.home.longitude,
            });
    }, [dataOfOneFriend]);

    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewState(newViewport),
        []
    );

    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 2000 };
            const searchResult = {
                lngLat: {
                    lng: newViewport.longitude,
                    lat: newViewport.latitude,
                },
            };
            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange]
    );

    return (
        <div className="flex justify-center">
            {!dataOfOneFriend.userName && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {dataOfOneFriend.userName && (
                <div className="sm:w-[90vw] h-[50vh] w-[100vw]">
                    <div
                        ref={geocoderContainerRef}
                        style={{
                            position: "relative",
                            top: 44,
                            left: 7,
                            zIndex: 1,
                        }}
                    />
                    <Map
                        ref={mapRef}
                        {...viewport}
                        reuseMaps
                        styleDiffing={true}
                        // width="100%"
                        // height="100%"
                        mapStyle={
                            dataOfOneFriend.mapStyle
                                ? dataOfOneFriend.mapStyle.link
                                : "mapbox://styles/mapbox/streets-v9"
                        }
                        mapboxAccessToken={TOKEN}
                        // onClick={(e) => handleClick(e)}
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
                        {dataOfOneFriend.home && (
                            <div key={dataOfOneFriend.home.longitude}>
                                <Marker
                                    longitude={dataOfOneFriend.home.longitude}
                                    latitude={dataOfOneFriend.home.latitude}
                                    // draggable
                                    // onDragEnd={(e) => onMarkerDragEnd(e)}
                                >
                                    <p
                                        className={`cursor-pointer text-4xl ${
                                            dataOfOneFriend.mapStyle
                                                ? dataOfOneFriend.mapStyle.iconColor
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
            )}
        </div>
    );
}

export default UserLandingPageMap;
