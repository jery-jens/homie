export const MoneyFormat = (amount) => {
    return Number(amount).toLocaleString("nl-BE", {minimumFractionDigits: 2});
};