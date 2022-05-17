import { useAppData } from "../Context/DataStorage.js";
import { useState, useEffect, useMemo } from "react";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function FriendsList(props) {
    const { isFriend } = props;
    const router = useRouter();

    const { list_Friends_FriendRequests, handleGetUser, userId, user } =
        useAppData();

    const [
        dataOfFriends_or_dataOfRequest_to_Array,
        setDataOfFriends_or_dataOfRequest_to_Array,
    ] = useState([]);

    async function friendsData() {
        const listOfFriendsOrRequests = list_Friends_FriendRequests.filter(
            (item) => item.status === isFriend
        );

        const fetchTheDataOfEachFriends = await Promise.all(
            listOfFriendsOrRequests.map(async (item) => {
                let senderOrReceiver;

                if (item.sentRequest === userId) {
                    senderOrReceiver = item.receivedRequest;
                } else {
                    senderOrReceiver = item.sentRequest;
                }
                const header = {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                };
                const fetchFriend = await fetch(
                    process.env.NEXT_PUBLIC_FETCH_URL_USER +
                        `${senderOrReceiver}`,
                    {
                        method: "GET",
                        headers: header,
                    }
                );
                const toJson = await fetchFriend.json();

                return { isFriend, request: item, friendsData: toJson };
            })
        );

        setDataOfFriends_or_dataOfRequest_to_Array(fetchTheDataOfEachFriends);
    }

    useEffect(() => {
        friendsData();
    }, [isFriend]);

    useEffect(() => {
        friendsData();
    }, [user]);

    async function acceptRequest(id) {
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_FRIEND + `${id}`,
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
                process.env.NEXT_PUBLIC_FETCH_URL_FRIEND + `${id}`,
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

    function handleOpenFriendPage(id) {
        router.replace(`/user/${id}`);
    }

    return (
        <div className="h-screen bg-[#C4C4C4] text-white">
            <div className="mx-auto max-w-6xl">
                {/* <!-- title --> */}
                <div className="pt-12 pb-6 mx-auto space-y-2 px-4">
                    <h3 className="text-center text-3xl font-medium text-white">
                        {isFriend === true ? "My Friends" : "My Requests"}
                    </h3>
                </div>
                {/* <!-- Container --> */}
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 p-12">
                    {dataOfFriends_or_dataOfRequest_to_Array.length !== 0 &&
                        dataOfFriends_or_dataOfRequest_to_Array.map(
                            (friend) => (
                                <div
                                    className="relative flex flex-col mb-4"
                                    key={friend.request._id}
                                >
                                    <div className="px-2">
                                        <div className="flex h-8 w-full rounded-t-lg border-b-2 border-slate-300 bg-slate-100 shadow-lg">
                                            {isFriend === false ? (
                                                <div className="flex justify-around pl-[70px] w-full">
                                                    {friend.request
                                                        .sentRequest !==
                                                    userId ? (
                                                        <button
                                                            className="bg-green-500 rounded-full w-16 text-sm mt-1 mb-1"
                                                            onClick={() => {
                                                                acceptRequest(
                                                                    friend
                                                                        .request
                                                                        ._id
                                                                );
                                                            }}
                                                        >
                                                            accept
                                                        </button>
                                                    ) : null}
                                                    <button
                                                        className={
                                                            friend.request
                                                                .sentRequest !==
                                                            userId
                                                                ? "bg-orange-500 rounded-full w-16 text-sm mt-1 mb-1"
                                                                : "bg-orange-500 rounded-full w-16 text-sm mt-1 mb-1 ml-[120px]"
                                                        }
                                                        onClick={() => {
                                                            rejectRequest(
                                                                friend.request
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
                                                        {
                                                            friend.friendsData
                                                                .user.email
                                                        }
                                                    </small>
                                                    <button
                                                        className="bg-rose-600 rounded-full w-16 text-sm mt-1 mb-1"
                                                        onClick={() => {
                                                            rejectRequest(
                                                                friend.request
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

                                    <div
                                        className="flex h-12 w-full rounded-lg bg-white pl-[98px] shadow-xl"
                                        onClick={() =>
                                            handleOpenFriendPage(
                                                friend.friendsData.user.userName
                                            )
                                        }
                                    >
                                        <small className="my-auto text-lg font-medium text-slate-700">
                                            {friend.friendsData.user.userName}
                                        </small>
                                    </div>

                                    <div className="absolute top-2 left-6 h-16 w-16 rounded-full border-2 border-white shadow-md">
                                        {friend.friendsData.user.avatar ? (
                                            <img
                                                className="rounded-full object-cover w-16 h-16 object-center"
                                                src={
                                                    friend.friendsData.user
                                                        .avatar
                                                }
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
