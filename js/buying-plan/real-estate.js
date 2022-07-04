document.addEventListener("DOMContentLoaded", () => {
    // Sections
    const resultSection = document.querySelector(".result-section");
    const requirementsSection = document.querySelector(".requirements-section");
    const efficientSection = document.querySelector(".efficient-section");

    // Arrays
    const selectedEstates = [];

    // Type of estate
    const house = document.getElementById("house");
    const appartment = document.getElementById("appartment");
    const assistantHouse = document.getElementById("assistanthouse");
    const studentHouse = document.getElementById("studenthouse");
    const vacationHouse = document.getElementById("vacationhouse");

    // Change selected
    const radioAction = (item) => {
        const btn = item.children[0];

        if (selectedEstates.includes(item.id)) {
            selectedEstates.forEach((estate, index) => {
                if (estate === item.id) {
                    selectedEstates.splice(index, 1);
                    btn.classList.remove("active");
                };
            });
        } else {
            selectedEstates.push(item.id);
            btn.classList.add("active");
        };

        if (selectedEstates.length) {
            resultSection.style.display = "block";
        };
    };

    house.addEventListener("click", () => {
        radioAction(house);
    });

    appartment.addEventListener("click", () => {
        radioAction(appartment);
    });

    assistantHouse.addEventListener("click", () => {
        radioAction(assistantHouse);
    });  

    studentHouse.addEventListener("click", () => {
        radioAction(studentHouse);
    });

    vacationHouse.addEventListener("click", () => {
        radioAction(vacationHouse);
    });
});