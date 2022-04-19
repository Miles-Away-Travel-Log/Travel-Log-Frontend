import MapDummy from "../../components/map-dummy.jsx";
import getCenter from "geolib/es/getCenter";
import Map, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapTestCenter() {
    const [selectedLocation, setSelectedLocation] = useState({});

    const testCoordinatesArray = [
        { longitude: 13.377722, latitude: 52.516272, name: "Berlin" },
        { longitude: -0.119722, latitude: 51.503333, name: "London" },
        { longitude: 2.352222, latitude: 48.856614, name: "Paris" },
    ];

    const center = getCenter(testCoordinatesArray);

    return (
        <div className="h-screen w-screen">
            {console.log(center)}
            <Map
                initialViewState={{
                    longitude: center.longitude,
                    latitude: center.latitude,
                    zoom: 5,
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {/* {console.log(testCoordinatesArray)} */}
                {console.log(testCoordinatesArray)}
                {console.log(center)}
                {testCoordinatesArray.map((results) => (
                    <div key={results.longitude}>
                        <Marker
                            longitude={results.longitude}
                            latitude={results.latitude}
                            // offsetLeft={-20}
                            // offsetTop={-10}
                            anchor="bottom"
                        >
                            <p
                                onClick={() => setSelectedLocation(results)}
                                className="cursor-pointer text-2xl animate-bounce"
                            >
                                📍
                            </p>
                        </Marker>
                    </div>
                ))}
            </Map>
        </div>
    );
}
