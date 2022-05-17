import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { icons, clickables } from "./menu.jsx";
import { useAppData } from "../Context/DataStorage.js";

function Navbar() {
 
    const router = useRouter();
    const { buttonIndex, setButtonIndex, user } = useAppData();

    const [buttonWidth, setButtonWidth] = useState(0);
    const [buttonRefState, setButtonRefState] = useState([]);

    const buttonRefUser = useRef(null);
    const buttonRefBudget = useRef(null);
    const buttonRefFriends = useRef(null);
    const buttonRefMap = useRef(null);
    const buttonRefWeather = useRef(null);
    const buttonRefDiary = useRef(null);
    const buttonRefMenu = useRef(null);

    const buttonRefArray = [
        buttonRefUser,
        buttonRefBudget,
        buttonRefFriends,
        buttonRefMap,
        buttonRefWeather,
        buttonRefDiary,
        buttonRefMenu,
    ];

    const marginButtons = buttonWidth / 7;
    const buttonContainer = buttonWidth + marginButtons;

    useEffect(() => {
        setButtonWidth(buttonRefUser.current.offsetWidth + marginButtons);
        const buttonRefArrayPositions = buttonRefArray.map(
            (buttonRef) => buttonRef.current.offsetLeft
        );
        setButtonRefState(buttonRefArrayPositions);
    }, []);

    useEffect(() => {
        switch ("routerPathnaem:",router.pathname) {
            case `/user/${user.userName}`:
                return setButtonIndex(0);
            case "/user/budget":
                return setButtonIndex(1);
            case "/user/friends":
                return setButtonIndex(2);
            case "/map":
                return setButtonIndex(3);
            case "/weather":
                return setButtonIndex(4);
            case "/location/[city]":
                return setButtonIndex(4);
            case "/user/newTrip":
                return setButtonIndex(5);
            case "/dummy":
                return setButtonIndex(6);
            default:
                return setButtonIndex(0);
        }
    }, [router.pathname]);

    return (
        <div className="App">
            <menu className="menu">
                <button
                    ref={buttonRefUser}
                    title="user profile"
                    className={
                        buttonIndex === 0 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => {
                        setButtonIndex(0);
                        router.replace(`/user/${user.userName}`);
                    }}
                >
                    <div
                        className="icon navIcon text-white flex justify-center "
                        viewBox="0 0 24 24"
                    >
                        {clickables[4].icon}
                    </div>
                </button>

                <button
                    ref={buttonRefBudget}
                    title="budget"
                    className={
                        buttonIndex === 1 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => {
                        setButtonIndex(1);
                        router.replace("/user/budget");
                    }}
                >
                    <div
                        className="icon navIcon text-white flex justify-center flex"
                        viewBox="0 0 24 24"
                    >
                        {clickables[0].icon}
                    </div>
                </button>

                <button
                    ref={buttonRefFriends}
                    title="friends"
                    className={
                        buttonIndex === 2 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => {
                        setButtonIndex(2);
                        router.replace("/user/friends");
                    }}
                >
                    <div
                        className="icon navIcon text-white flex justify-center flex"
                        viewBox="0 0 24 24"
                        onClick={() => setButtonIndex(1)}
                    >
                        {clickables[1].icon}
                    </div>
                </button>

                <button
                    ref={buttonRefMap}
                    className={
                        buttonIndex === 3 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => setButtonIndex(3)}
                >
                    <div
                        className="icon navIcon text-white flex justify-center flex"
                        viewBox="0 0 24 24"
                        onClick={() => setButtonIndex(3)}
                    >
                        {clickables[9].icon}
                    </div>
                </button>

                <button
                    ref={buttonRefWeather}
                    className={
                        buttonIndex === 4 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => setButtonIndex(4)}
                >
                    <div
                        className="icon navIcon text-white flex justify-center flex"
                        viewBox="0 0 24 24"
                        onClick={() => {
                            setButtonIndex(4);
                            router.replace("/weather");
                        }}
                    >
                        {clickables[11].icon}
                    </div>
                </button>

                <button
                    ref={buttonRefDiary}
                    className={
                        buttonIndex === 5 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => setButtonIndex(5)}
                >
                    <div
                        className="icon navIcon text-white flex justify-center flex"
                        viewBox="0 0 24 24"
                        onClick={() => {
                            setButtonIndex(5);
                            router.replace("/user/newTrip");
                        }}
                    >
                        {clickables[12].icon}
                    </div>
                </button>

                <button
                    ref={buttonRefMenu}
                    className={
                        buttonIndex === 6 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                    onClick={() => setButtonIndex(6)}
                >
                    <div
                        className="icon navIcon text-white flex justify-center"
                        viewBox="0 0 24 24"
                        onClick={() => {
                            setButtonIndex(6);
                            router.replace("/dummy");
                        }}
                    >
                        {clickables[13].icon}
                    </div>
                </button>

                <div
                    className="menu__border"
                    style={{
                        // left: buttonIndex * (buttonWidth+(marginButtons*0.5))+(buttonIndex/100*75),
                        left:
                            buttonRefState[buttonIndex] &&
                            buttonRefState[buttonIndex] -
                                buttonContainer +
                                buttonIndex * marginButtons,
                        width: buttonContainer * 2,
                    }}
                ></div>
            </menu>

            <div className="svg-container">
                <svg viewBox="0 0 202.9 45.5">
                    <clipPath
                        id="menu"
                        clipPathUnits="objectBoundingBox"
                        transform="scale(0.0049285362247413 0.021978021978022)"
                    >
                        <path
                            d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z"
                        />
                    </clipPath>
                </svg>
            </div>
        </div>
    );
}

export default Navbar;
