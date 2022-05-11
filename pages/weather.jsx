import Head from "next/head";
import SearchBox from "../components/Weather.SearchBox.jsx";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Weather App - Next</title>
            </Head>

            <div className="home">
                <div className="container">
                    <SearchBox placeholder="Search for a city..." />
                </div>
            </div>
        </div>
    );
}
