import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppData } from "../Context/DataStorage.js";
import mapStyleList from "./MapStyleList.jsx";

function SetMapStyle() {
    const { user, newHome, setNewHome, defaultMapStyle, setDefaultMapStyle } =
        useAppData();
    const router = useRouter();

    useEffect(() => {}, []);

    useEffect(() => {}, [defaultMapStyle]);

    useEffect(() => {}, [newHome]);

    const handleChangeRadio = (event) => {
        const newMapStyle = mapStyleList.find(
            (style) => style.link === event.target.value
        );
        const update = {
            ...defaultMapStyle,
            name: newMapStyle.name,
            link: event.target.value,
            iconColor: newMapStyle.iconColor,
        };
        setDefaultMapStyle(update);
    };

    return (
        <div className="col-span-2 bg-green-200">
            <h2 className="text-3xl ml-5 mt-4 mb-5 font-bold">
                Home Location:
            </h2>
            <div className="m-5 grid grid-cols-2 gap-4">
                <div>
                    <div>City:</div>
                </div>
                <div>
                    {newHome
                        ? user.home.city
                            ? newHome.city
                            : user.home.city
                        : ""}
                </div>
            </div>
            <div className="m-5 grid grid-cols-2 gap-4">
                <div>
                    <div>Country:</div>
                </div>
                <div>
                    {newHome
                        ? user.home.country
                            ? newHome.country
                            : user.home.country
                        : ""}
                </div>
            </div>
            <h1 className="text-3xl ml-5 mt-10 mb-15 font-bold">
                Choose your standard Map-Style:
            </h1>
            <div className="m-5 grid grid-cols-3 gap-4">
                {mapStyleList.map((mapStyle, index) => (
                    <div className="flex content-center" key={index}>
                        <input
                            id={`option${index + 1}`}
                            type="radio"
                            name="map-style"
                            className="mr-3"
                            value={mapStyle.link}
                            onChange={handleChangeRadio}
                            checked={defaultMapStyle.link === mapStyle.link}
                        />
                        <Image
                            className="p-4"
                            src={mapStyle.pic}
                            alt={mapStyle.name}
                            width={60}
                            height={60}
                        />
                        <label
                            htmlFor={`option${index + 1}`}
                            className="pr-2 mt-auto mb-auto ml-5"
                        >
                            {mapStyle.name}
                        </label>
                    </div>
                ))}
            </div>
            <div className="m-5 mt-10 grid grid-cols-2 gap-4">
                <div className="flex justify-center">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={(e) => (
                            e.preventDefault(),
                            router.replace("/user/editProfile")
                        )}
                    >
                        Accept Changes
                    </button>
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={(e) => (
                            e.preventDefault(),
                            setDefaultMapStyle(false),
                            setNewHome(false),
                            router.replace("/user/editProfile")
                        )}
                    >
                        Reset Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SetMapStyle;
