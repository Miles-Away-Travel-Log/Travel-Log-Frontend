import { clickables } from "../Components/menu";
import { FcHeadset } from "react-icons/fc";
import React from "react";

function dummy() {
    return (
        <div className="bg-[url('../public/images/images-dummy/pawel-czerwinski-XaiP_NLrtoM-unsplash.jpg')] bg-cover min-h-screen">
            <div className="py-10 lg:px-4">
                <div
                    className="p-10  text-white lg:rounded-full flex lg:inline-flex"
                    role="alert"
                >
                    <div className=" px-10flex rounded-full bg-[#90A5A9] w-full uppercase px-2 py-1 text-xs font-bold mr-3">
                        what do you want to explore?
                    </div>

                    {/*<span className="flex rounded-full bg-[#90A5A9] font-semibold uppercase mr-2 text-xs text-left flex-auto">
                        what do you want to explore? </span>*/}
                </div>
            </div>

            <div className="w-full px-20">
                <div className="container1 flex mb-4">
                    <div className="">
                        <button
                            className="bg-[#90A5A9] my-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[0].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[1].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[2].icon}
                        </button>
                    </div>
                </div>
                <div className="container2 flex mb-4">
                    <div className="">
                        <button
                            className="bg-[#90A5A9] my-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[3].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[4].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[5].icon}
                        </button>
                    </div>
                </div>
                <div className="container3 flex mb-4">
                    <div className="">
                        <button
                            className="bg-[#90A5A9] my-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[6].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[7].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[8].icon}
                        </button>
                    </div>
                </div>
                <div className="container4 flex mb-4">
                    <div className="">
                        <button
                            className="bg-[#90A5A9] my-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[9].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[10].icon}
                        </button>
                        <button
                            className="bg-[#90A5A9] ml-5 hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 rounded-full"
                            type="submit"
                        >
                            {clickables[11].icon}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default dummy;
