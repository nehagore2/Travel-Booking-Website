/* =========================================================
   WANDERLY TRAVEL WEBSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   01. GLOBAL HELPERS
========================================================= */

const $ = (selector, parent = document) => {
    return parent.querySelector(selector);
};


const $$ = (selector, parent = document) => {
    return [...parent.querySelectorAll(selector)];
};


function getPageName() {
    const path = window.location.pathname;

    const file = path.split("/").pop();

    return file || "index.html";
}


function formatPrice(price) {
    return `₹${Number(price).toLocaleString("en-IN")}`;
}


function getStoredBookings() {
    return JSON.parse(
        localStorage.getItem("wanderlyBookings") || "[]"
    );
}


/* =========================================================
   02. HEADER / NAVIGATION
========================================================= */

function initializeNavigation() {

    const header = $(".header");

    const menuToggle = $(".menu-toggle");

    const navbar = $(".navbar");


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

    window.addEventListener("scroll", updateHeader);


    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            navbar.classList.toggle("active");

        });


        $$(".nav-link", navbar).forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navbar.classList.remove("active");

            });

        });

    }

}


/* =========================================================
   03. ACTIVE NAVIGATION LINK
========================================================= */

function setActiveNavigation() {

    const currentPage = getPageName();

    $$(".nav-link").forEach(link => {

        const href = link.getAttribute("href");

        if (!href) {
            return;
        }


        const linkPage = href.split("/").pop();


        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   04. HOME PAGE DESTINATIONS
========================================================= */

function renderHomeDestinations() {

    const container = $("#homeDestinations");

    if (!container) {
        return;
    }


    if (
        typeof destinations === "undefined" ||
        !Array.isArray(destinations)
    ) {

        console.warn("Destination data not found.");

        return;
    }


    const popularDestinations = destinations.slice(0, 6);


    container.innerHTML = popularDestinations
        .map(destination => {

            return `
                <article class="destination-card">

                    <div class="destination-card-image">

                        <img
                            src="${destination.image}"
                            alt="${destination.name}"
                            loading="lazy"
                        >

                    </div>


                    <div class="destination-card-content">

                        <span class="card-category">
                            ${destination.category}
                        </span>


                        <h3>
                            ${destination.name}
                        </h3>


                        <p>
                            ${destination.description}
                        </p>


                        <div class="card-bottom">

                            <span class="card-price">
                                ${formatPrice(destination.price)}
                                <small>/ person</small>
                            </span>


                            <a
                                href="destinations.html?id=${destination.id}"
                                class="card-link"
                            >
                                Explore →
                            </a>

                        </div>

                    </div>

                </article>
            `;

        })
        .join("");

}


/* =========================================================
   05. HOME PAGE PACKAGES
========================================================= */

function renderHomePackages() {

    const container = $("#homePackages");

    if (!container) {
        return;
    }


    if (
        typeof packages === "undefined" ||
        !Array.isArray(packages)
    ) {

        console.warn("Package data not found.");

        return;
    }


    const featuredPackages = packages.slice(0, 6);


    container.innerHTML = featuredPackages
        .map(pkg => createPackageCard(pkg))
        .join("");

}


function createPackageCard(pkg) {

    return `
        <article class="package-card">

            <div class="package-card-image">

                <img
                    src="${pkg.image}"
                    alt="${pkg.name}"
                    loading="lazy"
                >

            </div>


            <div class="package-card-content">

                <span class="card-category">
                    ${pkg.category}
                </span>


                <h3>
                    ${pkg.name}
                </h3>


                <p>
                    ${pkg.description}
                </p>


                <div class="card-bottom">

                    <span class="card-price">
                        ${formatPrice(pkg.price)}
                        <small>/ person</small>
                    </span>


                    <a
                        href="package-details.html?id=${pkg.id}"
                        class="card-link"
                    >
                        View Details →
                    </a>

                </div>

            </div>

        </article>
    `;

}


/* =========================================================
   06. DESTINATIONS PAGE
========================================================= */

function initializeDestinationPage() {

    const container = $("#destinationGrid");

    if (!container) {
        return;
    }


    if (
        typeof destinations === "undefined" ||
        !Array.isArray(destinations)
    ) {

        return;
    }


    const searchInput = $("#destinationSearch");

    const categoryFilter = $("#categoryFilter");

    const priceFilter = $("#priceFilter");

    const sortFilter = $("#sortFilter");

    const resetButton = $("#resetFilters");

    const resultCount = $("#destinationCount");


    function filterDestinations() {

        let filtered = [...destinations];


        /* SEARCH */

        const searchValue =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        if (searchValue) {

            filtered = filtered.filter(destination => {

                return (
                    destination.name
                        .toLowerCase()
                        .includes(searchValue) ||

                    destination.description
                        .toLowerCase()
                        .includes(searchValue) ||

                    destination.category
                        .toLowerCase()
                        .includes(searchValue)
                );

            });

        }


        /* CATEGORY */

        const category =
            categoryFilter?.value || "all";


        if (category !== "all") {

            filtered = filtered.filter(destination => {

                return (
                    destination.category.toLowerCase() ===
                    category.toLowerCase()
                );

            });

        }


        /* PRICE */

        const price =
            priceFilter?.value || "all";


        if (price !== "all") {

            filtered = filtered.filter(destination => {

                const amount = Number(destination.price);


                if (price === "under-20000") {
                    return amount < 20000;
                }


                if (price === "20000-40000") {
                    return amount >= 20000 && amount <= 40000;
                }


                if (price === "40000-60000") {
                    return amount > 40000 && amount <= 60000;
                }


                if (price === "above-60000") {
                    return amount > 60000;
                }


                return true;

            });

        }


        /* SORT */

        const sort =
            sortFilter?.value || "default";


        if (sort === "price-low") {

            filtered.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }


        if (sort === "price-high") {

            filtered.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }


        if (sort === "name") {

            filtered.sort(
                (a, b) =>
                    a.name.localeCompare(b.name)
            );

        }


        renderDestinationResults(
            filtered,
            container,
            resultCount
        );

    }


    function renderDestinationResults(
        items,
        target,
        countElement
    ) {

        if (countElement) {

            countElement.textContent =
                `${items.length} destination${items.length !== 1 ? "s" : ""} found`;

        }


        if (items.length === 0) {

            target.innerHTML = `
                <div class="no-results">

                    <div class="no-results-icon">
                        🔎
                    </div>

                    <h3>
                        No destinations found
                    </h3>

                    <p>
                        Try changing your search or filters.
                    </p>

                    <button
                        class="btn btn-primary"
                        id="emptyResetButton"
                    >
                        Reset Filters
                    </button>

                </div>
            `;


            $("#emptyResetButton")?.addEventListener(
                "click",
                resetFilters
            );


            return;
        }


        target.innerHTML = items
            .map(destination => {

                return `
                    <article class="destination-card">

                        <div class="destination-card-image">

                            <img
                                src="${destination.image}"
                                alt="${destination.name}"
                                loading="lazy"
                            >

                        </div>


                        <div class="destination-card-content">

                            <span class="card-category">
                                ${destination.category}
                            </span>


                            <h3>
                                ${destination.name}
                            </h3>


                            <p>
                                ${destination.description}
                            </p>


                            <div class="card-bottom">

                                <span class="card-price">
                                    ${formatPrice(destination.price)}
                                    <small>/ person</small>
                                </span>


                                <a
                                    href="destination-details.html?id=${destination.id}"
                                    class="card-link"
                                >
                                    View Details →
                                </a>

                            </div>

                        </div>

                    </article>
                `;

            })
            .join("");

    }


    function resetFilters() {

        if (searchInput) {
            searchInput.value = "";
        }


        if (categoryFilter) {
            categoryFilter.value = "all";
        }


        if (priceFilter) {
            priceFilter.value = "all";
        }


        if (sortFilter) {
            sortFilter.value = "default";
        }


        filterDestinations();

    }


    searchInput?.addEventListener(
        "input",
        filterDestinations
    );


    categoryFilter?.addEventListener(
        "change",
        filterDestinations
    );


    priceFilter?.addEventListener(
        "change",
        filterDestinations
    );


    sortFilter?.addEventListener(
        "change",
        filterDestinations
    );


    resetButton?.addEventListener(
        "click",
        resetFilters
    );


    filterDestinations();

}


/* =========================================================
   07. PACKAGES PAGE
========================================================= */

function initializePackagesPage() {

    const container = $("#packageGrid");

    if (!container) {
        return;
    }


    if (
        typeof packages === "undefined" ||
        !Array.isArray(packages)
    ) {

        return;
    }


    const searchInput = $("#packageSearch");

    const categoryFilter = $("#packageCategory");

    const durationFilter = $("#durationFilter");

    const priceFilter = $("#packagePrice");

    const sortFilter = $("#packageSort");

    const resetButton = $("#resetPackageFilters");

    const resultCount = $("#packageCount");


    function filterPackages() {

        let filtered = [...packages];


        /* SEARCH */

        const search =
            searchInput?.value
                .trim()
                .toLowerCase() || "";


        if (search) {

            filtered = filtered.filter(pkg => {

                return (
                    pkg.name.toLowerCase().includes(search) ||

                    pkg.description.toLowerCase().includes(search) ||

                    pkg.category.toLowerCase().includes(search)
                );

            });

        }


        /* CATEGORY */

        const category =
            categoryFilter?.value || "all";


        if (category !== "all") {

            filtered = filtered.filter(pkg => {

                return (
                    pkg.category.toLowerCase() ===
                    category.toLowerCase()
                );

            });

        }


        /* DURATION */

        const duration =
            durationFilter?.value || "all";


        if (duration !== "all") {

            filtered = filtered.filter(pkg => {

                const days =
                    parseInt(pkg.duration, 10);


                if (duration === "short") {
                    return days <= 4;
                }


                if (duration === "medium") {
                    return days >= 5 && days <= 7;
                }


                if (duration === "long") {
                    return days >= 8;
                }


                return true;

            });

        }


        /* PRICE */

        const price =
            priceFilter?.value || "all";


        if (price !== "all") {

            filtered = filtered.filter(pkg => {

                const amount = Number(pkg.price);


                if (price === "under-30000") {
                    return amount < 30000;
                }


                if (price === "30000-50000") {
                    return amount >= 30000 && amount <= 50000;
                }


                if (price === "above-50000") {
                    return amount > 50000;
                }


                return true;

            });

        }


        /* SORT */

        const sort =
            sortFilter?.value || "default";


        if (sort === "price-low") {

            filtered.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }


        if (sort === "price-high") {

            filtered.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }


        if (sort === "duration-short") {

            filtered.sort(
                (a, b) =>
                    parseInt(a.duration) -
                    parseInt(b.duration)
            );

        }


        if (sort === "duration-long") {

            filtered.sort(
                (a, b) =>
                    parseInt(b.duration) -
                    parseInt(a.duration)
            );

        }


        renderPackages(
            filtered,
            container,
            resultCount
        );

    }


    function renderPackages(
        items,
        target,
        countElement
    ) {

        if (countElement) {

            countElement.textContent =
                `${items.length} package${items.length !== 1 ? "s" : ""} found`;

        }


        if (items.length === 0) {

            target.innerHTML = `
                <div class="no-results">

                    <div class="no-results-icon">
                        🔎
                    </div>

                    <h3>
                        No packages found
                    </h3>

                    <p>
                        Try changing your filters.
                    </p>

                </div>
            `;

            return;
        }


        target.innerHTML = items
            .map(pkg => {

                return `
                    <article class="package-card">

                        <div class="package-card-image">

                            <img
                                src="${pkg.image}"
                                alt="${pkg.name}"
                                loading="lazy"
                            >

                        </div>


                        <div class="package-card-content">

                            <span class="card-category">
                                ${pkg.category}
                            </span>


                            <h3>
                                ${pkg.name}
                            </h3>


                            <p>
                                ${pkg.description}
                            </p>


                            <div class="card-bottom">

                                <span class="card-price">
                                    ${formatPrice(pkg.price)}
                                    <small>/ person</small>
                                </span>


                                <a
                                    href="package-details.html?id=${pkg.id}"
                                    class="card-link"
                                >
                                    View Details →
                                </a>

                            </div>

                        </div>

                    </article>
                `;

            })
            .join("");

    }


    function resetFilters() {

        if (searchInput) {
            searchInput.value = "";
        }


        if (categoryFilter) {
            categoryFilter.value = "all";
        }


        if (durationFilter) {
            durationFilter.value = "all";
        }


        if (priceFilter) {
            priceFilter.value = "all";
        }


        if (sortFilter) {
            sortFilter.value = "default";
        }


        filterPackages();

    }


    searchInput?.addEventListener(
        "input",
        filterPackages
    );


    categoryFilter?.addEventListener(
        "change",
        filterPackages
    );


    durationFilter?.addEventListener(
        "change",
        filterPackages
    );


    priceFilter?.addEventListener(
        "change",
        filterPackages
    );


    sortFilter?.addEventListener(
        "change",
        filterPackages
    );


    resetButton?.addEventListener(
        "click",
        resetFilters
    );


    filterPackages();

}


/* =========================================================
   08. PACKAGE DETAILS PAGE
========================================================= */

function initializePackageDetails() {

    const container = $("#packageDetails");

    if (!container) {
        return;
    }


    if (
        typeof packages === "undefined" ||
        !Array.isArray(packages)
    ) {

        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const packageId =
        params.get("id");


    let selectedPackage =
        packages.find(
            pkg =>
                String(pkg.id) ===
                String(packageId)
        );


    if (!selectedPackage) {

        selectedPackage = packages[0];

    }


    renderPackageDetails(selectedPackage);


    initializeGallery();


    initializeBookingLinks(
        selectedPackage
    );

}


function renderPackageDetails(pkg) {

    const container = $("#packageDetails");

    if (!container) {
        return;
    }


    const itinerary =
        Array.isArray(pkg.itinerary)
            ? pkg.itinerary
            : [];


    const inclusions =
        Array.isArray(pkg.inclusions)
            ? pkg.inclusions
            : [];


    const gallery =
        Array.isArray(pkg.gallery)
            ? pkg.gallery
            : [pkg.image];


    container.innerHTML = `

        <div class="package-details-hero">

            <div
                class="package-details-hero-image"
                style="background-image: url('${pkg.image}')"
            ></div>


            <div class="package-details-hero-overlay"></div>


            <div class="container">

                <div class="package-details-hero-content">

                    <span class="package-details-category">
                        ${pkg.category}
                    </span>


                    <h1>
                        ${pkg.name}
                    </h1>


                    <div class="package-quick-info">

                        <span>
                            📅 ${pkg.duration}
                        </span>

                        <span>
                            📍 ${pkg.destination || pkg.name}
                        </span>

                        <span>
                            ⭐ ${pkg.rating || "4.8"}
                        </span>

                    </div>

                </div>

            </div>

        </div>


        <section class="section">

            <div class="container">

                <div class="package-details-grid">


                    <main>


                        <div class="details-block">

                            <span class="section-tag">
                                About the journey
                            </span>


                            <h2>
                                ${pkg.name}
                            </h2>


                            <p>
                                ${pkg.description}
                            </p>

                        </div>


                        <div class="details-block">

                            <span class="section-tag">
                                Journey
                            </span>


                            <h2>
                                Itinerary
                            </h2>


                            <div class="itinerary">

                                ${itinerary
                                    .map(
                                        (day, index) => `

                                    <div class="itinerary-item">

                                        <div class="itinerary-day">
                                            DAY ${index + 1}
                                        </div>


                                        <div class="itinerary-content">

                                            <h3>
                                                ${
                                                    typeof day === "string"
                                                        ? day
                                                        : day.title || `Day ${index + 1}`
                                                }
                                            </h3>


                                            <p>
                                                ${
                                                    typeof day === "string"
                                                        ? "Explore beautiful places, local experiences and unforgettable moments."
                                                        : day.description || ""
                                                }
                                            </p>

                                        </div>

                                    </div>

                                `
                                    )
                                    .join("")}

                            </div>

                        </div>


                        <div class="details-block">

                            <span class="section-tag">
                                What's included
                            </span>


                            <h2>
                                Package Inclusions
                            </h2>


                            <div class="inclusions-grid">

                                ${inclusions
                                    .map(
                                        item => `

                                    <div class="inclusion-item">

                                        <span>
                                            ✓
                                        </span>

                                        <span>
                                            ${item}
                                        </span>

                                    </div>

                                `
                                    )
                                    .join("")}

                            </div>

                        </div>


                        <div class="details-block">

                            <span class="section-tag">
                                Memories
                            </span>


                            <h2>
                                Travel Gallery
                            </h2>


                            <div class="package-gallery">

                                ${gallery
                                    .map(
                                        (image, index) => `

                                    <div
                                        class="package-gallery-item"
                                        data-gallery-index="${index}"
                                    >

                                        <img
                                            src="${image}"
                                            alt="${pkg.name} gallery ${index + 1}"
                                            loading="lazy"
                                        >

                                    </div>

                                `
                                    )
                                    .join("")}

                            </div>

                        </div>


                    </main>


                    <aside>

                        <div class="booking-summary-card">

                            <div class="booking-card-header">

                                <span>
                                    STARTING FROM
                                </span>


                                <div class="booking-price">
                                    ${formatPrice(pkg.price)}
                                </div>


                                <p>
                                    per person
                                </p>

                            </div>


                            ${
                                pkg.oldPrice
                                    ? `
                                    <div class="booking-old-price">
                                        ${formatPrice(pkg.oldPrice)}
                                    </div>
                                `
                                    : ""
                            }


                            ${
                                pkg.oldPrice
                                    ? `
                                    <span class="saving-badge">
                                        Special Offer
                                    </span>
                                `
                                    : ""
                            }


                            <div class="booking-summary-list">

                                <div>

                                    <span>
                                        Duration
                                    </span>

                                    <strong>
                                        ${pkg.duration}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Category
                                    </span>

                                    <strong>
                                        ${pkg.category}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Destination
                                    </span>

                                    <strong>
                                        ${pkg.destination || pkg.name}
                                    </strong>

                                </div>

                            </div>


                            <a
                                href="booking.html?package=${pkg.id}"
                                class="btn btn-primary booking-main-btn"
                            >
                                Book This Package
                            </a>


                            <a
                                href="contact.html"
                                class="booking-help-link"
                            >
                                Need help? Contact us
                            </a>


                            <div class="secure-booking">
                                🔒 Secure booking
                            </div>

                        </div>

                    </aside>


                </div>

            </div>

        </section>

    `;

}


/* =========================================================
   09. GALLERY
========================================================= */

let galleryImages = [];

let galleryIndex = 0;


function initializeGallery() {

    const galleryItems =
        $$(".package-gallery-item");


    if (!galleryItems.length) {
        return;
    }


    galleryImages =
        galleryItems.map(item => {

            const image =
                $("img", item);

            return image?.src;

        });


    galleryItems.forEach(
        (item, index) => {

            item.addEventListener(
                "click",
                () => {

                    openLightbox(index);

                }
            );

        }
    );


    createLightbox();

}


function createLightbox() {

    if ($(".gallery-lightbox")) {
        return;
    }


    const lightbox =
        document.createElement("div");


    lightbox.className =
        "gallery-lightbox";


    lightbox.hidden = true;


    lightbox.innerHTML = `

        <button
            class="lightbox-close"
            aria-label="Close gallery"
        >
            ×
        </button>


        <button
            class="lightbox-prev"
            aria-label="Previous image"
        >
            ‹
        </button>


        <img
            src=""
            alt="Gallery preview"
        >


        <button
            class="lightbox-next"
            aria-label="Next image"
        >
            ›
        </button>

    `;


    document.body.appendChild(lightbox);


    $(".lightbox-close", lightbox)
        .addEventListener(
            "click",
            closeLightbox
        );


    $(".lightbox-prev", lightbox)
        .addEventListener(
            "click",
            () => changeGalleryImage(-1)
        );


    $(".lightbox-next", lightbox)
        .addEventListener(
            "click",
            () => changeGalleryImage(1)
        );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.hidden &&
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                !lightbox.hidden &&
                event.key === "ArrowRight"
            ) {

                changeGalleryImage(1);

            }


            if (
                !lightbox.hidden &&
                event.key === "ArrowLeft"
            ) {

                changeGalleryImage(-1);

            }

        }
    );

}


function openLightbox(index) {

    const lightbox =
        $(".gallery-lightbox");


    if (!lightbox) {
        return;
    }


    galleryIndex = index;


    updateLightbox();


    lightbox.hidden = false;


    document.body.style.overflow = "hidden";

}


function closeLightbox() {

    const lightbox =
        $(".gallery-lightbox");


    if (!lightbox) {
        return;
    }


    lightbox.hidden = true;


    document.body.style.overflow = "";

}


function changeGalleryImage(direction) {

    if (!galleryImages.length) {
        return;
    }


    galleryIndex += direction;


    if (galleryIndex < 0) {

        galleryIndex =
            galleryImages.length - 1;

    }


    if (
        galleryIndex >=
        galleryImages.length
    ) {

        galleryIndex = 0;

    }


    updateLightbox();

}


function updateLightbox() {

    const lightbox =
        $(".gallery-lightbox");


    const image =
        $("img", lightbox);


    if (
        !lightbox ||
        !image ||
        !galleryImages[galleryIndex]
    ) {

        return;
    }


    image.src =
        galleryImages[galleryIndex];

}


/* =========================================================
   10. BOOKING PAGE
========================================================= */

function initializeBookingPage() {

    const form =
        $("#bookingForm");


    if (!form) {
        return;
    }


    populatePackageSelect();


    populateDestinationSelect();


    preselectBooking();


    form.addEventListener(
        "submit",
        handleBookingSubmit
    );

}


function populatePackageSelect() {

    const select =
        $("#packageSelect");


    if (
        !select ||
        typeof packages === "undefined"
    ) {

        return;
    }


    const currentOptions =
        [...select.options].map(
            option => option.value
        );


    packages.forEach(pkg => {

        if (
            currentOptions.includes(
                String(pkg.id)
            )
        ) {

            return;

        }


        const option =
            document.createElement("option");


        option.value = pkg.id;

        option.textContent =
            `${pkg.name} — ${formatPrice(pkg.price)}`;


        select.appendChild(option);

    });

}


function populateDestinationSelect() {

    const select =
        $("#destinationSelect");


    if (
        !select ||
        typeof destinations === "undefined"
    ) {

        return;
    }


    const currentOptions =
        [...select.options].map(
            option => option.value
        );


    destinations.forEach(destination => {

        if (
            currentOptions.includes(
                String(destination.id)
            )
        ) {

            return;

        }


        const option =
            document.createElement("option");


        option.value =
            destination.id;


        option.textContent =
            destination.name;


        select.appendChild(option);

    });

}


function preselectBooking() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const packageId =
        params.get("package");


    const packageSelect =
        $("#packageSelect");


    if (
        packageId &&
        packageSelect
    ) {

        packageSelect.value =
            packageId;

    }

}


