import { useAppData } from "../Context/DataStorage.js";
import { useState, useEffect } from "react";
import React from "react";
import Cookies from "js-cookie";

function InviteFriendToTrip() {
    const isFriend = true;

    const {
        list_Friends_FriendRequests,
        userId,
        inviteFriends,
        setInviteFriends,
        inviteFriendsVisibility,
        setInviteFriendsVisibility,
    } = useAppData();

    const [dataOfFriends_to_Array, setDataOfFriends_to_Array] = useState([]);

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

        setDataOfFriends_to_Array(fetchTheDataOfEachFriends);

        if (!inviteFriends) {
            const tempArray = [];
            fetchTheDataOfEachFriends.forEach((element) => {
                tempArray.push({
                    id: element.friendsData.user.id,
                    userName: element.friendsData.user.userName,
                    checked: false,
                });
            });
            setInviteFriends(tempArray);
        }
    }

    useEffect(() => {
        friendsData();
    }, []);

    // useEffect(() => {
    // }, [dataOfFriends_to_Array]);

    // useEffect(() => {
    // }, [inviteFriends]);

    function handleChange(position) {
        const updatedCheckedState = inviteFriends.map((item, index) => {
            const check = index === position ? !item.checked : item.checked;
            return { ...item, checked: check };
        });
        setInviteFriends(updatedCheckedState);
    }

    return (
        <div className="z-20 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 bg-slate-400 p-4">
            <div>Invite or add friends to your Trip:</div>
            <div className="grid grid-cols-3 gap-4 mt-6">
                {dataOfFriends_to_Array.map((item, index) => {
                    return (
                        <div key={item.friendsData.user.id}>
                            <input
                                type="checkbox"
                                name="participants"
                                value={item.friendsData.user.id}
                                checked={inviteFriends[index].checked}
                                onChange={() => handleChange(index)}
                                id={item.friendsData.user.id}
                            />
                            <label htmlFor={item.friendsData.user.id}>
                                {item.friendsData.user.userName}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-2 ml-2 rounded z-0"
                    onClick={() => setInviteFriendsVisibility(false)}
                >
                    Invite
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-2 mr-2 rounded z-0"
                    onClick={() => (
                        setInviteFriends(false),
                        setInviteFriendsVisibility(false)
                    )}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default InviteFriendToTrip;
