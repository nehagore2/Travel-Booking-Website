/* =========================================================
   WANDERLY TRAVEL WEBSITE
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}


/* =========================================================
   STICKY HEADER
========================================================= */

window.addEventListener(
    "scroll",
    function () {

        const header =
            $(".site-header") || $(".header");

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   HOME SEARCH
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchForm =
            $("#homeSearchForm");

        const searchInput =
            $("#homeSearchInput");

        if (!searchForm || !searchInput) {
            return;
        }


        searchForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const query =
                    searchInput.value
                        .trim()
                        .toLowerCase();

                if (!query) {

                    window.location.href =
                        "destinations.html";

                    return;

                }


                const destination =
                    destinationData?.find(
                        function (item) {

                            return (
                                item.name
                                    .toLowerCase()
                                    .includes(query) ||

                                item.country
                                    ?.toLowerCase()
                                    .includes(query)
                            );

                        }
                    );


                if (destination) {

                    window.location.href =
                        `destinations.html?search=${encodeURIComponent(
                            destination.name
                        )}`;

                } else {

                    window.location.href =
                        `destinations.html?search=${encodeURIComponent(
                            query
                        )}`;

                }

            }
        );

    }
);


/* =========================================================
   DESTINATION SEARCH / FILTER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            $("#destinationSearch");

        const categoryFilter =
            $("#destinationCategory");

        const priceFilter =
            $("#destinationPrice");

        const sortSelect =
            $("#destinationSort");

        const grid =
            $("#destinationsGrid");

        if (!grid) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        if (searchInput && params.get("search")) searchInput.value = params.get("search");
        if (categoryFilter && params.get("category")) categoryFilter.value = params.get("category");


        function renderDestinations() {

            let destinations =
                [...(destinationData || [])];


            const search =
                searchInput
                    ? searchInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const category =
                categoryFilter
                    ? categoryFilter.value
                    : "all";


            const price =
                priceFilter
                    ? priceFilter.value
                    : "all";


            const sort =
                sortSelect
                    ? sortSelect.value
                    : "default";


            /* SEARCH */

            if (search) {

                destinations =
                    destinations.filter(
                        function (item) {

                            return (

                                item.name
                                    .toLowerCase()
                                    .includes(search)

                                ||

                                item.country
                                    ?.toLowerCase()
                                    .includes(search)

                                ||

                                item.description
                                    ?.toLowerCase()
                                    .includes(search)

                            );

                        }
                    );

            }


            /* CATEGORY */

            if (
                category &&
                category !== "all"
            ) {

                destinations =
                    destinations.filter(
                        function (item) {

                            return (
                                item.category
                                    ?.toLowerCase()
                                ===
                                category.toLowerCase()
                            );

                        }
                    );

            }


            /* PRICE */

            if (price !== "all") {

                destinations =
                    destinations.filter(
                        function (item) {

                            const amount =
                                Number(
                                    item.price
                                );


                            if (price === "low") {

                                return amount < 25000;

                            }


                            if (price === "medium") {

                                return (
                                    amount >= 25000 &&
                                    amount <= 50000
                                );

                            }


                            if (price === "high") {

                                return amount > 50000;

                            }


                            return true;

                        }
                    );

            }


            /* SORT */

            if (sort === "price-low") {

                destinations.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                );

            }


            if (sort === "price-high") {

                destinations.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                );

            }


            if (sort === "name") {

                destinations.sort(
                    (a, b) =>
                        a.name.localeCompare(
                            b.name
                        )
                );

            }


            /* RENDER */

            if (!destinations.length) {

                grid.innerHTML = `
                    <div class="no-results">
                        <h3>No destinations found</h3>
                        <p>
                            Try another search or filter.
                        </p>
                    </div>
                `;

                return;

            }


            grid.innerHTML =
                destinations
                    .map(
                        createDestinationCard
                    )
                    .join("");

        }


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderDestinations
            );

        }


        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                renderDestinations
            );

        }


        if (priceFilter) {

            priceFilter.addEventListener(
                "change",
                renderDestinations
            );

        }


        if (sortSelect) {

            sortSelect.addEventListener(
                "change",
                renderDestinations
            );

        }


        renderDestinations();

    }
);


/* =========================================================
   DESTINATION CARD
========================================================= */

