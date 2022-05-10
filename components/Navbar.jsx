import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { icons, clickables } from "./menu.jsx";
import { useAppData } from "../Context/DataStorage.js";

function Navbar() {
    const router = useRouter();
    const { buttonIndex, setButtonIndex, user } = useAppData();

    const [buttonWidth, setButtonWidth] = useState(0);
    // const [menuWidth, setMenuWidth] = useState(0);
    // const [buttonIndex, setButtonIndex] = useState(0);
    const buttonRef = useRef(null);
    const marginButtons = buttonWidth / 7;
    const buttonContainer = buttonWidth + marginButtons;

    useEffect(() => {
        setButtonWidth(buttonRef.current.offsetWidth + marginButtons);
        // setMenuWidth(menuRef.current.offsetWidth);
    }, []);

    return (
        <div className="App">
            <menu className="menu">
                <button
                    ref={buttonRef}
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
                    ref={buttonRef}
                    title="budget"
                    className={
                        buttonIndex === 1 ? "menu__item active" : "menu__item"
                    }
                    style={{
                        backgroundColor: "#90A5A9",
                        marginRight: marginButtons,
                    }}
                >
                    <div
                        className="icon navIcon text-white flex justify-center flex"
                        viewBox="0 0 24 24"
                        onClick={() => {
                            setButtonIndex(1);
                            router.replace("/user/budget");
                        }}
                    >
                        {clickables[0].icon}
                    </div>
                </button>

                <button
                    ref={buttonRef}
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
                    ref={buttonRef}
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
                    ref={buttonRef}
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
                        onClick={() => setButtonIndex(1)}
                    >
                        {clickables[11].icon}
                    </div>
                </button>

                <button
                    ref={buttonRef}
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
                            router.replace("/user/diary");
                        }}
                    >
                        {clickables[12].icon}
                    </div>
                </button>

                <button
                    ref={buttonRef}
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
                        left: buttonIndex * buttonWidth,
                        width: buttonContainer * 2 - marginButtons * 3,
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
