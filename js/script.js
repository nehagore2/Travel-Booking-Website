/* =========================================================
   WANDERLIGHT TRAVEL WEBSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   01. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initSearch();

    initHeader();

    initScrollTop();

    initFavorites();

    initScrollReveal();

    initNewsletter();

    initSmoothScroll();

    initImageFallbacks();

    initUrlSearch();

});


/* =========================================================
   02. MOBILE NAVIGATION
========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    if (!menuToggle || !navbar) {
        return;
    }

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navbar.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Close menu when clicking navigation link */

    const navLinks =
        navbar.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navbar.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navbar.classList.contains("active")
        ) {

            navbar.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );
        }

    });


    /* Close menu with Escape */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navbar.classList.contains("active")
        ) {

            navbar.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });

}


/* =========================================================
   03. SEARCH
========================================================= */

function initSearch() {

    const searchToggle =
        document.getElementById("searchToggle");

    const searchPanel =
        document.getElementById("searchPanel");

    const searchInput =
        document.getElementById("globalSearch");

    if (
        !searchToggle ||
        !searchPanel
    ) {
        return;
    }


    searchToggle.addEventListener("click", () => {

        const isOpen =
            searchPanel.classList.toggle("active");

        if (isOpen && searchInput) {

            setTimeout(() => {
                searchInput.focus();
            }, 250);

        }

    });


    /* Close search when Escape is pressed */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            searchPanel.classList.contains("active")
        ) {

            searchPanel.classList.remove("active");

        }

    });

}


/* =========================================================
   04. HEADER SCROLL EFFECT
========================================================= */

function initHeader() {

    const header =
        document.getElementById("header");

    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   05. SCROLL TO TOP
========================================================= */

function initScrollTop() {

    const scrollTop =
        document.getElementById("scrollTop");

    if (!scrollTop) {
        return;
    }


    function updateScrollButton() {

        if (window.scrollY > 500) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    }


    updateScrollButton();


    window.addEventListener(
        "scroll",
        updateScrollButton,
        {
            passive: true
        }
    );


    scrollTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   06. FAVORITE DESTINATIONS
   USING LOCAL STORAGE
========================================================= */

function initFavorites() {
    const favoriteButtons = document.querySelectorAll(
        ".favorite-btn, .favorite-package"
    );

    if (!favoriteButtons.length) {
        return;
    }

    let favorites = getStoredFavorites();

    favoriteButtons.forEach(button => {
        const card =
            button.closest(".destination-page-card") ||
            button.closest(".destination-card") ||
            button.closest(".package-card");

        if (!card) {
            return;
        }

        const item = getFavoriteItem(card);

        if (!item || !item.name) {
            return;
        }

        const exists = favorites.some(
            favorite =>
                String(favorite.name).toLowerCase() ===
                String(item.name).toLowerCase()
        );

        if (exists) {
            button.classList.add("active");
            button.textContent = "♥";
        } else {
            button.classList.remove("active");
            button.textContent = "♡";
        }

        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const currentFavorites = getStoredFavorites();

            const index = currentFavorites.findIndex(
                favorite =>
                    String(favorite.name).toLowerCase() ===
                    String(item.name).toLowerCase()
            );

            if (index === -1) {
                currentFavorites.push(item);

                button.classList.add("active");
                button.textContent = "♥";

                showToast("Added to My Trips ❤️");
            } else {
                currentFavorites.splice(index, 1);

                button.classList.remove("active");
                button.textContent = "♡";

                showToast("Removed from My Trips");
            }

            localStorage.setItem(
                "wanderlightCart",
                JSON.stringify(currentFavorites)
            );
        });
    });
}


function getFavoriteItem(card) {
    const image =
        card.querySelector("img")?.getAttribute("src") || "";

    const title =
        card.querySelector("h3")?.textContent.trim() ||
        card.dataset.name ||
        "";

    const description =
        card.querySelector(
            ".package-description, .destination-page-body p, .destination-content p, .package-content p"
        )?.textContent.trim() || "";

    const location =
        card.querySelector(
            ".package-location, .destination-location, .destination-country"
        )?.textContent.trim() || "";

    const priceElement =
        card.querySelector(
            ".package-price strong, .destination-price strong, .package-meta strong, .destination-bottom strong"
        );

    const price =
        priceElement?.textContent.trim() ||
        card.dataset.price ||
        "";

    return {
        name: title,
        image: image,
        location: location,
        description: description,
        price: price
    };
}


function getStoredFavorites() {
    try {
        const saved =
            localStorage.getItem("wanderlightCart");

        return saved
            ? JSON.parse(saved)
            : [];
    } catch (error) {
        console.error(
            "Could not read saved trips:",
            error
        );

        return [];
    }
}

