document.addEventListener("DOMContentLoaded", () => {
    // Fields
    const loanTerm = document.getElementById("loan_term");
    const interestRate = document.getElementById("interest_rate");

    // Default parameters
    loanTerm.value = 10;
    interestRate.value = 2.5;

    // Variables
    let interestRateMonth = 1 + interestRate.value ** (1/12) - 1;
    let averageLoanAmount = 0;

    // Parameters
    const url = new URL(window.location.href);
    const netIncome = Number(url.searchParams.get("net_icome") ?? 0);
    const otherLoans = Number(url.searchParams.get("other_loans") ?? 0);
    const carLoans = Number(url.searchParams.get("car_loans") ?? 0);
    const alimony = Number(url.searchParams.get("alimony") ?? 0);
    const monthlyPayment = (netIncome - (otherLoans + carLoans + alimony)) / 100 * 40;

    // Actions
    const loanEvent = () => {
        console.log(loanTerm.value, interestRate.value)
        interestRateMonth = 1 + interestRate.value ** (1/12) - 1;
        averageLoanAmount = ((1 - (1 + interestRateMonth) ** -Math.abs(loanTerm.value * 12)) / interestRateMonth) * monthlyPayment;
        console.log(interestRateMonth, averageLoanAmount);
    };

    // Default actions
    loanEvent();

    // Field listeners
    loanTerm.addEventListener("input", () => {
        loanEvent();
    });

    interestRate.addEventListener("input", () => {
        loanEvent();
    });
});