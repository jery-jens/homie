document.addEventListener("DOMContentLoaded", () => {
    let activeQuestion = 0;

    const questions = document.querySelectorAll(".form-question");
    const next = document.querySelector(".form-step-nav.next");
    const prev = document.querySelector(".form-step-nav.prev");
    const pagination = document.querySelectorAll(".step");
    
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
                console.log(activeQuestion);
                question.classList.add("active");
                question.classList.remove("hidden");
                pagination[index].classList.add("active");
            } else {
                console.log(activeQuestion);
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
});