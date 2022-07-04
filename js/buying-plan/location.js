document.addEventListener("DOMContentLoaded", () => {
    // Fields
    const provinceField = document.getElementById("province");
    const citiesField = document.getElementById("cities");

    // Check if session
    const provinceStorage = sessionStorage.getItem("bp_province") ?? null;
    const citiesStorage = sessionStorage.getItem("bp_cities") ?? null;

    if (provinceStorage) provinceField.value = provinceStorage;
    if (citiesStorage) citiesStorage.value = citiesStorage;

    provinceField.addEventListener("input", () => {
        sessionStorage.setItem("bp_province", provinceField.value);
    });

    citiesField.addEventListener("input", () => {
        sessionStorage.setItem("bp_cities", provinceField.value);
    });
});