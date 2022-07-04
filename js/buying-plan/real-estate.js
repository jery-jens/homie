document.addEventListener("DOMContentLoaded", () => {
    // Sections
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");
    const requirementsSection = document.querySelector(".requirements-section");
    const efficientSections = document.querySelectorAll(".efficient-section");
    const reachableTips = document.querySelector(".when-reachable");
    const noReachableTips = document.querySelector(".when-not-reachable");
    const newTips = document.querySelector(".when-new");
    const oldTips = document.querySelector(".when-old");

    // Arrays
    const selectedEstates = [];
    const selectedPeople = [];
    const selectedStates = [];

    // Type of estate
    const house = document.getElementById("house");
    const appartment = document.getElementById("appartment");
    const assistantHouse = document.getElementById("assistanthouse");
    const studentHouse = document.getElementById("studenthouse");
    const vacationHouse = document.getElementById("vacationhouse");
    const oldHouse = document.getElementById("old");
    const newHouse = document.getElementById("new");
    
    // Type of people
    const youth = document.getElementById("youth");
    const students = document.getElementById("students");
    const families = document.getElementById("families");
    const seniors = document.getElementById("seniors");

    // Variables
    const budget = Number(localStorage.getItem("budget")) || 0;

    // Change selected
    const radioActionEstate = (item) => {
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
                top: resultSection.getBoundingClientRect().x + 200,
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

    const radioActionState = (item) => {        
        if (item.id === "new") {
            newHouse.children[0].classList.add("active");
            oldHouse.children[0].classList.remove("active");

            newTips.style.display = "flex";
            oldTips.style.display = "none";
        } else {
            newHouse.children[0].classList.remove("active");
            oldHouse.children[0].classList.add("active");

            newTips.style.display = "none";
            oldTips.style.display = "flex";
        };
    };

    // Events on types of estate
    house.addEventListener("click", () => {
        radioActionEstate(house);
    });

    appartment.addEventListener("click", () => {
        radioActionEstate(appartment);
    });

    assistantHouse.addEventListener("click", () => {
        radioActionEstate(assistantHouse);
    });  

    studentHouse.addEventListener("click", () => {
        radioActionEstate(studentHouse);
    });

    vacationHouse.addEventListener("click", () => {
        radioActionEstate(vacationHouse);
    });

    // Events on states of estates
    oldHouse.addEventListener("click", () => {
        radioActionState(oldHouse);
    });

    newHouse.addEventListener("click", () => {
        radioActionState(newHouse);
    });
});