import { MoneyFormat } from "../func/calculations.js";

document.addEventListener("DOMContentLoaded", () => {
  // /**
  //  * Calculate and show ROI results
  //  */

  const roiUrl = new URL(window.location.href);

  const purchasePrice = Number(roiUrl.searchParams.get("purchase_price")) ?? 0;
  const rentPrice = Number(roiUrl.searchParams.get("rent_price")) ?? 0;
  const region = roiUrl.searchParams.get("region") ?? 0;
  const oneTimeCosts = Number(roiUrl.searchParams.get("one_time_costs")) ?? 0;
  const amountTimeEmpty = Number(roiUrl.searchParams.get("amount_time_empty")) ?? 0;
  const yearlyCosts = Number(roiUrl.searchParams.get("yearly_costs")) ?? 0;
  const propertyTax = Number(roiUrl.searchParams.get("property_tax")) ?? 0;
  const yearlyAmountInsurances = Number(roiUrl.searchParams.get("yearly_amount_insurances")) ?? 0;
  const brutRent = roiUrl.searchParams.get("bruto_rent") ?? 0;
  const netRent = roiUrl.searchParams.get("netto_rent") ?? 0;
  const rentYear = rentPrice * 12;

  const net = document.querySelector(".net");
  const brut = document.querySelector(".brut");

  const netResult = ((rentYear - (amountTimeEmpty * rentPrice) - propertyTax - yearlyCosts - yearlyAmountInsurances) / (purchasePrice + oneTimeCosts)) * 100;
  const brutResult = ((rentYear) / (purchasePrice + oneTimeCosts)) * 100;
  const netDigit = MoneyFormat((purchasePrice + oneTimeCosts) * (netResult / 100));
  const brutDigit = MoneyFormat((purchasePrice + oneTimeCosts) * (brutResult / 100));
  console.log(netDigit, brutResult);

  net.innerHTML = String(netResult.toFixed(2) + "%").replace(".", ",");
  brut.innerHTML = String(brutResult.toFixed(2) + "%").replace(".", ",");

  /**
   * Get back
   */

  const backButton = document.querySelector(".back-btn");

  backButton.addEventListener("click", () => {
    window.location = `/${window.location.pathname.split("/")[1]}/roi-calculator/questionnaire?purchase_price=${purchasePrice}&rent_price=${rentPrice}&region=${region}&one_time_costs=${oneTimeCosts}&amount_time_empty=${amountTimeEmpty}&yearly_costs=${yearlyCosts}&property_tax=${propertyTax}&yearly_amount_insurances=${yearlyAmountInsurances}&bruto_rent=${brutRent}&netto_rent=${netRent}`;
  });
});
