import React, { useEffect } from "react";
import { useAppData } from "../Context/DataStorage.js";

export default function MapDummySelection() {
    const { setMapLayoutTest, dispatchMapMarkerTest, mapMarkerTest } =
        useAppData();

    const handleChangeRadio = (event) => {
        setMapLayoutTest(event.target.value);
    };

    const handleChangeCheckbox = (event) => {
        dispatchMapMarkerTest({
            type: "toggle",
            name: event.target.value,
            visible: event.target.checked,
        });
        console.log(mapMarkerTest);
        console.log("value: ", event.target.value);
        console.log("id: ", event.target.id);
        console.log("checked: ", event.target.checked);
    };

    let check0 = mapMarkerTest[0].visible;
    let check1 = mapMarkerTest[1].visible;

    useEffect(() => {
        console.log(mapMarkerTest);
    }, [mapMarkerTest]);

    return (
        <div className="absolute top-0 left-0 right-0 w-auto">
            <section className="bg-gray-400/[.75] p-1 flex justify-around font-bold">
                <div>
                    <label htmlFor="option1" className="pr-2">
                        Standard-Layout
                    </label>
                    <input
                        id="option1"
                        type="radio"
                        name="test"
                        value="mapbox://styles/mapbox/streets-v9"
                        onChange={handleChangeRadio}
                    />
                </div>
                <div>
                    <label htmlFor="option2" className="pr-2">
                        Night-Blue
                    </label>
                    <input
                        id="option2"
                        type="radio"
                        name="test"
                        value="mapbox://styles/miles-away/cl1m7c4fs000214qjqkr8jmue"
                        onChange={handleChangeRadio}
                    />
                </div>
                <div>
                    <label htmlFor="option3" className="pr-2">
                        Satellite
                    </label>
                    <input
                        id="option3"
                        type="radio"
                        name="test"
                        value="mapbox://styles/miles-away/cl1nee67n005914pnjtmoo86s"
                        onChange={handleChangeRadio}
                    />
                </div>
                <div>
                    <label htmlFor="option4" className="pr-2">
                        Bubblegum
                    </label>
                    <input
                        id="option4"
                        type="radio"
                        name="test"
                        value="mapbox://styles/miles-away/cl1nld29v00hb15qslsepe5tm"
                        onChange={handleChangeRadio}
                    />
                </div>
                <div>
                    <label htmlFor="option5" className="pr-2">
                        Outdoors
                    </label>
                    <input
                        id="option5"
                        type="radio"
                        name="test"
                        value="mapbox://styles/miles-away/cl1nlk66s000314qj8rr9efd6"
                        onChange={handleChangeRadio}
                    />
                </div>
            </section>
            <section className="bg-gray-400/[.75] p-1 flex justify-around font-bold">
                <div>
                    <label htmlFor="option6" className="pr-2">
                        Andreas
                    </label>
                    <input
                        id="option6"
                        type="checkbox"
                        name="test-2"
                        value="Andreas"
                        onChange={(event) =>
                            dispatchMapMarkerTest({
                                type: "toggle",
                                name: event.target.value,
                                visible: check0,
                            })
                        }
                        checked={check0}
                    />
                </div>
                <div>
                    <label htmlFor="option7" className="pr-2">
                        Albert
                    </label>
                    <input
                        id="option7"
                        type="checkbox"
                        name="test-3"
                        value="Albert"
                        onChange={(event) =>
                            dispatchMapMarkerTest({
                                type: "toggle",
                                name: event.target.value,
                                visible: check1,
                            })
                        }
                        checked={check1}
                    />
                </div>
                {/* {console.log(mapMarkerTest)} */}
            </section>
        </div>
    );
}
