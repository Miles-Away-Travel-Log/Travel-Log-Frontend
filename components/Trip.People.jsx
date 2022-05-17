import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function TripPeople({ tripPeople }) {
    const [participants, setParticipants] = useState([]);

    async function friendsData() {
        const fetchTheDataOfEachFriends = await Promise.all(
            tripPeople.map(async (item) => {
                const header = {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                };
                const fetchFriend = await fetch(
                    process.env.NEXT_PUBLIC_FETCH_URL_USER + `${item}`,
                    {
                        method: "GET",
                        headers: header,
                    }
                );
                const toJson = await fetchFriend.json();
                return toJson;
            })
        );

        setParticipants(fetchTheDataOfEachFriends);
    }

    useEffect(() => {
        friendsData();
    }, []);

    return (
        <div className="w-screen h-screen p-12">
            <div className="mx-auto max-w-6xl space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-3 ">
                {participants.length !== 0 &&
                    participants.map((friend) => (
                        <div
                            className="relative flex flex-col mb-4"
                            key={friend.user._id}
                        >
                            <div className="px-2">
                                <div className="flex h-8 w-full rounded-t-lg border-b-2 border-slate-300 bg-slate-100 shadow-lg">
                                    <div className="flex justify-around w-full ml-[75px]">
                                        <small className="my-auto items-center text-xs font-light tracking-tight text-slate-400">
                                            {friend.user.email}
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div className="flex h-12 w-full rounded-lg bg-slate-100 pl-[98px] shadow-xl">
                                <small className="my-auto text-lg font-medium text-slate-700">
                                    {friend.user.userName}
                                </small>
                            </div>

                            <div className="absolute top-2 left-6 h-16 w-16 rounded-full border-2 border-white shadow-md">
                                {friend.user.avatar ? (
                                    <img
                                        className="rounded-full object-cover w-16 h-16 object-center"
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
                    ))}
            </div>
        </div>
    );
}

export default TripPeople;
