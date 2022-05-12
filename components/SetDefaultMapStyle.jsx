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
        <div className="col-span-2 bg-[#C4C4C4] text-white overflow-y-auto">
            <h2 className="text-3xl ml-5 mt-4 mb-5 font-bold">
                Home Location:
            </h2>
            <div className="m-5 grid grid-cols-2 gap-4">
                <div>
                    <div className="font-bold">City:</div>
                </div>
                <div>{newHome ? newHome.city : user.home.city}</div>
                <div>
                    <div className="font-bold">Country:</div>
                </div>
                <div>{newHome ? newHome.country : user.home.country}</div>
            </div>
            <h1 className="text-3xl ml-5 mt-10 mb-15 font-bold flex flex-wrap">
                Choose your standard Map-Style:
            </h1>
            <div className="m-5 flex flex-wrap">
                {mapStyleList.map((mapStyle, index) => (
                    <div
                        className="mt-2 mr-1 flex flex-wrap lg:w-1/4 md:w-1/3"
                        key={index}
                    >
                        <input
                            id={`option${index + 1}`}
                            type="radio"
                            name="map-style"
                            className="m-3"
                            value={mapStyle.link}
                            onChange={handleChangeRadio}
                            checked={defaultMapStyle.link === mapStyle.link}
                        />
                        <label
                            htmlFor={`option${index + 1}`}
                            className="flex flex-col"
                        >
                            <Image
                                className="p-4 object-cover w-[60px] h-[60px]"
                                src={mapStyle.pic}
                                alt={mapStyle.name}
                                width={60}
                                height={60}
                            />
                        </label>
                        <label
                            htmlFor={`option${index + 1}`}
                            className="pr-2 mb-2 ml-9"
                        >
                            {mapStyle.name}
                        </label>
                    </div>
                ))}
            </div>
            <div className="m-5 mt-10 flex flex-wrap">
                <div className="flex justify-center">
                    <button
                        className="m-1 bg-[#90A5A9] hover:border-2 border-white border-white text-white font-bold py-2 px-4 rounded-full"
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
                        className="m-1 bg-[#942928] hover:border-2 border-white text-white font-bold py-2 px-4 rounded-full"
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
