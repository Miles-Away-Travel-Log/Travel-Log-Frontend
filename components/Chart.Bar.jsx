import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppData } from "../Context/DataStorage.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
);

function BarChart() {
    const { budgetItems, seedMoney } = useAppData();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Balance chart",
            },
            datalabels: {
                display: false,
            },
        },

        scales: {
            yAxes: {
                ticks: {
                    callback: function (value) {
                        return value + " " + "€";
                    },
                },
            },
        },
    };

    const listDates = budgetItems.map((item) => item.date);
    const labels = [...new Set(listDates)];

    const sum = labels.map((label) => {
        const listIncomeExpenseForLabel = budgetItems.filter(
            (item) => item.date === label
        );
        const sumIncome = listIncomeExpenseForLabel
            .filter((item) => item.type === "income")
            .reduce((acc, item) => acc + item.value, 0);
        const sumExpense = listIncomeExpenseForLabel
            .filter((item) => item.type === "expense")
            .reduce((acc, item) => acc + item.value, 0);

        return [sumIncome, sumExpense];
    });

    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: sum.map((item) => item[0]),
                backgroundColor: "rgba(80, 231, 138, 1)",
            },
            {
                label: "Expense",
                data: sum.map((item) => item[1]),
                backgroundColor: "rgba(244, 50, 138, 1)",
            },
        ],
    };
    return (
        <div className="w-2/3">
            <Bar options={options} data={data} />
        </div>
    );
}

export default BarChart;
