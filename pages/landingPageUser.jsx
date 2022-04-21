// import { useState } from "react/cjs/react.production.min";
import Navbar from "../components/Navbar.jsx";
import { useAppData } from "../Context/DataStorage.js";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LandingPageUser() {
    const router = useRouter();
    const { user, userId } = useAppData();

    const [showDropdown, setShowDropdown] = useState(false);

    function handleDropdown() {
        if (!showDropdown) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    async function deleteAlert(e) {
        if (confirm("Do you really want to delete your account?")) {
            e.preventDefault();
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_FETCH_URL_USER}/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            router.replace("/register");
        } else {
            router.replace("/landingPageUser");
        }
    }

    return (
        <div>
            <div className="m-3 w-full bg-[#C4C4C4] rounded-lg  border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                    <button
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className="hidden sm:inline-block text-white dark:text-gray-400 hover:bg-[#942928] dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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
                                <Link href="/editProfile">
                                    <a className="block py-2 px-4 text-sm text-[#90A5A9] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                        Edit Profile
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block py-2 px-4 text-sm text-[#90A5A9] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Export Data
                                </a>
                            </li>
                            <li>
                                <p
                                    onClick={deleteAlert}
                                    className="block py-2 px-4 text-sm text-[#942928] hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                    Delete Account
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img
                        className="mb-3 w-24 h-24 rounded-full shadow-lg"
                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                        alt="Bonnie image"
                    />
                    <h5 className="mb-1 text-xl font-medium text-[white] dark:text-white">
                        {user.firstName} {user.lastName}
                    </h5>
                    <span className="text-sm text-[#90A5A9] dark:text-gray-400">
                        {user.status}
                    </span>
                    <div className="flex mt-4 space-x-3 lg:mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-[#90A5A9] rounded-lg hover:bg-[#942928] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Add friend
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-[#90A5A9] rounded-lg hover:bg-[#942928] focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                        >
                            Message
                        </a>
                    </div>
                </div>
            </div>
            <div className="m-3 my-9 w-full rounded-lg bg-[#C4C4C4] text-white text-xl text-center">{`Hello ${user.userName}`}</div>
            <Navbar />
        </div>
    );
}
