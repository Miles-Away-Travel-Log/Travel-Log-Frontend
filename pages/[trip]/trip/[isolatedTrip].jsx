import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppData } from "../../../Context/DataStorage.js";
import TripBudget from "../../../components/Trip.Budget.jsx";
import TripDiary from "../../../components/Trip.Diary.jsx";
import TripPeople from "../../../components/Trip.People.jsx";
import TripViewRoute from "../../../components/Trip.View.Route.jsx";
import TripEditRoute from "../../../components/Trip.Edit.Route.jsx";
import TripPhotos from "../../../components/Trip.Photos.jsx";
import Navbar from "../../../components/Navbar.jsx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropRightLine } from "react-icons/ri";
import BarChart from "../../../components/Budget.Chart.Bar.jsx";
import PieChart from "../../../components/Budget.Chart.Pie.jsx";
import Transactions from "../../../components/Budget.Transactions.jsx";

function TripOverview() {
    const router = useRouter();
    const tripFromRouter = router.asPath.split("/")[3];

    const { getTripData, tripData } = useAppData();

    const [submenu, setSubmenu] = useState("");
    const [isOpenBudget, setIsOpenBudget] = useState(false);
    const [isOpenCharts, setIsOpenCharts] = useState(false);
    const [isOpenRoute, setIsOpenRoute] = useState(false);

    useEffect(() => {
        getTripData(tripFromRouter);
    }, []);

    function handleClickSubmenu(param) {
        setSubmenu(param);
        setIsOpenBudget(false);
        setIsOpenCharts(false);
        setIsOpenRoute(false);
    }

    return (
        /* <!-- This is an example component --> */
        <div className="w-[375px] lg:w-screen">
            <div className="fixed top-0 w-full bg-white z-10">
                <div className="flex justify-center pb-10 pt-10 flex-shrink-0 w-[375px] lg:w-full pl-2 bg-white">
                    <img
                        src={
                            tripData.tripImage && tripData.tripImage.length > 0
                                ? tripData.tripImage
                                : "../../images/images-trip/TripPlaceholder.jpeg"
                        }
                        className="h-20 w-20 lg:h-40 lg:w-40 rounded-full object-fill"
                        alt="username"
                    />
                    <div className="lg:ml-10 ml-6 w-1/2">
                        <div className="flex items-center">
                            <h2 className="block leading-relaxed font-light text-gray-700 text-sm lg:text-3xl">
                                {tripData.tripName}
                            </h2>

                            <button className="lg:text-base flex items-center ml-3 lg:ml-20 border border-blue-600 hover:bg-blue-600 hover:text-white rounded outline-none focus:outline-none bg-transparent text-blue-600 text-sm py-1 px-1">
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
                        className="hover:text-blue-600 w-20 text-sm lg:text-base"
                        onClick={() => setSubmenu("diary")}
                    >
                        Diary
                    </button>
                    <div className="flex items-center relative text-sm lg:text-base">
                        <button
                            className="hover:text-blue-600 w-20"
                            onClick={() => handleClickSubmenu("budget")}
                        >
                            Budget
                        </button>
                        <RiArrowDropDownLine
                            onClick={() => setIsOpenBudget(!isOpenBudget)}
                        />
                        {isOpenBudget && (
                            <div className="flex flex-col items-start absolute top-10 right-0 z-50">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 bg-slate-100 w-32 text-left"
                                    onClick={() =>
                                        handleClickSubmenu("transactions")
                                    }
                                >
                                    Transactions
                                </button>
                                <div
                                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 bg-slate-100 w-32 text-left relative"
                                    onClick={() =>
                                        setIsOpenCharts(!isOpenCharts)
                                    }
                                >
                                    Charts
                                    {!isOpenCharts ? (
                                        <RiArrowDropRightLine />
                                    ) : (
                                        <RiArrowDropDownLine />
                                    )}
                                    {isOpenCharts && (
                                        <div className="absolute left-[130px] top-0">
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 bg-slate-100 w-32 text-left"
                                                onClick={() =>
                                                    handleClickSubmenu("bar")
                                                }
                                            >
                                                Bar Chart
                                            </button>
                                            <button
                                                className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 bg-slate-100 w-32 text-left"
                                                onClick={() =>
                                                    handleClickSubmenu("pie")
                                                }
                                            >
                                                Pie Chart
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <button
                        className="hover:text-blue-600 w-20 text-sm lg:text-base"
                        onClick={() => setSubmenu("photos")}
                    >
                        Photos
                    </button>
                    <div className="flex items-center relative text-sm lg:text-base">
                        <button
                            className="hover:text-blue-600 w-20 text-sm lg:text-base"
                            // onClick={() => setSubmenu("routes")}
                            onClick={() => setIsOpenRoute(!isOpenRoute)}
                        >
                            Routes
                            <RiArrowDropDownLine className="inline ml-2" />
                        </button>
                        {isOpenRoute && (
                            <div className="flex flex-col items-start absolute top-10 right-0 z-50">
                                <button
                                    className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 bg-slate-100 w-32 text-left"
                                    onClick={() =>
                                        handleClickSubmenu("viewRoute")
                                    }
                                >
                                    View Route
                                </button>
                                <button
                                    className="block px-4 py-2 text-sm text-gray-800 border-b hover:bg-gray-200 bg-slate-100 w-32 text-left"
                                    onClick={() =>
                                        handleClickSubmenu("editRoute")
                                    }
                                >
                                    Edit Route
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        className="hover:text-blue-600 w-20 text-sm lg:text-base"
                        onClick={() => setSubmenu("people")}
                    >
                        People
                    </button>
                </div>
                <div className="border-b border-red-800 mt-2"></div>
            </div>
            <div className="h-2/3 mt-[270px] lg:mt-[250px] mb-10">
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
                ) : submenu === "viewRoute" ? (
                    <TripViewRoute tripData={tripData} />
                ) : submenu === "editRoute" ? (
                    <TripEditRoute tripData={tripData} />
                ) : submenu === "people" ? (
                    <TripPeople tripPeople={tripData.participants} />
                ) : submenu === "transactions" ? (
                    <Transactions tripID={tripFromRouter} />
                ) : submenu === "bar" ? (
                    <BarChart />
                ) : submenu === "pie" ? (
                    <PieChart />
                ) : null}
            </div>
            <div className="fixed bottom-0 left-0 w-full">
                <Navbar />
            </div>
        </div>
    );
}

export default TripOverview;
