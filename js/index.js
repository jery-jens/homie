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

    // const tcoForm = document.querySelector(".tco-form");

    const newField = document.getElementById("new");
    const priceField = document.getElementById("purchase_price");
    const regionField = document.getElementById("region");

    const registrationTaxField = document.getElementById("registration_tax");
    console.log(registrationTaxField)

    registrationTaxField.addEventListener("change", () => {
        const registrationTax = calcPercentage(priceField.value ?? 0, region.value === "flanders" ? 12 : 12.5);
        console.log(registrationTax);
    });

    regionField.addEventListener("change", () => {
        const registrationTax = calcPercentage(priceField.value ?? 0, region.value === "flanders" ? 12 : 12.5);
        console.log(registrationTax);
    });

    // tcoForm.addEventListener("submit", (e) => {
    //     e.preventDefault();

    //     // About project
    //     const isNewProject = document.getElementById("new").value;
    //     const price = document.getElementById("purchase_price").value;
    //     const region = document.getElementById("purchase_price").value;

    //     // About credit
    //     const hasCredit = document.getElementById("credit").value;
    //     const loanAmount = document.getElementById("loan_amount").value;
    //     const creditTerm = document.getElementById("credit_term").value;
    //     const interestRate = document.getElementById("interest_rate").value;

    //     // On purchase
    //     const registrationTax = document.getElementById("registration_tax").value;
    //     const btw = document.getElementById("btw_new").value;
    //     const landRegistry = document.getElementById("land_registry").value;
    //     const notaryFees = document.getElementById("notary_fees").value;

    //     // Credit
    //     const mortgageRegistration = document.getElementById("mortgage_registration").value;
    //     const notaryMortgage = document.getElementById("notary_mortgage").value;
    //     const administrationCostsMortgage = document.getElementById("administration_costs_mortgage").value;

    //     // After purchase
    //     const energyRenovations = document.getElementById("energy_renovations").value;
    //     const otherRenovations = document.getElementById("other_renovations").value;

    //     // Yearly
    //     const annualMortgageRepayment = document.getElementById("annual_mortgage_repayment").value;
    //     const propertyTax = document.getElementById("property_tax").value;
    //     const insurances = document.getElementById("insurances").value;
    //     const reparations = document.getElementById("reparations").value;
    //     const management = document.getElementById("management").value;
    //     const commonCosts = document.getElementById("common_costs").value;
        
    //     window.location = "/tco-calculator/result" + "?new=" + isNewProject + "&price=" + price + "&region=" + region + "&has_credit=" + hasCredit + "&loan_amount=" + loanAmount + "&credit_term=" + creditTerm + "&interest_rate=" + interestRate + "&registration_tax=" + registrationTax + "&btw=" + btw + "&land_registry=" + landRegistry + "&notary_fees=" + notaryFees + "&mortgage_registration=" + mortgageRegistration + "&notary_mortgage=" + notaryMortgage + "&administration_costs_mortgage=" + administrationCostsMortgage + "&energy_renovations=" + energyRenovations + "&other_renovations=" + otherRenovations + "&annual_mortgage_repayment=" + annualMortgageRepayment + "&property_tax=" + propertyTax + "&insurances=" + insurances + "&reparations=" + reparations + "&_management=" + management + "&common_costs=" + commonCosts;
    // });
    
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