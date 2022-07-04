document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".budget-form");
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const valueField = document.getElementById("value");
        const radioButtons = document.querySelectorAll(".rad");
        const ownAmountField = document.getElementById("own_amount");
        const loanField = document.getElementById("loan");
        const termField = document.getElementById("term");

        console.log(valueField, radioButtons, ownAmountField, loanField, termField);

        let reachable = true;

        const rules = [
            ownAmountField.value > (valueField.value) / 100 * 20,
            loanField.value < (valueField.value) / 100 * 80,
        ];

        rules.forEach((rule) => {
            if (!rule) reachable = false;
        });

        resultSection.style.display = "block";

        if (!reachable) {

        };
    });
});