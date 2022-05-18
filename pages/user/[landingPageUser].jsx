// import { useState } from "react/cjs/react.production.min";
import Navbar from "../../components/Navbar.jsx";
import { useAppData } from "../../Context/DataStorage.js";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";
import avatar from "../../public/images/images-register/avatar.svg";
// import { icons, clickables } from "../../components/menu.jsx";

export default function LandingPageUser() {
    const router = useRouter();
    const {
        user,
        userId,
        logout,
        list_Friends_FriendRequests,
        dataOfOneFriend,
        setDataOfOneFriend,
        deleteAccount,
    } = useAppData();

    const userFromRouterPath = router.asPath.split("/")[2];

    useEffect(() => {
        if (userFromRouterPath !== "[landingPageUser]") {
            const header = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            };
            fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_USER +
                    `${userFromRouterPath}`,
                {
                    method: "GET",
                    headers: header,
                }
            ).then((response) =>
                response.json().then((data) => {
                    setDataOfOneFriend(data.user);
                })
            );
        }
    }, [userFromRouterPath]);

    function friendRequest() {
        const friendsFilteredForStatusOfRequest =
            list_Friends_FriendRequests.filter((item) => {
                return item.status === false && item.receivedRequest === userId;
            });
        if (friendsFilteredForStatusOfRequest.length > 0) {
            return (
                <button
                    className="bg-rose-600 py-2 px-4 text-sm font-medium text-center rounded-full"
                    onClick={() => router.replace("/user/friends")}
                >
                    New friend request
                </button>
            );
        }
    }

    const [showDropdown, setShowDropdown] = useState(false);

    function handleDropdown() {
        if (!showDropdown) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    return (
        <div className="relative">
            <div className="flex justify-end p-4 absolute right-0">
                <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="sm:inline-block text-white dark:text-gray-400 hover:bg-[#942928] dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                    onClick={handleDropdown}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                </button>

                <div
                    id="dropdown"
                    className={
                        (showDropdown === true ? "visible" : "hidden") +
                        " z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                    }
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="top"
                >
                    <ul className="py-1" aria-labelledby="dropdownButton">
                        <li>
                            <Link href="/user/editProfile">
                                <a className="block py-2 px-4 text-sm text-[#90A5A9] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                    Edit Profile
                                </a>
                            </Link>
                        </li>
                        {user.userName !== userFromRouterPath ? (
                            <li
                                className="cursor-pointer block py-2 px-4 text-sm text-[#90A5A9] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                onClick={() =>
                                    router.replace(`/user/${user.userName}`)
                                }
                            >
                                home
                            </li>
                        ) : null}
                        <li>
                            <p
                                onClick={() => router.replace("/weather")}
                                className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                            >
                                Weather
                            </p>
                        </li>

                        {user.userName === userFromRouterPath ? (
                            <ul className="cursor-pointer">
                                <li
                                    className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white flex"
                                    onClick={() =>
                                        router.replace("/user/trips")
                                    }
                                >
                                    Trips
                                    {/* <div
                                        className="ml-3 "
                                        title="create new trip"
                                        onClick={() =>
                                            router.replace("/user/newTrip")
                                        }
                                    >
                                        {clickables[17].icon}
                                    </div> */}
                                </li>
                                <li
                                    className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    onClick={() =>
                                        router.replace("/user/newTrip")
                                    }
                                >
                                    Create New Trip
                                </li>
                                <li
                                    onClick={() =>
                                        router.replace("/user/friends")
                                    }
                                    className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Friends
                                </li>
                                {/*       <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-4 text-sm text-[#90A5A9] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Export Data
                                    </a>
                                </li> */}
                                <li>
                                    <p
                                        onClick={deleteAccount}
                                        className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Delete Account
                                    </p>
                                </li>
                            </ul>
                        ) : null}

                        <li>
                            <p
                                onClick={logout}
                                className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                            >
                                logout
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mx-2 bg-[#C4C4C4] rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 pt-6">
                <div className="flex flex-col items-center pb-10">
                    <Image
                        className="w-24 h-24 rounded-full shadow-lg"
                        src={
                            dataOfOneFriend.avatar
                                ? dataOfOneFriend.avatar
                                : avatar
                        }
                        alt="User Image"
                        width={100}
                        height={100}
                    />

                    <h5 className=" pt-2 mb-1 text-xl font-medium text-[white] dark:text-white">
                        {dataOfOneFriend.firstName} {dataOfOneFriend.lastName}
                    </h5>
                    <span className="text-sm text-[#90A5A9] dark:text-gray-400">
                        {dataOfOneFriend.status}
                    </span>
                    <div className="flex mt-4 space-x-3 lg:mt-6">
                        {user.userName === userFromRouterPath ? (
                            <button
                                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-[#90A5A9] rounded-lg hover:bg-[#942928] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => router.replace("/user/friends")}
                            >
                                Add friend
                            </button>
                        ) : null}
                        <button
                            href="#"
                            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-[#90A5A9] rounded-lg hover:bg-[#942928] focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                        >
                            Message
                        </button>
                        {friendRequest()}
                    </div>
                </div>
            </div>
            {user.userName === userFromRouterPath ? (
                <div className="m-3 my-9 rounded-lg bg-[#C4C4C4] text-white text-xl text-center">{`Hello ${dataOfOneFriend.userName}`}</div>
            ) : null}
            <div className="mt-9">
                <Navbar />
            </div>
        </div>
    );
}
