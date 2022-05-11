import React, { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { useAppData } from "../../Context/DataStorage.js";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import InviteFriendToTrip from "../../components/InviteFriendToTrip.jsx";

export default function NewTrip() {
    const router = useRouter();
    const {
        datePickerVisibility,
        setDatePickerVisibility,
        defaultMapStyle,
        setDefaultMapStyle,
        user,
        newTripData,
        setNewTripData,
        startPoint,
        setStartPoint,
        handleGetUser,
        inviteFriends,
        setInviteFriends,
        inviteFriendsVisibility,
        setInviteFriendsVisibility,
    } = useAppData();

    // Fehlt noch:
    // Freunde adden > Anfrage muss noch bestättigt werden, nicht als Zwang.
    // Validierung im Frontend? (Text unter den Eingabe-Feldern oder Alert-Messages?) > für tripName, tripDescription, tripStartDate + tripEndDate (kann beides identisch sein)

    const userInitialValues = {
        tripName: "",
        tripType: "",
        description: "",
        startDate: "",
        endDate: "",
        mapStyle: user.mapStyle,
        startPoint: user.home,
        visible: "private",
    };

    useEffect(() => {
        newTripData
            ? setNewTripData({ ...userInitialValues, ...newTripData })
            : setNewTripData(userInitialValues);
    }, []);

    useEffect(() => {}, [newTripData]);

    function handleMapStyleSubmit(event) {
        event.preventDefault();
        defaultMapStyle ? defaultMapStyle : setDefaultMapStyle(user.mapStyle);
        setNewTripData({
            ...newTripData,
            mapStyle: defaultMapStyle,
            startPoint: startPoint,
        });
        router.replace("/user/setTripOptions");
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setNewTripData({ ...newTripData, [name]: value });
    }

    async function saveTrip(event) {
        event.preventDefault();
        const start = startPoint ? startPoint : user.home;
        const mapStyle = defaultMapStyle ? defaultMapStyle : user.mapStyle;
        const inviteFriendsArray = inviteFriends
            ? inviteFriends
                  .filter((item) => item.checked)
                  .map((item) => item.id)
            : false;
        const participants = inviteFriendsArray
            ? [user.id, ...inviteFriendsArray]
            : [user.id];

        const rawResponse = await fetch(process.env.NEXT_PUBLIC_FETCH_TRIP, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
                tripName: newTripData.tripName,
                tripType: newTripData.tripType,
                description: newTripData.description,
                startDate: newTripData.startDate,
                endDate: newTripData.endDate,
                mapStyle: mapStyle,
                startPoint: start,
                participants: participants,
                visible: newTripData.visible,
            }),
        });

        if (rawResponse.status === 200) {
            // falls erfolgreich, dann:
            setStartPoint(false);
            setDefaultMapStyle(false);
            setNewTripData(userInitialValues);
            setInviteFriends(false);
            setInviteFriendsVisibility(false);
            handleGetUser();
            alert("Trip successfully created!");
            router.replace(`/user/${user.userName}`);
        } else {
            const err = await rawResponse.json();
            //console.log("backend error", err);
        }
    }

    return (
        <div className="h-screen w-screen container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-blue-300">
            {!user.userName && (
                <div className="w-screen h-screen grid place-content-center content-center">
                    <TailSpin color="#00BFFF" height={80} width={80} />
                </div>
            )}
            {user.userName && (
                <div className="h-screen w-screen container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-blue-300">
                    <h1 className="text-xl font-bold mb-3">
                        Create a new trip
                    </h1>
                    <label htmlFor="tripName">Name of the trip</label>
                    <input
                        type="text"
                        name="tripName"
                        placeholder={
                            newTripData.tripName !== "" ? null : "Trip Name"
                        }
                        value={newTripData.tripName}
                        onChange={handleChange}
                    />
                    <label htmlFor="tripType" className="mt-3">
                        Type of trip
                    </label>
                    <select
                        name="tripType"
                        onChange={handleChange}
                        value={newTripData.tripType}
                    >
                        <option value="day trip">day trip</option>
                        <option value="weekend trip">weekend trip</option>
                        <option value="short trip">short trip</option>
                        <option value="hiking">hiking</option>
                        <option value="business trip">business trip</option>
                        <option value="vacation">vacation</option>
                        <option value="honeymoon">honeymoon</option>
                        <option value="sabbatical">sabbatical</option>
                        <option value="trip around the world">
                            trip around the world
                        </option>
                    </select>
                    <label htmlFor="description" className="mt-3">
                        Description
                    </label>
                    <textarea
                        rows="4"
                        type="text"
                        name="description"
                        placeholder="description"
                        value={newTripData.description}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>Start Date:</div>
                        <div>
                            {newTripData.startDate !== ""
                                ? format(
                                      new Date(newTripData.startDate),
                                      "dd.MMMM.yyyy"
                                  )
                                : null}
                        </div>
                        <div>End Date:</div>
                        <div>
                            {newTripData.endDate !== ""
                                ? format(
                                      new Date(newTripData.endDate),
                                      "dd.MMMM.yyyy"
                                  )
                                : null}
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                        onClick={() => setDatePickerVisibility(true)}
                    >
                        Set Date
                    </button>
                    {datePickerVisibility && <DatePicker />}
                    <div className="mt-4 font-bold">
                        Set travel map style and starting location
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>MapStyle:</div>
                        <div>
                            {defaultMapStyle
                                ? defaultMapStyle.name
                                : user.mapStyle.name}
                        </div>
                        <div className="col-span-2">Start Location:</div>
                        <div>City:</div>
                        <div>
                            {startPoint ? startPoint.city : user.home.city}
                        </div>
                        <div>Country:</div>
                        <div>
                            {startPoint
                                ? startPoint.country
                                : user.home.country}
                        </div>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                        onClick={handleMapStyleSubmit}
                    >
                        Set Map Style
                    </button>
                    <div className="mt-6">
                        Privacy Settings - Trip visible for:
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <input
                                type="radio"
                                name="visible"
                                value="private"
                                id="private"
                                onChange={handleChange}
                                checked={newTripData.visible === "private"}
                            />
                            <label htmlFor="private">Private</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="visible"
                                value="friends"
                                id="friends"
                                onChange={handleChange}
                                checked={newTripData.visible === "friends"}
                            />
                            <label htmlFor="friends">Friends</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                name="visible"
                                value="public"
                                id="public"
                                onChange={handleChange}
                                checked={newTripData.visible === "public"}
                            />
                            <label htmlFor="public">Public</label>
                        </div>
                    </div>
                    <div className="mt-6">Invite friends to your trip</div>
                    <div className="flex justify-around flex-wrap w-[80%]">
                        {inviteFriends &&
                            !inviteFriendsVisibility &&
                            inviteFriends.map(
                                (friend) =>
                                    friend.checked === true && (
                                        <div
                                            key={friend.userName}
                                            className="bg-slate-300 p-1 rounded-full"
                                        >
                                            <div>{friend.userName}</div>
                                        </div>
                                    )
                            )}
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                        onClick={() => setInviteFriendsVisibility(true)}
                    >
                        Invite Friends
                    </button>
                    {inviteFriendsVisibility && <InviteFriendToTrip />}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded z-0"
                            onClick={(e) => saveTrip(e)}
                        >
                            Save new Trip
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded z-0"
                            onClick={() => (
                                setStartPoint(false),
                                setDefaultMapStyle(false),
                                setNewTripData(false),
                                router.replace(`/user/{user.userName}`)
                            )}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
