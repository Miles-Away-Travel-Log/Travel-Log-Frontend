import React from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    defaults,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { useAppData } from "../Context/DataStorage.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

defaults.plugins.tooltip.enabled = true;

function PieChart() {
    const { budgetItems, seedMoney } = useAppData();

    const listCategory = budgetItems.map((item) => item.category);
    const labels = [...new Set(listCategory)];

    const sum = labels.map((label) => {
        const filter_sum = budgetItems
            .filter((item) => item.category === label)
            .reduce((acc, item) => acc + item.value, 0);
        return [label, filter_sum];
    });

    const sumLabel = sum.map((item) => item[0]);
    const sumValue = sum.map((item) => item[1]);

    const availableMoney =
        seedMoney[0].total - sumValue.reduce((acc, item) => acc + item, 0);

    function colorGenerator() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        const colorCode = "#" + randomColor;
        return colorCode;
    }

    const createColor = labels.map((label) => colorGenerator());
    const options = {
        plugins: {
            legend: {
                position: "bottom",
            },
            datalabels: {
                display: true,
                color: "#fff",
                anchor: "end",
                align: "start",
                offset: 10,
                borderWidth: 2,
                borderColor: "#fff",
                borderRadius: 25,
                backgroundColor: (context) => {
                    return context.dataset.backgroundColor;
                },
                font: {
                    weight: "bold",
                    size: "14",
                },
                formatter: (value) => {
                    return value + " " + "€";
                },
            },
        },
    };
    const data = {
        labels: ["Available money", ...sumLabel],
        datasets: [
            {
                label: "# of Votes",
                data: [availableMoney, ...sumValue],
                backgroundColor: ["#33CC33", ...createColor],
                borderColor: ["#33CC33", ...createColor],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex items-center w-1/3">
            <Pie options={options} data={data} />
        </div>
    );
}

export default PieChart;
