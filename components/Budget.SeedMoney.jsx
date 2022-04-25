import React from "react";
import { useAppData } from "../Context/DataStorage.js";
import { createOptionsForUnits } from "./Budget.CreateOptionsForUnits.js";
import { exchangeUnits } from "./Budget.ExchangeUnits.js";

function BudgetSeedMoney() {
    const {
        seedMoney,
        handlePostSeedMoney,
        handleDeleteSeedMoney,
        homeCurrency,
        setHomeCurrency,
    } = useAppData();

    function handleHomeCurrency(e) {
        setHomeCurrency(e.target.value);
    }

    return (
        <div>
            {seedMoney.length !== 0 ? (
                <form
                    className="flex flex-col w-[375px] h-1/6 p-2"
                    onSubmit={handleDeleteSeedMoney}
                >
                    <fieldset className="flex flex-col border-solid border-2 border-blue-500 justify-center items-center">
                        <legend>Budget</legend>
                        <div className="bg-gray-400">
                            {seedMoney[0].total} {homeCurrency}
                        </div>
                        <button
                            className="w-1/2 text-center py-3 rounded-full bg-amber-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            onClick={handleDeleteSeedMoney}
                        >
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
                        <select
                            name="homeCurrency"
                            id="homeCurrency"
                            className="h-1/4 w-2/3 rounded-full pl-2"
                            onChange={handleHomeCurrency}
                        >
                            <option value="currency">Home currency</option>
                            {createOptionsForUnits(exchangeUnits)}
                        </select>

                        <button
                            className="w-1/2 text-center py-3 rounded-full bg-amber-500 text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            type="submit"
                        >
                            Set current budget
                        </button>
                    </fieldset>
                </form>
            )}
        </div>
    );
}

export default BudgetSeedMoney;