function handleBookingSubmit(event) {

    event.preventDefault();


    const form =
        event.currentTarget;


    clearFormErrors(form);


    const formData =
        new FormData(form);


    const data = {

        name:
            String(
                formData.get("name") || ""
            ).trim(),

        email:
            String(
                formData.get("email") || ""
            ).trim(),

        phone:
            String(
                formData.get("phone") || ""
            ).trim(),

        destination:
            String(
                formData.get("destination") || ""
            ).trim(),

        travelDate:
            String(
                formData.get("travelDate") || ""
            ).trim(),

        travelers:
            String(
                formData.get("travelers") || ""
            ).trim(),

        packageId:
            String(
                formData.get("package") || ""
            ).trim(),

        message:
            String(
                formData.get("message") || ""
            ).trim()

    };


    let valid = true;


    /* NAME */

    if (data.name.length < 2) {

        showFieldError(
            "name",
            "Please enter your full name."
        );

        valid = false;

    }


    /* EMAIL */

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(data.email)
    ) {

        showFieldError(
            "email",
            "Please enter a valid email address."
        );

        valid = false;

    }


    /* PHONE */

    const cleanPhone =
        data.phone.replace(/\D/g, "");


    if (cleanPhone.length < 10) {

        showFieldError(
            "phone",
            "Please enter a valid phone number."
        );

        valid = false;

    }


    /* DESTINATION */

    if (!data.destination) {

        showFieldError(
            "destination",
            "Please select a destination."
        );

        valid = false;

    }


    /* DATE */

    if (!data.travelDate) {

        showFieldError(
            "travelDate",
            "Please select your travel date."
        );

        valid = false;

    } else {

        const selectedDate =
            new Date(data.travelDate);


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        if (selectedDate < today) {

            showFieldError(
                "travelDate",
                "Travel date cannot be in the past."
            );

            valid = false;

        }

    }


    /* TRAVELERS */

    const travelers =
        Number(data.travelers);


    if (
        !Number.isInteger(travelers) ||
        travelers < 1 ||
        travelers > 50
    ) {

        showFieldError(
            "travelers",
            "Enter a number between 1 and 50."
        );

        valid = false;

    }


    /* PACKAGE */

    if (!data.packageId) {

        showFieldError(
            "package",
            "Please select a package."
        );

        valid = false;

    }


    /* TERMS */

    const terms =
        $("#terms");


    if (
        terms &&
        !terms.checked
    ) {

        showFieldError(
            "terms",
            "Please accept the booking terms."
        );

        valid = false;

    }


    if (!valid) {

        const firstError =
            $(".input-error");


        firstError?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        return;

    }


    const booking = {

        ...data,

        id:
            `WB-${Date.now().toString().slice(-8)}`,

        createdAt:
            new Date().toISOString(),

        status:
            "Confirmed"

    };


    saveBooking(booking);


    showBookingConfirmation(
        booking
    );

}


