import { useAppData } from "../Context/DataStorage.js";
import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";

function FriendsList(props) {
    const { list_Friends_FriendRequests, user, handleGetUser, userId } =
        useAppData();
    const [
        dataOfFriends_or_dataOfRequest_to_Array,
        setDataOfFriends_or_dataOfRequest_to_Array,
    ] = useState([]);

    const { myFriend } = props;

    // This function will filter the friends list from user.
    // If the status of a friend is false, then it is a request to be a friend. Output will be an Array of Objects.
    // If the status of a friend is true, then it is a friend. Output will be an Array of Objects.
    // Then it will check if the user is the sender or receiver of the request. Output will be an Array of all users who send or receive a request.
    async function friendsData() {
        const listOfFriendsID_or_listOfFriendRequestsID =
            list_Friends_FriendRequests
                .filter((item) => item.status === myFriend)
                .map((friend) => {
                    if (friend.sentRequest === user.id) {
                        return friend.receivedRequest;
                    } else {
                        return friend.sentRequest;
                    }
                });
        const allDataOfFriends_or_allDataOfFriendRequest = await Promise.all(
            listOfFriendsID_or_listOfFriendRequestsID.map((friend) =>
                fetch(process.env.NEXT_PUBLIC_FETCH_URL_USER + `/${friend}`)
            )
        );
        const friendsDataJSON_or_requestsDataJSON = await Promise.all(
            allDataOfFriends_or_allDataOfFriendRequest.map((friend) =>
                friend.json()
            )
        );
        setDataOfFriends_or_dataOfRequest_to_Array(
            friendsDataJSON_or_requestsDataJSON
        );
    }

    useEffect(() => {
        friendsData();
    }, [myFriend]);

    useEffect(() => {
        friendsData();
    }, [user]);

    async function acceptRequest(id) {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_FRIEND + `/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                    body: JSON.stringify({
                        status: true,
                    }),
                }
            );
            if (response.status === 200) {
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function rejectRequest(id) {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_FRIEND + `/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            if (response.status === 200) {
                console.log("deleted");
                handleGetUser();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-screen bg-slate-800">
            <div className="container mx-auto max-w-5xl">
                {/* <!-- title --> */}
                <div className="pt-12 pb-6 mx-auto space-y-2 px-4">
                    <h3 className="text-center text-3xl font-medium text-white">
                        {myFriend === true ? "My Friends" : "My Requests"}
                    </h3>
                </div>
                {/* <!-- Container --> */}
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-12">
                    {dataOfFriends_or_dataOfRequest_to_Array.length != 0 &&
                        dataOfFriends_or_dataOfRequest_to_Array.map(
                            (friend) => (
                                <div
                                    className="relative flex flex-col mb-4"
                                    key={friend.user.id}
                                >
                                    <div className="px-2">
                                        <div className="flex h-8 w-full rounded-t-lg border-b-2 border-slate-300 bg-slate-100 shadow-lg">
                                            {myFriend === false ? (
                                                <div className="flex justify-around pl-[70px] w-full">
                                                    {friend.user.friends[0]
                                                        .sentRequest !==
                                                    userId ? (
                                                        <button
                                                            className="bg-green-500 rounded-full w-16 text-sm mt-1 mb-1"
                                                            onClick={() => {
                                                                acceptRequest(
                                                                    friend.user
                                                                        .friends[0]
                                                                        ._id
                                                                );
                                                            }}
                                                        >
                                                            accept
                                                        </button>
                                                    ) : null}
                                                    <button
                                                        className={
                                                            friend.user
                                                                .friends[0]
                                                                .sentRequest !==
                                                            userId
                                                                ? "bg-orange-500 rounded-full w-16 text-sm mt-1 mb-1"
                                                                : "bg-orange-500 rounded-full w-16 text-sm mt-1 mb-1 ml-[120px]"
                                                        }
                                                        onClick={() => {
                                                            rejectRequest(
                                                                friend.user
                                                                    .friends[0]
                                                                    ._id
                                                            );
                                                        }}
                                                    >
                                                        reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex justify-around w-full ml-[75px]">
                                                    <small className="my-auto items-center text-xs font-light tracking-tight text-slate-400">
                                                        {friend.user.email}
                                                    </small>
                                                    <button
                                                        className="bg-rose-600 rounded-full w-16 text-sm mt-1 mb-1"
                                                        onClick={() => {
                                                            rejectRequest(
                                                                friend.user
                                                                    .friends[0]
                                                                    ._id
                                                            );
                                                        }}
                                                    >
                                                        delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex h-12 w-full rounded-lg bg-white pl-[98px] shadow-xl">
                                        <small className="my-auto text-lg font-medium text-slate-700">
                                            {friend.user.userName}
                                        </small>
                                    </div>

                                    <div className="absolute top-2 left-6 h-16 w-16 rounded-full border-2 border-white shadow-md">
                                        {friend.user.avatar ? (
                                            <img
                                                className="rounded-full object-cover object-center"
                                                src={friend.user.avatar}
                                                alt=""
                                            />
                                        ) : (
                                            <img
                                                className="rounded-full object-cover object-center"
                                                src="https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                                alt=""
                                            />
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                </div>
            </div>
        </div>
    );
}

export default FriendsList;
