import React, { useState, useRef, useCallback } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Geocoder from "../../components/Geocoder.jsx";

// eslint-disable-next-line
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

export default function SearchBar() {
    const [newLocation, setNewLocation] = useState(false);
    const [viewport, setViewState] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (newViewport) => setViewState(newViewport),
        []
    );

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 2000 };
            setNewLocation({
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
            <div
                ref={geocoderContainerRef}
                style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
            />
            <Map
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={TOKEN}
                // onViewportChange={handleViewportChange}
                onMove={(evt) => setViewState(evt.viewState)}
            >
                <Geocoder
                    mapRef={mapRef}
                    containerRef={geocoderContainerRef}
                    onViewportChange={handleGeocoderViewportChange}
                    mapboxApiAccessToken={TOKEN}
                    position="top-left"
                />
                {newLocation && (
                    <div key={newLocation.longitude}>
                        <Marker
                            longitude={newLocation.longitude}
                            latitude={newLocation.latitude}
                            // draggable={dragAndDrop}
                            draggable
                            // onDragEnd={(e) => dragAndDrop && onMarkerDragEnd(e)}
                            // onMouseUp={(e) => dragAndDrop && handleClick(e)}
                        >
                            <p className="cursor-pointer text-2xl animate-bounce">
                                📍
                            </p>
                        </Marker>
                    </div>
                )}
            </Map>
        </div>
    );
}
