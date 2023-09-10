export default (data = {}) => {
    const columnsArray = Object.keys(data);
    const protectedValues = Array(Object.keys(data).length)
        .fill().map((_, i) => `$${i + 1}`).join(", ");

    const valuesArray = Object.values(data);

    return {
        columnsArray,
        protectedValues,
        valuesArray,
    }
}