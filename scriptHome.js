const images = document.querySelectorAll(".slider-image");
let i = 0;
let interval;

function previous() {
    images[i].style.display = "none";
    i--;
    if (i < 0) {
        i = images.length - 1;
    }
    images[i].style.display = "block";
}

function next() {
    images[i].style.display = "none";
    i++;
    if (i >= images.length) {
        i = 0;
    }
    images[i].style.display = "block";
}

function play() {
    if (!interval) {
        interval = setInterval(next, 2000);
    }
}

window.addEventListener("DOMContentLoaded", play);


const container = document.getElementById("container");
let allProducts = [];

function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch((error) => console.error("Error fetching products:", error));
}

function displayProducts(products) {
    container.innerHTML = "";
    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.addEventListener("click", () => {
            window.location.href = `ProductDetails.html?id=${product.id}`;
        });

        const image = document.createElement("img");
        image.src = product.image;

        const category = document.createElement("h3");
        category.textContent = product.category;

        const price = document.createElement("h2");
        price.textContent = `$${product.price}`;

        const ratingContainer = document.createElement("div");
        ratingContainer.className = "rating";

        const stars = [];
        for (let i = 0; i < 5; i++) {
            const star = document.createElement("span");
            star.textContent = "★";
            if (product.rating && product.rating.rate >= i + 1) {
                star.className = "filled";
            } else {
                star.className = "empty";
            }

            star.addEventListener("click", (event) => {
                event.stopPropagation();
                updateRating(stars, i + 1);
                product.rating = product.rating || {};
                product.rating.rate = i + 1;
            });

            stars.push(star);
            ratingContainer.appendChild(star);
        }

        function updateRating(stars, ratingValue) {
            stars.forEach((star, index) => {
                star.className = index < ratingValue ? "filled" : "empty";
            });
        }
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";

        const button = document.createElement("button");
        button.className = "btn";
        button.textContent = "View Details";

        const addToCartButton = document.createElement("button");
        addToCartButton.className = "add-to-cart";
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", (event) => {
            event.stopPropagation();
            addToCart(product);
        });

        buttonContainer.appendChild(button);
        buttonContainer.appendChild(addToCartButton);

        card.appendChild(image);
        card.appendChild(category);
        card.appendChild(price);
        card.appendChild(ratingContainer);
        card.appendChild(buttonContainer);

        container.appendChild(card);
    });
}

function filterByCategory(event, category) {
    event.preventDefault();
    if (category === "all") {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter((product) => product.category.toLowerCase() === category);
        displayProducts(filteredProducts);
    }

    const links = document.querySelectorAll(".header__menu a");
    links.forEach(link => link.classList.remove("active"));
    event.target.classList.add("active");
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.title || product.name,
            price: product.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.title || product.name} has been added to your cart!`);
}

document.addEventListener("DOMContentLoaded", fetchProducts);



const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "flex";
    } else {
        backToTopButton.style.display = "none";
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    backToTopButton.style.display = "none";
});

