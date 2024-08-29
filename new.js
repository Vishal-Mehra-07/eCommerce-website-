// Product Data
const products = [
    { id: 1, name: "One minus", price: 29999, image: "https://image01-in.oneplus.net/media/202407/09/64d7f106899b3244dec3d4da7c443ba8.png?x-amz-process=image/format,webp/quality,Q_80" },
    { id: 2, name: "Everything", price: 25999, image: "https://cdn.shopifycdn.net/s/files/1/0692/5988/6904/files/BA_ALAK_200.1001.png?v=1688611423" },
    { id: 3, name: "Sungsam", price: 129999, image: "https://images.samsung.com/is/image/samsung/p6pim/au/2202/gallery/au-galaxy-s22-ultra-s908-sm-s908ezgfats-530787357?$650_519_PNG$" }
];

// Cart Array
let cart = [];

// Review Data
const reviews = [
    { name: "Rahul Bhawdekar", rating: 5, review: "Great product! Highly recommend." },
    { name: "Kamal Bisht", rating: 4, review: "Good quality, fast delivery." },
    { name: "Manas Malvi ", rating: 3, review: "Decent product, but could be better." }
];

// Load Products
function loadProducts() {
    const productList = document.getElementById("product-list");
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price.toLocaleString()}</p>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Load Reviews
function loadReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviews.forEach(review => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";
        reviewItem.innerHTML = `
            <h4>${review.name}</h4>
            <p class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
            <p>${review.review}</p>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update Cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;
    let count = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Quantity: ${item.quantity}</p>
            </div>
            <p class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</p>
        `;

        cartItems.appendChild(cartItem);

        total += item.price * item.quantity;
        count += item.quantity;
    });

    cartTotal.innerText = total.toLocaleString();
    cartCount.innerText = count;
}

// Registration Form Validation
document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    alert("Registration successful!");
    closeModal("registerModal");
});

// Login Form Validation
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (email === "test@test.com" && password === "password") {
        alert("Login successful!");
        closeModal("loginModal");
    } else {
        alert("Login successful");
    }
});

// Modal Handling
document.getElementById("loginBtn").addEventListener("click", function () {
    openModal("loginModal");
});

document.getElementById("registerBtn").addEventListener("click", function () {
    openModal("registerModal");
});

document.querySelectorAll(".close").forEach(closeBtn => {
    closeBtn.addEventListener("click", function () {
        closeModal(closeBtn.closest(".modal").id);
    });
});

function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Initialize Website
window.onload = () => {
    loadProducts();
    loadReviews();
    updateCart();
};
