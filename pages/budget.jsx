import { useAppData } from "../Context/DataStorage.js";
import BalanceSheet from "../components/BalanceSheet.js";
import { useRouter } from "next/router";

export default function Budget() {
    const router = useRouter();

    const {
        handlePostBudgetItem,
        handlePostSeedMoney,
        handleDeleteSeedMoney,
        budgetItems,
        setOutIn,
        outIn,
        category,
        setCategory,
        seedMoney,
        setSeedMoney,
    } = useAppData();

    function handleSelectIncomeExpense(e) {
        setOutIn(e.target.value);
    }

    function handleCategory(e) {
        setCategory(e.target.value);
    }

    function handleDeleteCurrentBudget(e) {
        e.preventDefault();
        setSeedMoney("");
    }

    // hier weiter machen
    //
    //

    return (
        <div className="w-full flex flex-col justify-center items-center h-full">
            {seedMoney.length !== 0 ? (
                <form
                    className="flex flex-col w-[375px] h-1/6 p-2"
                    onSubmit={handleDeleteSeedMoney}
                >
                    <fieldset className="flex flex-col border-solid border-2 border-blue-500 justify-center items-center">
                        <legend>Budget</legend>
                        <div className="bg-gray-400">
                            {seedMoney[0].total} €
                        </div>
                        <button className="w-1/2 text-center py-3 rounded-full bg-amber-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1">
                            Delete Current Budget
                        </button>
                    </fieldset>
                </form>
            ) : (
                <form
                    className="flex flex-col w-[375px] h-1/6 p-2"
                    onSubmit={handlePostSeedMoney}
                >
                    <fieldset className="flex flex-col border-solid border-2 border-blue-500 justify-center items-center">
                        <legend>Budget</legend>
                        <input
                            type="text"
                            name="seedmoney"
                            className="block border border-grey-light w-2/3 h-1/3 rounded-full pl-2 mb-2"
                            placeholder="Current budget"
                        />
                        <button
                            className="w-1/2 text-center py-3 rounded-full bg-amber-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            type="submit"
                        >
                            Set current budget
                        </button>
                    </fieldset>
                </form>
            )}
            <form
                className="flex flex-col w-[375px] p-2"
                onSubmit={handlePostBudgetItem}
            >
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
                        type="date"
                        name="date"
                        className="block border border-grey-light w-2/3 h-1/2 rounded-full pl-2"
                    />
                    <input
                        className="block border border-grey-light w-2/3 p-3 rounded-full mb-2 h-1/2 mt-2"
                        type="text"
                        name="amount"
                        placeholder={outIn === "income" ? "Income" : "Expense"}
                    />
                    {outIn === "income" ? (
                        <select
                            name="income"
                            id="income"
                            className="w-1/2 h-1/2 rounded-full mb-2 pl-2"
                            onChange={handleCategory}
                        >
                            <option value="salary">Salary</option>
                            <option value="present">Present</option>
                            <option value="other">Other</option>
                        </select>
                    ) : (
                        <select
                            name="expense"
                            id="expense"
                            className="w-1/2 h-1/2 rounded-full mb-2 pl-2"
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
                        className="w-1/2 text-center py-3 rounded-full bg-amber-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    >
                        Add
                    </button>
                </fieldset>
            </form>
            <BalanceSheet />
            <div>
                <button
                    className="w-full text-center py-3 rounded-full bg-fuchsia-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    onClick={() => router.replace("/transactions")}
                >
                    Transactions
                </button>
                <button
                    className="w-full text-center py-3 rounded-full bg-rose-600 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    onClick={() => router.replace("/barChart")}
                >
                    Chart
                </button>
            </div>
        </div>
    );
}
