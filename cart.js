// G&M cart — stored in localStorage so it persists across pages.
const CART_KEY = "gm_cart";

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size, qty = 1) {
  const cart = getCart();
  const existing = cart.find((l) => l.id === productId && l.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size, qty });
  }
  saveCart(cart);
}

function updateLineQty(productId, size, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((l) => !(l.id === productId && l.size === size));
  } else {
    const line = cart.find((l) => l.id === productId && l.size === size);
    if (line) line.qty = qty;
  }
  saveCart(cart);
}

function removeLine(productId, size) {
  const cart = getCart().filter((l) => !(l.id === productId && l.size === size));
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

function cartTotalCount() {
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}

function cartSubtotal() {
  return getCart().reduce((sum, l) => {
    const p = getProductById(l.id);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const count = cartTotalCount();
  el.textContent = count;
  el.style.display = count > 0 ? "flex" : "none";
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
