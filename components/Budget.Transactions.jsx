import React from "react";
import ListIncomeExpense from "./Budget.ListIncomeExpense.jsx";
import { useAppData } from "../Context/DataStorage.js";

function Transactions({ tripID }) {
    const { tripBudget } = useAppData();
    return (
        <div className="w-screen">
            <ListIncomeExpense budgetItems={tripBudget} tripID={tripID} />
        </div>
    );
}

export default Transactions;
