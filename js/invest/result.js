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
    let typeEstate = "vacationhouse";

    // Parameters
    const url = new URL(window.location.href);
    const netIncome = Number(url.searchParams.get("net_icome") ?? 0);
    const otherLoans = Number(url.searchParams.get("other_loans") ?? 0);
    const carLoans = Number(url.searchParams.get("car_loans") ?? 0);
    const alimony = Number(url.searchParams.get("alimony") ?? 0);
    const monthlyPayment = (netIncome - (otherLoans + carLoans + alimony)) / 100 * 40;
    const financialState = url.searchParams.get("financial") ?? "safe";
    const hasInvestments = url.searchParams.get("investments") ?? "yes";
    const investmentsConcern = url.searchParams.get("investments_concern") ?? "yes";
    const rentTo = url.searchParams.get("rent_to") ?? "";
    const rentLength = url.searchParams.get("rent_length") ?? "";
    const time = url.searchParams.get("time") ?? "daily";

    // Actions
    const loanEvent = () => {
        // Calculate
        interestRateMonth = 1 + interestRate.value ** (1/12) - 1;
        averageLoanAmount = ((1 - (1 + interestRateMonth) ** -Math.abs(loanTerm.value * 12)) / interestRateMonth) * monthlyPayment;

        // Show values
        document.querySelectorAll(".choosen-term").forEach((element) => {
            element.innerHTML = loanTerm.value + " jaar";
        });
        document.querySelector(".loan-amount").innerHTML = "€ " + averageLoanAmount;
        document.querySelector(".monthly-loan-payment").innerHTML = "€ " + monthlyPayment;
    };

    const riskToleranceEvent = () => {
        let riskTolerance = "low";

        if (financialState === "danger" && hasInvestments === "no" && investmentsConcern === "high") riskTolerance = "low";
        if (financialState === "hard" && investmentsConcern === "average") riskTolerance = "medium";
        if (financialState === "safe" && hasInvestments === "yes" && investmentsConcern === "none") riskTolerance = "high";

        document.querySelector(".risk-tolerance").innerHTML = riskTolerance === "low" ? "Lage risicotolerantie" : riskTolerance === "medium" ? "Gemiddelde risicotolerantie" : "Hoge risicotolerantie";
    };

    const typeEstateEvent = () => {
        let renters = rentTo.split(",");

        // Vacationhouse
        if (renters.includes("students") && renters.includes("youth") && renters.includes("families") && renters.includes("seniors")) {
            if (rentLength.includes("short") && rentLength.length === 1) {
                if (time === "daily" || time === "weekly" || time === "monthly") {
                    typeEstate = "vacationhouse";
                };
            };
        };

        // Studenthouse
        if (renters.includes("students") && renters.length === 1) {
            if (time === "daily" || time === "weekly" || time === "monthly") {
                if (averageLoanAmount >= 100000 && averageLoanAmount <= 299000) {
                    typeEstate = "studenthouse";
                };
            };
        };

        // Assistanthouse
        if (renters.includes("seniors") && renters.length === 1) {
            if (rentLength.includes("long") && rentLength.length === 1) {
                if (averageLoanAmount >= 200000 && averageLoanAmount <= 399000) {
                    typeEstate = "assistanthouse";
                };
            };
        };

        // Appartment/studio
        if (rentLength.includes("long") && rentLength.includes("yearly") && rentLength.length <= 2) {
            if (averageLoanAmount >= 200000) {
                typeEstate = "appartment";
            };
        };

        // House
        if (!renters.includes("students")) {
            if (!rentLength.includes("short")) {
                if (averageLoanAmount >= 300000) {
                    typeEstate = "house";
                };
            };
        };

        document.querySelector(".type-estate").innerHTML = typeEstate === "house" ? "Huis" : typeEstate === "vacationhouse" ? "Vakantiewoning" : typeEstate === "studenthouse" ? "Studentenwoning" : typeEstate === "assistanthouse" ? "Assistentiewoning": "Appartement/studio";
    };

    // Default actions
    loanEvent();
    riskToleranceEvent();
    typeEstateEvent();

    // Field listeners
    loanTerm.addEventListener("input", () => {
        loanEvent();
    });

    interestRate.addEventListener("input", () => {
        loanEvent();
    });
});