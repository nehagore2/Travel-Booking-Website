// ==========================================
// TRAVEL BOOKING WEBSITE - DATA
// ==========================================

// ---------- DESTINATIONS ----------

const destinations = [
    {
        id: 1,
        name: "Bali",
        country: "Indonesia",
        category: "Beach",
        price: 45000,
        image: "images/home-bali.jpg",
        description:
            "Discover Bali's beautiful beaches, peaceful temples, lush rice terraces and vibrant local culture.",
        rating: 4.8
    },

    {
        id: 2,
        name: "Dubai",
        country: "United Arab Emirates",
        category: "Luxury",
        price: 55000,
        image: "images/home-dubai.jpg",
        description:
            "Experience luxury shopping, breathtaking skyscrapers, desert adventures and unforgettable city views.",
        rating: 4.9
    },

    {
        id: 3,
        name: "Paris",
        country: "France",
        category: "City",
        price: 75000,
        image: "images/destination-paris.jpg",
        description:
            "Explore the romantic streets of Paris, the Eiffel Tower, museums, cafes and French culture.",
        rating: 4.8
    },

    {
        id: 4,
        name: "Switzerland",
        country: "Switzerland",
        category: "Adventure",
        price: 95000,
        image: "images/home-switzerland.jpg",
        description:
            "Enjoy stunning Alpine landscapes, beautiful lakes, charming villages and scenic mountain journeys.",
        rating: 4.9
    },

    {
        id: 5,
        name: "Maldives",
        country: "Maldives",
        category: "Beach",
        price: 65000,
        image: "images/home-maldives.jpg",
        description:
            "Relax on white sandy beaches, enjoy crystal-clear waters and experience a peaceful island getaway.",
        rating: 4.9
    },

    {
        id: 6,
        name: "Kashmir",
        country: "India",
        category: "Nature",
        price: 30000,
        image: "images/home-kashmir.jpg",
        description:
            "Experience the beauty of Kashmir with snow-covered mountains, peaceful lakes and green valleys.",
        rating: 4.7
    },

    {
        id: 7,
        name: "Goa",
        country: "India",
        category: "Beach",
        price: 18000,
        image: "images/home-bali.jpg",
        description:
            "Enjoy beautiful beaches, exciting nightlife, Portuguese architecture and delicious coastal food.",
        rating: 4.6
    },

    {
        id: 8,
        name: "Singapore",
        country: "Singapore",
        category: "City",
        price: 60000,
        image: "images/home-dubai.jpg",
        description:
            "Discover a modern city filled with futuristic architecture, gardens, shopping and entertainment.",
        rating: 4.8
    },

    {
        id: 9,
        name: "London",
        country: "United Kingdom",
        category: "City",
        price: 80000,
        image: "images/destination-paris.jpg",
        description:
            "Explore London's famous landmarks, historic streets, royal palaces, museums and shopping districts.",
        rating: 4.7
    },

    {
        id: 10,
        name: "Manali",
        country: "India",
        category: "Adventure",
        price: 22000,
        image: "images/home-kashmir.jpg",
        description:
            "Enjoy mountain adventures, scenic valleys, peaceful landscapes and exciting outdoor activities.",
        rating: 4.6
    }
];


// ---------- TRAVEL PACKAGES ----------

