import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useAppData } from "../Context/DataStorage.js";

export default function NewTrip() {
    const {
        datePickerVisibility,
        setDatePickerVisibility,
        calendar,
        setCalendar,
    } = useAppData();
    const [timeInterval, setTimeInterval] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    return (
        <div className="z-10 absolute top-0 left-0 border-2">
            <DateRangePicker
                onChange={(item) => setTimeInterval([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={timeInterval}
                direction="horizontal"
                // direction="vertical"
            />
            <div className="grid grid-cols-2 gap-4">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mb-2 ml-2 rounded z-0"
                    onClick={() => (
                        setCalendar(timeInterval),
                        setDatePickerVisibility(false)
                    )}
                >
                    Set Date
                </button>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-2 mr-2 rounded z-0"
                    onClick={() => (
                        setCalendar(false), setDatePickerVisibility(false)
                    )}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
