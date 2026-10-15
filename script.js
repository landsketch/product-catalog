// ======================================
// 1. PRODUCT ARRAY
// ======================================

const products = [
    {
        id: 1,
        name: "Engine Oil Filter",
        category: "Engine",
        price: 350,
        image: "images/oil-filter.jpg"
    },
    {
        id: 2,
        name: "Air Filter",
        category: "Engine",
        price: 450,
        image: "images/air-filters.jpg"
    },
    {
        id: 3,
        name: "Spark Plug Set",
        category: "Engine",
        price: 800,
        image: "images/spark-plug-walk.jpg"
    },
    {
        id: 4,
        name: "Front Brake Pads",
        category: "Brakes",
        price: 1200,
        image: "images/brake-padz.jpg"
    },
    {
        id: 5,
        name: "Brake Disc Rotor",
        category: "Brakes",
        price: 1800,
        image: "images/rotor.jpg"
    },
    {
        id: 6,
        name: "Car LED Headlights",
        category: "Accessories",
        price: 1500,
        image: "images/light.jpg"
    },
    {
        id: 7,
        name: "Car Floor Mats",
        category: "Accessories",
        price: 950,
        image: "images/mats.jpg"
    },
    {
        id: 8,
        name: "Car Battery",
        category: "Accessories",
        price: 3500,
        image: "images/battery.jpg"
    }
];

// This variable stores the products currently displayed.
let displayedProducts = products;


// ======================================
// 2. DISPLAY PRODUCTS
// ======================================

const productGrid = document.getElementById("productGrid");

function displayProducts(productList) {

    // Show a message if no products are found.
    if (productList.length === 0) {
        productGrid.innerHTML =
            '<p class="empty-message">No products found.</p>';
        return;
    }

    // Create the HTML for each product card.
    productGrid.innerHTML = productList.map(product => `
        <article class="product-card">

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="product-price">
                    ₱${product.price.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </p>

            </div>

        </article>
    `).join("");
}


// Display the local products immediately.
displayProducts(products);


// ======================================
// 3. FILTER PRODUCTS BY CATEGORY
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Get the category assigned to the clicked button.
        const selectedCategory = this.dataset.category;

        // Remove the active class from all buttons.
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Highlight the clicked button.
        this.classList.add("active");

        // Filter the products.
        if (selectedCategory === "all") {
            displayProducts(displayedProducts);
        } else {
            const filteredProducts = displayedProducts.filter(
                product => product.category === selectedCategory
            );

            displayProducts(filteredProducts);
        }

    });

});


// ======================================
// 4. CONTACT FORM VALIDATION
// ======================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    // Stop the page from refreshing.
    event.preventDefault();

    // Get the values entered by the user.
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate the name: minimum of 3 characters.
    if (name.length < 3) {
        alert("Name must contain at least 3 characters.");
        return;
    }

    // Validate the email.
    if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate the message: minimum of 10 characters.
    if (message.length < 10) {
        alert("Message must contain at least 10 characters.");
        return;
    }

    // All validation checks passed.
    alert("Thank you, " + name + "! Your message passed validation.");

    // Clear the form.
    contactForm.reset();

});


// ======================================
// 5. FETCH API
// ======================================

async function loadProductsFromAPI() {

   async function loadProductsFromAPI() {
    try {
        const response = await fetch(
            "https://dummyjson.com/products/category/vehicle?limit=8"
        );

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();

        if (!data.products || data.products.length === 0) {
            throw new Error("No products available");
        }

        // Keep the car parts catalog if the API data
        // does not contain the required categories.
        console.log("API data received:", data.products);

        console.log(
            "The local car parts catalog remains the main catalog."
        );

    } catch (error) {
        console.log(
            "Using local car parts catalog:",
            error.message
        );
    }
}

loadProductsFromAPI();

}


// Start the online product request.
loadProductsFromAPI();