import React, { useState } from "react";
import { FcHeadset } from "react-icons/fc";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdCalculate } from "react-icons/md";
import { GiThreeFriends } from "react-icons/gi";
import { MdHotel } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { AiFillPicture } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import { GiCompass } from "react-icons/gi";
import { SiYourtraveldottv } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";
import { GrLinkedinOption, GrInstagram } from "react-icons/gr";
import { FaXing } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";
import { TiWeatherStormy } from "react-icons/ti";
import { GiNotebook } from "react-icons/gi";
import { HiMenu } from "react-icons/hi";
import { GiMoneyStack } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
import { BiMap } from "react-icons/bi";

export const icons = {
    IoIosArrowForward,
    IoIosArrowBack,
    GrLinkedinOption,
    GrInstagram,
    FaXing,
    FaUserAlt: <FaUserAlt />,
};

export const clickables = [
    {
        path: "/",
        icon: <MdCalculate />,
    },
    {
        path: "/",
        icon: <GiThreeFriends />,
    },
    {
        path: "/",
        icon: <MdHotel />,
    },
    {
        path: "/",
        icon: <AiFillLock />,
    },
    {
        path: "/",
        icon: <FaUserAlt />,
    },
    {
        path: "/",
        icon: <AiFillPicture />,
    },
    {
        path: "/",
        icon: <ImStatsBars />,
    },
    {
        path: "/",
        icon: <GiCompass />,
    },
    {
        path: "/",
        icon: <SiYourtraveldottv />,
    },
    {
        path: "/",
        icon: <FaGlobe />,
    },
    {
        path: "/",
        icon: <MdFoodBank />,
    },
    {
        path: "/",
        icon: <TiWeatherStormy />,
    },
    {
        path: "/",
        icon: <GiNotebook />,
    },
    {
        path: "/",
        icon: <HiMenu />,
    },
    {
        path: "/",
        icon: <GiMoneyStack />,
    },
    {
        path: "/",
        icon: <FaUserFriends />,
    },
    {
        path: "/",
        icon: <BiMap />,
    },
];
