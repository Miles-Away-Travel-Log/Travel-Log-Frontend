import * as React from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import { useAppData } from "../../Context/DataStorage.js";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect } from "react";
import MapDummySelection from "../../components/map-dummy-selection.jsx";

export default function MapDummy() {
    const { mapLayoutTest, mapMarkerTest } = useAppData();

    // useEffect(() => {
    //     map.setStyle(mapLayoutTest);
    // }, [mapLayoutTest]);

    // useEffect(() => {
    // }, [mapMarkerTest]);

    const dataOne = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: [
                [12.372418865370589, 51.3233680719318],
                [12.401449243834573, 51.33907051907917],
                [12.370997422085791, 51.348486599994935],
            ],
        },
    };

    return (
        <div className="h-screen w-screen">
            <Map
                initialViewState={{
                    longitude: 12.3730747,
                    latitude: 51.3396955,
                    zoom: 12,
                }}
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
                mapStyle={mapLayoutTest}
                styleDiffing={true}
                reuseMaps
            >
                {mapMarkerTest.map((results) =>
                    !results.visible ? null : (
                        <div key={results.coordinates.longitude}>
                            <Marker
                                longitude={results.coordinates.longitude}
                                latitude={results.coordinates.latitude}
                                // offsetLeft={-20}
                                // offsetTop={-10}
                            >
                                <p className="cursor-pointer text-2xl animate-bounce">
                                    📍
                                </p>
                            </Marker>
                        </div>
                    )
                )}
                <Source id="polylineLayer" type="geojson" data={dataOne}>
                    <Layer
                        id="lineLayer"
                        type="line"
                        source="my-data"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round",
                        }}
                        paint={{
                            "line-color": "rgba(3, 170, 238, 0.5)",
                            "line-width": 3,
                        }}
                    />
                </Source>
                <MapDummySelection />
            </Map>
        </div>
    );
}
