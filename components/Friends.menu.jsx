import React from "react";
import FriendsList from "./Friends.list.js";
import { useState } from "react";
import { useAppData } from "../Context/DataStorage.js";

function FriendsMenu() {
    const [show, setShow] = useState("");
    const { logout } = useAppData();

    return (
        <div className="mt-6">
            <div className="flex justify-around mb-2">
                <button
                    className="bg-sky-300 rounded-full w-20 p-1"
                    onClick={() => setShow("friends")}
                >
                    Friends
                </button>
                <button
                    className="bg-fuchsia-600 rounded-full w-20 p-1"
                    onClick={() => setShow("requests")}
                >
                    Requests
                </button>
                <button
                    className="bg-amber-700 rounded-full w-20 p-1"
                    onClick={logout}
                >
                    logout
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