function saveBooking(booking) {

    const bookings =
        getStoredBookings();


    bookings.push(booking);


    localStorage.setItem(
        "wanderlyBookings",
        JSON.stringify(bookings)
    );

}


/* =========================================================
   11. FORM ERROR HELPERS
========================================================= */

function showFieldError(
    fieldName,
    message
) {

    const field =
        document.getElementById(fieldName);


    if (!field) {
        return;
    }


    const group =
        field.closest(".form-group");


    if (!group) {
        return;
    }


    group.classList.add(
        "input-error"
    );


    let error =
        $(".form-error", group);


    if (!error) {

        error =
            document.createElement("small");


        error.className =
            "form-error";


        group.appendChild(error);

    }


    error.textContent =
        message;

}


function clearFormErrors(form) {

    $$(".input-error", form)
        .forEach(group => {

            group.classList.remove(
                "input-error"
            );

        });


    $$(".form-error", form)
        .forEach(error => {

            error.textContent = "";

        });

}


/* =========================================================
   12. BOOKING CONFIRMATION
========================================================= */

function showBookingConfirmation(
    booking
) {

    const form =
        $("#bookingForm");


    if (!form) {
        return;
    }


    const container =
        form.parentElement;


    form.style.display = "none";


    const confirmation =
        document.createElement("div");


    confirmation.className =
        "booking-success";


    confirmation.innerHTML = `

        <div class="success-icon">
            ✓
        </div>


        <span class="section-tag">
            Booking Confirmed
        </span>


        <h2>
            Your journey is booked!
        </h2>


        <p>
            Thank you, ${booking.name}.
            We have received your booking request
            and will contact you shortly.
        </p>


        <div class="booking-reference">
            Booking ID: ${booking.id}
        </div>


        <p>
            A confirmation will be sent to
            <strong>${booking.email}</strong>.
        </p>


        <a
            href="index.html"
            class="btn btn-primary"
        >
            Back to Home
        </a>

    `;


    container.appendChild(
        confirmation
    );


    confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   13. CONTACT FORM
========================================================= */

function initializeContactForm() {

    const form =
        $("#contactForm");


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            clearFormErrors(form);


            const name =
                $("#contactName")?.value
                    .trim() || "";


            const email =
                $("#contactEmail")?.value
                    .trim() || "";


            const message =
                $("#contactMessage")?.value
                    .trim() || "";


            let valid = true;


            if (name.length < 2) {

                showFieldError(
                    "contactName",
                    "Please enter your name."
                );

                valid = false;

            }


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                showFieldError(
                    "contactEmail",
                    "Please enter a valid email."
                );

                valid = false;

            }


            if (message.length < 10) {

                showFieldError(
                    "contactMessage",
                    "Message should contain at least 10 characters."
                );

                valid = false;

            }


            if (!valid) {
                return;
            }


            form.innerHTML = `

                <div class="contact-success">

                    <div class="success-icon">
                        ✓
                    </div>


                    <h3>
                        Message Sent Successfully!
                    </h3>


                    <p>
                        Thank you for contacting Wanderly.
                        Our team will get back to you soon.
                    </p>


                    <button
                        type="button"
                        class="btn btn-primary"
                        onclick="window.location.reload()"
                    >
                        Send Another Message
                    </button>

                </div>

            `;

        }
    );

}


