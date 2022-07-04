document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const form = document.querySelector(".budget-form");
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");
    const reachableTips = document.querySelector(".when-reachable");
    const nonReachableTips = document.querySelector(".when-not-reachable");

    // Fields
    const valueField = document.getElementById("value");
    const ownAmountField = document.getElementById("own_amount");
    const loanField = document.getElementById("loan");
    const termField = document.getElementById("term");
    const statusField = document.getElementById("status");

    // Radio
    let selectedRen = 2;
    const radios = [document.getElementById("2"), document.getElementById("3"), document.getElementById("4"), document.getElementById("5")];

    // Check if session
    const session = JSON.parse(sessionStorage.getItem("bp_values")) ?? null;
    if (session) {
        // Fill in fields
        valueField.value = Number(session.value);
        ownAmountField.value = Number(session.ownAmount);
        loanField.value = Number(session.loan);
        selectedRen = Number(session.selectedRen);

        const rules = [
            ownAmountField.value > ((valueField.value) / 100 * 20),
            loanField.value < ((valueField.value) / 100 * 80),
            selectedRen > 4,
        ];

        rules.forEach((rule) => {
            if (!rule) reachable = false;
        });

        console.log(rules);

        // Show sections
        resultSection.style.display = "block";
    };

    // When status changes
    statusField.addEventListener("input", () => {
        sessionStorage.setItem("bp_status", statusField.value);
    });

    // Submit form
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        radios.forEach((radio) => {
            if (radio.checked) {
                selectedRen = Number(radio.value);
            };
        });

        let reachable = true;

        const rules = [
            ownAmountField.value > ((valueField.value) / 100 * 20),
            loanField.value < ((valueField.value) / 100 * 80),
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
            nonReachableTips.style.display = "flex";
            reachableTips.style.display = "none";
        } else {
            resultTitle.innerHTML = "haalbaar";
            resultTitle.classList.remove("not-green");
            nonReachableTips.style.display = "none";
            reachableTips.style.display = "flex";
        };

        sessionStorage.setItem("bp_values", JSON.stringify({
            "term": termField.value,
            "value": valueField.value,
            "loan": loanField.value,
            "ownAmount": ownAmountField.value,
            "selectedRen": selectedRen,
            "budget": Math.round(Number(ownAmountField.value) + Number(loanField.value))
        }));
    });
});