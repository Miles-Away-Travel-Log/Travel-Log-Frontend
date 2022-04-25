// import getCenterOfBounds from "geolib/es/getCenter";
import Map, { Marker, Popup } from "react-map-gl";
import { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { ImLocation2 } from "react-icons/im";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

function SearchBar() {
    const [selectedLocation, setSelectedLocation] = useState(false);

    const [viewport, setViewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
    });
    const [searchResultLayer, setSearchResultsLayer] = useState(null);
    const mapRef = useRef();

    const handleViewportChange = (newViewport) => {
        setViewport({ ...viewport, ...newViewport });
    };

    // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
    const handleGeocoderViewportChange = (viewport) => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };

        return handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides,
        });
    };

    const handleOnResult = (event) => {
        console.log(event.result);
        setSearchResultsLayer(
            new GeoJsonLayer({
                id: "search-result",
                data: event.result.geometry,
                getFillColor: [255, 0, 0, 128],
                getRadius: 1000,
                pointRadiusMinPixels: 10,
                pointRadiusMaxPixels: 10,
            })
        );
    };

    console.log(viewport);

    return (
        <div className="grid grid-cols-3 h-screen w-screen">
            <div className="col-span-1 bg-green-400"></div>
            <div className="col-span-2">
                <Map
                    // initialViewState={{
                    //     longitude: 12.3730747,
                    //     latitude: 51.3396955,
                    //     zoom: 12,
                    // }}
                    ref={mapRef}
                    {...viewport}
                    onViewportChange={handleViewportChange}
                    mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                    // style={{ width: "100%", height: "100%" }}
                    // style={{ width: "auto", height: "100%" }}
                    // mapStyle={mapLayoutTest}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Geocoder
                        mapRef={mapRef}
                        onResult={handleOnResult}
                        onViewportChange={handleGeocoderViewportChange}
                        mapboxApiAccessToken={
                            process.env.NEXT_PUBLIC_MAPBOX_API_KEY
                        }
                        position="top-left"
                    />
                    {/* {selectedLocation && (
                        <div key={selectedLocation.longitude}>
                            <Marker
                                longitude={selectedLocation.longitude}
                                latitude={selectedLocation.latitude}
                                // draggable={dragAndDrop}
                                // onMouseUp={(e) => dragAndDrop && handleClick(e)}
                            >
                                <p className="cursor-pointer text-2xl animate-bounce">
                                    📍
                                </p>
                            </Marker>
                        </div>
                    )} */}
                    <DeckGL {...viewport} layers={[searchResultLayer]} />
                </Map>
            </div>
        </div>
    );
}

export default SearchBar;
