import BalanceSheet from "../../components/Budget.BalanceSheet.jsx";
import { useRouter } from "next/router";
import BudgetSeedMoney from "../../components/Budget.SeedMoney.jsx";
import BudgetIncomeExpense from "../../components/Budget.IncomeExpense.jsx";
import { useAppData } from "../../Context/DataStorage.js";
import Navbar from "../../components/Navbar.jsx";
import { useState } from "react";

export default function Budget() {
    const router = useRouter();
    const [showDropdown, setShowDropdown] = useState(false);

    function handleDropdown() {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className="w-screen flex flex-col justify-center items-center bg-[url('../public/images/images-budget/christine-roy-ir5MHI6rPg0-unsplash.jpg')] bg-cover min-h-screen">
            {/*             <div className="absolute top-0 right-0 p-2">
                <div className="flex justify-center w-full">
                    <div
                        id="dropdown"
                        className={
                            (showDropdown === true ? "visible" : "hidden") +
                            " z-10 w-16 text-base list-none rounded divide-y divide-gray-100 h-[100px] absolute right-[40px] lg:right-[640px]"
                        }
                        data-popper-reference-hidden=""
                        data-popper-escaped=""
                        data-popper-placement="top"
                    >
                        <ul
                            className="py-1 cursor-pointer"
                            aria-labelledby="dropdownButton"
                        >
                            <li
                                onClick={() =>
                                    router.replace("/user/transactions")
                                }
                            >
                                Transactions
                            </li>
                            <li onClick={() => router.replace("/user/charts")}>
                                Chart
                            </li>
                        </ul>
                    </div>
                    <button
                        id="dropdownButton"
                        data-dropdown-toggle="dropdown"
                        className="sm:inline-block text-white dark:text-gray-400 dark:hover:bg-gray-700 rounded-lg text-sm p-1.5 h-[50px]"
                        type="button"
                        onClick={handleDropdown}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                        </svg>
                    </button>
                </div>
            </div> */}
            <BudgetSeedMoney />
            <BudgetIncomeExpense />
            <BalanceSheet />
            <div className="m-1 mb-8 flex justify-center ">
                <button
                    className="p-4 m-1 w-full text-center py-3 rounded-full bg-[#942928] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    onClick={() => router.replace("/user/transactions")}
                >
                    Transactions
                </button>
                <button
                    className="p-5 m-1 w-full text-center py-3 rounded-full bg-[#942928] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    onClick={() => router.replace("/user/charts")}
                >
                    Chart
                </button>
            </div>
            <Navbar />
        </div>
    );
}
