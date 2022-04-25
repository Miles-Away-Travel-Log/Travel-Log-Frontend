import "../styles/globals.css";
import Styles from "../styles/navbar.css";
import { AppState } from "../Context/DataStorage.js";
import Layout from "../components/Navbar.jsx";
import Navbar from "../components/Navbar.jsx";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
    /*     const router = useRouter();
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            router.replace("/");
        }
    }, []); */
    return (
        <AppState>
            <Component {...pageProps} />
        </AppState>
    );
}

export default MyApp;
