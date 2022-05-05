import "../styles/globals.css";
import Styles from "../styles/navbar.css";
import { AppState } from "../Context/DataStorage.js";

function MyApp({ Component, pageProps }) {
    return (
        <AppState>
            <Component {...pageProps} />
        </AppState>
    );
}

export default MyApp;
