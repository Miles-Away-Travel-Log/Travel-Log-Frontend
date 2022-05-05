import React from "react";
import { Bars } from "react-loader-spinner";
import { useAppData } from "../../Context/DataStorage.js";

function LoaderTest() {
    const {
        userId,
        user,
        accountPhoto,
        handleGetUser,
        newHome,
        setNewHome,
        defaultMapStyle,
        setDefaultMapStyle,
    } = useAppData();

    console.log("user", user);
    return (
        <div className="w-screen h-screen grid place-content-center content-center">
            {user.userName && <div className="text-5xl font-bold">{user.userName}</div>}
            {!user.userName && (
                // <div>
                //     <Bars color="#00BFFF" height={80} width={80} />
                // </div>
                <div>LOADING</div>
            )}
        </div>
    );
}

export default LoaderTest;