function createDestinationCard(
    destination
) {

    return `
        <article class="destination-card">

            <div class="destination-image">

                <img
                    src="${destination.image}"
                    alt="${destination.name}"
                    loading="lazy"
                >

                <span class="destination-category">
                    ${destination.category || "Travel"}
                </span>

            </div>


            <div class="destination-content">

                <span class="destination-country">
                    ${destination.country || ""}
                </span>

                <h3>
                    ${destination.name}
                </h3>

                <p>
                    ${destination.description || ""}
                </p>


                <div class="destination-bottom">

                    <div>

                        <small>
                            Starting from
                        </small>

                        <strong>
                            ₹${Number(
                                destination.price || 0
                            ).toLocaleString("en-IN")}
                        </strong>

                    </div>


                    <a
                        href="package-details.html?id=${destination.id}"
                        class="btn btn-small"
                    >
                        Explore
                    </a>

                </div>

            </div>

        </article>
    `;

}


/* =========================================================
   PACKAGE SEARCH / FILTER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            $("#packageSearch");

        const categoryFilter =
            $("#packageCategory");

        const priceFilter =
            $("#packagePrice");

        const sortSelect =
            $("#packageSort");

        const grid =
            $("#packagesGrid");

        if (!grid) {
            return;
        }


        function renderPackages() {

            let packages =
                [...(packageData || [])];


            const search =
                searchInput
                    ? searchInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const category =
                categoryFilter
                    ? categoryFilter.value
                    : "all";


            const price =
                priceFilter
                    ? priceFilter.value
                    : "all";


            const sort =
                sortSelect
                    ? sortSelect.value
                    : "default";


            /* SEARCH */

            if (search) {

                packages =
                    packages.filter(
                        function (item) {

                            return (

                                item.name
                                    .toLowerCase()
                                    .includes(search)

                                ||

                                item.destination
                                    ?.toLowerCase()
                                    .includes(search)

                                ||

                                item.description
                                    ?.toLowerCase()
                                    .includes(search)

                            );

                        }
                    );

            }


            /* CATEGORY */

            if (
                category &&
                category !== "all"
            ) {

                packages =
                    packages.filter(
                        function (item) {

                            return (
                                item.category
                                    ?.toLowerCase()
                                ===
                                category.toLowerCase()
                            );

                        }
                    );

            }


            /* PRICE */

            if (price !== "all") {

                packages =
                    packages.filter(
                        function (item) {

                            const amount =
                                Number(
                                    item.price
                                );


                            if (price === "low") {

                                return amount < 25000;

                            }


                            if (price === "medium") {

                                return (
                                    amount >= 25000 &&
                                    amount <= 50000
                                );

                            }


                            if (price === "high") {

                                return amount > 50000;

                            }


                            return true;

                        }
                    );

            }


            /* SORT */

            if (sort === "price-low") {

                packages.sort(
                    (a, b) =>
                        Number(a.price) -
                        Number(b.price)
                );

            }


            if (sort === "price-high") {

                packages.sort(
                    (a, b) =>
                        Number(b.price) -
                        Number(a.price)
                );

            }


            if (sort === "name") {

                packages.sort(
                    (a, b) =>
                        a.name.localeCompare(
                            b.name
                        )
                );

            }


            if (!packages.length) {

                grid.innerHTML = `
                    <div class="no-results">
                        <h3>No packages found</h3>
                        <p>
                            Try another search or filter.
                        </p>
                    </div>
                `;

                return;

            }


            grid.innerHTML =
                packages
                    .map(
                        createPackageCard
                    )
                    .join("");

        }


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                renderPackages
            );

        }


        if (categoryFilter) {

            categoryFilter.addEventListener(
                "change",
                renderPackages
            );

        }


        if (priceFilter) {

            priceFilter.addEventListener(
                "change",
                renderPackages
            );

        }


        if (sortSelect) {

            sortSelect.addEventListener(
                "change",
                renderPackages
            );

        }


        renderPackages();

    }
);


/* =========================================================
   PACKAGE CARD
========================================================= */

function createPackageCard(
    item
) {

    return `
        <article class="package-card">

            <div class="package-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >

            </div>


            <div class="package-content">

                <span class="package-category">
                    ${item.category || "Travel"}
                </span>

                <h3>
                    ${item.name}
                </h3>

                <p>
                    ${item.description || ""}
                </p>


                <div class="package-meta">

                    <span>
                        ${item.duration || ""}
                    </span>

                    <strong>
                        ₹${Number(
                            item.price || 0
                        ).toLocaleString("en-IN")}
                    </strong>

                </div>


                <div class="package-actions">

                    <a
                        href="package-details.html?id=${item.id}"
                        class="btn btn-outline"
                    >
                        View Details
                    </a>

                    <a
                        href="booking.html?package=${item.id}"
                        class="btn btn-primary"
                    >
                        Book Now
                    </a>

                </div>

            </div>

        </article>
    `;

}


