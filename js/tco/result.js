document.addEventListener("DOMContentLoaded", () => {
  // /**
  //  * Calculate and show TCO results
  //  */

  const tcoUrl = new URL(window.location.href);

  const credit = tcoUrl.searchParams.get("credit") ?? 0;
  const onPurchase = tcoUrl.searchParams.get("on_purchase") ?? 0;
  const afterPurchase = tcoUrl.searchParams.get("after_purchase") ?? 0;
  const yearly = tcoUrl.searchParams.get("yearly") ?? 0;

  const totalOut = document.querySelector(".total-out");
  const totalPurchase = document.querySelector(".total-purchase");
  const totalExpect = document.querySelector(".total-expect");
  const totalCredit = document.querySelector(".total-credit");
  const totalYearly = document.querySelectorAll(".total-yearly-out");

  if (totalOut) {
    totalOut.innerHTML = "€ " + Math.round(Number(credit) + Number(onPurchase) + Number(afterPurchase));
    totalExpect.innerHTML = "€ " + afterPurchase;
    totalPurchase.innerHTML = "€ " + onPurchase;
    totalCredit.innerHTML = "€ " + credit;
  };

  if (yearly) {
    totalYearly.forEach((item) => {
      item.innerHTML = "€ " + yearly;
    });
  };
});