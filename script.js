// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Cart data
let cart = [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((cartItem) => {
    const li = document.createElement("li");
    li.innerHTML = `${cartItem.name} - $${cartItem.price} <button class="remove-from-cart-btn" data-id="${cartItem.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    cart.push(product);
    renderCart();
    updateCartInStorage();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
  updateCartInStorage();
}

// Clear cart
function clearCart() {
  cart = [];
  renderCart();
  updateCartInStorage();
}

// Update cart data in session storage
function updateCartInStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Initialize cart data from session storage
function initializeCartFromStorage() {
  const cartData = sessionStorage.getItem("cart");
  if (cartData) {
    cart = JSON.parse(cartData);
    renderCart();
  }
}

// Event listeners
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

clearCartButton.addEventListener("click", clearCart);

// Initial render
renderProducts();
initializeCartFromStorage();

