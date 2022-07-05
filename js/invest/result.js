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
    const waiting = url.searchParams.get("waiting") ?? "yes";
    const tech = url.searchParams.get("tech") ?? "0";

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

    const ageBuildingEvent = () => {
        let oldTimePerc = 0;
        let newTimePerc = 0;

        if (time === "daily") {
            oldTimePerc = 100;
            newTimePerc = 0;
        };

        if (time === "weekly") {
            oldTimePerc = 50;
            newTimePerc = 50;
        };

        if (time === "monthly") {
            oldTimePerc = 50;
            newTimePerc = 50;
        };

        if (time === "yearly") {
            oldTimePerc = 0;
            newTimePerc = 100;
        };

        let oldWaitingTime = 0;
        let newWaitingTime = 0;

        if (waiting === "yes") {
            oldWaitingTime = 100;
            newWaitingTime = 0;
        };

        if (waiting === "no") {
            oldWaitingTime = 0;
            newWaitingTime = 100;
        };

        let oldTech = 0;
        let newTech = 0;

        if (tech === "0") {
            oldTech = 100;
            newTech = 0;
        };

        if (tech === "1") {
            oldTech = 50;
            newTech = 50;
        };

        if (tech === "2") {
            oldTech = 50;
            newTech = 50;
        };

        if (tech === "3") {
            oldTech = 0;
            newTech = 100;
        };

        const avgOld = (oldTech + oldTimePerc + oldWaitingTime) / 3;
        const avgNew = (newTech + newTimePerc + newWaitingTime) / 3;

        console.log(avgOld, avgNew);
    };

    // Default actions
    loanEvent();
    riskToleranceEvent();
    typeEstateEvent();
    ageBuildingEvent();

    // Field listeners
    loanTerm.addEventListener("input", () => {
        loanEvent();
    });

    interestRate.addEventListener("input", () => {
        loanEvent();
    });
});