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
    const statusSession = sessionStorage.getItem("bp_status") ?? null;

    if (session) {
        // Fill in fields
        valueField.value = Number(session.value);
        ownAmountField.value = Number(session.ownAmount);
        loanField.value = Number(session.loan);
        termField.value = session.term;
        selectedRen = Number(session.selectedRen);

        // Active state on correct radio button
        radios.forEach((radio) => {
            if (Number(radio.id) === selectedRen) {
                radio.checked = true;
            };
        });

        let reachable = true;

        const rules = [
            Number(ownAmountField.value) > (Number(valueField.value) / 100 * 20),
            Number(loanField.value) < (Number(valueField.value) / 100 * 80),
            Number(selectedRen) < 4,
        ];

        rules.forEach((rule) => {
            if (!rule) reachable = false;
        });

        if (!reachable) {
            resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "niet haalbaar" : "pas faisable";
            resultTitle.classList.add("not-green");
            nonReachableTips.style.display = "flex";
            reachableTips.style.display = "none";
        } else {
            resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "haalbaar" : "faisable";
            resultTitle.classList.remove("not-green");
            nonReachableTips.style.display = "none";
            reachableTips.style.display = "flex";
        };

        // Show sections
        resultSection.style.display = "block";
    };

    if (statusSession) {
        statusField.value = statusSession;
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
            Number(ownAmountField.value) > (Number(valueField.value) / 100 * 20),
            Number(loanField.value) < (Number(valueField.value) / 100 * 80),
            selectedRen < 4,
        ];

        rules.forEach((rule) => {
            if (!rule) reachable = false;
        });

        resultSection.style.display = "block";
        form.setAttribute("style", "display: block !important");

        if (!reachable) {
            resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "niet haalbaar" : "pas faisable";
            resultTitle.classList.add("not-green");
            nonReachableTips.style.display = "flex";
            reachableTips.style.display = "none";
        } else {
            resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "haalbaar" : "faisable";
            resultTitle.classList.remove("not-green");
            nonReachableTips.style.display = "none";
            reachableTips.style.display = "flex";
        };

        sessionStorage.setItem("bp_values", JSON.stringify({
            "term": termField.value,
            "value": Number(valueField.value),
            "loan": Number(loanField.value),
            "ownAmount": Number(ownAmountField.value),
            "selectedRen": selectedRen,
            "budget": Math.round(Number(ownAmountField.value) + Number(loanField.value))
        }));
    });
});