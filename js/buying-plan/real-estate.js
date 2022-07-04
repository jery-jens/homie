document.addEventListener("DOMContentLoaded", () => {
    // Sections
    const resultSection = document.querySelector(".student-section");

    // Type of estate
    const house = document.getElementById("house");
    const appartment = document.getElementById("appartment");
    const assistantHouse = document.getElementById("assistanthouse");
    const studentHouse = document.getElementById("studenthouse");
    const vacationHouse = document.getElementById("vacationhouse");

    house.addEventListener("click", () => {
        if (house.checked) {
            house.checked = false;
        }
        console.log(house.checked)
        house.checked ? house.checked = true : house.checked = false;
    });
});