import React from "react";
import ListIncomeExpense from "../../components/Budget.ListIncomeExpense.js";
import { useAppData } from "../../Context/DataStorage.js";

function Transactions() {
    const { budgetItems } = useAppData();

    return (
        <div className="w-screen">
            <ListIncomeExpense budgetItems={budgetItems} />
        </div>
    );
}

export default Transactions;
