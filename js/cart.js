// Cart and Checkout functionality
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop()

  updateCartCount()

  if (currentPage === "cart.html") {
    loadCartItems()
  } else if (currentPage === "checkout.html") {
    loadCheckoutPage()
    setupPaymentMethodListener()
  }
})

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    cartCountElement.textContent = cartCount
  }
}

function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartItemsContainer = document.getElementById("cart-items")
  const emptyMessage = document.getElementById("empty-cart-message")

  if (cart.length === 0) {
    emptyMessage.style.display = "block"
    cartItemsContainer.style.display = "none"
  } else {
    emptyMessage.style.display = "none"
    cartItemsContainer.style.display = "flex"

    cartItemsContainer.innerHTML = ""
    cart.forEach((item) => {
      const imageSrc = item.image && item.image.startsWith("http")
        ? item.image
        : item.image && item.image.startsWith("../")
          ? item.image
          : item.image
            ? (window.location.pathname.includes("/html/") ? `../${item.image}` : item.image)
            : ""
      const cartItem = document.createElement("div")
      cartItem.className = "cart-item"
      cartItem.innerHTML = `
        <img src="${imageSrc}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <p class="cart-item-price">Rs ${item.price}</p>
        </div>
        <div class="cart-item-actions">
          <div class="qty-control">
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" class="qty-input" value="${item.quantity}" readonly>
            <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `
      cartItemsContainer.appendChild(cartItem)
    })
  }

  updateCartSummary()
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId)
    return
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const item = cart.find((item) => item.id === productId)

  if (item) {
    item.quantity = newQuantity
    localStorage.setItem("cart", JSON.stringify(cart))
    updateCartCount()
    loadCartItems()
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || []
  cart = cart.filter((item) => item.id !== productId)
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  loadCartItems()
}

function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  let subtotal = 0
  cart.forEach((item) => {
    subtotal += item.price * item.quantity
  })

  const shipping = subtotal > 50 ? 0 : 10
  const tax = Math.round((subtotal + shipping) * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  document.getElementById("subtotal").textContent = "Rs " + subtotal.toFixed(2)
  document.getElementById("shipping").textContent = shipping === 0 ? "FREE" : "Rs " + shipping.toFixed(2)
  document.getElementById("tax").textContent = "Rs " + tax.toFixed(2)
  document.getElementById("total").textContent = "Rs " + total.toFixed(2)
}

function proceedToCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }
  window.location.href = "checkout.html"
}

function loadCheckoutPage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  // Load order summary
  const checkoutItemsContainer = document.getElementById("checkout-items")
  checkoutItemsContainer.innerHTML = ""

  cart.forEach((item) => {
    const checkoutItem = document.createElement("div")
    checkoutItem.className = "checkout-item"
    checkoutItem.innerHTML = `
      <div class="checkout-item-name">${item.name} x ${item.quantity}</div>
      <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    `
    checkoutItemsContainer.appendChild(checkoutItem)
  })

  updateCheckoutSummary()
}

function updateCheckoutSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  let subtotal = 0
  cart.forEach((item) => {
    subtotal += item.price * item.quantity
  })

  const shipping = subtotal > 50 ? 0 : 10
  const tax = Math.round((subtotal + shipping) * 0.08 * 100) / 100
  const total = subtotal + shipping + tax

  document.getElementById("checkout-subtotal").textContent = "Rs " + subtotal.toFixed(2)
  document.getElementById("checkout-shipping").textContent = shipping === 0 ? "FREE" : "Rs " + shipping.toFixed(2)
  document.getElementById("checkout-tax").textContent = "Rs " + tax.toFixed(2)
  document.getElementById("checkout-total").textContent = "Rs " + total.toFixed(2)
}

function setupPaymentMethodListener() {
  const paymentSelect = document.getElementById("payment")
  const cardDetails = document.getElementById("card-details")

  if (paymentSelect) {
    paymentSelect.addEventListener("change", (e) => {
      if (e.target.value === "credit-card" || e.target.value === "debit-card") {
        cardDetails.style.display = "block"
      } else {
        cardDetails.style.display = "none"
      }
    })
  }
}

function placeOrder(event) {
  event.preventDefault()

  const form = document.getElementById("checkoutForm")
  const cart = JSON.parse(localStorage.getItem("cart")) || []

  if (cart.length === 0) {
    alert("Your cart is empty!")
    return
  }

  // Get form values
  const fullname = document.getElementById("fullname").value
  const email = document.getElementById("email").value
  const address = document.getElementById("address").value
  const city = document.getElementById("city").value
  const state = document.getElementById("state").value
  const zip = document.getElementById("zip").value
  const phone = document.getElementById("phone").value
  const payment = document.getElementById("payment").value

  // Basic validation
  if (!fullname || !email || !address || !city || !state || !zip || !phone || !payment) {
    alert("Please fill in all required fields")
    return
  }

  // Store order in localStorage
  const orders = JSON.parse(localStorage.getItem("orders")) || []
  const order = {
    id: Math.floor(Math.random() * 100000),
    date: new Date().toLocaleDateString(),
    customer: fullname,
    email: email,
    address: address + ", " + city + ", " + state + " " + zip,
    phone: phone,
    items: cart,
    paymentMethod: payment,
    status: "Confirmed",
  }

  orders.push(order)
  localStorage.setItem("orders", JSON.stringify(orders))

  // Clear cart
  localStorage.setItem("cart", JSON.stringify([]))
  updateCartCount()

  // Show success message
  alert("Order placed successfully!\n\nOrder ID: " + order.id + "\n\nA confirmation email has been sent to " + email)

  // Redirect to home
  window.location.href = "../index.html"
}
