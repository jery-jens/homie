document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/") {
        window.location = "/nl/invest-test/intro";
    };

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

    if (window.location.pathname.split("/")[1] === "nl") {
        languageBtns[0].classList.add("active");
        languageBtns[1].classList.remove("active");
    } else {
        languageBtns[0].classList.remove("active");
        languageBtns[1].classList.add("active");
    };

    languageBtns.forEach((langBtn) => {
        const lang = langBtn.getAttribute("data-lang");

        langBtn.addEventListener("click", () => {
            window.location = window.location.pathname.replace(window.location.pathname.split("/")[1] === "nl" ? "nl" : "fr", lang) + window.location.search ?? "";
        });
    });

    /**
     * Tool selector
     */

    const toolBtns = document.querySelectorAll(".tool-li");

    toolBtns.forEach((toolBtn) => {
        toolBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location = "/" + window.location.pathname.split("/")[1] + toolBtn.getAttribute("data-tool");
        });
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