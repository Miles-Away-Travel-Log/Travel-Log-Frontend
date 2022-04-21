import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { GrDocumentPdf, GrDocumentCsv } from "react-icons/gr";
import { CSVLink } from "react-csv";
import { useAppData } from "../Context/DataStorage.js";

function ListIncomeExpense({ budgetItems }) {
    const { userId } = useAppData();
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);

    function backToBudget() {
        router.replace("/budget");
    }
    function handleDropdown() {
        if (!showDropdown) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    }

    async function exportToPDF() {
        try {
            const fetchPDFFromServer = await fetch(
                process.env.NEXT_PUBLIC_FETCH_URL_PDF + `/${userId}`
            );
            if (fetchPDFFromServer.status === 200) {
                const pdf = await fetchPDFFromServer.blob();
                const fileURL = URL.createObjectURL(pdf);
                window.open(fileURL);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const data = budgetItems.map((item) => {
        return {
            date: item.date,
            type: item.type,
            category: item.category,
            value: item.value,
            description: item.description,
        };
    });
    const headers = [
        {
            label: "Date",
            key: "date",
        },
        {
            label: "Type",
            key: "type",
        },
        {
            label: "Category",
            key: "category",
        },
        {
            label: "Value",
            key: "value",
        },
        {
            label: "Description",
            key: "description",
        },
    ];

    const csvLink = {
        filename: "income-expense.csv",
        headers: headers,
        data: data,
    };

    // Alle Daten (Datum) aus dem BudgetItem Array werden in ein neues Array gespeichert
    const listDates = budgetItems.map((item) => item.date);

    // listDates wird in ein neues Array gespeichert, welches nur die Daten enthält, die nicht doppelt vorkommen
    const labels = [...new Set(listDates)];

    const listOfItemsForEachDate = labels.map((label) => {
        const filter = budgetItems
            .filter((item) => item.date === label)
            .map((item) => {
                return {
                    date: item.date,
                    type: item.type,
                    category: item.category,
                    value: item.value,
                    description: item.description,
                };
            });

        return filter;
    });

    function createItem() {
        return listOfItemsForEachDate.map((cV) => {
            return (
                <div key={cV[0].date}>
                    <span className="text-gray-900 relative inline-block date uppercase font-medium tracking-widest">
                        {cV[0].date}
                    </span>
                    {cV.map((item) => {
                        return (
                            <div className="flex mb-2 ml-6 mt-2" key={item._id}>
                                <div className="w-1/12">
                                    {item.type === "income" ? (
                                        <span className="bg-green-400 h-2 w-2 rounded-full block mt-2"></span>
                                    ) : (
                                        <span className="bg-red-400 h-2 w-2 rounded-full block mt-2"></span>
                                    )}
                                </div>
                                <div className="w-9/12">
                                    <span className="text-sm font-semibold block">
                                        {item.category}
                                    </span>
                                    <span className="text-sm">
                                        {item.value} €
                                    </span>
                                    <br />
                                    <span className="text-sm">
                                        {item.description}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    }
    return (
        <div>
            <button
                className="bg-fuchsia-500 border border-solid shadow rounded-full w-[200px] h-[50px]"
                onClick={backToBudget}
            >
                Back to Budget
            </button>
            <div className="flex justify-center w-full pt-16">
                <div
                    className="bg-white rounded-lg w-3/4 lg:w-1/2 xl:w-1/3 p-4 border border-gray-600"
                    id="content-pdf"
                >
                    {createItem()}
                </div>
                <div className="w-1/2 hidden">{createItem()}</div>
                <div
                    id="dropdown"
                    className={
                        (showDropdown === true ? "visible" : "hidden") +
                        " z-10 w-16 text-base list-none rounded divide-y divide-gray-100 h-[100px] absolute right-[40px] lg:right-[640px]"
                    }
                    data-popper-reference-hidden=""
                    data-popper-escaped=""
                    data-popper-placement="top"
                >
                    <ul className="py-1" aria-labelledby="dropdownButton">
                        <li title="Download as PDF">
                            <GrDocumentPdf
                                className="text-[2rem] mt-2 cursor-pointer"
                                onClick={exportToPDF}
                            />
                        </li>
                        <li title="Download as CSV">
                            <CSVLink {...csvLink}>
                                <GrDocumentCsv className="text-[2rem] mt-2" />
                            </CSVLink>
                        </li>
                    </ul>
                </div>
                <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="sm:inline-block text-white dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg text-sm p-1.5 h-[50px]"
                    type="button"
                    onClick={handleDropdown}
                >
                    <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ListIncomeExpense;
