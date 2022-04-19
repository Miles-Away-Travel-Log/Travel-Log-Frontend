import React from "react";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import BarChart from "../components/Chart.Bar.jsx";
import PieChart from "../components/Chart.Pie.jsx";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useRouter } from "next/router";

function Chart() {
    const [chart, setChart] = useState("");
    const router = useRouter();

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            <div className="w-full flex flex-row justify-around items-center">
                <MdKeyboardBackspace
                    className="text-[10rem]"
                    onClick={() => router.replace("budget")}
                />
                <FaChartBar
                    className="text-[10rem]"
                    onClick={() => setChart("bar")}
                />
                <FaChartPie
                    className="text-[10rem]"
                    onClick={() => setChart("pie")}
                />
            </div>
            <div className="flex justify-center items-center w-full h-full">
                {chart === "bar" ? (
                    <BarChart />
                ) : chart === "pie" ? (
                    <PieChart />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default Chart;
