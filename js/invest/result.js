document.addEventListener("DOMContentLoaded", () => {
    // Fields
    const loanTerm = document.getElementById("loan_term");
    const interestRate = document.getElementById("interest_rate");

    // Default parameters
    loanTerm.value = 10;
    interestRate.value = 2.5;

    // Variables
    let interestRateMonth = 1 + interestRate.value ** (1/12) - 1
    console.log(interestRateMonth);

    // Parameters
    const url = new URL(window.location.href);
    const netIncome = Number(url.searchParams.get("net_icome") ?? 0);
    const otherLoans = Number(url.searchParams.get("other_loans") ?? 0);
    const carLoans = Number(url.searchParams.get("car_loans") ?? 0);
    const alimony = Number(url.searchParams.get("alimony") ?? 0);
    const monthlyPayment = (netIncome - (otherLoans + carLoans + alimony)) / 100 * 40;
    console.log(monthlyPayment);

    // Field listeners
});