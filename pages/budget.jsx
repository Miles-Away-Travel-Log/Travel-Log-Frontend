import { useState } from "react";
import { useAppData } from "../Context/DataStorage.js";

export default function Budget() {
    const { userId } = useAppData();

    const [outIn, setOutIn] = useState("income");

    function handleSelectIncomeExpense(e) {
        setOutIn(e.target.value);
    }
    return (
        <div className="budgetplaner-container w-full flex justify-center items-center h-screen">
            <form className="flex flex-col w-[375px]">
                <fieldset
                    className={
                        outIn === "income"
                            ? "flex flex-col border-solid border-2 border-green-700 justify-center items-center"
                            : "flex flex-col border-solid border-2 border-orange-700 justify-center items-center"
                    }
                >
                    <legend className="mb-2 bg-white">
                        <select
                            className="bg-white"
                            name="income-expense"
                            id="income-expense"
                            onChange={handleSelectIncomeExpense}
                        >
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </legend>
                    <input
                        className="block border border-grey-light w-2/3 p-3 rounded-full mb-2 h-1/2 mt-2"
                        type="text"
                        placeholder={outIn === "income" ? "Income" : "Expense"}
                    />
                    {outIn === "income" ? (
                        <select
                            name="income"
                            id="income"
                            className="w-1/2 h-1/2 rounded-full mb-2 pl-2"
                        >
                            <option value="salary">Salary</option>
                            <option value="present">Present</option>
                        </select>
                    ) : (
                        <select
                            name="expense"
                            id="expense"
                            className="w-1/2 h-1/2 rounded-full mb-2 pl-2"
                        >
                            <option value="general">General</option>
                            <option value="food">Food</option>
                            <option value="drink">Drink</option>
                            <option value="publicTransport">
                                Public transport
                            </option>
                            <option value="car">Car</option>
                            <option value="hygiene">Hygiene</option>
                            <option value="medicine">Medicine</option>
                            <option value="clothing">Clothing</option>
                            <option value="mobile">Mobile</option>
                            <option value="present">Present</option>
                        </select>
                    )}
                    <textarea
                        name="message-expense"
                        cols="20"
                        rows="10"
                        className="border border-grey-light mb-2 pl-2"
                        placeholder="Your message ..."
                    ></textarea>
                    <button
                        type="submit"
                        className="w-1/2 text-center py-3 rounded-full bg-amber-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    >
                        Add
                    </button>
                </fieldset>
            </form>
        </div>
    );
}
