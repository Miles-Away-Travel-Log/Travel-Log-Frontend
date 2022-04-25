import getCenterOfBounds from "geolib/es/getCenter";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { useState, useEffect, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
// import {MarkerDragEvent, LngLat} from 'react-map-gl';
// import * from "dotenv"

function ClickToAdd() {
    const [newLocation, setNewLocation] = useState(false);
    const [active, setActive] = useState(false);
    const [dragAndDrop, setDragAndDrop] = useState(false);

    function handleClick(e) {
        setNewLocation({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
        });
        // console.log(e);
        setActive(false);
        setDragAndDrop(false);
    }

    //   const [events, logEvents] = useState<Record<string, LngLat>>({});

    //   const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    //      logEvents(_events => ({..._events, onDragStart: event.lngLat}));
    //   }, []);

    //   const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    //      logEvents(_events => ({..._events, onDrag: event.lngLat}));

    //      setNewLocation({
    //          longitude: event.lngLat.lng,
    //          latitude: event.lngLat.lat
    //      });
    //   }, []);

    //   const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    //      logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
    //   }, []);

    useEffect(() => {}, [newLocation]);

    return (
        <div className="h-screen w-screen">
            <Map
                initialViewState={{
                    longitude: 12.3730747,
                    latitude: 51.3396955,
                    zoom: 12,
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                // mapboxApiAccessToken={API_Key}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onClick={(e) => active && handleClick(e)}
            >
                {newLocation && (
                    <div key={newLocation.longitude}>
                        <Marker
                            longitude={newLocation.longitude}
                            latitude={newLocation.latitude}
                            draggable={dragAndDrop}
                            // onMouseUp={(e) => dragAndDrop && handleClick(e)}
                        >
                            <p className="cursor-pointer text-2xl animate-bounce">
                                📍
                            </p>
                        </Marker>
                    </div>
                )}
                <div className="absolute top-0 left-0 right-0 w-auto font-bold text-base">
                    <div className="bg-gray-500/[.65] flex justify-center">
                        <button
                            className="bg-slate-500 rounded-md py-1 px-3 font-bold"
                            onClick={() => (
                                setDragAndDrop(false), setActive(!active)
                            )}
                        >
                            Click to Add Location
                        </button>
                        <span className="ml-4  my-auto">
                            Active: {active.toString()}
                        </span>
                        <span className="ml-4 my-auto">
                            Longitude: {newLocation && newLocation.longitude}
                        </span>
                        <span className="ml-4 my-auto">
                            Latitude: {newLocation && newLocation.latitude}
                        </span>
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
                            className="bg-red-500 rounded-md py-1 px-3 ml-4 font-bold"
                            onClick={() => (
                                setNewLocation(false),
                                setActive(false),
                                setDragAndDrop(false)
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
