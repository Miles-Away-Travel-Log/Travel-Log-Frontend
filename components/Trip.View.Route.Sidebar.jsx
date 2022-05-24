import React, { useEffect } from "react";
import { useAppData } from "../Context/DataStorage.js";

function TripViewRouteSidebar() {
    const { viewDiarySidebar, setViewDiarySidebar } = useAppData();

    function showImages() {
        return viewDiarySidebar.images.flat().map((image, index) => {
            return (
                <div key={index} className="cursor-pointer">
                    <img
                        src={image}
                        className="foto w-[100%] h-auto object-cover"
                        alt={`image ${index}`}
                    />
                </div>
            );
        });
    }

    useEffect(() => {
        console.log("viewDiarySidebar", viewDiarySidebar);
        if (!viewDiarySidebar) setViewDiarySidebar(false);
    }, []);

    return (
        <div className="bg-[url('../public/images/images-diary/dariusz-sankowski-3OiYMgDKJ6k-unsplash.webp')] bg-cover bg-center flex justify-self-center items-center flex-col overflow-y-scroll w-full h-[100%]">
            <button
                className="bg-slate-400 hover:bg-slate-500 text-white font-bold px-2 py-1 rounded-full self-end mt-3 mr-3"
                onClick={() => setViewDiarySidebar(false)}
            >
                X
            </button>
            <card
                className="border mt-5 w-80 border-gray-100 rounded-lg hover:shadow-lg align-center"
                key={viewDiarySidebar._id}
            >
                <a href="">
                    <img
                        src={
                            viewDiarySidebar.titleImage
                                ? viewDiarySidebar.titleImage
                                : "../../images/images-trip/TripPlaceholder.webp"
                        }
                        className="rounded-t-lg h-56 object-cover"
                    />
                </a>
                <div className="bg-slate-100 w-80">
                    <div className="flex justify-between viewDiarySidebars-center pt-2 px-2">
                        {viewDiarySidebar.location.city !== "" &&
                        viewDiarySidebar.location.country !== "" ? (
                            <p className="italic p-2 text-xs text-gray-500">
                                {viewDiarySidebar.location.city},{" "}
                                {viewDiarySidebar.location.country}
                            </p>
                        ) : null}
                        <p className="italic p-2 text-xs text-gray-500 text-center">
                            {viewDiarySidebar.date}
                        </p>
                    </div>
                    <p className="font-bold pt-2 text-center text-lg">
                        {viewDiarySidebar.diaryName}
                    </p>
                    <p
                        className="font-semibold px-2 py-0.5 text-sm text-gray-500 text-center cursor-pointer"
                        onClick={() =>
                            handleOpenFriendPage(viewDiarySidebar.authorName)
                        }
                    >
                        by {viewDiarySidebar.authorName}
                    </p>

                    <p className="px-10 pt-4 pb-5 text-gray-500 text-center">
                        {viewDiarySidebar.description}
                    </p>
                </div>
            </card>
            <div>
                <article className="grid grid-cols-2 gap-4 w-full px-3 pb-3 pt-5">
                    {viewDiarySidebar.images.length > 0 ? showImages() : null}
                </article>
            </div>
        </div>
    );
}

export default TripViewRouteSidebar;
