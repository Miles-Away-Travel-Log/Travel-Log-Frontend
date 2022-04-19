import MapDummy from "../../components/map-dummy.jsx";
import MapDummySelection from "../../components/map-dummy-selection.jsx";
// import "mapbox-gl/dist/mapbox-gl.css";

export default function MapTestBasic() {
    return (
        <div className="h-screen w-screen">
            <MapDummySelection />
            {/* <MapDummy /> */}
        </div>
    );
}
