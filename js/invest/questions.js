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

            changePagination();

            if (activeQuestion > 0) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            };

            if (activeQuestion === (max + 1)) {
                submitForm();
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
            "safe": document.getElementById("financial_safe").value,
            "hard": document.getElementById("financial_hard").value,
            "danger": document.getElementById("financial_danger").value,
        }; 
        const investments = {
            "yes": document.getElementById("investments_yes").value,
            "no": document.getElementById("investments_no").value,
        };
        const investmentsConcern = {
            "none": document.getElementById("investments_concern").value,
        };
        const rentTo = [
            {
                "students": document.getElementById("rent_students").value,
            },
            {
                "youth": document.getElementById("rent_youth").value,
            },
            {
                "families": document.getElementById("rent_families").value,
            },
            {
                "seniors": document.getElementById("rent_seniors").value,
            },
        ];
        const rentLength = [
            {
                "short": document.getElementById("rent_short").value,
            },
            {
                "yearly": document.getElementById("rent_yearly").value,
            },
            {
                "long": document.getElementById("rent_long").value,
            },
        ];
        const time = {
            "daily": document.getElementById("daily").value,
            "weekly": document.getElementById("weekly").value,
            "monthly": document.getElementById("monthly").value,
            "yearly": document.getElementById("yearly").value,
        };
        const expertism = {
            "0": document.getElementById("expertism_0").value,
            "1": document.getElementById("expertism_1").value,
            "2": document.getElementById("expertism_2").value,
            "3": document.getElementById("expertism_3").value,
            "4": document.getElementById("expertism_4").value,
        };
        const waiting = {
            "yes": document.getElementById("waiting_yes").value,
            "no": document.getElementById("waiting_no").value,
        };
        const tech = {
            "0": document.getElementById("tech_0").value,
            "1": document.getElementById("tech_1").value,
            "2": document.getElementById("tech_2").value,
            "3": document.getElementById("tech_3").value,
        };
        const pref = {
            "new": document.getElementById("pref_new").value,
            "old": document.getElementById("pref_old").value,
            "none": document.getElementById("pref_none").value,
        };
        const renovate = {
            "yes": document.getElementById("renovate_yes").value,
            "no": document.getElementById("renovate_no").value,
        };
        const renovationExp = {
            "0": document.getElementById("reno_0").value,
            "1": document.getElementById("reno_1").value,
            "2": document.getElementById("reno_2").value,
            "3": document.getElementById("reno_3").value,
            "4": document.getElementById("reno_4").value,
        };
        const orderly = {
            "0": document.getElementById("orderly_0").value,
            "1": document.getElementById("orderly_1").value,
            "2": document.getElementById("orderly_2").value,
            "3": document.getElementById("orderly_3").value,
            "4": document.getElementById("orderly_4").value,
        };
        const problemSolving = {
            "diy": document.getElementById("diy").value,
            "almost_diy": document.getElementById("almost_diy").value,
            "no_diy": document.getElementById("no_diy").value,
        };
        const alreadyHouse = {
            "yes": document.getElementById("house_yes"),
            "no": document.getElementById("house_no"),
        };

        window.location = `/invest-test/result`;
    };
});