/* =========================================================
   PACKAGE DETAILS PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const detailsContainer =
            $("#packageDetails");

        if (!detailsContainer) {
            return;
        }


        const params =
            new URLSearchParams(
                window.location.search
            );


        const id =
            params.get("id");


        if (!id) {
            return;
        }


        const item =
            (packageData || [])
                .find(
                    function (packageItem) {

                        return String(
                            packageItem.id
                        ) === String(id);

                    }
                );


        if (!item) {

            detailsContainer.innerHTML = `
                <div class="no-results">
                    <h2>Package not found</h2>
                    <p>
                        The selected package could not be found.
                    </p>
                </div>
            `;

            return;

        }


        detailsContainer.innerHTML = `

            <div class="package-detail-image">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >

            </div>


            <div class="package-detail-content">

                <span>
                    ${item.category || "Travel"}
                </span>

                <h1>
                    ${item.name}
                </h1>

                <p>
                    ${item.description || ""}
                </p>


                <div class="package-detail-price">

                    <small>
                        Starting from
                    </small>

                    <strong>
                        ₹${Number(
                            item.price || 0
                        ).toLocaleString("en-IN")}
                    </strong>

                </div>


                <a
                    href="booking.html?package=${item.id}"
                    class="btn btn-primary"
                >
                    Book This Package
                </a>

            </div>

        `;

    }
);


/* =========================================================
   BOOKING PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const bookingForm =
            $("#bookingForm");

        if (!bookingForm) {
            return;
        }


        /* -----------------------------
           DATE MINIMUM
        ----------------------------- */

        const dateInput =
            $("#bookingDate");

        if (dateInput) {

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


            dateInput.min =
                `${year}-${month}-${day}`;

        }


        /* -----------------------------
           DESTINATION OPTIONS
        ----------------------------- */

        const destinationSelect =
            $("#bookingDestination");


        if (
            destinationSelect &&
            typeof destinationData !==
            "undefined"
        ) {

            const currentValue =
                destinationSelect.value;


            if (
                destinationSelect.options.length
                <= 1
            ) {

                destinationData.forEach(
                    function (destination) {

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            destination.name;

                        option.textContent =
                            destination.name;

                        destinationSelect.appendChild(
                            option
                        );

                    }
                );

            }


            destinationSelect.value =
                currentValue;

        }


        /* -----------------------------
           PACKAGE OPTIONS
        ----------------------------- */

        const packageSelect =
            $("#bookingPackage");


        if (
            packageSelect &&
            typeof packageData !==
            "undefined"
        ) {

            const currentValue =
                packageSelect.value;


            if (
                packageSelect.options.length
                <= 1
            ) {

                packageData.forEach(
                    function (item) {

                        const option =
                            document.createElement(
                                "option"
                            );

                        option.value =
                            item.id;

                        option.textContent =
                            item.name;

                        packageSelect.appendChild(
                            option
                        );

                    }
                );

            }


            packageSelect.value =
                currentValue;

        }


        /* -----------------------------
           URL PACKAGE
        ----------------------------- */

        const params =
            new URLSearchParams(
                window.location.search
            );


        const packageId =
            params.get("package");


        if (
            packageId &&
            packageSelect
        ) {

            packageSelect.value =
                packageId;

        }


        /* -----------------------------
           FORM SUBMIT
        ----------------------------- */

        bookingForm.addEventListener(
            "submit",
            handleBookingSubmit
        );

    }
);


/* =========================================================
   CLEAR FORM ERRORS
========================================================= */

function clearFormErrors(form) {

    $$(".input-error", form)
        .forEach(
            function (element) {

                element.classList.remove(
                    "input-error"
                );

            }
        );


    $$(".field-error", form)
        .forEach(
            function (element) {

                element.remove();

            }
        );

}


/* =========================================================
   SHOW FIELD ERROR
========================================================= */

function showFieldError(
    fieldId,
    message
) {

    const field =
        document.getElementById(
            fieldId
        );


    if (!field) {
        return;
    }


    field.classList.add(
        "input-error"
    );


    const error =
        document.createElement(
            "small"
        );


    error.className =
        "field-error";


    error.textContent =
        message;


    field.insertAdjacentElement(
        "afterend",
        error
    );

}


