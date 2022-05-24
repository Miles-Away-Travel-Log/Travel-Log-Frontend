import React from "react";
import FriendsList from "./Friends.list.jsx";
import { useState } from "react";
import { useAppData } from "../Context/DataStorage.js";

function FriendsMenu() {
    const [show, setShow] = useState("");

    return (
        <div className="mt-6">
            <div className="flex justify-around mb-2 text-white">
                <button
                    className="bg-[#90A5A9] rounded-full w-20 p-1"
                    onClick={() => setShow("friends")}
                >
                    Friends
                </button>
                <button
                    className="bg-[#90A5A9] rounded-full w-20 p-1"
                    onClick={() => setShow("requests")}
                >
                    Requests
                </button>
            </div>
            {show === "friends" ? (
                <FriendsList isFriend={true} />
            ) : show === "requests" ? (
                <FriendsList isFriend={false} />
            ) : null}
        </div>
    );
}

export default FriendsMenu;
