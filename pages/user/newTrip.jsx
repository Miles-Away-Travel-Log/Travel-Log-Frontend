import React, { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { useAppData } from "../../Context/DataStorage.js";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";

export default function NewTrip() {
    const router = useRouter();
    const {
        datePickerVisibility,
        setDatePickerVisibility,
        calendar,
        setCalendar,
        defaultMapStyle,
        setDefaultMapStyle,
        user,
        setNewHome,
        startPoint,
        setStartPoint,
    } = useAppData();

    const userInitialValues = {
        tripName: "",
        tripType: "",
        tripDescription: "",
        startDate: "",
        endDate: "",
        mapStyle: user.mapStyle,
        startPoint: user.home,
    };

    const [formValues, setFormValues] = useState(userInitialValues);

    useEffect(() => {
        setCalendar(false);
        setNewHome(user.home);
    }, []);

    format(new Date(2014, 1, 11), "yyyy-MM-dd");

    function handleMapStyleSubmit(event) {
        event.preventDefault();
        defaultMapStyle ? defaultMapStyle : setDefaultMapStyle(user.mapStyle);
        setNewHome(user.home);
        router.replace("/user/setTripOptions");
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    function saveTrip(event) {
        event.preventDefault();
        setFormValues({ ...formValues, mapStyle: defaultMapStyle, startPoint: startPoint, startDate: calendar.startDate, endDate: calendar.endDate });
        console.log(formValues);
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
                        placeholder="Trip Name"
                        value={formValues.tripName}
                        onChange={handleChange}
                    />
                    <label htmlFor="tripType">Type of trip</label>
                    <select name="tripType" onChange={handleChange}>
                        <option value="day trip">day trip</option>
                        <option value="weekend trip">weekend trip</option>
                        <option value="short trip">short trip</option>
                        <option value="hiking">hiking</option>
                        <option value="business trip">business trip</option>
                        <option value="vacation">vacation</option>
                        <option value="honeymoon">honeymoon</option>
                        <option value="sabbatical">sabbatical</option>
                        <option value="trip around the world">trip around the world</option>
                    </select>
                    <label htmlFor="summary">Summary</label>
                    <textarea
                        rows="4"
                        type="text"
                        name="summary"
                        placeholder="Summary"
                        value={formValues.summary}
                        onChange={handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <div>Start Date:</div>
                        <div>
                            {calendar
                                ? format(
                                      new Date(calendar[0].startDate),
                                      "dd.MMMM.yyyy"
                                  )
                                : ""}
                        </div>
                        <div>End Date:</div>
                        <div>
                            {calendar
                                ? format(
                                      new Date(calendar[0].endDate),
                                      "dd.MMMM.yyyy"
                                  )
                                : ""}
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                        onClick={() => saveTrip()
                            // ,router.replace("/user/setTripOptions"
                            }
                    >
                        Save new Trip
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                        onClick={() => router.replace(`/user/{user.userName}`)}
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}
