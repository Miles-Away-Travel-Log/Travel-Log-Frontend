import React from "react";

function TripDiary({ tripDiary }) {
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
                            <p className="font-bold pt-3 pb-2 text-center">
                                {item.diaryName}
                            </p>
                            {item.location.city !== "" &&
                            item.location.country !== "" ? (
                                <p className="italic p-2 text-sm text-gray-500 text-center">
                                    {item.location.city} ,{" "}
                                    {item.location.country}
                                </p>
                            ) : null}
                            <p className="p-2 text-sm text-gray-500 text-center">
                                {item.date}
                            </p>
                            <p className="font-semibold p-2 text-sm text-gray-500 text-center">
                                by {item.authorName}
                            </p>

                            <p className="px-10 py-2 text-gray-500 text-center">
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
        <div className="flex items-center flex-wrap p-10 mt-8 mb-8">
            {showContent()}
        </div>
    );
}

export default TripDiary;
