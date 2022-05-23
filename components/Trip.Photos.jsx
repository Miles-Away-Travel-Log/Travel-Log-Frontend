import React from "react";
import { useAppData } from "../Context/DataStorage.js";

function TripPhotos() {
    const { tripImages } = useAppData();

    function showImages() {
        return tripImages.flat().map((image, index) => {
            return (
                <div key={index} className="cursor-pointer relative">
                    <img
                        src={image}
                        className="foto w-full h-full object-cover"
                        alt={`image ${index}`}
                    />
                </div>
            );
        });
    }
    return (
        <div className="w-screen p-10">
            <article className="grid grid-cols-6 gap-10">
                {tripImages.length > 0 ? showImages() : <p>No images</p>}
            </article>
        </div>
    );
}

export default TripPhotos;
