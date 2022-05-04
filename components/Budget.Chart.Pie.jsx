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

    // Alle Kategorien aus dem BudgetItem Array werden in ein neues Array gespeichert
    const listCategory = budgetItems.map((item) => item.category);

    // listCategory wird in ein neues Array gespeichert, welches nur die Kategorien enthält, die nicht doppelt vorkommen
    const labels = [...new Set(listCategory)];

    // Für jede Kategorie wird die Gesamtsumme berechnet und in ein neues Array gespeichert
    const sumIncomeExpensePerCategory = labels.map((label) => {
        const filter_sum = budgetItems
            .filter((item) => item.category === label)
            .reduce((acc, item) => acc + item.value, 0);
        return [label, filter_sum];
    });

    const listLabel = sumIncomeExpensePerCategory.map((item) => item[0]);
    const listValue = sumIncomeExpensePerCategory.map((item) => item[1]);

    // Hier wird das vorhandene Budget berechnet
    const availableMoney =
        seedMoney.length != 0
            ? seedMoney[0].total -
              listValue.reduce((acc, item) => acc + item, 0)
            : 0;

    // Hier wird zufällig ein Farbwert erzeugt
    function colorGenerator() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);

        const colorCode = "#" + randomColor;
        return colorCode;
    }

    // Hier werden die Farben für die Kategorien gespeichert
    const createColor = labels.map((label) => colorGenerator());

    // Einstellungen für das Pie Chart
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

    // Hier werden die Daten für das Pie Chart gespeichert
    const data = {
        labels: ["Available money", ...listLabel],
        datasets: [
            {
                label: "# of Votes",
                data: [availableMoney, ...listValue],
                backgroundColor: ["#33CC33", ...createColor],
                borderColor: ["#33CC33", ...createColor],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex items-center w-full lg:w-1/3">
            <Pie options={options} data={data} />
        </div>
    );
}

export default PieChart;
