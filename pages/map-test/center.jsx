import MapDummy from "../../components/map-dummy.jsx";
import getCenterOfBounds from "geolib/es/getCenter";
import Map, { Marker, Popup } from "react-map-gl";
import { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

const testCoordinatesArray = [
    { longitude: 13.377722, latitude: 52.516272, name: "Berlin" },
    { longitude: -0.119722, latitude: 51.503333, name: "London" },
    { longitude: 2.352222, latitude: 48.856614, name: "Paris" },
    { longitude: -73.94, latitude: 40.7127,name: "New York" },
];

export default function MapTestCenter() {
    const [selectedLocation, setSelectedLocation] = useState({});

    const center = getCenterOfBounds(testCoordinatesArray);

    // useEffect(() => {console.log(selectedLocation)}, [selectedLocation]);

    return (
        <div className="h-screen w-screen">
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
                {/* {console.log(center)} */}
                {testCoordinatesArray.map((result) => (
                    <div key={result.longitude}>
                        <Marker
                            longitude={result.longitude}
                            latitude={result.latitude}
                            // offsetLeft={-20}
                            // offsetTop={-5}
                            anchor="bottom"
                        >
                            <p
                                onClick={(e) => {
                                    e.stopPropagation();            // super wichtig, sonst funktioniert die Popups nicht
                                    setSelectedLocation(result)
                                }}
                                className="cursor-pointer text-2xl animate-bounce"
                            >
                                {/* 📍 */}
                                🔻
                            </p>
                        </Marker>
                        {selectedLocation.longitude === result.longitude && (
                            <div>
                                <Popup
                                    // onClose={() => setSelectedLocation({})}
                                    // closeOnClick={true}
                                    latitude={result.latitude}
                                    longitude={result.longitude}
                                    // onClose={() => console.log("close")}
                                >
                                    {result.name}
                                </Popup>
                            </div>
                        )}
                    </div>
                ))}
            </Map>
        </div>
    );
}
