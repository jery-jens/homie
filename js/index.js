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
    const formBlocks = document.querySelectorAll(".input-block")
    const creditRow = document.querySelector(".credit-row")

    switches.forEach((item) => {
        const wrapper = item.parentElement.parentElement;
        const circle = wrapper.children[0];
        const label = wrapper.parentElement.children[1];

        console.log(formBlocks, creditRow)

        item.addEventListener("change", () => {
            if (item.checked) {
                wrapper.classList.add("active");
                circle.classList.add("active");
                label.classList.add("active");
                label.innerHTML = "Ja";

                if (formBlocks) {
                    formBlocks.forEach((block) => {
                        console.log(item)
                        if (item.classList.contains("new-field")) {
                            if (block.classList.contains("new")) {
                                block.classList.remove("hidden");
                            };

                            if (block.classList.contains("not-new")) {
                                block.classList.add("hidden");
                            };
                        };
                    }); 
                };
                
                if (creditRow) {
                    if (item.classList.contains("credit-field")) {
                        creditRow.classList.remove("hidden");
                    };
                };
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