/* =========================================================
   BOOKING FORM SUBMIT
========================================================= */

function handleBookingSubmit(
    event
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    clearFormErrors(form);


    const formData =
        new FormData(form);


    const name =
        String(
            formData.get("name") || ""
        ).trim();


    const email =
        String(
            formData.get("email") || ""
        ).trim();


    const phone =
        String(
            formData.get("phone") || ""
        ).trim();


    const destination =
        String(
            formData.get("destination") || ""
        ).trim();


    const travelDate =
        String(
            formData.get("travelDate") || ""
        ).trim();


    const travelers =
        String(
            formData.get("travelers") || ""
        ).trim();


    const packageId =
        String(
            formData.get("package") || ""
        ).trim();


    const message =
        String(
            formData.get("message") || ""
        ).trim();


    let valid = true;


    /* NAME */

    if (name.length < 2) {

        showFieldError(
            "bookingName",
            "Please enter your full name."
        );

        valid = false;

    }


    /* EMAIL */

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email)
    ) {

        showFieldError(
            "bookingEmail",
            "Please enter a valid email address."
        );

        valid = false;

    }


    /* PHONE */

    const cleanPhone =
        phone.replace(
            /\D/g,
            ""
        );


    if (
        cleanPhone.length < 10
    ) {

        showFieldError(
            "bookingPhone",
            "Please enter a valid phone number."
        );

        valid = false;

    }


    /* DESTINATION */

    if (!destination) {

        showFieldError(
            "bookingDestination",
            "Please select a destination."
        );

        valid = false;

    }


    /* DATE */

    if (!travelDate) {

        showFieldError(
            "bookingDate",
            "Please select your travel date."
        );

        valid = false;

    } else {

        const selectedDate =
            new Date(
                travelDate
            );


        const today =
            new Date();


        today.setHours(
            0,
            0,
            0,
            0
        );


        if (
            selectedDate < today
        ) {

            showFieldError(
                "bookingDate",
                "Travel date cannot be in the past."
            );

            valid = false;

        }

    }


    /* TRAVELERS */

    const travelerCount =
        Number(
            travelers
        );


    if (
        !Number.isInteger(
            travelerCount
        ) ||
        travelerCount < 1 ||
        travelerCount > 50
    ) {

        showFieldError(
            "bookingTravelers",
            "Please select the number of travelers."
        );

        valid = false;

    }


    /* PACKAGE */

    if (!packageId) {

        showFieldError(
            "bookingPackage",
            "Please select a package."
        );

        valid = false;

    }


    /* TERMS */

    const terms =
        $("#bookingTerms");


    if (
        !terms ||
        !terms.checked
    ) {

        showFieldError(
            "bookingTerms",
            "Please accept the Terms & Conditions."
        );

        valid = false;

    }


    /* STOP */

    if (!valid) {

        const firstError =
            $(".input-error", form);


        if (firstError) {

            firstError.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

        return;

    }


    /* CREATE BOOKING */

    const booking =
        {

            id:
                "WB-" +
                Date.now()
                    .toString()
                    .slice(-8),

            name:
                name,

            email:
                email,

            phone:
                phone,

            destination:
                destination,

            travelDate:
                travelDate,

            travelers:
                travelerCount,

            packageId:
                packageId,

            message:
                message,

            status:
                "Confirmed",

            createdAt:
                new Date()
                    .toISOString()

        };


    /* SAVE */

    saveBooking(
        booking
    );


    /* SHOW SUCCESS */

    showBookingConfirmation(
        booking
    );

}


/* =========================================================
   SAVE BOOKING TO LOCAL STORAGE
========================================================= */

function saveBooking(
    booking
) {

    let bookings = [];


    try {

        bookings =
            JSON.parse(
                localStorage.getItem(
                    "wanderlyBookings"
                )
            ) || [];

    } catch (error) {

        bookings = [];

    }


    bookings.push(
        booking
    );


    localStorage.setItem(
        "wanderlyBookings",
        JSON.stringify(
            bookings
        )
    );

}


/* =========================================================
   BOOKING CONFIRMATION
========================================================= */

