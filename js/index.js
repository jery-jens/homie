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
    const closeSelectorPopup = document.querySelector(".popup-tool-close");

    if (selectorBtn && selectorPopup && closeSelectorPopup) {
        selectorBtn.addEventListener("click", () => {
            selectorPopup.style.display = "block";
        });

        closeSelectorPopup.addEventListener("click", () => {
            selectorPopup.style.display = "none";
        });
    };

    /**
     * Language selector
     */

    const languageBtns = document.querySelectorAll(".language-btn");

    languageBtns.forEach((langBtn) => {
        const lang = langBtn.getAttribute("data-lang");
        window.location = window.location.pathname.replace(window.location.pathname.split("/")[1] === "nl" ? "nl" : "fr", lang);
    });

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

    const infoBubbleBtns = document.querySelectorAll(".info-bubble-btn");
    const infoBubbles = document.querySelectorAll(".popup-info-bubble");

    infoBubbles.forEach((infoBubble) => {
        infoBubble.querySelector(".btn-close-popup").addEventListener("click", () => {
            infoBubble.style.display = "none";
        });
    });

    infoBubbleBtns.forEach((infoBubbleBtn) => {
        const attr = infoBubbleBtn.getAttribute("data-info");
        
        infoBubbleBtn.addEventListener("click", () => {
            infoBubbles.forEach((infoBubble) => {
                if (attr === infoBubble.querySelector(".info-bubble-label").innerHTML) {
                    infoBubble.style.display = "flex";
                };
            });
        });
    });
});