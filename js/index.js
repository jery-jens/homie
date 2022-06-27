document.addEventListener("DOMContentLoaded", () => {
    /**
     * Header
     */

    window.addEventListener("scroll", () => {
        const header = document.querySelector(".main-menu");
        const top = window.pageYOffset || document.documentElement.scrollTop;
        top >= 65 ? header.classList.add("active") : header.classList.remove("active");
    });

    /**
     * Switches
     */

    const switches = document.querySelectorAll(".switch-checkbox-field");
    const formBlocks = document.querySelectorAll(".input-block")
    const creditRow = document.querySelector(".credit-row")

    switches.forEach((item) => {
        const wrapper = item.parentElement.parentElement;
        const circle = wrapper.children[0];
        const label = wrapper.parentElement.children[1];

        item.addEventListener("change", () => {
            if (item.checked) {
                wrapper.classList.add("active");
                circle.classList.add("active");
                label.classList.add("active");
                label.innerHTML = "Ja";

                if (formBlocks) {
                    formBlocks.forEach((block) => {
                        if (item.classList.contains("new-field")) {
                            if (block.classList.contains("new")) {
                                block.classList.remove("hidden");
                            };

                            if (block.classList.contains("not-new")) {
                                block.classList.add("hidden");
                            };
                        };
                    }); 
                };
                
                if (creditRow) {
                    if (item.classList.contains("credit-field")) {
                        creditRow.classList.remove("hidden");
                    };
                };
            } else {
                wrapper.classList.remove("active");
                circle.classList.remove("active");
                label.classList.remove("active");
                label.innerHTML = "Nee";

                if (formBlocks) {
                    formBlocks.forEach((block) => {
                        if (item.classList.contains("new-field")) {
                            if (block.classList.contains("new")) {
                                block.classList.add("hidden");
                            };

                            if (block.classList.contains("not-new")) {
                                block.classList.remove("hidden");
                            };
                        };
                    }); 
                };
                
                if (creditRow) {
                    if (item.classList.contains("credit-field")) {
                        creditRow.classList.add("hidden");
                    };
                };
            };
        });
    });

    /**
     * Calculate TCO
     */

    const calcPercentage = (amount, percentage) => {
        return (amount / 100) * percentage;
    };

    const notarysFee = () => {

    };

    /**
     * Submit TCO
     */

    const tcoForm = document.querySelector(".tco-form");

    tcoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // About project
        const isNewProject = document.getElementById("new");
        const price = document.getElementById("purchase_price");
        const region = document.getElementById("purchase_price");

        // About credit
        const hasCredit = document.getElementById("credit").nodeValue;
        const loanAmount = document.getElementById("loan_amount").nodeValue;
        const creditTerm = document.getElementById("credit_term").nodeValue;
        const interestRate = document.getElementById("interest_rate").nodeValue;

        // On purchase
        const registrationTax = document.getElementById("registration_tax").nodeValue;
        const btw = document.getElementById("btw_new").nodeValue;
        const landRegistry = document.getElementById("land_registry").nodeValue;
        const notaryFees = document.getElementById("notary_fees").nodeValue;

        // Credit
        const mortgageRegistration = document.getElementById("mortgage_registration").nodeValue;
        const notaryMortgage = document.getElementById("notary_mortgage").nodeValue;
        const administrationCostsMortgage = document.getElementById("administration_costs_mortgage").nodeValue;

        // After purchase
        const energyRenovations = document.getElementById("energy_renovations").nodeValue;
        const otherRenovations = document.getElementById("other_renovations").nodeValue;

        // Yearly
        const annualMortgageRepayment = document.getElementById("annual_mortgage_repayment").nodeValue;
        const propertyTax = document.getElementById("property_tax").nodeValue;
        const insurances = document.getElementById("insurances").nodeValue;
        const reparations = document.getElementById("reparations").nodeValue;
        const management = document.getElementById("management").nodeValue;
        const commonCosts = document.getElementById("common_costs").nodeValue;

        window.location = "/tco-calculator/result" + "?new=" + isNewProject + "&price=" + price + "&region=" + region + "&has_credit=" + hasCredit + "&loan_amount=" + loanAmount + "&credit_term=" + creditTerm + "&interest_rate=" + interestRate + "&registration_tax=" + registrationTax + "&btw=" + btw + "&land_registry=" + landRegistry + "&notary_fees=" + notaryFees + "&mortgage_registration=" + mortgageRegistration + "&notary_mortgage=" + notaryMortgage + "&administration_costs_mortgage=" + administrationCostsMortgage + "&energy_renovations=" + energyRenovations + "&other_renovations=" + otherRenovations + "&annual_mortgage_repayment=" + annualMortgageRepayment + "&property_tax=" + propertyTax + "&insurances=" + insurances + "&reparations=" + reparations + "&_management=" + management + "&common_costs=" + commonCosts;
    });

    const tcoUrl = new URL(window.location.href);
    
    /**
     * Calculate and show TCO results
     */

    /**
     * Tool selector
     */

    const selector = document.querySelector(".btn-tool-select");


    /** 
     * Questions 
     * */

    let activeQuestion = 0;

    const questions = document.querySelectorAll(".form-question");
    const next = document.querySelector(".form-step-nav.next");
    const prev = document.querySelector(".form-step-nav.prev");
    const pagination = document.querySelectorAll(".step");

    if (questions) {
        const changeQuestion = (activeQuestion) => {
            const max = questions.length - 1;

            if (activeQuestion > 0) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            };

            if (activeQuestion === max) {
                next.style.display = "none";
            } else {
                next.style.display = "block";
            };

            questions.forEach((question, index) => {
                if (activeQuestion === index) {
                    question.classList.add("active");
                    question.classList.remove("hidden");
                    pagination[index].classList.add("active");
                } else {
                    question.classList.remove("active");
                    question.classList.add("hidden");
                    pagination[index].classList.remove("active");
                };
            });
        };

        next.addEventListener("click", () => {
            activeQuestion = activeQuestion + 1;
            changeQuestion(activeQuestion);
        });

        prev.addEventListener("click", () => {
            activeQuestion = activeQuestion - 1;
            changeQuestion(activeQuestion);
        });
    };
});