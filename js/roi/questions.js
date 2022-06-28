document.addEventListener("DOMContentLoaded", () => {
  const purchasePrice = document.getElementById("purchase_price");
  const rentPrice = document.getElementById("rent_price");
  const region = document.getElementById("region");
  const oneTimeCosts = document.getElementById("one_time_costs");
  const amountTimeEmpty = document.getElementById("amount_time_empty");
  const yearlyCosts = document.getElementById("yearly_costs");
  const propertyTax = document.getElementById("property_tax");
  const yearlyAmountInsurances = document.getElementById("yearly_amount_insurances");

  /**
   * Some basics
   */

  amountTimeEmpty.value = .5;
  propertyTax.value = 850;
  yearlyAmountInsurances.value = 250;

  let brutoRent = 0;
  let nettoRent = 0;

  /**
   * Calculate bruto & netto
   */

  const calcResults = () => {
    brutoRent = Math.round(((rentPrice.value ?? 0 * 12) / (purchasePrice.value ?? 0 + oneTimeCosts.value ?? 0)) * 100);
    nettoRent = Math.round(((rentPrice.value ?? 0 * 12) - (amountTimeEmpty.value ?? .5 * rentPrice.value ?? 0) - yearlyCosts.value ?? 0 - propertyTax.value ?? 0 - yearlyAmountInsurances.value ?? 0) / (purchasePrice.value ?? 0 + oneTimeCosts.value ?? 0) * 100);
  };


  /**
   * Calculate ROI
   */

  purchasePrice.addEventListener("input", () => {
    oneTimeCosts.value = Math.round((purchasePrice.value * (region.value === "flanders" ? 12.5 : 12)) / 100);
    calcResults();
  });

  region.addEventListener("input", () => {
    oneTimeCosts.value = Math.round((purchasePrice.value ?? 0 * region.value === "flanders" ? 12.5 : 12) / 100);
  });

  rentPrice.addEventListener("input", () => calcResults());
  oneTimeCosts.addEventListener("input", () => calcResults());
  propertyTax.addEventListener("input", () => calcResults());
  yearlyCosts.addEventListener("input", () => calcResults());
  amountTimeEmpty.addEventListener("input", () => calcResults());
  yearlyAmountInsurances.addEventListener("input", () => calcResults());

  /**
   * Submit form
   */

  const form = document.getElementById("roi-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    window.location = `/tco-calculator/result?purchase_price=${purchasePrice}&rent_price=${rentPrice}&region=${region}&one_time_costs=${oneTimeCosts}&amount_time_empty=${amountTimeEmpty}&yearly_costs=${yearlyCosts}&property_tax=${propertyTax}&yearly_amount_insurances=${yearlyAmountInsurances}&bruto_rent=${brutoRent}&netto_rent=${nettoRent}
    ` 
  });
}); 