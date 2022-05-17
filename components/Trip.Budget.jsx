import React, { useState } from "react";
import BudgetSeedMoney from "./Budget.SeedMoney.jsx";
import BudgetIncomeExpense from "./Budget.IncomeExpense.jsx";
import BalanceSheet from "./Budget.BalanceSheet.jsx";
import Transactions from "./Budget.Transactions.jsx";
import { useAppData } from "../Context/DataStorage.js";
import Chart from "./Budget.Charts.jsx";

function TripBudget({ tripID }) {
    const {
        handlePostSeedMoney,
        handleDeleteSeedMoney,
        homeCurrency,
        setHomeCurrency,
        tripSeedMoney,
        setTripSeedMoney,
        tripBudget,
        setTripBudget,
        isActivePageBudget,
        setIsActivePageBudget,
    } = useAppData();
    return (
        <div className="flex flex-col justify-center items-center mt-8 mb-8 p-6">
            {isActivePageBudget === "budget" && (
                <div className="w-full flex flex-col justify-center items-center">
                    <BudgetSeedMoney
                        tripSeedMoney={tripSeedMoney}
                        tripID={tripID}
                    />
                    <BudgetIncomeExpense
                        tripSeedMoney={tripSeedMoney}
                        tripBudget={tripBudget}
                        tripID={tripID}
                    />
                    <BalanceSheet
                        tripSeedMoney={tripSeedMoney}
                        tripBudget={tripBudget}
                    />
                    <div className="m-1 mb-8 flex justify-center ">
                        <button
                            className="p-4 m-1 w-full text-center py-3 rounded-full bg-[#942928] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            onClick={() =>
                                setIsActivePageBudget("transactions")
                            }
                        >
                            Transactions
                        </button>
                        <button
                            className="p-5 m-1 w-full text-center py-3 rounded-full bg-[#942928] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            onClick={() => setIsActivePageBudget("charts")}
                        >
                            Chart
                        </button>
                    </div>
                </div>
            )}
            {isActivePageBudget === "transactions" && (
                <Transactions tripID={tripID} />
            )}
            {isActivePageBudget === "charts" && <Chart />}
        </div>
    );
}

export default TripBudget;
