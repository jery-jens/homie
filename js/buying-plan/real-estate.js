document.addEventListener("DOMContentLoaded", () => {
    // Sections
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");
    const requirementsSection = document.querySelector(".requirements-section");
    const efficientSections = document.querySelectorAll(".efficient-section");
    const reachableTips = document.querySelector(".when-reachable");
    const noReachableTips = document.querySelector(".when-not-reachable");

    // Arrays
    const selectedEstates = [];

    // Type of estate
    const house = document.getElementById("house");
    const appartment = document.getElementById("appartment");
    const assistantHouse = document.getElementById("assistanthouse");
    const studentHouse = document.getElementById("studenthouse");
    const vacationHouse = document.getElementById("vacationhouse");

    // Variables
    const budget = Number(localStorage.getItem("budget")) || 0;

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
            requirementsSection.style.display = "block";
            efficientSections.forEach((section) => {
                section.style.display = "block";
            });

            window.scrollTo({
                top: resultSection.getBoundingClientRect().top + 200,
                behavior: "smooth",
            });

            // Calculate reachability
            let reachability = true;

            selectedEstates.forEach((estate) => {
                if (reachability) {
                    if (estate === "house") {
                        budget >= 200000 ? reachability = true : reachability = false;
                    };

                    if (estate === "appartment") {
                        budget >= 100000 ? reachability = true : reachability = false;
                    };

                    if (estate === "studenthouse") {
                        budget >= 80000 ? reachability = true : reachability = false;
                    };

                    if (estate === "assistanthouse") {
                        budget >= 150000 ? reachability = true : reachability = false;
                    };

                    if (estate === "vacationhouse") {
                        budget >= 90000 ? reachability = true : reachability = false;
                    };
                };
            });

            if (!reachability) {
                resultTitle.innerHTML = "niet haalbaar";
                resultTitle.classList.add("not-green");
                reachableTips.style.display = "none";
                noReachableTips.style.display = "flex";
            } else {
                resultTitle.innerHTML = "haalbaar";
                resultTitle.classList.remove("not-green");
                reachableTips.style.display = "flex";
                noReachableTips.style.display = "none";
            };
        } else {
            resultSection.style.display = "none";
            requirementsSection.style.display = "none";
            efficientSections.forEach((section) => {
                section.style.display = "none";
            });
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