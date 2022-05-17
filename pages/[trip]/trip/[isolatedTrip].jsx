import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppData } from "../../../Context/DataStorage.js";
import Cookies from "js-cookie";
import TripBudget from "../../../components/Trip.Budget.jsx";
import TripDiary from "../../../components/Trip.Diary.jsx";
import TripPeople from "../../../components/Trip.People.jsx";
import TripRoutes from "../../../components/Trip.Routes.jsx";
import TripPhotos from "../../../components/Trip.Photos.jsx";
import Navbar from "../../../components/Navbar.jsx";

function Test2() {
    const router = useRouter();
    const tripFromRouter = router.asPath.split("/")[3];

    const {
        user,
        accountPhoto,
        setTripDiary,
        tripSeedMoney,
        setTripSeedMoney,
        setTripBudget,
        setTripImages,
        setTripPeople,
        getTripData,
        tripData,
        setTripData,
    } = useAppData();

    const [submenu, setSubmenu] = useState("");

    useEffect(() => {
        getTripData(tripFromRouter);
    }, []);

    return (
        /* <!-- This is an example component --> */
        <div className="w-[375px] lg:w-screen">
            <div className="fixed top-0 w-full overflow-hidden bg-white z-10">
                <div className="flex justify-center pb-10 pt-10 flex-shrink-0 w-[375px] lg:w-full pl-2 bg-white">
                    <img
                        src="http://res.cloudinary.com/milesaway/image/upload/v1651238129/quod9hwh5xsu6gdddlre.jpg"
                        className="h-20 w-20 lg:h-40 lg:w-40 rounded-full object-cover"
                        alt="username"
                    />
                    <div className="lg:ml-10 ml-6">
                        <div className="flex items-center">
                            <h2 className="block leading-relaxed font-light text-gray-700 text-sm lg:text-3xl">
                                {tripData.tripName}
                            </h2>

                            <button className="lg:text-base flex items-center ml-3 border border-blue-600 hover:bg-blue-600 hover:text-white rounded outline-none focus:outline-none bg-transparent text-blue-600 text-sm py-1 px-1">
                                <span className="block">Edit trip</span>
                            </button>

                            <button className="lg:text-base flex items-center ml-3 border border-rose-600 hover:bg-rose-600 hover:text-white rounded outline-none focus:outline-none bg-transparent text-rose-600 text-sm py-1 px-1">
                                <span className="block">Delete trip</span>
                            </button>
                        </div>

                        <div className="">
                            <h1 className="text-sm lg:text-base lg:font-bold mt-4">
                                {tripData.startDate} - {tripData.endDate}
                            </h1>
                            <p className="text-sm lg:text-base mt-2">
                                {tripData.tripType}
                            </p>
                            <p className="text-sm lg:text-base mt-2">
                                {tripData.description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around bg-white">
                    <button
                        className="hover:text-blue-600 w-20 "
                        onClick={() => setSubmenu("diary")}
                    >
                        Diary
                    </button>
                    <button
                        className="hover:text-blue-600 w-20 "
                        onClick={() => setSubmenu("budget")}
                    >
                        Budget
                    </button>
                    <button
                        className="hover:text-blue-600 w-20 "
                        onClick={() => setSubmenu("photos")}
                    >
                        Photos
                    </button>
                    <button
                        className="hover:text-blue-600 w-20 "
                        onClick={() => setSubmenu("routes")}
                    >
                        Routes
                    </button>
                    <button
                        className="hover:text-blue-600 w-20 "
                        onClick={() => setSubmenu("people")}
                    >
                        People
                    </button>
                </div>
                <div className="border-b border-red-800 mt-2"></div>
            </div>
            <div className="overflow-y-scroll h-2/3 mt-[270px] lg:mt-[250px] mb-10">
                {submenu === "diary" ? (
                    <TripDiary tripDiary={tripData.diary} />
                ) : submenu === "budget" ? (
                    <TripBudget
                        tripSeedMoney={tripData.seedMoney}
                        tripBudget={tripData.budget}
                        tripID={tripFromRouter}
                    />
                ) : submenu === "photos" ? (
                    <TripPhotos />
                ) : submenu === "routes" ? (
                    <TripRoutes tripRoutes={tripData.route} />
                ) : submenu === "people" ? (
                    <TripPeople tripPeople={tripData.participants} />
                ) : null}
            </div>
            <div className="fixed bottom-0 left-0 w-full">
                <Navbar />
            </div>
        </div>
    );
}

export default Test2;