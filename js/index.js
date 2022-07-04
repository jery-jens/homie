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
     * Info show
     */

    const infoBtn = document.querySelector(".btn-info");
    const infoPopup = document.querySelector(".popup-tool-info");

    if (infoBtn && infoPopup) {
        infoBtn.addEventListener("click", () => {
            console.log("jaaaa!");
        });
    };
});