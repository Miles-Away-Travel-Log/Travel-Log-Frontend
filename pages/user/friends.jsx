import React from "react";
import SearchBar from "../../components/Friends.SearchBar.jsx";

import Menu from "../../components/Friends.menu.jsx";
function friends() {
    return (
        <div className="w-[375px] flex flex-col justify-center">
            <SearchBar />
            <Menu />
        </div>
    );
}

export default friends;
