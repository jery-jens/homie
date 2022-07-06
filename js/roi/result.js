document.addEventListener("DOMContentLoaded", () => {
  // /**
  //  * Calculate and show ROI results
  //  */

  const roiUrl = new URL(window.location.href);

  const purchasePrice = roiUrl.searchParams.get("purchase_price") ?? 0;
  const rentPrice = roiUrl.searchParams.get("rent_price") ?? 0;
  const region = roiUrl.searchParams.get("region") ?? 0;
  const oneTimeCosts = roiUrl.searchParams.get("one_time_costs") ?? 0;
  const amountTimeEmpty = roiUrl.searchParams.get("amount_time_empty") ?? 0;
  const yearlyCosts = roiUrl.searchParams.get("yearly_costs") ?? 0;
  const propertyTax = roiUrl.searchParams.get("property_tax") ?? 0;
  const yearlyAmountInsurances = roiUrl.searchParams.get("yearly_amount_insurances") ?? 0;
  const brutRent = roiUrl.searchParams.get("bruto_rent") ?? 0;
  const netRent = roiUrl.searchParams.get("netto_rent") ?? 0;
  const rentYear = rentPrice * 12;

  const net = document.querySelector(".net");
  const brut = document.querySelector(".brut");

  const testNet = ((rentYear - (amountTimeEmpty * rentPrice) - propertyTax - yearlyCosts - yearlyAmountInsurances) / (purchasePrice + oneTimeCosts)) * 100;

  console.log(testNet);

  net.innerHTML = "€ " + netRent;
  brut.innerHTML = "€ " + brutRent;

  /**
   * Get back
   */

  const backButton = document.querySelector(".back-btn");

  backButton.addEventListener("click", () => {
    window.location = `/roi-calculator/questionnaire?purchase_price=${purchasePrice}&rent_price=${rentPrice}&region=${region}&one_time_costs=${oneTimeCosts}&amount_time_empty=${amountTimeEmpty}&yearly_costs=${yearlyCosts}&property_tax=${propertyTax}&yearly_amount_insurances=${yearlyAmountInsurances}&bruto_rent=${brutRent}&netto_rent=${netRent}`;
  });
});
