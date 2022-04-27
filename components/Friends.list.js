import { useAppData } from "../Context/DataStorage.js";
import { useState, useEffect } from "react";
import React from "react";

function FriendsList(props) {
    const { friends, user } = useAppData();
    const [test, setTest] = useState([]);
    const { myFriend } = props;

    async function friendsData() {
        const listofFriends = friends
            .filter((item) => item.status === myFriend)
            .map((friend) => {
                if (friend.sentRequest === user.id) {
                    return friend.receivedRequest;
                } else {
                    return friend.sentRequest;
                }
            });
        const friendsData = await Promise.all(
            listofFriends.map((friend) =>
                fetch(process.env.NEXT_PUBLIC_FETCH_URL_USER + `/${friend}`)
            )
        );
        const friendsDataJSON = await Promise.all(
            friendsData.map((friend) => friend.json())
        );
        setTest(friendsDataJSON);
    }

    useEffect(() => {
        friendsData();
        console.log(test);
    }, [myFriend]);
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
                    {test.length != 0 &&
                        test.map((friend) => (
                            <div className="relative" key={friend.user.id}>
                                <div className="px-2">
                                    <div className="flex h-8 w-full rounded-t-lg border-b-2 border-slate-300 bg-slate-100 pl-[90px] shadow-lg">
                                        <small className="my-auto items-center text-xs font-light tracking-tight text-slate-400">
                                            {friend.user.email}
                                        </small>
                                    </div>
                                </div>

                                <div className="flex h-12 w-full rounded-lg bg-white pl-[98px] shadow-xl">
                                    <small className="my-auto text-lg font-medium text-slate-700">
                                        {friend.user.userName}
                                    </small>
                                </div>

                                <div className="absolute top-2 left-6 h-16 w-16 rounded-full border-2 border-white shadow-md">
                                    <img
                                        className="rounded-full object-cover object-center"
                                        src="https://images.pexels.com/photos/1654748/pexels-photo-1654748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                        alt=""
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default FriendsList;
