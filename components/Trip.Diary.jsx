import React from "react";
import { useRouter } from "next/router";

function TripDiary({ tripDiary }) {
    const router = useRouter();

    function handleOpenFriendPage(id) {
        router.replace(`/user/${id}`);
    }

    function showContent() {
        if (tripDiary.length > 0) {
            return tripDiary.map((item, index) => {
                return (
                    <card
                        className="border w-80 border-gray-100 rounded-lg hover:shadow-lg align-center mr-4"
                        key={index}
                    >
                        <a href="">
                            <img
                                src={
                                    item.titleImage
                                        ? item.titleImage
                                        : "../../images/images-trip/TripPlaceholder.webp"
                                }
                                className="rounded-t-lg h-56 object-cover"
                            />
                        </a>
                        <div className="bg-slate-100 w-80">
                            <div className="flex justify-between items-center pt-2 px-2">
                                {item.location.city !== "" &&
                                item.location.country !== "" ? (
                                    <p className="italic p-2 text-xs text-gray-500">
                                        {item.location.city},{" "}
                                        {item.location.country}
                                    </p>
                                ) : null}
                                <p className="italic p-2 text-xs text-gray-500 text-center">
                                    {item.date}
                                </p>
                            </div>
                            <p className="font-bold pt-2 text-center text-lg">
                                {item.diaryName}
                            </p>
                            <p
                                className="font-semibold px-2 py-0.5 text-sm text-gray-500 text-center cursor-pointer"
                                onClick={() =>
                                    handleOpenFriendPage(item.authorName)
                                }
                            >
                                by {item.authorName}
                            </p>

                            <p className="px-10 pt-4 pb-5 text-gray-500 text-center">
                                {item.description}
                            </p>
                        </div>
                    </card>
                );
            });
        } else {
            return (
                <div>
                    <h3>No Diary</h3>
                </div>
            );
        }
    }
    return (
        <div className="flex items-center flex-wrap px-10 mt-8">
            {showContent()}
        </div>
    );
}

export default TripDiary;
