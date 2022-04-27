import React from "react";
import FriendsList from "./Friends.list.js";
import { useState } from "react";

function FriendsMenu() {
    const [show, setShow] = useState("");
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
            </div>
            {show === "friends" ? (
                <FriendsList myFriend={true} />
            ) : show === "requests" ? (
                <FriendsList myFriend={false} />
            ) : null}
        </div>
    );
}

export default FriendsMenu;
