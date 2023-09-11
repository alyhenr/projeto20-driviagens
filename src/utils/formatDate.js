export default (date) => {
    const dateArr = date.split("-");
    return [dateArr[1], dateArr[0], dateArr[2]].join("-");
}