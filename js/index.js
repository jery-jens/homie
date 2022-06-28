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

        if (next) {
            next.addEventListener("click", () => {
                activeQuestion = activeQuestion + 1;
                changeQuestion(activeQuestion);
            });    
        };

        if (prev) {
            prev.addEventListener("click", () => {
                activeQuestion = activeQuestion - 1;
                changeQuestion(activeQuestion);
            });
        };
    };
});