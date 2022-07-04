document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".budget-form");
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");
    const reachableTips = document.querySelector(".when-reachable");
    const nonReachableTips = document.querySelector(".when-not-reachable");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Fields
        const valueField = document.getElementById("value");
        const ownAmountField = document.getElementById("own_amount");
        const loanField = document.getElementById("loan");
        const termField = document.getElementById("term");

        // Radio
        let selectedRen = 2;
        const radios = [document.getElementById("2"), document.getElementById("3"), document.getElementById("4"), document.getElementById("5")];

        radios.forEach((radio) => {
            if (radio.checked) {
                selectedRen = Number(radio.value);
            };
        });

        let reachable = true;

        const rules = [
            ownAmountField.value > (valueField.value) / 100 * 20,
            loanField.value < (valueField.value) / 100 * 80,
            selectedRen > 4,
        ];

        rules.forEach((rule) => {
            if (!rule) reachable = false;
        });

        resultSection.style.display = "block";
        form.setAttribute("style", "display: block !important");

        if (!reachable) {
            resultTitle.innerHTML = "niet haalbaar";
            resultTitle.classList.add("not-green");
            nonReachableTips.style.display = "block";
            reachableTips.style.display = "none";
        } else {
            resultTitle.innerHTML = "haalbaar";
            resultTitle.classList.remove("not-green");
            nonReachableTips.style.display = "none";
            reachableTips.style.display = "block";
        };
    });
});