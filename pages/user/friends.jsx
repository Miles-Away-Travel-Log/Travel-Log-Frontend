import React from "react";
import SearchBar from "../../components/Friends.SearchBar.jsx";
import Navbar from "../../components/Navbar.jsx";

import Menu from "../../components/Friends.menu.jsx";
function friends() {
    return (
        <div className="flex flex-col justify-center content-center">
            <SearchBar />
            <Menu />
            <div className="absolute bottom-0 mt-10">
                <Navbar />
            </div>
        </div>
    );
}

export default friends;
