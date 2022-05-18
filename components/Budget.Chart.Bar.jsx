import React, { useEffect } from "react";
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
    const { tripBudget } = useAppData();
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

    // Alle Daten (Datum) aus dem BudgetItem Array werden in ein neues Array gespeichert
    const listDates = tripBudget.map((item) => item.date);

    // listDates wird in ein neues Array gespeichert, welches nur die Daten enthält, die nicht doppelt vorkommen
    const labels = [...new Set(listDates)];

    // Für jedes Datum wird die Summe des Einkommens und die Summe der Ausgaben berechnet und in ein neues Array gespeichert
    const totalIncomeExpensePerDate = labels.map((label) => {
        const listIncomeExpenseForLabel = tripBudget.filter(
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
                data: totalIncomeExpensePerDate.map((item) => item[0]),
                backgroundColor: "rgba(80, 231, 138, 1)",
            },
            {
                label: "Expense",
                data: totalIncomeExpensePerDate.map((item) => item[1]),
                backgroundColor: "rgba(244, 50, 138, 1)",
            },
        ],
    };
    return (
        <div className="flex justify-center items-center pb-16">
            <div className="w-full lg:w-2/4 mt-10">
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}

export default BarChart;
