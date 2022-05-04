import { clickables } from "../components/menu";
import { FcHeadset } from "react-icons/fc";
import React from "react";

function dummy() {
    return (
        <div className="bg-[url('../public/images/images-dummy/quino-al-FVOkPmiCzAM-unsplash.webp')] bg-cover min-h-screen">
            <div className="py-10 lg:px-4"></div>

            {/*          ----------------------         Test mit Grid:          ----------------------         */}

            <div className="grid grid-cols-3 gap-x-auto gap-y-10 mx-10 w-[14em]">
                <div className="col-span-3 mb-5">
                    <div
                        className="text-white lg:rounded-full flex lg:inline-flex"
                        role="alert"
                    >
                        <div className="px-10flex rounded-full bg-[#90A5A9] w-full uppercase px-2 py-1 text-xs font-bold">
                            what do you want to explore?
                        </div>
                    </div>
                </div>

                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[0].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[1].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[2].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[3].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[4].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[5].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[6].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[7].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[8].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[9].icon}
                </button>
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[10].icon}
                </button>
                {/*------------- test weather button with url -------------*/}
                <button 
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[11].icon}
                </button>
                {/* original weather button:
                <button
                    className="bg-[#90A5A9] hover:bg-[#C4C4C4] w-12 h-12 text-white text-2xl font-bold px-3 mx-auto rounded-full"
                    type="submit"
                >
                    {clickables[11].icon}
    </button>*/}
            </div>
        </div>
    );
}

export default dummy;
