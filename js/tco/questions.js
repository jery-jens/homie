document.addEventListener("DOMContentLoaded", () => {
  /**
   * Switches
   */

  const switches = document.querySelectorAll(".switch-checkbox-field");
  const formBlocks = document.querySelectorAll(".input-block")
  const creditRow = document.querySelector(".credit-row")
  const creditFields = document.querySelectorAll(".credit-field");

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

            creditFields.forEach((field) => {
              field.style.display = "block";
            });
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

            creditFields.forEach((field) => {
              field.style.display = "none";
            });
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
    const oneMonth = (1 + perc) ** (1 / 12) - 1;
    const costOneMonth = amount * oneMonth / (1 - (1 + oneMonth) ** -Math.abs(months));
    return (costOneMonth * 12).toFixed(2);
  };

  /**
   * Submit TCO
   */

  const tcoForm = document.querySelector(".tco-form");

  const priceField = document.getElementById("purchase_price");
  const regionField = document.getElementById("region");
  const loanAmountField = document.getElementById("loan_amount");
  const creditTermField = document.getElementById("credit_term");
  const interestRateField = document.getElementById("interest_rate");
  const registrationTaxField = document.getElementById("registration_tax");
  const btwField = document.getElementById("btw_new");
  const notaryFeesField = document.getElementById("notary_fees");
  const landRegistryField = document.getElementById("land_registry");
  const notaryMortgageField = document.getElementById("notary_mortgage");
  const mortgageRegistrationField = document.getElementById("mortgage_registration");
  const administrationCostsMortgage = document.getElementById("administration_costs_mortgage");
  const annualMortgageRepayment = document.getElementById("annual_mortgage_repayment");
  const propertyTaxField = document.getElementById("property_tax");
  const insurancesField = document.getElementById("insurances");

  registrationTaxField.disabled = true;
  btwField.disabled = true;
  notaryFeesField.disabled = true;
  landRegistryField.disabled = true;
  notaryMortgageField.disabled = true;
  mortgageRegistrationField.disabled = true;
  administrationCostsMortgage.disabled = true;
  annualMortgageRepayment.disabled = true;
  propertyTaxField.disabled = true;
  insurancesField.disabled = true;

  registrationTaxField.style.backgroundColor = "transparent";
  btwField.style.backgroundColor = "transparent";
  notaryFeesField.style.backgroundColor = "transparent";
  landRegistryField.style.backgroundColor = "transparent";
  notaryMortgageField.style.backgroundColor = "transparent";
  mortgageRegistrationField.style.backgroundColor = "transparent";
  administrationCostsMortgage.style.backgroundColor = "transparent";
  annualMortgageRepayment.style.backgroundColor = "transparent";
  propertyTaxField.style.backgroundColor = "transparent";
  insurancesField.style.backgroundColor = "transparent";

  administrationCostsMortgage.value = 500;
  annualMortgageRepayment.value = 500;
  propertyTaxField.value = 850;
  insurancesField.value = 250;

  priceField.addEventListener("input", (e) => {
    const registrationTax = calcPercentage(e.target.value ?? 0, regionField.value === "flanders" ? 12 : 12.5);
    const btwNew = calcPercentage(e.target.value ?? 0, 21);
    const notaryMortgage = calcPercentage(e.target.value ?? 0, .4);
    const administrativeCosts = 1331;

    let notaryFee = 0;

    if (e.target.value >= 0 && e.target.value <= 100000) notaryFee = 1913;
    if (e.target.value >= 101000 && e.target.value <= 150000) notaryFee = 2275;
    if (e.target.value >= 151000 && e.target.value <= 200000) notaryFee = 2620;
    if (e.target.value >= 201000 && e.target.value <= 250000) notaryFee = 3000;
    if (e.target.value >= 301000 && e.target.value <= 350000) notaryFee = 3035;
    if (e.target.value >= 351000 && e.target.value <= 400000) notaryFee = 3070;
    if (e.target.value > 400000) notaryFee = 3140;

    registrationTaxField.value = registrationTax.toFixed(2);
    btwField.value = btwNew.toFixed(2);
    notaryFeesField.value = notaryFee.toFixed(2) + administrativeCosts.toFixed(2);
    landRegistryField.value = Number(240).toFixed(2);
    notaryMortgageField.value = notaryMortgage.toFixed(2);
  });

  regionField.addEventListener("input", (e) => {
    const registrationTax = calcPercentage(Number(priceField.value) ?? 0, e.target.value === "flanders" ? 12 : 12.5);
    registrationTaxField.value = registrationTax.toFixed(2);
  });

  loanAmountField.addEventListener("input", (e) => {
    mortgageRegistrationField.value = ((Number(e.target.value) ?? 0 * 1.1) / 100) + ((Number(e.target.value) ?? 0 * 1.1) / (100 * 0.3)) + 160.5 + (Number(e.target.value) <= 272727 ? 220 : 950).toFixed(2);
    annualMortgageRepayment.value = calcYearlyHypo(((Number(interestRateField.value) ?? 0) / 100), Number(e.target.value) ?? 0, ((Number(creditTermField.value) ?? 5) * 12));
  });

  interestRateField.addEventListener("input", (e) => {
    annualMortgageRepayment.value = calcYearlyHypo(((Number(interestRateField.value) ?? 0) / 100), Number(loanAmountField.value) ?? 0, ((Number(creditTermField.value) ?? 5) * 12));
  });

  creditTermField.addEventListener("input", (e) => {
    annualMortgageRepayment.value = calcYearlyHypo(((Number(interestRateField.value) ?? 0) / 100), Number(loanAmountField.value) ?? 0, ((Number(creditTermField.value) ?? 5) * 12));
  });

  tcoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // About project
    const isNewProject = document.getElementById("new").value;

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

    window.location = "/tco-calculator/result" + "?credit=" + Math.round(Number(mortgageRegistration) ?? 0 + Number(notaryMortgage) ?? 0 + Number(administrationCostsMortgage) ?? 0) + "&on_purchase=" + Math.round(isNewProject.value ? Number(btw) + Number(landRegistry) + Number(notaryFees) : Number(registrationTax) + Number(landRegistry) + Number(notaryFees)) + "&after_purchase=" + Math.round(Number(energyRenovations) ?? 0 + Number(otherRenovations) ?? 0) + "&yearly=" + Math.round(Number(annualMortgageRepayment) ?? 0 + Number(propertyTax) ?? 0 + Number(insurances) ?? 0 + Number(reparations) ?? 0 + Number(management) ?? 0 + Number(commonCosts) ?? 0);
  });
});