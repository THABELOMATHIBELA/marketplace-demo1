const products = [
  {
    id: 1,
    name: "Matte Lipstick",
    price: 299,
    image: "o.png.avif"
  },
  {
    id: 2,
    name: "Glow Foundation",
    price: 450,
    image: "o.png.avif"
  },
  {
    id: 3,
    name: "Eye Palette",
    price: 520,
    image: "o.png.avif"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");

function renderProducts(list = products) {
  grid.innerHTML = "";
  list.forEach(p => {
    grid.innerHTML += `
      <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>M${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  cart.push(products.find(p => p.id === id));
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  cartCount.textContent = cart.length;
}

function openCart() {
  document.getElementById("cart-modal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    sum += item.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>M${item.price}</span>
      </div>
    `;
  });

  total.textContent = sum;
}

function filterProducts() {
  const q = document.getElementById("search").value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(q)));
}

renderProducts();
updateCartCount();
