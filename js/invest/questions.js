document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const form = document.querySelector(".invest-form");
    const questions = document.querySelectorAll(".form-question");
    const next = document.querySelector(".form-step-nav.next");
    const prev = document.querySelector(".form-step-nav.prev");
    const pagination = document.querySelectorAll(".step");

    // Move through questions
    let activeQuestion = 0;

    // Change pagination
    const changePagination = () => {
        const max = questions.length - 1;

        if (activeQuestion === 0) {
            pagination.forEach((step, index) => {
                if (index === 0) {
                    step.classList.add("active");
                } else {
                    step.classList.remove("active");
                };
            });
        } else if (activeQuestion === 1) {
            pagination.forEach((step, index) => {
                if (index === 1) {
                    step.classList.add("active");
                } else {
                    step.classList.remove("active");
                };
            });        
        } else if (activeQuestion >= 2 && activeQuestion <= (max - 2)) {
            pagination.forEach((step, index) => {
                if (index === 2) {
                    step.classList.add("active");
                } else {
                    step.classList.remove("active");
                };
            });  
        } else if (activeQuestion === (max - 1)) {
            pagination.forEach((step, index) => {
                if (index === 3) {
                    step.classList.add("active");
                } else {
                    step.classList.remove("active");
                };
            });  
        } else if (activeQuestion === (max)) {
            pagination.forEach((step, index) => {
                if (index === 4) {
                    step.classList.add("active");
                } else {
                    step.classList.remove("active");
                };
            });  
        };
    };

    changePagination();

    if (questions) {
        const changeQuestion = (activeQuestion) => {
            const max = questions.length - 1;

            if (activeQuestion === (max + 1)) {
                submitForm();
            };

            changePagination();

            if (activeQuestion > 0) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            };

            questions.forEach((question, index) => {
                if (activeQuestion === index) {
                    question.classList.add("active");
                    question.classList.remove("hidden");
                } else {
                    question.classList.remove("active");
                    question.classList.add("hidden");
                };
            });
        };

        if (next) {
            next.addEventListener("click", () => {
                activeQuestion = activeQuestion + 1;
                changeQuestion(activeQuestion);
            });
        };

        if (prev) {
            prev.addEventListener("click", () => {
                activeQuestion = activeQuestion - 1;
                changeQuestion(activeQuestion);
            });
        };
    };

    // Submitting form
    const submitForm = () => {
        // All fields
        const netIncome = document.getElementById("net_income").value ?? 0;
        const otherLoans = document.getElementById("other_loans").value ?? 0;
        const carLoan = document.getElementById("car_loan").value ?? 0;
        const alimony = document.getElementById("alimony").value ?? 0;
        const financial = {
            "safe": document.getElementById("financial_safe").checked,
            "hard": document.getElementById("financial_hard").checked,
            "danger": document.getElementById("financial_danger").checked,
        }; 
        const investments = {
            "yes": document.getElementById("investments_yes").checked,
            "no": document.getElementById("investments_no").checked,
        };
        const investmentsConcern = {
            "none": document.getElementById("no_concern").checked,
            "average": document.getElementById("average_concern").checked,
            "high": document.getElementById("high_concern").checked,
        };
        const rentTo = [];
        if (document.getElementById("rent_students").checked) {
            rentTo.push("students");
        };
        if (document.getElementById("rent_youth").checked) {
            rentTo.push("youth");
        };
        if (document.getElementById("rent_families").checked) {
            rentTo.push("families");
        };
        if (document.getElementById("rent_seniors").checked) {
            rentTo.push("seniors");
        };
        const rentLength = [];
        if (document.getElementById("rent_short").checked) {
            rentLength.push("short");
        };
        if (document.getElementById("rent_yearly").checked) {
            rentLength.push("yearly");
        };
        if (document.getElementById("rent_long").checked) {
            rentLength.push("long");
        };
        const time = {
            "daily": document.getElementById("daily").checked,
            "weekly": document.getElementById("weekly").checked,
            "monthly": document.getElementById("monthly").checked,
            "yearly": document.getElementById("yearly").checked,
        };
        const expertism = {
            "0": document.getElementById("expertism_0").checked,
            "1": document.getElementById("expertism_1").checked,
            "2": document.getElementById("expertism_2").checked,
            "3": document.getElementById("expertism_3").checked,
            "4": document.getElementById("expertism_4").checked,
        };
        const waiting = {
            "yes": document.getElementById("waiting_yes").checked,
            "no": document.getElementById("waiting_no").checked,
        };
        const tech = {
            "0": document.getElementById("tech_0").checked,
            "1": document.getElementById("tech_1").checked,
            "2": document.getElementById("tech_2").checked,
            "3": document.getElementById("tech_3").checked,
        };
        const pref = {
            "new": document.getElementById("pref_new").checked,
            "old": document.getElementById("pref_old").checked,
            "none": document.getElementById("pref_none").checked,
        };
        const renovate = {
            "yes": document.getElementById("renovate_yes").checked,
            "no": document.getElementById("renovate_no").checked,
        };
        const renovationExp = {
            "0": document.getElementById("reno_0").checked,
            "1": document.getElementById("reno_1").checked,
            "2": document.getElementById("reno_2").checked,
            "3": document.getElementById("reno_3").checked,
            "4": document.getElementById("reno_4").checked,
        };
        const orderly = {
            "0": document.getElementById("orderly_0").checked,
            "1": document.getElementById("orderly_1").checked,
            "2": document.getElementById("orderly_2").checked,
            "3": document.getElementById("orderly_3").checked,
            "4": document.getElementById("orderly_4").checked,
        };
        const problemSolving = {
            "diy": document.getElementById("diy").checked,
            "almost_diy": document.getElementById("almost_diy").checked,
            "no_diy": document.getElementById("no_diy").checked,
        };
        const alreadyHouse = {
            "yes": document.getElementById("house_yes").checked,
            "no": document.getElementById("house_no").checked,
        };
        window.location = `/invest-test/result?net_icome=${netIncome}&other_loans=${otherLoans}&car_loan=${carLoan}&alimony=${alimony}&financial=${financial.danger ? "danger": financial.hard ? "hard" : "safe"}&investments=${investments.no ? "no" : "yes"}&investments_concern=${investmentsConcern.average ? "average" : investmentsConcern.high ? "high" : "none"}&rent_to=${rentTo.toString()}&rent_length=${rentLength.toString()}&time=${time.daily ? "daily": time.monthly ? "monthly": time.weekly ? "weekly" : "yearly"}&expertism=${expertism[0] ? "0" : expertism[1] ? "1" : expertism[2] ? "2" : expertism[3] ? "3" : "4"}&waiting=${waiting.yes ? "yes" : "no"}&tech=${tech[0] ? "0" : tech[1] ? "1" : tech[2] ? "2" : "3"}&pref=${pref.new ? "new" : pref.none ? "none" : "old"}&renovate=${renovate.no ? "no" : "yes"}&renovation_exp=${renovationExp[0] ? "0" : renovationExp[1] ? "1" : renovationExp[2] ? "2" : renovationExp[3] ? "3" : "4"}&orderly=${orderly[0] ? "0" : orderly[1] ? "1" : orderly[2] ? "2" : orderly[3] ? "3" : "4"}&problem_solving=${problemSolving.almost_diy ? "almost_diy" : problemSolving.diy ? "diy" : "no_diy"}&already_house=${alreadyHouse.yes ? "yes" : "no"}`;
    };

    console.log(window.location.pathname.split("/"));
});