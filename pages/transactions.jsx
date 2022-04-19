import React from "react";
import ListIncomeExpense from "../components/ListIncomeExpense.js";
import { useAppData } from "../Context/DataStorage.js";

function Transactions() {
    const { budgetItems } = useAppData();

    return (
        <div>
            <ListIncomeExpense budgetItems={budgetItems} />
        </div>
    );
}

export default Transactions;
