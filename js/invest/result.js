import { MoneyFormat } from "../func/index.js";
import "../vendor/circle-progress.min.js";

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
    const changeProgress = (className, value) => {
        new CircleProgress(className, {
            value: value.toFixed(0),
            max: 100,
        });

        document.querySelector(className).querySelector(".circle-progress-circle").style.stroke = value > 60 ? "rgba(0,187,119,0.4)" : value < 60 && value > 40 ? "rgba(255,192,0,0.4)" : "rgba(255,68,68,0.4)";
        document.querySelector(className).querySelector(".circle-progress-value").style.stroke = value > 60 ? "rgba(0,187,119,1)" : value < 60 && value > 40 ? "rgba(255,192,0,1)" : "rgba(255,68,68,1)";
        document.querySelector(className).querySelector(".circle-progress-text-separator").innerHTML = "%";
    };

    const loanEvent = () => {
        // Calculate
        interestRateMonth = 1 + (interestRate.value !== NaN ? interestRate.value : 0) ** (1/12) - 1;
        averageLoanAmount = ((1 - (1 + interestRateMonth) ** -Math.abs(loanTerm.value * 12)) / interestRateMonth) * monthlyPayment;
        console.log(averageLoanAmount, averageLoanAmount ?? 0);

        // Show values
        document.querySelectorAll(".choosen-term").forEach((element) => {
            element.innerHTML = loanTerm.value + " jaar";
        });
        document.querySelector(".loan-amount").innerHTML = "€ " + MoneyFormat(averageLoanAmount ?? 0);
        document.querySelector(".monthly-loan-payment").innerHTML = "€ " + MoneyFormat(monthlyPayment);
    };

    const riskToleranceEvent = () => {
        let riskTolerance = "low";

        if (financialState === "danger" && hasInvestments === "no" && investmentsConcern === "high") riskTolerance = "low";
        if (financialState === "hard" && investmentsConcern === "average") riskTolerance = "medium";
        if (financialState === "safe" && hasInvestments === "yes" && investmentsConcern === "none") riskTolerance = "high";

        document.querySelector(".risk-tolerance").innerHTML = riskTolerance === "low" ? "Lage risicotolerantie" : riskTolerance === "medium" ? "Gemiddelde risicotolerantie" : "Hoge risicotolerantie";

        riskTolerance === "low" ? document.querySelector(".when-low-risk").style.display = "flex" : document.querySelector(".when-high-risk").style.display = "flex";
    };

    const typeEstateEvent = () => {
        const renters = rentTo.split(",");

        let avgVacationHouse = 0;
        let avgStudentHouse = 0;
        let avgAssistantHouse = 0;
        let avgAppartment = 0;
        let avgHouse = 0;

        let avgVacationHouseRenters = 0;
        let avgStudentHouseRenters = 0;
        let avgAssistantHouseRenters = 0;
        let avgAppartmentRenters = 0;
        let avgHouseRenters = 0;

        let avgVacationHouseTerm = rentLength === "short" ? 100 : rentLength === "yearly" ? 0 : 0;
        let avgStudentHouseTerm = rentLength === "short" ? 70 : rentLength === "yearly" ? 100 : 70;
        let avgAssistantHouseTerm = rentLength === "short" ? 0 : rentLength === "yearly" ? 20 : 100;
        let avgAppartmentTerm = rentLength === "short" ? 0 : rentLength === "yearly" ? 100 : 100;
        let avgHouseTerm = rentLength === "short" ? 0 : rentLength === "yearly" ? 100 : 100;

        let avgVacationHouseTime = time === "daily" ? 100 : time === "weekly" ? 100 : time === "monthly" ? 30 : 0;
        let avgStudentHouseTime = time === "daily" ? 100 : time === "weekly" ? 100 : time === "monthly" ? 80 : 0;
        let avgAssistantHouseTime = time === "daily" ? 100 : time === "weekly" ? 100 : time === "monthly" ? 100 : 80;
        let avgAppartmentTime = time === "daily" ? 100 : time === "weekly" ? 100 : time === "monthly" ? 100 : 100;
        let avgHouseTime = time === "daily" ? 100 : time === "weekly" ? 100 : time === "monthly" ? 100 : 100;

        let avgVacationHouseLoan = averageLoanAmount <= 99999 ? 70 : averageLoanAmount >= 100000 && averageLoanAmount <= 199999 ? 100 : averageLoanAmount >= 200000 && averageLoanAmount <= 299999 ? 100 : averageLoanAmount >= 300000 && averageLoanAmount <= 399999 ? 100 : averageLoanAmount >= 400000 && averageLoanAmount <= 499999 ? 100 : 100;
        let avgStudentHouseLoan = averageLoanAmount <= 99999 ? 30 : averageLoanAmount >= 100000 && averageLoanAmount <= 199999 ? 100 : averageLoanAmount >= 200000 && averageLoanAmount <= 299999 ? 80 : averageLoanAmount >= 300000 && averageLoanAmount <= 399999 ? 60 : averageLoanAmount >= 400000 && averageLoanAmount <= 499999 ? 20 : 10;
        let avgAssistantHouseLoan = averageLoanAmount <= 99999 ? 20 : averageLoanAmount >= 100000 && averageLoanAmount <= 199999 ? 40 : averageLoanAmount >= 200000 && averageLoanAmount <= 299999 ? 100 : averageLoanAmount >= 300000 && averageLoanAmount <= 399999 ? 80 : averageLoanAmount >= 400000 && averageLoanAmount <= 499999 ? 40 : 20;
        let avgAppartmentLoan = averageLoanAmount <= 99999 ? 0 : averageLoanAmount >= 100000 && averageLoanAmount <= 199999 ? 30 : averageLoanAmount >= 200000 && averageLoanAmount <= 299999 ? 100 : averageLoanAmount >= 300000 && averageLoanAmount <= 399999 ? 100 : averageLoanAmount >= 400000 && averageLoanAmount <= 499999 ? 100 : 100;
        let avgHouseLoan = averageLoanAmount <= 99999 ? 0 : averageLoanAmount >= 100000 && averageLoanAmount <= 199999 ? 0 : averageLoanAmount >= 200000 && averageLoanAmount <= 299999 ? 60 : averageLoanAmount >= 300000 && averageLoanAmount <= 399999 ? 100 : averageLoanAmount >= 400000 && averageLoanAmount <= 499999 ? 100 : 100;

        if (renters.includes("students")) {
            avgVacationHouseRenters = avgVacationHouseRenters + 30;
            avgStudentHouseRenters = avgStudentHouseRenters + 100;
            avgAssistantHouseRenters = avgAssistantHouseRenters + 0;
            avgAppartmentRenters = avgAppartmentRenters + 70;
            avgHouseRenters = avgHouseRenters + 0;
        };

        if (renters.includes("youth")) {
            avgVacationHouseRenters = avgVacationHouseRenters + 80;
            avgStudentHouseRenters = avgStudentHouseRenters + 0;
            avgAssistantHouseRenters = avgAssistantHouseRenters + 0;
            avgAppartmentRenters = avgAppartmentRenters + 90;
            avgHouseRenters = avgHouseRenters + 40;
        };

        if (renters.includes("families")) {
            avgVacationHouseRenters = avgVacationHouseRenters + 80;
            avgStudentHouseRenters = avgStudentHouseRenters + 0;
            avgAssistantHouseRenters = avgAssistantHouseRenters + 0;
            avgAppartmentRenters = avgAppartmentRenters + 60;
            avgHouseRenters = avgHouseRenters + 80;
        };

        if (renters.includes("seniors")) {
            avgVacationHouseRenters = avgVacationHouseRenters + 50;
            avgStudentHouseRenters = avgStudentHouseRenters + 0;
            avgAssistantHouseRenters = avgAssistantHouseRenters + 100;
            avgAppartmentRenters = avgAppartmentRenters + 80;
            avgHouseRenters = avgHouseRenters + 50;
        };

        avgVacationHouseRenters = avgVacationHouseRenters / renters.length;
        avgStudentHouseRenters = avgStudentHouseRenters / renters.length;
        avgAssistantHouseRenters = avgAssistantHouseRenters / renters.length;
        avgAppartmentRenters = avgAppartmentRenters / renters.length;
        avgHouseRenters = avgHouseRenters / renters.length;

        avgVacationHouse = (avgVacationHouseRenters + avgVacationHouseLoan + avgVacationHouseTerm + avgVacationHouseTime) / 4;
        avgStudentHouse = (avgStudentHouseRenters + avgStudentHouseLoan + avgStudentHouseTerm + avgStudentHouseTime) / 4;
        avgAssistantHouse = (avgAssistantHouseRenters + avgAssistantHouseLoan + avgAssistantHouseTerm + avgAssistantHouseTime) / 4;
        avgAppartment = (avgAppartmentRenters + avgAppartmentLoan + avgAppartmentTerm + avgAppartmentTime) / 4;
        avgHouse = (avgHouseRenters + avgHouseLoan + avgHouseTerm + avgHouseTime) / 4;

        changeProgress(".avg-vacationhouse", avgVacationHouse);
        changeProgress(".avg-studenthouse", avgStudentHouse);
        changeProgress(".avg-assistanthouse", avgAssistantHouse);
        changeProgress(".avg-appartment", avgAppartment);
        changeProgress(".avg-house", avgHouse);
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

        changeProgress(".avg-old", avgOld);
        changeProgress(".avg-new", avgNew);
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

        changeProgress(".avg-ready", avgReady);
        changeProgress(".avg-diy", avgDiy);

        if (avgDiy > avgReady) {
            document.querySelector(".when-to-renovate").style.display = "flex";
        };
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

        changeProgress(".avg-diy-managment", avgDiy);
        changeProgress(".avg-own-managment", avgBuy);
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

        changeProgress(".avg-diy-maintenance", avgDiy);
        changeProgress(".avg-buy-maintenance", avgBuy);

        document.querySelector(avgDiy > avgBuy ? ".when-diy-maintenance" : ".when-buy-maintenance").style.display = "flex";
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

        changeProgress(".avg-beginner", avgBeginner);
        changeProgress(".avg-expert", avgExpert);

        if (avgExpert < avgBeginner) document.querySelector(".when-low-expertise").style.display = "flex";
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