function showBookingConfirmation(
    booking
) {

    const form =
        $("#bookingForm");


    if (form) {

        form.style.display =
            "none";

    }


    let confirmation =
        $("#bookingConfirmation");


    if (!confirmation) {

        confirmation =
            document.createElement(
                "div"
            );

        confirmation.id =
            "bookingConfirmation";


        confirmation.className =
            "booking-confirmation";


        if (form) {

            form.parentNode.insertBefore(
                confirmation,
                form.nextSibling
            );

        } else {

            document.body.appendChild(
                confirmation
            );

        }

    }


    confirmation.innerHTML = `

        <div class="confirmation-icon">
            ✓
        </div>

        <h2>
            Booking Confirmed!
        </h2>

        <p>
            Thank you,
            <strong>${booking.name}</strong>.
            Your travel request has been
            successfully submitted.
        </p>

        <div class="confirmation-details">

            <div>
                <span>Booking ID</span>
                <strong>${booking.id}</strong>
            </div>

            <div>
                <span>Destination</span>
                <strong>${booking.destination}</strong>
            </div>

            <div>
                <span>Travel Date</span>
                <strong>${booking.travelDate}</strong>
            </div>

            <div>
                <span>Travelers</span>
                <strong>${booking.travelers}</strong>
            </div>

        </div>

        <a
            href="index.html"
            class="btn btn-primary"
        >
            Back to Home
        </a>

    `;


    confirmation.style.display =
        "block";


    confirmation.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   GALLERY INTERACTION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const galleryImages =
            $$(".gallery img");


        if (!galleryImages.length) {
            return;
        }


        galleryImages.forEach(
            function (image) {

                image.addEventListener(
                    "click",
                    function () {

                        const overlay =
                            document.createElement(
                                "div"
                            );


                        overlay.className =
                            "image-lightbox";


                        overlay.innerHTML = `

                            <button
                                class="lightbox-close"
                                aria-label="Close"
                            >
                                ×
                            </button>

                            <img
                                src="${image.src}"
                                alt="${image.alt || ""}"
                            >

                        `;


                        document.body.appendChild(
                            overlay
                        );


                        overlay
                            .querySelector(
                                ".lightbox-close"
                            )
                            .addEventListener(
                                "click",
                                function () {

                                    overlay.remove();

                                }
                            );


                        overlay.addEventListener(
                            "click",
                            function (event) {

                                if (
                                    event.target ===
                                    overlay
                                ) {

                                    overlay.remove();

                                }

                            }
                        );

                    }
                );

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const contactForm =
            $("#contactForm");


        if (!contactForm) {
            return;
        }


        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    $("#contactName")
                        ?.value
                        .trim();


                const email =
                    $("#contactEmail")
                        ?.value
                        .trim();


                const message =
                    $("#contactMessage")
                        ?.value
                        .trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    alert(
                        "Please fill in all required fields."
                    );

                    return;

                }


                alert(
                    "Thank you! Your message has been sent successfully."
                );


                contactForm.reset();

            }
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const elements =
            $$(".reveal");


        if (!elements.length) {
            return;
        }


        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        elements.forEach(
            function (element) {

                observer.observe(
                    element
                );

            }
        );

    }
);

/* =========================================================
   PREMIUM HOME INTERACTIONS
========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("#header");
    const focusSearch = document.querySelector("#focusSearch");
    const homeSearch = document.querySelector("#homeSearchInput");
    const newsletterForm = document.querySelector("#newsletterForm");
    const menuToggle = document.querySelector("#menuToggle");
    const nav = document.querySelector("#mainNav");

    if (header) {
        const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
        updateHeader();
        window.addEventListener("scroll", updateHeader, {passive:true});
    }

    if (focusSearch && homeSearch) {
        focusSearch.addEventListener("click", function () {
            document.querySelector("#home")?.scrollIntoView({behavior:"smooth"});
            setTimeout(() => homeSearch.focus(), 450);
        });
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            const open = nav.classList.toggle("active");
            menuToggle.classList.toggle("active", open);
            menuToggle.setAttribute("aria-expanded", String(open));
        });
        nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }));
    }

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const email = document.querySelector("#newsletterEmail");
            if (!email || !email.value.trim()) return;
            alert("Thank you! You are subscribed to Wanderly travel inspiration.");
            newsletterForm.reset();
        });
    }

    const dates = document.querySelectorAll('.travel-search input[type="date"]');
    if (dates.length === 2) {
        const today = new Date().toISOString().split("T")[0];
        dates.forEach(d => d.min = today);
        dates[0].addEventListener("change", () => { dates[1].min = dates[0].value || today; });
    }

    // Animate any reveal elements added dynamically.
    const revealItems = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
            });
        }, {threshold:.12});
        revealItems.forEach(el => io.observe(el));
    } else revealItems.forEach(el => el.classList.add("visible"));
});
