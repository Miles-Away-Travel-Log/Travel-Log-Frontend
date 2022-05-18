import React from "react";
import BudgetSeedMoney from "./Budget.SeedMoney.jsx";
import BudgetIncomeExpense from "./Budget.IncomeExpense.jsx";
import BalanceSheet from "./Budget.BalanceSheet.jsx";
import { useAppData } from "../Context/DataStorage.js";

function TripBudget({ tripID }) {
    const { tripSeedMoney, tripBudget } = useAppData();
    return (
        <div className="flex flex-col justify-center items-center mt-8 mb-32 p-6">
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
            </div>
        </div>
    );
}

export default TripBudget;