const packages = [
    {
        id: 101,
        name: "Bali Escape",
        destination: "Bali",
        category: "Beach",
        duration: "5 Days / 4 Nights",
        price: 45000,
        oldPrice: 52000,
        image: "images/package-bali.jpg",

        description:
            "A perfect tropical escape combining beautiful beaches, temples, local culture and unforgettable island experiences.",

        inclusions: [
            "4 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Sightseeing Tours",
            "Professional Tour Guide"
        ],

        itinerary: [
            "Day 1 - Arrival in Bali and hotel check-in",
            "Day 2 - Ubud sightseeing and rice terraces",
            "Day 3 - Temple tour and cultural experience",
            "Day 4 - Beach activities and sunset experience",
            "Day 5 - Breakfast and departure"
        ],

        gallery: [
            "images/package-bali.jpg",
            "images/home-bali.jpg",
            "images/destination-bali.jpg"
        ]
    },

    {
        id: 102,
        name: "Dubai Explorer",
        destination: "Dubai",
        category: "Luxury",
        duration: "6 Days / 5 Nights",
        price: 55000,
        oldPrice: 62000,
        image: "images/home-dubai.jpg",

        description:
            "Explore the modern wonders of Dubai, from iconic skyscrapers to desert adventures and luxury shopping.",

        inclusions: [
            "5 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Dubai City Tour",
            "Desert Safari"
        ],

        itinerary: [
            "Day 1 - Arrival and Dubai Marina evening",
            "Day 2 - Burj Khalifa and Downtown Dubai",
            "Day 3 - Dubai city tour and shopping",
            "Day 4 - Desert safari and dinner",
            "Day 5 - Palm Jumeirah and Marina",
            "Day 6 - Breakfast and departure"
        ],

        gallery: [
            "images/home-dubai.jpg",
            "images/destination-dubai.jpg",
            "images/home-bali.jpg"
        ]
    },

    {
        id: 103,
        name: "Swiss Adventure",
        destination: "Switzerland",
        category: "Adventure",
        duration: "7 Days / 6 Nights",
        price: 95000,
        oldPrice: 110000,
        image: "images/home-switzerland.jpg",

        description:
            "Experience the breathtaking beauty of Switzerland with mountains, lakes, scenic trains and charming towns.",

        inclusions: [
            "6 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Mountain Excursion",
            "Scenic Train Journey"
        ],

        itinerary: [
            "Day 1 - Arrival in Zurich",
            "Day 2 - Zurich city tour",
            "Day 3 - Lucerne and lake experience",
            "Day 4 - Interlaken adventure",
            "Day 5 - Jungfrau mountain excursion",
            "Day 6 - Scenic train journey",
            "Day 7 - Departure"
        ],

        gallery: [
            "images/home-switzerland.jpg",
            "images/destination-paris.jpg",
            "images/home-kashmir.jpg"
        ]
    },

    {
        id: 104,
        name: "Maldives Luxury Retreat",
        destination: "Maldives",
        category: "Luxury",
        duration: "4 Days / 3 Nights",
        price: 65000,
        oldPrice: 75000,
        image: "images/home-maldives.jpg",

        description:
            "Relax in a tropical paradise with crystal-clear water, private beaches and luxurious island experiences.",

        inclusions: [
            "3 Nights Resort Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Island Tour",
            "Water Activities"
        ],

        itinerary: [
            "Day 1 - Arrival and resort check-in",
            "Day 2 - Island exploration and beach activities",
            "Day 3 - Water sports and sunset cruise",
            "Day 4 - Breakfast and departure"
        ],

        gallery: [
            "images/home-maldives.jpg",
            "images/home-bali.jpg",
            "images/package-bali.jpg"
        ]
    },

    {
        id: 105,
        name: "Kashmir Paradise",
        destination: "Kashmir",
        category: "Nature",
        duration: "5 Days / 4 Nights",
        price: 30000,
        oldPrice: 36000,
        image: "images/home-kashmir.jpg",

        description:
            "Explore the breathtaking valleys, lakes and mountains of Kashmir on a memorable Himalayan journey.",

        inclusions: [
            "4 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Local Sightseeing",
            "Private Transportation"
        ],

        itinerary: [
            "Day 1 - Arrival in Srinagar",
            "Day 2 - Srinagar sightseeing",
            "Day 3 - Gulmarg excursion",
            "Day 4 - Pahalgam valley tour",
            "Day 5 - Departure"
        ],

        gallery: [
            "images/home-kashmir.jpg",
            "images/home-switzerland.jpg",
            "images/testimonial-1.jpg"
        ]
    },

    {
        id: 106,
        name: "Goa Beach Holiday",
        destination: "Goa",
        category: "Beach",
        duration: "4 Days / 3 Nights",
        price: 18000,
        oldPrice: 22000,
        image: "images/home-bali.jpg",

        description:
            "Enjoy a relaxing Goa holiday with beautiful beaches, local food, sightseeing and exciting nightlife.",

        inclusions: [
            "3 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "North Goa Tour",
            "South Goa Tour"
        ],

        itinerary: [
            "Day 1 - Arrival and beach evening",
            "Day 2 - North Goa sightseeing",
            "Day 3 - South Goa sightseeing",
            "Day 4 - Breakfast and departure"
        ],

        gallery: [
            "images/home-bali.jpg",
            "images/home-maldives.jpg",
            "images/package-bali.jpg"
        ]
    },

    {
        id: 107,
        name: "Paris Romantic Escape",
        destination: "Paris",
        category: "City",
        duration: "5 Days / 4 Nights",
        price: 75000,
        oldPrice: 85000,
        image: "images/destination-paris.jpg",

        description:
            "Experience the romance and elegance of Paris with iconic landmarks, charming cafes and beautiful streets.",

        inclusions: [
            "4 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "Paris City Tour",
            "Eiffel Tower Visit"
        ],

        itinerary: [
            "Day 1 - Arrival in Paris",
            "Day 2 - Eiffel Tower and Seine River",
            "Day 3 - Louvre Museum and city tour",
            "Day 4 - Montmartre and shopping",
            "Day 5 - Departure"
        ],

        gallery: [
            "images/destination-paris.jpg",
            "images/home-paris.jpg",
            "images/home-switzerland.jpg"
        ]
    },

    {
        id: 108,
        name: "Singapore City Explorer",
        destination: "Singapore",
        category: "City",
        duration: "5 Days / 4 Nights",
        price: 60000,
        oldPrice: 68000,
        image: "images/home-dubai.jpg",

        description:
            "Discover Singapore's futuristic skyline, beautiful gardens, exciting attractions and vibrant culture.",

        inclusions: [
            "4 Nights Hotel Stay",
            "Daily Breakfast",
            "Airport Transfers",
            "City Tour",
            "Gardens by the Bay"
        ],

        itinerary: [
            "Day 1 - Arrival and Marina Bay",
            "Day 2 - City sightseeing",
            "Day 3 - Sentosa Island",
            "Day 4 - Gardens by the Bay and shopping",
            "Day 5 - Departure"
        ],

        gallery: [
            "images/home-dubai.jpg",
            "images/home-bali.jpg",
            "images/home-maldives.jpg"
        ]
    }
];


