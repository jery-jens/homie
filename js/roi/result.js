document.addEventListener("DOMContentLoad", () => {
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

  const net = document.querySelector(".net");
  const brut = document.querySelector(".brut");

  net.innerHTML = "€ " + netRent;
  brut.innerHTML = "€ " + brutRent;
});
