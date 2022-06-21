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

        // if (max <= activeQuestion) {
        //     questions[activeQuestion]
        //     questions.forEach((question, index) => {
        //         console.log(index, activeQuestion)
        //         if (index === activeQuestion) {
        //             console.log(question, "next");
        //             question.classList.add("active");
        //             question.classList.remove("hidden");
        //             pagination[activeQuestion].classList.add("active");
        //         } else {
        //             console.log(question, "prev");
        //             question.classList.remove("active");
        //             question.classList.add("hidden");
        //             pagination[activeQuestion].classList.remove("active");
        //         };
        //     });
        // } else {
        //     // Submit the form
        // }
    };
    
    next.addEventListener("click", () => {
        changeQuestion(activeQuestion + 1);
    });
    
    prev.addEventListener("click", () => {
        changeQuestion(activeQuestion - 1);
    });
});