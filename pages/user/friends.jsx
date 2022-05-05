import React from "react";
import SearchBar from "../../components/Friends.SearchBar.jsx";
import FriendsMenu from "../../components/Friends.menu.jsx";

function friends() {
    return (
        <div className="w-[375px] lg:w-full flex flex-col justify-center">
            <SearchBar />
            <FriendsMenu />
        </div>
    );
}

export default friends;
