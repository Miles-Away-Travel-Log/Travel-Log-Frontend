import React, { useEffect } from "react";
import { useAppData } from "../Context/DataStorage.js";
import { createOptionsForUnits } from "./Budget.CreateOptionsForUnits.jsx";
import { exchangeUnits } from "./Budget.ExchangeUnits.js";
import Cookies from "js-cookie";

function BudgetSeedMoney({ tripID }) {
    const {
        handlePostSeedMoney,
        handleDeleteSeedMoney,
        homeCurrency,
        setHomeCurrency,
        tripSeedMoney,
        setTripSeedMoney,
    } = useAppData();

    async function getTripData() {
        const header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        };

        const rawResponse = await fetch(
            process.env.NEXT_PUBLIC_FETCH_URL_TRIP + `${tripID}`,
            {
                method: "GET",
                headers: header,
            }
        );
        const data = await rawResponse.json();
        setTripSeedMoney(data.trip.seedMoney);
    }

    useEffect(() => {
        if (tripSeedMoney.length > 0) {
            setHomeCurrency(tripSeedMoney[0].currency);
        }
    }, []);

    function handleHomeCurrency(e) {
        setHomeCurrency(e.target.value);
    }

    function submitSeedMoney(e) {
        e.preventDefault();
        const seedMoney = {
            trip: tripID,
            currency: homeCurrency,
            total: e.target.seedmoney.value,
        };
        handlePostSeedMoney(seedMoney);
        getTripData();
    }

    function deleteSeedMoney(e) {
        e.preventDefault();
        handleDeleteSeedMoney(tripSeedMoney[0]._id);
        getTripData();
    }

    return (
        <div>
            {tripSeedMoney.length !== 0 ? (
                <form
                    className="flex flex-col w-[375px] h-1/6 p-2"
                    onSubmit={handleDeleteSeedMoney}
                >
                    <fieldset className="flex flex-col border-solid border-2 border-[#942928] justify-center items-center">
                        <legend>Budget</legend>
                        <div className="bg-gray-400">
                            {tripSeedMoney[0].total} {homeCurrency}
                        </div>
                        <button
                            className="w-1/2 text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
                            onClick={deleteSeedMoney}
                        >
                            Delete Current Budget
                        </button>
                    </fieldset>
                </form>
            ) : (
                <form
                    className="flex flex-col w-[375px] h-1/6 p-2"
                    onSubmit={submitSeedMoney}
                >
                    <fieldset className="flex flex-col border-solid border-2 border-[#90A5A9] justify-center items-center rounded-full text-[#942928]">
                        <legend>BUDGET</legend>
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
                            className="w-1/2 text-center py-3 rounded-full bg-[#90A5A9] text-white hover:bg-[#C4C4C4] focus:outline-none my-1"
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
