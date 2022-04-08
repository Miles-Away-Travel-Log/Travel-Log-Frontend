import * as React from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { useAppData } from "../Context/DataStorage.js";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";

export default function MapDummy() {
    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-68.13734351262877, 45.137451890638886],
        zoom: 5,
    });

    const { mapLayoutTest, mapMarkerTest } = useAppData();
    useEffect(() => {
        map.setStyle(mapLayoutTest);
    }, [mapLayoutTest]);

    // useEffect(() => {
    // }, [mapMarkerTest]);

    return (
        <Map
            initialViewState={{
                longitude: 12.3730747,
                latitude: 51.3396955,
                zoom: 12,
            }}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
            // style={{ width: "100%", height: "100%" }}
            // style={{ width: "auto", height: "100%" }}
            // mapStyle={mapLayoutTest}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {mapMarkerTest.map((results) =>
                !results.visible ? null : (
                    <div key={results.coordinates.longitude}>
                        <Marker
                            longitude={results.coordinates.longitude}
                            latitude={results.coordinates.latitude}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p className="cursor-pointer text-2xl animated-bounce">
                                📍
                            </p>
                        </Marker>
                    </div>
                )
            )}
        </Map>
    );
}
