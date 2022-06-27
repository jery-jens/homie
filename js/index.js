document.addEventListener("DOMContentLoaded", () => {
    /**
     * Header
     */

    window.addEventListener("scroll", () => {
        const header = document.querySelector(".main-menu");
        const top = window.pageYOffset || document.documentElement.scrollTop;
        top >= 65 ? header.classList.add("active") : header.classList.remove("active");
    });

    /**
     * Switches
     */

    const switches = document.querySelectorAll(".switch-checkbox-field");
    console.log(switches)

    switches.forEach((item, index) => {
        const wrapper = item.parentElement.parentElement;
        const circle = wrapper.children[0];
        const label = wrapper.parentElement.children[1];

        console.log(wrapper, circle, label);

        item.addEventListener("change", () => {
            console.log(item.checked);

            if (item.checked) {
                wrapper.classList.add("active");
                circle.classList.add("active");
                label.classList.add("active");
                label.innerHTML = "Ja";
            } else {
                wrapper.classList.remove("active");
                circle.classList.remove("active");
                label.classList.remove("active");
                label.innerHTML = "Nee";
            };
        });
    });

    /**
     * Tool selector
     */

    const selector = document.querySelector(".btn-tool-select");


    /** 
     * Questions 
     * */

    let activeQuestion = 0;

    const questions = document.querySelectorAll(".form-question");
    const next = document.querySelector(".form-step-nav.next");
    const prev = document.querySelector(".form-step-nav.prev");
    const pagination = document.querySelectorAll(".step");

    if (questions) {
        const changeQuestion = (activeQuestion) => {
            const max = questions.length - 1;

            if (activeQuestion > 0) {
                prev.style.display = "block";
            } else {
                prev.style.display = "none";
            };

            if (activeQuestion === max) {
                next.style.display = "none";
            } else {
                next.style.display = "block";
            };

            questions.forEach((question, index) => {
                if (activeQuestion === index) {
                    question.classList.add("active");
                    question.classList.remove("hidden");
                    pagination[index].classList.add("active");
                } else {
                    question.classList.remove("active");
                    question.classList.add("hidden");
                    pagination[index].classList.remove("active");
                };
            });
        };

        next.addEventListener("click", () => {
            activeQuestion = activeQuestion + 1;
            changeQuestion(activeQuestion);
        });

        prev.addEventListener("click", () => {
            activeQuestion = activeQuestion - 1;
            changeQuestion(activeQuestion);
        });
    };
});