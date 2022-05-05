import React from "react";
import ListIncomeExpense from "../../components/Budget.ListIncomeExpense.jsx";
import { useAppData } from "../../Context/DataStorage.js";
import Navbar from "../../components/Navbar.jsx";

function Transactions() {
    const { budgetItems } = useAppData();

    return (
        <div className="w-screen">
            <ListIncomeExpense budgetItems={budgetItems} />
            <Navbar/>

        </div>
    );
}

export default Transactions;
