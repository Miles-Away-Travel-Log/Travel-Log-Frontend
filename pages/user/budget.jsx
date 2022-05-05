import BalanceSheet from "../../components/Budget.BalanceSheet.jsx";
import { useRouter } from "next/router";
import BudgetSeedMoney from "../../components/Budget.SeedMoney.jsx";
import BudgetIncomeExpense from "../../components/Budget.IncomeExpense.jsx";
import { useAppData } from "../../Context/DataStorage.js";
import Navbar from "../../components/Navbar.jsx";


export default function Budget() {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col justify-center items-center h-full">
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
            <Navbar/>
        </div>
    );
}
