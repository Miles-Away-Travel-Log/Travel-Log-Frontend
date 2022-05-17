import React from "react";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import BarChart from "./Budget.Chart.Bar.jsx";
import PieChart from "./Budget.Chart.Pie.jsx";
import { useState } from "react";
import { useAppData } from "../Context/DataStorage.js";

function Chart() {
    const [chart, setChart] = useState("");
    const { setIsActivePageBudget } = useAppData();
    return (
        <div className="m-3 w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col items-center">
                <div className="bg-[#C4C4C4] w-full rounded-lg text-white p-1 text-center mb-3">
                    <h2>CHARTS</h2>
                </div>

                <div className="bg-[#C4C4C4] w-full rounded-lg text-white text-center p-5 flex flex-col items-center">
                    <FaChartBar
                        className="text-[4rem] lg:text-[10rem] cursor-pointer mt-3 mb-3 hover:text-[#942928]"
                        onClick={() => setChart("bar")}
                    />
                    <FaChartPie
                        className="text-[4rem] lg:text-[10rem] cursor-pointer mb-3 hover:text-[#942928]"
                        onClick={() => setChart("pie")}
                    />
                </div>
                <button
                    className="m-7 bg-[#90A5A9] text-white  border border-solid shadow rounded-full w-[200px] h-[50px]"
                    onClick={() => setIsActivePageBudget("budget")}
                >
                    Back to Budget
                </button>
            </div>
            <div className="flex justify-center items-center w-full mb-7">
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
