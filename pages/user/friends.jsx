import React from "react";
import SearchBar from "../../components/Friends.SearchBar.jsx";
import FriendsMenu from "../../components/Friends.menu.jsx";
import Navbar from "../../components/Navbar.jsx";

function friends() {
    return (
        <div className="flex flex-col justify-center content-center">
            <SearchBar />
            <FriendsMenu />
            <div className="absolute bottom-0 mt-10">
                <Navbar />
            </div>
        </div>
    );
}

export default friends;
