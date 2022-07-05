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

    const selectorBtn = document.querySelector(".btn-tool-select");
    const selectorPopup = document.querySelector(".popup-toolselect");

    if (selectorBtn && selectorPopup) {
        selectorBtn.addEventListener("click", () => {
            selectorPopup.style.display = "block";
        });
    };

    /**
     * Info show
     */

    const infoBtn = document.querySelector(".btn-info");
    const infoPopup = document.querySelector(".popup-tool-info");
    const closeInfoPopup = document.querySelector(".popup-header-close");

    if (infoBtn && infoPopup && closeInfoPopup) {
        infoBtn.addEventListener("click", () => {
            infoPopup.style.display = "flex";
        });

        closeInfoPopup.addEventListener("click", () => {
            infoPopup.style.display = "none";
        });
    };

    /**
     * Info bubbles
     */

    const infoBubbleBtn = document.querySelectorAll(".info-bubble-btn");
    const infoBubbles = document.querySelectorAll(".popup-info-bubble");
});