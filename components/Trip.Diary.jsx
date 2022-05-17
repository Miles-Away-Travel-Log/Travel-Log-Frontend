import React, { useState } from "react";
import Cookies from "js-cookie";

function TripDiary({ tripDiary }) {
    function showContent() {
        if (tripDiary.length > 0) {
            return tripDiary.map((item, index) => {
                return (
                    <card
                        className="w-[375px] lg:w-1/5 border border-gray-100 rounded-lg hover:shadow-lg align-center"
                        key={index}
                    >
                        <a href="">
                            <img
                                src={item.titleImage}
                                className="rounded-t-lg w-full h-full object-cover"
                            />
                        </a>
                        <div className="bg-slate-100 h-full">
                            <p className="font-bold pt-3 pb-2 text-center">
                                {item.diaryName}
                            </p>

                            <p className="font-semibold p-2 text-sm text-gray-500 text-center">
                                by item.userName
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