// ---------- TESTIMONIALS ----------

const testimonials = [
    {
        name: "Ananya Sharma",
        location: "Mumbai, India",
        image: "images/testimonial-1.jpg",
        rating: 5,
        text:
            "Our Bali trip was perfectly organized. The hotels, transfers and sightseeing were excellent. We had a wonderful experience!"
    },

    {
        name: "Rahul Mehta",
        location: "Pune, India",
        image: "images/testimonial-2.jpg",
        rating: 5,
        text:
            "The entire booking process was simple and smooth. Our Dubai package was exactly as promised."
    },

    {
        name: "Priya Kapoor",
        location: "Delhi, India",
        image: "images/testimonial-3.jpg",
        rating: 5,
        text:
            "Excellent service and beautiful destinations. The team was very helpful throughout our trip."
    }
];


// ---------- TEAM MEMBERS ----------

const teamMembers = [
    {
        name: "Aarav Mehta",
        role: "Founder & CEO",
        image: "images/team-1.jpg"
    },

    {
        name: "Riya Sharma",
        role: "Travel Consultant",
        image: "images/team-2.jpg"
    },

    {
        name: "Aditya Patel",
        role: "Tour Manager",
        image: "images/team-3.jpg"
    },

    {
        name: "Sneha Kapoor",
        role: "Customer Experience Manager",
        image: "images/team-4.jpg"
    }
];


// ---------- SPECIAL OFFER ----------

const specialOffer = {
    title: "Summer Travel Sale",
    discount: "25% OFF",
    description:
        "Plan your dream vacation today and enjoy exclusive savings on selected travel packages.",
    image: "images/offer-banner.jpg"
};