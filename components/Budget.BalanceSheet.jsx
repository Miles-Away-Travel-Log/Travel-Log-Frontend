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

    return (
        <div className="flex justify-center bg-white w-full mt-6 p-2">
            <div className="bg-white rounded-full w-3/4 lg:w-1/2 xl:w-1/3 p-4 shadow border-double border-4 border-[#90A5A9]">
                <div>
                    <span className="ml-6 relative inline-block  uppercase font-medium tracking-widest text-[#C4C4C4]">
                        {new Date().toLocaleDateString()}
                    </span>
                    <div className="flex mb-2 mt-2 items-center">
                        <div
                            className={
                                balance > 0
                                    ? "w-9/12 text-[#90A5A9]"
                                    : "w-9/12 text-[#942928]"
                            }
                        >
                            <span className=" ml-5 text-2xl font-semibold block ">
                                TOTAL: {balance} {homeCurrency}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex mb-2 justify-center items-center">
                        <BsArrowUpCircle className="text-green-500 w-1/12" />
                        <div className="w-9/12 ml-2">
                            <span className="text-m font-semibold block text-[#C4C4C4]">
                                Income: {sumIncome.toFixed(2)} {homeCurrency}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex mb-2 justify-center items-center">
                        <BsArrowDownCircle className="text-red-500 w-1/12" />
                        <div className="w-9/12 ml-2">
                            <span className="text-m font-semibold block text-[#C4C4C4]">
                                Expense: {sumExpense.toFixed(2)} {homeCurrency}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BalanceSheet;
