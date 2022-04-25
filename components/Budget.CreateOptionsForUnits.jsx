export function createOptionsForUnits(param) {
    return param.map((item) => {
        return (
            <option key={Object.keys(item)} value={Object.keys(item)}>
                {`${Object.keys(item)}` + ": " + `${Object.values(item)}`}
            </option>
        );
    });
}
