import React, { useEffect, useState } from "react";
import DatePicker from "../../components/DatePicker";
import { useAppData } from "../../Context/DataStorage.js";

export default function NewTrip() {
    const {
        datePickerVisibility,
        setDatePickerVisibility,
        calendar,
        setCalendar,
    } = useAppData();

    useEffect(() => {
        setCalendar(false);
    }, []);

    return (
        <div className="h-screen w-screen">
            <div className="grid grid-cols-2 gap-4">
                <div>Start Date:</div>
                <div>{calendar ? calendar[0].startDate.toString() : ""}</div>
                <div>End Date:</div>
                <div>{calendar ? calendar[0].endDate.toString() : ""}</div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-0"
                    onClick={() => setDatePickerVisibility(true)}
                >
                    Set Date
                </button>
            </div>
            {datePickerVisibility && <DatePicker />}
        </div>
    );
}