/* =========================================================
   14. FAQ
========================================================= */

function initializeFAQ() {

    const questions =
        $$(".faq-question");


    questions.forEach(question => {

        question.addEventListener(
            "click",
            () => {

                const item =
                    question.closest(".faq-item");


                if (!item) {
                    return;
                }


                const wasActive =
                    item.classList.contains("active");


                $$(".faq-item")
                    .forEach(faq => {

                        faq.classList.remove(
                            "active"
                        );

                    });


                if (!wasActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });

}


/* =========================================================
   15. DYNAMIC BOOKING LINKS
========================================================= */

function initializeBookingLinks(pkg) {

    const buttons =
        $$(
            'a[href="booking.html"], .booking-main-btn'
        );


    buttons.forEach(button => {

        if (
            !button.href.includes(
                "package="
            )
        ) {

            button.href =
                `booking.html?package=${pkg.id}`;

        }

    });

}


/* =========================================================
   16. DATE INPUT MINIMUM
========================================================= */

function initializeDateInputs() {

    const dateInputs =
        $$('input[type="date"]');


    if (!dateInputs.length) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    const todayString =
        `${year}-${month}-${day}`;


    dateInputs.forEach(input => {

        input.min =
            todayString;

    });

}


/* =========================================================
   17. IMAGE ERROR HANDLING
========================================================= */

function initializeImageFallback() {

    $$("img").forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.background =
                    "#e8ece9";


                image.alt =
                    "Travel image unavailable";

            }
        );

    });

}


/* =========================================================
   18. SMOOTH ANIMATION ON SCROLL
========================================================= */

function initializeScrollAnimations() {

    const elements =
        $$(
            ".destination-card, .package-card, .mission-card, .team-card, .contact-info-card"
        );


    if (
        !elements.length ||
        !("IntersectionObserver" in window)
    ) {

        return;

    }


    elements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.style.opacity =
                        "1";


                    entry.target.style.transform =
                        "translateY(0)";


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.1
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   19. INITIALIZE EVERYTHING
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeNavigation();

        setActiveNavigation();

        renderHomeDestinations();

        renderHomePackages();

        initializeDestinationPage();

        initializePackagesPage();

        initializePackageDetails();

        initializeBookingPage();

        initializeContactForm();

        initializeFAQ();

        initializeDateInputs();

        initializeImageFallback();

        initializeScrollAnimations();

    }
);