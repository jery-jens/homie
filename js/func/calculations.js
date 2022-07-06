export const MoneyFormat = (amount) => {
    return Number(amount).toLocaleString("nl-BE", {maximumFractionDigits: 2});
};