/* =========================================================
   07. SCROLL REVEAL ANIMATION
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".destination-card, " +
            ".trip-card, " +
            ".package-card, " +
            ".testimonial-card, " +
            ".section-heading, " +
            ".offer-card, " +
            ".newsletter-container"
        );

    if (!elements.length) {
        return;
    }


    elements.forEach(element => {

        element.classList.add("reveal");

    });


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {

            element.classList.add("active");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   08. NEWSLETTER FORM
========================================================= */

function initNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    const emailInput =
        document.getElementById(
            "newsletterEmail"
        );

    if (!form || !emailInput) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                emailInput.value.trim();


            if (!isValidEmail(email)) {

                showToast(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            /* Save email */

            let subscribers = [];


            try {

                subscribers =
                    JSON.parse(
                        localStorage.getItem(
                            "wanderlightSubscribers"
                        )
                    ) || [];

            } catch {

                subscribers = [];

            }


            if (
                !subscribers.includes(email)
            ) {

                subscribers.push(email);

            }


            localStorage.setItem(
                "wanderlightSubscribers",
                JSON.stringify(subscribers)
            );


            emailInput.value = "";


            showToast(
                "You're subscribed! ✈️"
            );

        }
    );

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/* =========================================================
   09. SMOOTH INTERNAL LINKS
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute("href");


                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   10. IMAGE FALLBACKS
========================================================= */

function initImageFallbacks() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );


                image.style.opacity = "0.4";

                image.style.background =
                    "#0a6257";

            }
        );

    });

}


/* =========================================================
   11. URL SEARCH
========================================================= */

function initUrlSearch() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const search =
        params.get("search");


    if (!search) {
        return;
    }


    const searchInput =
        document.getElementById(
            "globalSearch"
        );


    if (searchInput) {

        searchInput.value = search;

    }

}


/* =========================================================
   12. TOAST NOTIFICATION
========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "wanderlightToast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );

        toast.id =
            "wanderlightToast";


        toast.style.position =
            "fixed";

        toast.style.left =
            "50%";

        toast.style.bottom =
            "30px";

        toast.style.zIndex =
            "9999";

        toast.style.transform =
            "translate(-50%, 20px)";

        toast.style.background =
            "#043c36";

        toast.style.color =
            "#ffffff";

        toast.style.padding =
            "13px 22px";

        toast.style.borderRadius =
            "50px";

        toast.style.fontSize =
            "12px";

        toast.style.fontWeight =
            "600";

        toast.style.boxShadow =
            "0 15px 40px rgba(0,0,0,.25)";

        toast.style.opacity =
            "0";

        toast.style.transition =
            "all .3s ease";

        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    clearTimeout(
        toast.hideTimer
    );


    requestAnimationFrame(() => {

        toast.style.opacity =
            "1";

        toast.style.transform =
            "translate(-50%, 0)";

    });


    toast.hideTimer =
        setTimeout(() => {

            toast.style.opacity =
                "0";

            toast.style.transform =
                "translate(-50%, 20px)";

        }, 2500);

}


/* =========================================================
   13. BUTTON CLICK FEEDBACK
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".btn"
            );


        if (!button) {
            return;
        }


        /* Prevent duplicate animation */

        button.classList.remove(
            "button-clicked"
        );


        void button.offsetWidth;


        button.classList.add(
            "button-clicked"
        );

    }
);


/* =========================================================
   14. DESTINATION CARD IMAGE INTERACTION
========================================================= */

document
    .querySelectorAll(
        ".destination-card"
    )
    .forEach(card => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.zIndex = "5";

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.zIndex = "1";

            }
        );

    });


/* =========================================================
   15. ACTIVE NAVIGATION
========================================================= */

function setActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .toLowerCase();


        link.classList.remove(
            "active"
        );


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


setActiveNavigation();


/* =========================================================
   16. KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            event.target.classList.contains(
                "favorite-btn"
            )
        ) {

            event.target.click();

        }

    }
);


/* =========================================================
   17. PAGE LOAD ANIMATION
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);


/* =========================================================
   18. PREVENT EMPTY SOCIAL LINKS
========================================================= */

document
    .querySelectorAll(
        '.social-links a[href="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                showToast(
                    "Social media link coming soon."
                );

            }
        );

    });


/* =========================================================
   19. GLOBAL ERROR HANDLING
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.warn(
            "WanderLight:",
            event.message
        );

    }
);


/* =========================================================
   20. CONSOLE MESSAGE
========================================================= */

console.log(
    "%cWanderLight Travel Website",
    "color:#e6bd55;font-size:18px;font-weight:bold;"
);

console.log(
    "%cWebsite initialized successfully.",
    "color:#14786b;font-size:12px;"
);