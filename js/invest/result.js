import { MoneyFormat } from "../func";
import CircleProgressBar from "../vendor/circle-progress-bar.min.js";

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
    const pref = url.searchParams.get("pref") ?? "new";
    const renovationTime = url.searchParams.get("renovate") ?? "yes";
    const renovationExperience = url.searchParams.get("renovation_exp") ?? "0";
    const alreadyHouse = url.searchParams.get("already_house") ?? "yes";
    const orderly = url.searchParams.get("orderly") ?? "0";
    const expertism = url.searchParams.get("expertism") ?? "0";
    const problemSolving = url.searchParams.get("problem_solving") ?? "diy";

    // Actions
    const loanEvent = () => {
        // Calculate
        interestRateMonth = 1 + interestRate.value ** (1/12) - 1;
        averageLoanAmount = ((1 - (1 + interestRateMonth) ** -Math.abs(loanTerm.value * 12)) / interestRateMonth) * monthlyPayment;

        // Show values
        document.querySelectorAll(".choosen-term").forEach((element) => {
            element.innerHTML = loanTerm.value + " jaar";
        });
        document.querySelector(".loan-amount").innerHTML = "€ " + MoneyFormat(averageLoanAmount);
        document.querySelector(".monthly-loan-payment").innerHTML = "€ " + MoneyFormat(monthlyPayment);
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

        const canvasWrapper = document.querySelector(".type-house-charts");
        const avgOldCanvas = document.createElement("canvas");
        canvasWrapper.appendChild(avgOldCanvas);
        var circleProgressBar = new CircleProgressBar(avgOldCanvas, {
            colors: ['#0000FF', '#4B0082', '#9400D3']
        });
        circleProgressBar.setValue(0.9);
    };

    const diyBuildingEvent = () => {
        let readyType = 0;
        let diyType = 0;

        if (pref === "new") {
            readyType = 100;
            diyType = 0;
        };

        if (pref === "none") {
            readyType = 50;
            diyType = 50;
        };

        if (pref === "old") {
            readyType = 0;
            diyType = 100;
        };

        let readyTime = 0;
        let diyTime = 0;

        if (renovationTime === "no") {
            readyTime = 100;
            diyTime = 0;
        };

        if (renovationTime === "yes") {
            readyTime = 0;
            diyTime = 100;
        };

        let readyRenovationExp = 0;
        let diyRenovationExp = 0;

        if (renovationExperience === "0") {
            readyRenovationExp = 100;
            diyRenovationExp = 0;
        };

        if (renovationExperience === "1") {
            readyRenovationExp = 75;
            diyRenovationExp = 25;
        };

        if (renovationExperience === "2") {
            readyRenovationExp = 50;
            diyRenovationExp = 50;
        };

        if (renovationExperience === "3") {
            readyRenovationExp = 25;
            diyRenovationExp = 75;
        };

        if (renovationExperience === "4") {
            readyRenovationExp = 0;
            diyRenovationExp = 100;
        };

        let readyAlreadyHouse = 0;
        let diyAlreadyHouse = 0;

        if (alreadyHouse === "yes") {
            readyAlreadyHouse = 100;
            diyAlreadyHouse = 0;
        };

        if (alreadyHouse === "no") {
            readyAlreadyHouse = 0;
            diyAlreadyHouse = 100;
        };

        const avgReady = (readyAlreadyHouse + readyRenovationExp + readyTime + readyType) / 4;
        const avgDiy = (diyAlreadyHouse + diyRenovationExp + diyTime + diyType) / 4;

        // TODO: insert graphs
    };

    const decideDiyEvent = () => {
        let diyOrderly = 0;
        let buyOrderly = 0;

        if (orderly === "0") {
            buyOrderly = 100;
            diyOrderly = 0;
        };

        if (orderly === "1") {
            buyOrderly = 75;
            diyOrderly = 25;
        };

        if (orderly === "2") {
            buyOrderly = 50;
            diyOrderly = 50;
        };

        if (orderly === "3") {
            buyOrderly = 25;
            diyOrderly = 75;
        };

        if (orderly === "4") {
            buyOrderly = 0;
            diyOrderly = 100;
        };

        let diyTime = 0;
        let buyTime = 0;

        if (time === "daily") {
            diyTime = 100;
            buyTime = 0;
        };

        if (time === "weekly") {
            diyTime = 50;
            buyTime = 50;
        };

        if (time === "monthly") {
            diyTime = 50;
            buyTime = 50;
        };

        if (time === "yearly") {
            diyTime = 0;
            buyTime = 100;
        };

        let diyExpertism = 0;
        let buyExpertism = 0;

        if (expertism === "0") {
            buyExpertism = 100;
            diyExpertism = 0;
        };

        if (expertism === "1") {
            buyExpertism = 75;
            diyExpertism = 25;
        };

        if (expertism === "2") {
            buyExpertism = 50;
            diyExpertism = 50;
        };

        if (expertism === "3") {
            buyExpertism = 25;
            diyExpertism = 75;
        };

        if (expertism === "4") {
            buyExpertism = 0;
            diyExpertism = 100;
        };

        const avgDiy = (diyExpertism + diyTime + diyOrderly) / 3;
        const avgBuy = (buyExpertism + buyTime + buyOrderly) / 3;

        // TODO: insert graphs
    };

    const decideMaintenanceEvent = () => {
        let diyProblemSolving = 0;
        let buyProblemSolving = 0;

        if (problemSolving === "almost_diy") {
            diyProblemSolving = 50;
            buyProblemSolving = 50;
        };

        if (problemSolving === "diy") {
            diyProblemSolving = 100;
            buyProblemSolving = 0;
        };

        if (problemSolving === "no_diy") {
            diyProblemSolving = 0;
            buyProblemSolving = 100;
        };

        let diyRenovationExp = 0;
        let buyRenovationExp = 0;

        if (renovationExperience === "0") {
            buyRenovationExp = 100;
            diyRenovationExp = 0;
        };

        if (renovationExperience === "1") {
            buyRenovationExp = 75;
            diyRenovationExp = 25;
        };

        if (renovationExperience === "2") {
            buyRenovationExp = 50;
            diyRenovationExp = 50;
        };

        if (renovationExperience === "3") {
            buyRenovationExp = 25;
            diyRenovationExp = 75;
        };

        if (renovationExperience === "4") {
            buyRenovationExp = 0;
            diyRenovationExp = 100;
        };

        let diyRenovationTime = 0;
        let buyRenovationTime = 0;

        if (renovationTime === "yes") {
            diyRenovationTime = 100;
            buyRenovationTime = 0;
        };

        if (renovationTime === "no") {
            diyRenovationTime = 0;
            buyRenovationTime = 100;
        };

        const avgDiy = (diyProblemSolving + diyRenovationExp + diyRenovationTime) / 3;
        const avgBuy = (buyProblemSolving + buyRenovationExp + buyRenovationTime) / 3;

        // TODO: insert graphs
    };

    const experienceEstateEvent = () => {
        let beginnerInvestments = 0;
        let expertInvestments = 0;

        if (hasInvestments === "yes") {
            expertInvestments = 100;
            beginnerInvestments = 0;
        };

        if (hasInvestments === "no") {
            expertInvestments = 0;
            beginnerInvestments = 100;
        };

        let beginnerHasHouse = 0;
        let expertHasHouse = 0;

        if (alreadyHouse === "yes") {
            expertHasHouse = 100;
            beginnerHasHouse = 0;
        };

        if (alreadyHouse === "no") {
            expertHasHouse = 0;
            beginnerHasHouse = 100;
        };

        let beginnerExpertism = 0;
        let expertExpertism = 0;

        if (expertism === "0") {
            beginnerExpertism = 100;
            expertExpertism = 0;
        };

        if (expertism === "1") {
            beginnerExpertism = 75;
            expertExpertism = 25;
        };

        if (expertism === "2") {
            beginnerExpertism = 50;
            expertExpertism = 50;
        };

        if (expertism === "3") {
            beginnerExpertism = 25;
            expertExpertism = 75;
        };

        if (expertism === "4") {
            beginnerExpertism = 0;
            expertExpertism = 100;
        };

        const avgBeginner = (beginnerExpertism + beginnerHasHouse + beginnerInvestments) / 3;
        const avgExpert = (expertExpertism + expertHasHouse + expertInvestments) / 3;

        // TODO: insert graphs
    };

    // Default actions
    loanEvent();
    riskToleranceEvent();
    typeEstateEvent();
    ageBuildingEvent();
    diyBuildingEvent();
    decideDiyEvent();
    decideMaintenanceEvent();
    experienceEstateEvent();

    // Field listeners
    loanTerm.addEventListener("input", () => {
        loanEvent();
    });

    interestRate.addEventListener("input", () => {
        loanEvent();
    });
});