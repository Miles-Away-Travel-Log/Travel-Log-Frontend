import React from "react";
import { useAppData } from "../Context/DataStorage.js";
import { useState, useEffect } from "react";
import { createOptionsForUnits } from "./Budget.CreateOptionsForUnits.jsx";
import { exchangeUnits } from "./Budget.ExchangeUnits.js";

function BudgetIncomeExpense() {
    const {
        handlePostBudgetItem,
        setIncomeOrExpense,
        incomeOrExpense,
        setCategory,
        homeCurrency,
        category,
        localCurrencyValueInHomeCurrency,
        setLocalCurrencyValueInHomeCurrency,
    } = useAppData();

    const [localCurrency, setLocalCurrency] = useState("EUR");
    const [localCurrencyValue, setLocalCurrencyValue] = useState(0);

    function handleSelectIncomeExpense(e) {
        setIncomeOrExpense(e.target.value);
    }
    function handleLocalCurrency(e) {
        setLocalCurrency(e.target.value);
    }
    function handleLocalCurrencyValue(e) {
        setLocalCurrencyValue(e.target.value);
    }
    function handleCategory(e) {
        setCategory(e.target.value);
    }

    useEffect(() => {
        async function calculateExchange(e) {
            if (localCurrencyValue === "") {
                setLocalCurrencyValueInHomeCurrency("");
            }
            const fetchAndConvertLocalCurrencyToEUR = await fetch(
                "https://v6.exchangerate-api.com/v6/" +
                    process.env.NEXT_PUBLIC_EXCHANGE_KEY +
                    "/pair" +
                    `/${localCurrency}` +
                    `/${homeCurrency}` +
                    `/${localCurrencyValue}`
            );
            const response = await fetchAndConvertLocalCurrencyToEUR.json();
            setLocalCurrencyValueInHomeCurrency(response.conversion_result);
        }
        calculateExchange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCurrencyValue]);

    useEffect(() => {
        async function calculateExchange(e) {
            if (localCurrencyValue === "") {
                setLocalCurrencyValueInHomeCurrency("");
            }
            const fetchAndConvertLocalCurrencyToEUR = await fetch(
                "https://v6.exchangerate-api.com/v6/" +
                    process.env.NEXT_PUBLIC_EXCHANGE_KEY +
                    "/pair" +
                    `/${localCurrency}` +
                    `/${homeCurrency}` +
                    `/${localCurrencyValue}`
            );
            const response = await fetchAndConvertLocalCurrencyToEUR.json();
            setLocalCurrencyValueInHomeCurrency(response.conversion_result);
        }
        calculateExchange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localCurrency]);

    return (
        <div>
            <form
                className="flex flex-col w-[375px] p-2"
                onSubmit={handlePostBudgetItem}
            >
                <fieldset
                    className={
                        incomeOrExpense === "income"
                            ? "flex flex-col border-solid border-2 border-[#90A5A9] justify-center items-center rounded-3xl"
                            : "flex flex-col border-solid border-2 border-[#942928] justify-center items-center rounded-3xl"
                    }
                >
                    <legend className="mb-2 bg-white text-[#942928]">
                        <select
                            className="bg-white"
                            name="income-expense"
                            id="income-expense"
                            onChange={handleSelectIncomeExpense}
                        >
                            <option value="expense">EXPENSE</option>
                            <option value="income">INCOME</option>
                        </select>
                    </legend>
                    <input
                        type="date"
                        name="date"
                        className="block border border-grey-light w-2/3 h-1/2 rounded-full pl-2 text-[#C4C4C4]"
                    />
                    <div className="flex flex-col justify-around mt-2 items-center">
                        <input
                            className="block border border-grey-light w-2/3 p-3 rounded-full mb-2 h-1/4 mt-2"
                            type="text"
                            name="localcurrency"
                            onChange={handleLocalCurrencyValue}
                            placeholder={
                                incomeOrExpense === "income"
                                    ? "Income in local currency"
                                    : "Expense in local currency"
                            }
                        />
                        <select
                            name="exchange"
                            id="exchange"
                            className="h-1/4 w-2/3 rounded-full pl-2 text-[#942928]"
                            onChange={handleLocalCurrency}
                        >
                            <option value="currency">Local currency</option>
                            {createOptionsForUnits(exchangeUnits)}
                        </select>

                        <input
                            type="text"
                            name="amount"
                            placeholder={
                                incomeOrExpense === "income"
                                    ? "Income in EUR"
                                    : "Expense in EUR"
                            }
                            disabled
                            value={localCurrencyValueInHomeCurrency}
                            className="w-2/3 h-1/4 bg-gray-300 rounded-full pl-2 mt-2 mb-2"
                        />
                    </div>
                    {incomeOrExpense === "income" ? (
                        <select
                            name="income"
                            id="income"
                            value={category}
                            className="w-1/2 h-1/2 rounded-full mb-2 pl-2 text-[#942928]"
                            onChange={handleCategory}
                        >
                            <option value="general">General</option>
                            <option value="salary">Salary</option>
                            <option value="present">Present</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <select
                            name="expense"
                            value={category}
                            id="expense"
                            className="w-1/2 h-1/2 rounded-full mb-2 pl-2 text-[#942928]"
                            onChange={handleCategory}
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
                            <option value="other">Other</option>
                        </select>
                    )}
                    <textarea
                        name="description"
                        cols="20"
                        rows="10"
                        className="border border-grey-light mb-2 pl-2"
                        placeholder="Your message ..."
                    ></textarea>
                    <button
                        type="submit"
                        className="w-1/2 text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    >
                        Add
                    </button>
                </fieldset>
            </form>
        </div>
    );
}

export default BudgetIncomeExpense;
