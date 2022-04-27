import React from "react";
import { useAppData } from "../Context/DataStorage.js";
import { BsArrowDownCircle } from "react-icons/bs";
import { BsArrowUpCircle } from "react-icons/bs";

function BalanceSheet() {
    const { budgetItems, seedMoney, homeCurrency } = useAppData();

    const listIncome = budgetItems.filter((item) => item.type === "income");
    const listExpense = budgetItems.filter((item) => item.type === "expense");

    const sumIncome = listIncome.reduce((acc, item) => {
        acc += item.value;
        return acc;
    }, 0);
    const sumExpense = listExpense.reduce((acc, item) => {
        acc += item.value;
        return acc;
    }, 0);
    const balance =
        (seedMoney.length !== 0 ? seedMoney[0].total : 0) +
        sumIncome -
        sumExpense;
    //const balance = JSON.stringify(seedMoney);
    return (
        <div className="flex justify-center bg-white w-full mt-6 p-2">
            <div className="bg-white rounded-lg w-3/4 lg:w-1/2 xl:w-1/3 p-4 shadow border border-gray-600">
                <div>
                    <span className="text-gray-900 relative inline-block date uppercase font-medium tracking-widest">
                        {new Date().toLocaleDateString()}
                    </span>
                    <div className="flex mb-2 mt-2 items-center">
                        <div
                            className={
                                balance > 0
                                    ? "w-9/12 text-green-500"
                                    : "w-9/12 text-red-500"
                            }
                        >
                            <span className="text-2xl font-semibold block">
                                Total: {balance} {homeCurrency}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex mb-2 justify-center items-center">
                        <BsArrowUpCircle className="text-green-500 w-1/12" />
                        <div className="w-9/12 ml-2">
                            <span className="text-m font-semibold block">
                                Income: {sumIncome.toFixed(2)} {homeCurrency}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex mb-2 justify-center items-center">
                        <BsArrowDownCircle className="text-red-500 w-1/12" />
                        <div className="w-9/12 ml-2">
                            <span className="text-m font-semibold block">
                                Expenxe: {sumExpense.toFixed(2)} {homeCurrency}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BalanceSheet;
