document.addEventListener("DOMContentLoaded", () => {
    // Sections
    const resultSection = document.querySelector(".result-section");
    const resultTitle = document.querySelector(".result-title");
    const requirementsSection = document.querySelector(".requirements-section");
    const efficientSections = document.querySelectorAll(".efficient-section");
    const reachableTips = document.querySelector(".when-reachable");
    const noReachableTips = document.querySelector(".when-not-reachable");
    const newTips = document.querySelector(".when-new");
    const oldTips = document.querySelector(".when-both");

    // Arrays
    let selectedEstates = [];
    let selectedPeople = [];
    let selectedStates = [];

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
    const budget = Number(sessionStorage.getItem("bp_values").budget) ?? 0;

    // Session
    const estatesStorage = JSON.parse(sessionStorage.getItem("bp_estates")) ?? null;
    const peopleStorage = JSON.parse(sessionStorage.getItem("bp_people")) ?? null;
    const statesStorage = JSON.parse(sessionStorage.getItem("bp_states")) ?? null;

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

        sessionStorage.setItem("bp_estates", JSON.stringify(selectedEstates));

        if (selectedEstates.length) {
            resultSection.style.display = "block";
            requirementsSection.style.display = "block";
            efficientSections.forEach((section) => {
                section.style.display = "block";
            });

            window.scrollTo({
                top: resultSection.getBoundingClientRect().top + window.scrollY - 100,
                behavior: "smooth",
            });

            console.log(resultSection.getBoundingClientRect().top + window.scrollY + 500, resultSection.getBoundingClientRect().top, window.scrollY, 500)

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
                resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "niet haalbaar" : "pas faisable";
                resultTitle.classList.add("not-green");
                reachableTips.style.display = "none";
                noReachableTips.style.display = "flex";
            } else {
                resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "haalbaar" : "faisable";
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
        const btn = item.children[0];

        if (selectedStates.includes(item.id)) {
            selectedStates.forEach((state, index) => {
                if (state === item.id) {
                    selectedStates.splice(index, 1);
                    btn.classList.remove("active");
                };
            });
        } else {
            selectedStates.push(item.id);
            btn.classList.add("active");
        };

        sessionStorage.setItem("bp_states", JSON.stringify(selectedStates));

        if (selectedStates.length === 3) {
            oldTips.style.display = "flex";
            newTips.style.display = "none";
        } else if (selectedStates.includes("new")) {
            oldTips.style.display = "none";
            newTips.style.display = "flex";
        } else if (selectedStates.includes("old")) {
            oldTips.style.display = "flex";
            newTips.style.display = "none";
        } else {
            oldTips.style.display = "none";
            newTips.style.display = "none";
        };
    };

    const radioActionPeople = (item) => {
        const btn = item.children[0];

        if (selectedPeople.includes(item.id)) {
            selectedPeople.forEach((peep, index) => {
                if (peep === item.id) {
                    selectedPeople.splice(index, 1);
                    btn.classList.remove("active");
                };
            });
        } else {
            selectedPeople.push(item.id);
            btn.classList.add("active");
        };

        sessionStorage.setItem("bp_people", JSON.stringify(selectedPeople));
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

    // Events on types of people
    students.addEventListener("click", () => {
        radioActionPeople(students);
    });

    youth.addEventListener("click", () => {
        radioActionPeople(youth);
    });

    seniors.addEventListener("click", () => {
        radioActionPeople(seniors);
    });

    families.addEventListener("click", () => {
        radioActionPeople(families);
    });

    // Watch session
    if (estatesStorage) {
        selectedEstates = estatesStorage;

        selectedEstates.forEach((estate) => {
            const selectedEstate = document.getElementById(estate);
            selectedEstate.children[0].classList.add("active");
        });

        if (selectedEstates.length) {
            resultSection.style.display = "block";
            requirementsSection.style.display = "block";
            efficientSections.forEach((section) => {
                section.style.display = "block";
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
                resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "niet haalbaar" : "pas faisable";
                resultTitle.classList.add("not-green");
                reachableTips.style.display = "none";
                noReachableTips.style.display = "flex";
            } else {
                resultTitle.innerHTML = window.location.pathname.split("/")[1] === "nl" ? "haalbaar" : "faisable";
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

    if (statesStorage) {
        selectedStates = statesStorage;

        selectedStates.forEach((state) => {
            const selectedState = document.getElementById(state);
            selectedState.children[0].classList.add("active");
        });

        if (selectedStates.length === 3) {
            oldTips.style.display = "flex";
            newTips.style.display = "none";
        } else if (selectedStates.includes("new")) {
            oldTips.style.display = "none";
            newTips.style.display = "flex";
        } else if (selectedEstates.includes("old")) {
            oldTips.style.display = "flex";
            newTips.style.display = "none";
        } else {
            oldTips.style.display = "none";
            newTips.style.display = "none";
        };
    };

    if (peopleStorage) {
        selectedPeople = peopleStorage;

        selectedPeople.forEach((peep) => {
            const selectedPeep = document.getElementById(peep);
            selectedPeep.children[0].classList.add("active");
        });
    };
});