import React from "react";
import { useAppData } from "../../Context/DataStorage.js";
import { useEffect } from "react";
import Link from "next/link";
import { icons, clickables } from "../../components/menu.jsx";
import Navbar from "../../components/Navbar.jsx";

function Trips() {
    const { user, userTrips, setUserTrips } = useAppData();

    useEffect(() => {
        if (user) {
            setUserTrips(user.trips);
        }
    }, []);

    function createListForTrips() {
        const list = userTrips.map((trip) => {
            return (
                <Link
                    href={`/${user.userName}/trip/${trip._id}`}
                    key={trip._id}
                >
                    <a className="trips-child-color rounded-xl h-62 md:h-96 w-[250px]">
                        <img
                            src="http://res.cloudinary.com/milesaway/image/upload/v1651238129/quod9hwh5xsu6gdddlre.jpg"
                            className="rounded-t-xl max-h-44"
                        />
                        <p className="text-xl md:text-3xl text-gray-50 pt-5 pl-3">
                            {trip.tripName}
                        </p>
                        <p className="text-xs md:text-base font-light text-gray-50 pt-3 pl-3 pb-10">
                            {trip.startDate} - {trip.endDate}
                        </p>
                        <p className="text-xs md:text-base font-light text-gray-50 pt-3 pl-3 pr-4 pb-10 truncate">
                            {trip.description}
                        </p>
                    </a>
                </Link>
            );
        });
        return list;
    }
    const hasTrips = userTrips.length > 0;
    return (
        <div className="h-screen flex flex-col items-center bg-white">
            <div className="mt-4 flex">
                <p className="text-[#90A5A9] text-3xl font-semibold">
                    {/* {userTrips.length > 0 ? "YOUR TRIPS" : "NO TRIPS"} */}
                    {hasTrips ? "YOUR TRIPS" : "NO TRIPS"}
                </p>
                <div
                    className="ml-3 text-[#90A5A9]"
                    title="create new trip"
                    onClick={() => router.replace("/user/newTrip")}
                >
                    {clickables[17].icon}
                </div>
            </div>
            <div
                className="bg-[url('../public/images/images-diary/dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg')] bg-cover min-h-screen w-full"
                style={hasTrips ? { visibility: 'hidden' }: { visibility: 'visible' } }
            ></div>

            <div className="flex flex-wrap justify-center px-18 gap-5 py-4">
                {createListForTrips()}
            </div>
            <div className="fixed bottom-0 left-0 mt-9">
                <Navbar />
            </div>
        </div>
    );
}

export default Trips;
