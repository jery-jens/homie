document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".budget-form");
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Fields
        const valueField = document.getElementById("value");
        const ownAmountField = document.getElementById("own_amount");
        const loanField = document.getElementById("loan");
        const termField = document.getElementById("term");

        // Radio
        const radios = [document.getElementById("2"), document.getElementById("3"), document.getElementById("4"), document.getElementById("5")];

        console.log(radios);

        let reachable = true;
        let selectedRen = 2;

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