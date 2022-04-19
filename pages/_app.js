import "../styles/globals.css";
import Styles from "../styles/navbar.css"
import { AppState } from "../Context/DataStorage.js";
import Layout from "../components/Navbar.jsx"
import Navbar from "../components/Navbar.jsx";

function MyApp({ Component, pageProps }) {
    return (
        <AppState>
            <Component {...pageProps} />
        </AppState>
    );
}

export default MyApp;
