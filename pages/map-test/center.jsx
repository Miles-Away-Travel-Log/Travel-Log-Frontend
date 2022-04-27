import Map, { Marker, Popup } from "react-map-gl";
import { WebMercatorViewport } from "@deck.gl/core";
import { useWindowSize } from "@react-hook/window-size";
import { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { ImLocation2 } from "react-icons/im";

const testCoordinatesArray = [
    { longitude: 13.377722, latitude: 52.516272, name: "Berlin" },
    { longitude: -0.119722, latitude: 51.503333, name: "London" },
    { longitude: 2.352222, latitude: 48.856614, name: "Paris" },
    // { longitude: -73.94, latitude: 40.7127, name: "New York" },
];

// useEffect(() => {console.log(selectedLocation)}, [selectedLocation]);

const applyToArray = (func, array) => func.apply(Math, array);

const getBoundsForPoints = (points) => {
    // Calculate corner values of bounds
    const pointsLong = points.map((point) => point.longitude);
    const pointsLat = points.map((point) => point.latitude);
    const cornersLongLat = [
        [applyToArray(Math.min, pointsLong), applyToArray(Math.min, pointsLat)],
        [applyToArray(Math.max, pointsLong), applyToArray(Math.max, pointsLat)],
    ];
    const [width, height] = useWindowSize();
    console.log(width, height);

    // Use WebMercatorViewport to get center longitude/latitude and zoom
    const viewport = new WebMercatorViewport({
        // width: width,
        // height: height,
        width: 1800,
        height: 800,
    }).fitBounds(cornersLongLat, { padding: 90 }); // Can also use option: offset: [0, -100]
    const { longitude, latitude, zoom } = viewport;
    return { longitude, latitude, zoom };
};

export default function MapTestCenter() {
    const bounds = getBoundsForPoints(testCoordinatesArray);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        ...bounds,
    });

    return (
        <div className="h-screen w-screen">
            <Map
                {...viewport}
                onMove={(evt) => setViewport(evt.viewport)}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                {testCoordinatesArray.map((result) => (
                    <div key={result.longitude}>
                        <Marker
                            longitude={result.longitude}
                            latitude={result.latitude}
                            anchor="bottom"
                        >
                            <p
                                onClick={(e) => {
                                    e.stopPropagation(); // super wichtig, sonst funktioniert die Popups nicht!
                                    setSelectedLocation(result);
                                }}
                                className="cursor-pointer text-2xl animate-bounce"
                            >
                                {/* 📍 */}
                                {/* 🔻 */}
                                <ImLocation2 className="text-red-600" />
                            </p>
                        </Marker>
                        {selectedLocation.longitude === result.longitude && (
                            <div>
                                <Popup
                                    className="w-[120px]"
                                    // onClose={() => setSelectedLocation({})}
                                    // closeOnClick={true}
                                    latitude={result.latitude}
                                    longitude={result.longitude}
                                    closeButton={false}
                                    anchor="top"
                                    // onClose={() => console.log("close")}
                                >
                                    <div className="font-bold text-lg underline mb-3 text-center">
                                        {result.name}
                                    </div>
                                    <div className="text-clip mb-2">
                                        Hier steht noch mehr Text... Bla bla
                                        bla!
                                    </div>
                                    <img
                                        src="https://e6.pngbyte.com/pngpicture/138188/png-Hiking-Backpack-Clip-Art-Clip-Art-Picture-Download-Huge-backpack-clipart_thumbnail.png"
                                        alt="picture"
                                        className="w-[100px] place-content-center"
                                    />
                                </Popup>
                            </div>
                        )}
                    </div>
                ))}
            </Map>
        </div>
    );
}
