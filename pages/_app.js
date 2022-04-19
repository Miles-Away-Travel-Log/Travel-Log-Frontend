import "../styles/globals.css";
import Styles from "../styles/navbar.css"
import { AppState } from "../Context/DataStorage.js";
import Layout from "../Components/Navbar.jsx"
import Navbar from "../Components/Navbar.jsx";

function MyApp({ Component, pageProps }) {
    return (
        <AppState>
            <Component {...pageProps} />
        </AppState>
    );
}

export default MyApp;
