import BalanceSheet from "../../components/Budget.BalanceSheet.jsx";
import { useRouter } from "next/router";
import BudgetSeedMoney from "../../components/Budget.SeedMoney.jsx";
import BudgetIncomeExpense from "../../components/Budget.IncomeExpense.jsx";
import { useAppData } from "../../Context/DataStorage.js";

export default function Budget() {
    const router = useRouter();
    const { budgetItems, seedMoney, homeCurrency } = useAppData();

    console.log({ budgetItems, seedMoney, homeCurrency });

    return (
        <div className="w-full flex flex-col justify-center items-center h-full">
            <BudgetSeedMoney />
            <BudgetIncomeExpense />
            <BalanceSheet />
            <div>
                <button
                    className="w-full text-center py-3 rounded-full bg-fuchsia-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    onClick={() => router.replace("/user/transactions")}
                >
                    Transactions
                </button>
                <button
                    className="w-full text-center py-3 rounded-full bg-rose-600 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                    onClick={() => router.replace("/user/charts")}
                >
                    Chart
                </button>
            </div>
        </div>
    );
}
