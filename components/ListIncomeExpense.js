import React from "react";
import { useRouter } from "next/router";

function ListIncomeExpense({ budgetItems }) {
    const router = useRouter();

    function backToBudget() {
        router.replace("/budget");
    }
    function createItem() {
        return budgetItems.map((cV) => {
            return (
                <div key={cV._id}>
                    <span className="text-gray-900 relative inline-block date uppercase font-medium tracking-widest">
                        {cV.date}
                    </span>
                    <div className="flex mb-2">
                        <div className="w-1/12">
                            {cV.type === "income" ? (
                                <span className="bg-green-400 h-2 w-2 rounded-full block mt-2"></span>
                            ) : (
                                <span className="bg-red-400 h-2 w-2 rounded-full block mt-2"></span>
                            )}
                        </div>
                        <div className="w-9/12">
                            <span className="text-sm font-semibold block">
                                {cV.category}
                            </span>
                            <span className="text-sm">{cV.value} €</span>
                            <br />
                            <span className="text-sm">{cV.description}</span>
                        </div>
                    </div>
                </div>
            );
        });
    }
    return (
        <div>
            <button
                className="bg-fuchsia-500 border border-solid shadow rounded-full w-[200px] h-[50px]"
                onClick={backToBudget}
            >
                Back to Budget
            </button>
            <div className="flex justify-center p-24 bg-white w-full">
                <div className="bg-white rounded-lg w-2/3 lg:w-1/2 xl:w-1/3 p-4 shadow border border-gray-600">
                    {createItem()}
                </div>
            </div>
        </div>
    );
}

export default ListIncomeExpense;
