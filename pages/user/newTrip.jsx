import React, { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { useAppData } from "../../Context/DataStorage.js";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import InviteFriendToTrip from "../../components/InviteFriendToTrip.jsx";
import Axios from "axios";

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
        setTripImage,
        tripImage,
    } = useAppData();

    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState({});

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
        tripImage: "",
        visible: "private",
    };

    useEffect(() => {
        newTripData
            ? setNewTripData({ ...userInitialValues, ...newTripData })
            : setNewTripData(userInitialValues);
    }, []);

    useEffect(() => {
        setErrors(validate(newTripData));
    }, [newTripData]);

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

    function changeDateFormat(param) {
        const date = new Date(param);
        const getYear = date.getFullYear();
        const getMonth = date.getMonth() + 1;
        const getDay = date.getDate();
        return `${getYear}-${getMonth}-${getDay}`;
    }

    async function saveTrip(event) {
        event.preventDefault();
        setIsSubmit(true);
        if (Object.keys(errors).length === 0) {
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

            const rawResponse = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_TRIP,
                {
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
                        startDate: changeDateFormat(newTripData.startDate),
                        endDate: changeDateFormat(newTripData.endDate),
                        mapStyle: mapStyle,
                        startPoint: start,
                        participants: participants,
                        visible: newTripData.visible,
                        tripImage: tripImage,
                    }),
                }
            );

            if (rawResponse.status === 200) {
                // falls erfolgreich, dann:
                alert("Trip successfully created!");
                router.replace(`/user/${user.userName}`);
                setStartPoint(false);
                setDefaultMapStyle(false);
                setNewTripData(userInitialValues);
                setInviteFriends(false);
                setInviteFriendsVisibility(false);
                handleGetUser();
            } else {
                const err = await rawResponse.json();
                //console.log("backend error", err);
            }
        }
    }

    function getImageFromCloud(e) {
        const file = e.target.files[0];
        const formDataTitleImage = new FormData();
        formDataTitleImage.append("file", file);
        formDataTitleImage.append("upload_preset", "pvsqrbgk");

        Axios.post(
            "https://api.cloudinary.com/v1_1/milesaway/image/upload",
            formDataTitleImage
        ).then((response) => {
            setTripImage(response.data.url);
        });
    }

    function validate(values) {
        const errors = {};

        if (!values.tripName) {
            errors.tripName = "Trip name is required";
        }

        if (!values.description) {
            errors.description = "Description is required";
        }

        if (!values.startDate) {
            errors.startDate = "Start date is required";
        }

        if (!values.endDate) {
            errors.endDate = "End date is required";
        }

        return errors;
    }

    return (
        <div className="bg-[url('../public/images/images-diary/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg')] bg-cover min-h-screen flex flex-col">
            <div className="h-screen w-screen container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-[#942928]">
                {!user.userName && (
                    <div className="w-screen h-screen grid place-content-center content-center">
                        <TailSpin color="#00BFFF" height={80} width={80} />
                    </div>
                )}
                {user.userName && (
                    <div className="h-screen w-screen container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2 bg-[#C4C4C4]">
                        <h1 className="text-xl font-bold mb-3 mt-4">
                            Create a new trip
                        </h1>
                        <form onSubmit={saveTrip}>
                            <div className="mt-2 grid grid-cols gap-4 mt-4">
                                <input
                                    type="text"
                                    name="tripName"
                                    className="border rounded py-2 px-3 ml-2"
                                    placeholder={
                                        newTripData.tripName !== ""
                                            ? null
                                            : "Trip Name"
                                    }
                                    value={newTripData.tripName}
                                    onChange={handleChange}
                                />
                                <p className="text-sm text-red-600 mb-4">
                                    {isSubmit && errors.tripName}
                                </p>
                            </div>
                            <div
                                action="/file-upload"
                                className="mb-4 border-white solid-2 flex flex-col"
                            >
                                <span className="px-3 font-bold">
                                    IMAGES UPLOADER
                                </span>
                                <div className="fallback hover:bg-[#942928] px-3 mt-4">
                                    <input
                                        name="file"
                                        type="file"
                                        multiple
                                        onChange={getImageFromCloud}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label
                                    htmlFor="tripType"
                                    className="mb-2 px-3 font-bold text-sm"
                                >
                                    Type of trip
                                </label>
                                <select
                                    name="tripType"
                                    className="border rounded py-2 px-3 ml-2"
                                    onChange={handleChange}
                                    value={newTripData.tripType}
                                >
                                    <option value="day trip">day trip</option>
                                    <option value="weekend trip">
                                        weekend trip
                                    </option>
                                    <option value="short trip">
                                        short trip
                                    </option>
                                    <option value="hiking">hiking</option>
                                    <option value="business trip">
                                        business trip
                                    </option>
                                    <option value="vacation">vacation</option>
                                    <option value="honeymoon">honeymoon</option>
                                    <option value="sabbatical">
                                        sabbatical
                                    </option>
                                    <option value="trip around the world">
                                        trip around the world
                                    </option>
                                </select>
                            </div>
                            <div className="mt-2 grid grid-cols gap-4">
                                <textarea
                                    rows="4"
                                    type="text"
                                    name="description"
                                    className="border rounded py-2 px-3 ml-2"
                                    placeholder="description"
                                    value={newTripData.description}
                                    onChange={handleChange}
                                />
                                <p className="text-sm text-red-600 mb-4">
                                    {isSubmit && errors.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    name="startDate"
                                    className="border rounded py-2 px-3 ml-2"
                                    placeholder="Start Date"
                                    disabled
                                    value={
                                        newTripData.startDate &&
                                        newTripData.startDate.getFullYear() +
                                            "-" +
                                            (newTripData.startDate.getMonth() +
                                                1) +
                                            "-" +
                                            newTripData.startDate.getDate()
                                    }
                                />
                                <p className="text-sm text-red-600 mb-4">
                                    {isSubmit && errors.startDate}
                                </p>
                                <input
                                    type="text"
                                    name="endDate"
                                    className="border rounded py-2 px-3 ml-2"
                                    placeholder="End Date"
                                    disabled
                                    value={
                                        newTripData.endDate &&
                                        newTripData.endDate.getFullYear() +
                                            "-" +
                                            (newTripData.endDate.getMonth() +
                                                1) +
                                            "-" +
                                            newTripData.endDate.getDate()
                                    }
                                />
                                <p className="text-sm text-red-600 mb-4">
                                    {isSubmit && errors.endDate}
                                </p>

                                <button
                                    className="ml-2 bg-[#942928] hover:bg-gray-300 text-white font-bold py-2 px-4 rounded z-0 mt-4"
                                    onClick={() =>
                                        setDatePickerVisibility(true)
                                    }
                                >
                                    Set Date
                                </button>
                                {datePickerVisibility && <DatePicker />}
                            </div>

                            <div className="text-lg mt-8 mb-6 px-2 font-bold text-sm">
                                Set travel map style and starting location
                            </div>

                            <div className="ml-2 grid grid-cols-2 gap-4">
                                <div>MapStyle:</div>
                                <div>
                                    {defaultMapStyle
                                        ? defaultMapStyle.name
                                        : user.mapStyle.name}
                                </div>
                                <div className="col-span-2">
                                    Start Location:
                                </div>
                                <div>City:</div>
                                <div>
                                    {startPoint
                                        ? startPoint.city
                                        : user.home.city}
                                </div>
                                <div>Country:</div>
                                <div>
                                    {startPoint
                                        ? startPoint.country
                                        : user.home.country}
                                </div>
                            </div>
                            <button
                                className="ml-2 mt-4 bg-[#942928] hover:bg-gray-300 text-white font-bold py-2 px-4 rounded z-0"
                                onClick={handleMapStyleSubmit}
                            >
                                Set Map Style
                            </button>
                            <div className="ml-2 mt-6">
                                Privacy Settings - Trip visible for:
                            </div>
                            {/* ---------------- Custom Radio Buttons ---------------- */}
                            <div
                                className="grid w-[40rem] grid-cols-3 space-x-2 rounded-xl bg-gray-300 p-2"
                                x-data="app"
                            >
                                <div>
                                    <input
                                        type="radio"
                                        name="visible"
                                        value="private"
                                        id="private"
                                        className="peer hidden"
                                        onChange={handleChange}
                                        checked={
                                            newTripData.visible === "private"
                                        }
                                    />
                                    <label
                                        htmlFor="private"
                                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#942928] peer-checked:font-bold peer-checked:text-white"
                                    >
                                        Private
                                    </label>
                                </div>

                                <div>
                                    <input
                                        type="radio"
                                        name="visible"
                                        value="friends"
                                        id="friends"
                                        className="peer hidden"
                                        onChange={handleChange}
                                        checked={
                                            newTripData.visible === "friends"
                                        }
                                    />
                                    <label
                                        htmlFor="friends"
                                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#942928] peer-checked:font-bold peer-checked:text-white"
                                    >
                                        Friends
                                    </label>
                                </div>

                                <div>
                                    <input
                                        type="radio"
                                        name="visible"
                                        value="public"
                                        id="public"
                                        className="peer hidden"
                                        onChange={handleChange}
                                        checked={
                                            newTripData.visible === "public"
                                        }
                                    />
                                    <label
                                        htmlFor="public"
                                        className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-[#942928] peer-checked:font-bold peer-checked:text-white"
                                    >
                                        Public
                                    </label>
                                </div>
                            </div>
                            {/* --------------- Vorhandene Radio Buttons ----------------*/}
                            {/* <div className="ml-2 mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <input
                                        type="radio"
                                        name="visible"
                                        value="private"
                                        id="private"
                                        onChange={handleChange}
                                        checked={
                                            newTripData.visible === "private"
                                        }
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
                                        checked={
                                            newTripData.visible === "friends"
                                        }
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
                                        checked={
                                            newTripData.visible === "public"
                                        }
                                    />
                                    <label htmlFor="public">Public</label>
                                </div>
                            </div> */}
                            <div className="ml-2 mt-6 mb-2">
                                Invite friends to your trip
                            </div>
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
                                className="ml-2 mt-2 bg-[#942928] hover:bg-gray-300 text-white font-bold py-2 px-4 rounded z-0"
                                onClick={() => setInviteFriendsVisibility(true)}
                            >
                                Invite Friends
                            </button>
                            {inviteFriendsVisibility && <InviteFriendToTrip />}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="ml-2 bg-[#942928] hover:bg-gray-300 text-white font-bold py-2 px-4 rounded z-0"
                                    /* onClick={(e) => saveTrip(e)} */
                                >
                                    Save new Trip
                                </button>
                                <button
                                    className="bg-[#90A5A9] hover:bg-gray-300 text-white font-bold py-2 px-4 rounded z-0"
                                    onClick={(e) => (
                                        e.preventDefault(),
                                        setStartPoint(false),
                                        setDefaultMapStyle(false),
                                        setNewTripData(userInitialValues),
                                        router.replace(`/user/${user.userName}`)
                                    )}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}
