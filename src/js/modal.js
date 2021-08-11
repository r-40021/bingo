const isSP = window.ontouchstart !== undefined && 0 < navigator.maxTouchPoints;
export function modalTrigger() {
    let elements = document.getElementsByClassName("modal-trigger");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (isSP) {
            let leave = false;
            element.addEventListener("touchstart", (e) => {
                leave = false;
                element.addEventListener("touchend", (e) => {
                    if (!leave) {
                        e.preventDefault();
                        openModal(document.getElementById(element.getAttribute("modal-target")));
                    }
                })
            }, false);
            element.addEventListener("touchmove", (e) => {
                if (document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) !== element) {
                    leave = true;
                }
            }, false);
        } else {
            element.addEventListener("click", (e) => {
                e.preventDefault();
                openModal(document.getElementById(element.getAttribute("modal-target")));
            }, false);
        }
    }
}

export function modalClose() {
    let elements = document.getElementsByClassName("modalClose");
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (isSP) {
            let leave = false;
            element.addEventListener("touchstart", (e) => {
                leave = false;
                element.addEventListener("touchend", (e) => {
                    if (!leave) {
                        if (!element.classList.contains("modal-overlay") || (element.classList.contains("modal-overlay") && element.classList.contains("active") && !e.target.closest(".modal"))) {
                            e.preventDefault();
                            closeModal(document.querySelector(".modal.active"));
                        }
                    }
                })
            }, false);
            element.addEventListener("touchmove", (e) => {
                if (document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) !== element) {
                    leave = true;
                }
            }, false);
        } else {
            element.addEventListener("click", (e) => {
                if (!element.classList.contains("modal-overlay") || (element.classList.contains("modal-overlay") && element.classList.contains("active") && !e.target.closest(".modal"))) {
                    e.preventDefault();
                    closeModal(document.querySelector(".modal.active"));
                }
            }, false);
        }
    }
}

export function openModal(target) {
    target.classList.add("active");
    target.removeAttribute("aria-hidden");
    document.getElementById("modal-overlay").classList.add("active");
    document.getElementById("modal-overlay").style.zIndex = 9998;
}
export function closeModal(target) {
    target.classList.remove("active");
    target.setAttribute("aria-hidden", true);
    document.getElementById("modal-overlay").classList.remove("active");
    setTimeout(() => {
        document.getElementById("modal-overlay").style.zIndex = -2;
    }, 150);
}
