import "../styles/globals.css";
import Styles from "../styles/navbar.css";
import { AppState } from "../Context/DataStorage.js";
import "../styles/weather.scss";
import "../node_modules/mapbox-gl/dist/mapbox-gl.css";
import "../node_modules/react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../styles/mapbox.and.geocoder.overwrite.css";

function MyApp({ Component, pageProps }) {
    return (
        <AppState>
            <Component {...pageProps} />
        </AppState>
    );
}

export default MyApp;
