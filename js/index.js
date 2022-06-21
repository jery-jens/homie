document.addEventListener("DOMContentLoaded", () => {
    let activeQuestion = 0;

    const questions = document.querySelectorAll(".form-question");
    const next = document.querySelector(".form-step-nav.next");
    const prev = document.querySelector(".form-step-nav.prev");
    const pagination = document.querySelectorAll(".step");
    console.log(questions, next, prev, pagination)
    
    const changeQuestion = (activeQuestion) => {
        console.log(activeQuestion)
        if ((questions.length - 1) < activeQuestion) {
            questions.forEach((question, index) => {
                if (index === activeQuestion) {
                    question.classList.add("active");
                    question.classList.remove("hidden");
                    pagination[activeQuestion].classList.add("active");
                } else {
                    question.classList.remove("active");
                    question.classList.add("hidden");
                    pagination[activeQuestion].classList.remove("active");
                };
            });
        } else {
            // Submit the form
        }
    };
    
    next.addEventListener("click", () => {
        changeQuestion(activeQuestion + 1);
    });
    
    prev.addEventListener("click", () => {
        changeQuestion(activeQuestion - 1);
    });
});