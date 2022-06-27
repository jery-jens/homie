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

    const calcYearlyHypo = (perc, amount, months) => {
        const oneMonth = 1 + Math.pow(perc, (1/12) - 1);
        const costOneMonth = amount * oneMonth / Math.pow(1 - (1+perc), months);
        return costOneMonth * 12;
    };

    /**
     * Submit TCO
     */

    const tcoForm = document.querySelector(".tco-form");

    const newField = document.getElementById("new");
    const priceField = document.getElementById("purchase_price");
    const regionField = document.getElementById("region");
    const loanAmountField = document.getElementById("loan_amount");
    const creditTermField = document.getElementById("credit_term");
    const interestRateField = document.getElementById("interest_rate");

    const registrationTaxField = document.getElementById("registration_tax");
    registrationTaxField.disabled = true;
    registrationTaxField.style.backgroundColor = "transparent";

    const btwField = document.getElementById("btw_new");
    btwField.disabled = true;
    btwField.style.backgroundColor = "transparent";

    const notaryFeesField = document.getElementById("notary_fees");
    notaryFeesField.disabled = true;
    notaryFeesField.style.backgroundColor = "transparent";

    const landRegistryField = document.getElementById("land_registry");
    landRegistryField.disabled = true;
    landRegistryField.style.backgroundColor = "transparent";

    const notaryMortgageField = document.getElementById("notary_mortgage");
    notaryMortgageField.disabled = true;
    notaryMortgageField.style.backgroundColor = "transparent";

    const mortgageRegistrationField = document.getElementById("mortgage_registration");
    mortgageRegistrationField.disabled = true;
    mortgageRegistrationField.style.backgroundColor = "transparent";

    const administrationCostsMortgage = document.getElementById("administration_costs_mortgage");
    administrationCostsMortgage.disabled = true;
    administrationCostsMortgage.style.backgroundColor = "transparent";
    administrationCostsMortgage.value = 500;

    const annualMortgageRepayment = document.getElementById("annual_mortgage_repayment");
    annualMortgageRepayment.disabled = true;
    annualMortgageRepayment.style.backgroundColor = "transparent";
    annualMortgageRepayment.value = 500;

    const propertyTaxField = document.getElementById("property_tax");
    propertyTaxField.disabled = true;
    propertyTaxField.style.backgroundColor = "transparent";
    propertyTaxField.value = 850;

    priceField.addEventListener("input", (e) => {
        const registrationTax = calcPercentage(e.target.value ?? 0, regionField.value === "flanders" ? 12 : 12.5);
        const btwNew = calcPercentage(e.target.value ?? 0, 21);
        const notaryMortgage = calcPercentage(e.target.value ?? 0, .4);
        const administrativeCosts = 1331;

        let notaryFee = 0;

        if (e.target.value >= 0 && e.target.value <= 100000) {
            notaryFee = 1913;
        };

        if (e.target.value >= 101000 && e.target.value <= 150000) {
            notaryFee = 2275;
        };

        if (e.target.value >= 151000 && e.target.value <= 200000) {
            notaryFee = 2620;
        };

        if (e.target.value >= 201000 && e.target.value <= 250000) {
            notaryFee = 3000;
        };

        if (e.target.value >= 301000 && e.target.value <= 350000) {
            notaryFee = 3035;
        };

        if (e.target.value >= 351000 && e.target.value <= 400000) {
            notaryFee = 3070;
        };

        if (e.target.value > 400000) {
            notaryFee = 3140;
        };

        registrationTaxField.value = registrationTax;
        btwField.value = btwNew;
        notaryFeesField.value = notaryFee + administrativeCosts;
        landRegistryField.value = 240;
        notaryMortgageField.value = notaryMortgage;
    });

    regionField.addEventListener("input", (e) => {
        const registrationTax = calcPercentage(priceField.value ?? 0, e.target.value === "flanders" ? 12 : 12.5);

        registrationTaxField.value = registrationTax;
    });

    loanAmountField.addEventListener("input", (e) => {
        mortgageRegistrationField.value = ((e.target.value ?? 0 * 1.1) / 100) + ((e.target.value ?? 0 * 1.1) / (100 * 0.3)) + 160.5 + (e.target.value <= 272727 ? 220 : 950);
        annualMortgageRepayment.value = calcYearlyHypo((interestRateField.value ?? 0 / 100), e.target.value ?? 0, (creditTermField.value ?? 5 * 12));
    });

    interestRateField.addEventListener("input", (e) => {
        annualMortgageRepayment.value = calcYearlyHypo((interestRateField.value ?? 0 / 100), e.target.value ?? 0, (creditTermField.value ?? 5 * 12));
    });

    creditTermField.addEventListener("input", (e) => {
        annualMortgageRepayment.value = calcYearlyHypo((interestRateField.value ?? 0 / 100), e.target.value ?? 0, (creditTermField.value ?? 5 * 12));
    });

    tcoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // About project
        const isNewProject = document.getElementById("new").value;
        const price = document.getElementById("purchase_price").value;
        const region = document.getElementById("region").value;

        // About credit
        const hasCredit = document.getElementById("credit").value;
        const loanAmount = document.getElementById("loan_amount").value;
        const creditTerm = document.getElementById("credit_term").value;
        const interestRate = document.getElementById("interest_rate").value;

        // On purchase
        const registrationTax = document.getElementById("registration_tax").value;
        const btw = document.getElementById("btw_new").value;
        const landRegistry = document.getElementById("land_registry").value;
        const notaryFees = document.getElementById("notary_fees").value;

        // Credit
        const mortgageRegistration = document.getElementById("mortgage_registration").value;
        const notaryMortgage = document.getElementById("notary_mortgage").value;
        const administrationCostsMortgage = document.getElementById("administration_costs_mortgage").value;

        // After purchase
        const energyRenovations = document.getElementById("energy_renovations").value;
        const otherRenovations = document.getElementById("other_renovations").value;

        // Yearly
        const annualMortgageRepayment = document.getElementById("annual_mortgage_repayment").value;
        const propertyTax = document.getElementById("property_tax").value;
        const insurances = document.getElementById("insurances").value;
        const reparations = document.getElementById("reparations").value;
        const management = document.getElementById("management").value;
        const commonCosts = document.getElementById("common_costs").value;
        
        window.location = "/tco-calculator/result" + "?new=" + isNewProject + "&price=" + price + "&region=" + region + "&has_credit=" + hasCredit + "&loan_amount=" + loanAmount + "&credit_term=" + creditTerm + "&interest_rate=" + interestRate + "&registration_tax=" + registrationTax + "&btw=" + btw + "&land_registry=" + landRegistry + "&notary_fees=" + notaryFees + "&mortgage_registration=" + mortgageRegistration + "&notary_mortgage=" + notaryMortgage + "&administration_costs_mortgage=" + administrationCostsMortgage + "&energy_renovations=" + energyRenovations + "&other_renovations=" + otherRenovations + "&annual_mortgage_repayment=" + annualMortgageRepayment + "&property_tax=" + propertyTax + "&insurances=" + insurances + "&reparations=" + reparations + "&_management=" + management + "&common_costs=" + commonCosts;
    });
    
    // /**
    //  * Calculate and show TCO results
    //  */

    //  const tcoUrl = new URL(window.location.href);

     

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
});