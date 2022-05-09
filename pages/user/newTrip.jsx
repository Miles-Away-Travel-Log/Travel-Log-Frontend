import React, { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { useAppData } from "../../Context/DataStorage.js";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";

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
    } = useAppData();

    // Fehlt noch: Freunde adden? (Anfrage, nicht Zwang.) Privacy Settings? Validierung im Frontend? (Alert-Messages?) Nachricht wenn erfolgreich gepostet?

    const userInitialValues = {
        tripName: "",
        tripType: "",
        description: "",
        startDate: "",
        endDate: "",
        mapStyle: user.mapStyle,
        startPoint: user.home,
    };

    useEffect(() => {
        newTripData
            ? setNewTripData({ ...userInitialValues, ...newTripData })
            : setNewTripData(userInitialValues);
    }, []);

    useEffect(() => {}, [newTripData]);

    format(new Date(2014, 1, 11), "yyyy-MM-dd");

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
                participants: [user.id],
            }),
        });

        if (rawResponse.status === 200) {
            // falls erfolgreich, dann:
            setStartPoint(false);
            setDefaultMapStyle(false);
            setNewTripData(userInitialValues);
            handleGetUser();
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
                    <h1 className="">Create a new trip</h1>
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
                    <label htmlFor="tripType">Type of trip</label>
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
                    <label htmlFor="description">description</label>
                    <textarea
                        rows="4"
                        type="text"
                        name="description"
                        placeholder="description"
                        value={newTripData.description}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
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
                    <div>Set travel map style and starting location</div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                        onClick={handleMapStyleSubmit}
                    >
                        Set Map Style
                    </button>
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
            )}
        </div>
    );
}
