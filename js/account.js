// Account page functionality
document.addEventListener("DOMContentLoaded", () => {
  loadUserInfo()
  loadOrderHistory()
  updateCartCount()
})

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    cartCountElement.textContent = cartCount
  }
}

function loadUserInfo() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  if (!currentUser) {
    // Redirect to login if not logged in
    alert("Please log in first")
    window.location.href = "login.html"
    return
  }

  document.getElementById("user-name").textContent = currentUser.name || "Riya Kaki"
  document.getElementById("user-email").textContent = currentUser.email || "riya.kaki@gmail.com"
}

function loadOrderHistory() {
  const orders = JSON.parse(localStorage.getItem("orders")) || []
  const ordersContainer = document.getElementById("orders-container")
  const noOrders = document.getElementById("no-orders")

  if (orders.length === 0) {
    ordersContainer.style.display = "none"
    noOrders.style.display = "block"
    return
  }

  noOrders.style.display = "none"
  ordersContainer.style.display = "flex"
  ordersContainer.innerHTML = ""

  orders.forEach((order) => {
    const orderCard = document.createElement("div")
    orderCard.className = "order-card"

    const itemsList = order.items.map((item) => `${item.name} (x${item.quantity})`).join(", ")

    let total = 0
    order.items.forEach((item) => {
      total += item.price * item.quantity
    })
    const shipping = total > 50 ? 0 : 10
    const tax = Math.round((total + shipping) * 0.08 * 100) / 100
    const finalTotal = total + shipping + tax

    orderCard.innerHTML = `
      <div class="order-header">
        <div class="order-number">Order #${order.id}</div>
        <span class="order-status confirmed">${order.status}</span>
      </div>
      
      <div class="order-details">
        <div class="order-detail-item">
          <span>Date</span>
          <span>${order.date}</span>
        </div>
        <div class="order-detail-item">
          <span>Total Amount</span>
          <span>$${finalTotal.toFixed(2)}</span>
        </div>
        <div class="order-detail-item">
          <span>Delivery Address</span>
          <span>${order.address}</span>
        </div>
        <div class="order-detail-item">
          <span>Payment Method</span>
          <span>${order.paymentMethod.replace("-", " ").toUpperCase()}</span>
        </div>
      </div>

      <div class="order-items">
        <ul class="order-items-list">
          <li><strong>Items:</strong> ${itemsList}</li>
        </ul>
      </div>

      <div class="order-actions">
        <button class="btn btn-secondary btn-small" onclick="viewOrderDetails(${order.id})">View Details</button>
        <button class="btn btn-secondary btn-small" onclick="trackOrder(${order.id})">Track Order</button>
      </div>
    `

    ordersContainer.appendChild(orderCard)
  })
}

function editProfile() {
  const newName = prompt("Enter your new name:")
  if (newName) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    currentUser.name = newName
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    loadUserInfo()
    alert("Profile updated successfully!")
  }
}

function changePassword() {
  const currentPassword = prompt("Enter your current password:")
  if (!currentPassword) return

  const newPassword = prompt("Enter your new password:")
  if (!newPassword) return

  const confirmPassword = prompt("Confirm your new password:")
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match!")
    return
  }

  alert("Password changed successfully!")
}

function viewOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || []
  const order = orders.find((o) => o.id === orderId)

  if (order) {
    const details = `
Order #${order.id}
Date: ${order.date}
Status: ${order.status}
Customer: ${order.customer}
Email: ${order.email}
Address: ${order.address}
Phone: ${order.phone}

Items:
${order.items.map((item) => `- ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join("\n")}
    `
    alert(details)
  }
}

function trackOrder(orderId) {
  alert("Order #" + orderId + " is currently being processed and will be shipped soon!")
}

function logout() {
  const confirmLogout = confirm("Are you sure you want to sign out?")
  if (confirmLogout) {
    localStorage.removeItem("currentUser")
    alert("You have been signed out successfully!")
    window.location.href = "login.html"
  }
}
