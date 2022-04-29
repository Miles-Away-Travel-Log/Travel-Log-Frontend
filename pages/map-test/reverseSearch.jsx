import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import { useState, useEffect, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

function ClickToAdd() {
    const [newLocation, setNewLocation] = useState(false);
    const [active, setActive] = useState(false);
    const [dragAndDrop, setDragAndDrop] = useState(false);
    const [place, setPlace] = useState(false);

    async function handleClick(e) {
        await setNewLocation({
            longitude: e.lngLat.lng,
            latitude: e.lngLat.lat,
        });
        setActive(false);
        setDragAndDrop(false);
        // https://api.mapbox.com/geocoding/v5/mapbox.places/26.493637806664424,63.89114500894675.json?types=place%2Cpostcode%2Caddress&limit=1&access_token=YOUR_MAPBOX_ACCESS_TOKEN
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
                    const city = data.features[0].text;
                    const country = data.features[0].place_name
                        .split(",")
                        .pop();
                    // const address = data.features[0].place_name;
                    setPlace({
                        city: city,
                        country: country,
                        // address: address
                    });
                    // console.log(data);
                } else {
                    setPlace(false);
                    console.log(data);
                }
            });
    }

    const [events, logEvents] = useState({});

    const onMarkerDragEnd = useCallback((event) => {
        logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));

        setNewLocation({
            longitude: event.lngLat.lng,
            latitude: event.lngLat.lat,
        });
        setDragAndDrop(false);
    }, []);

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
                mapStyle="mapbox://styles/mapbox/streets-v9"
                onClick={(e) => active && handleClick(e)}
            >
                {newLocation && (
                    <div key={newLocation.longitude}>
                        <Marker
                            longitude={newLocation.longitude}
                            latitude={newLocation.latitude}
                            draggable={dragAndDrop}
                            // draggable
                            onDragEnd={(e) => dragAndDrop && onMarkerDragEnd(e)}
                            // onMouseUp={(e) => dragAndDrop && handleClick(e)}
                        >
                            <p className="cursor-pointer text-2xl animate-bounce">
                                📍
                            </p>
                        </Marker>
                    </div>
                )}
                <NavigationControl />
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
                            City: {place && place.city}
                        </span>
                        <span className="ml-4 my-auto">
                            Country: {place && place.country}
                        </span>
                        {/* <span className="ml-4 my-auto">
                            Address: {place && place.address}
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
