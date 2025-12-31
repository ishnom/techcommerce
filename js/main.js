// Sample product data for homepage
const newArrivalsProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: "Rs 999",
    image: "images/mobile1.jpg",
    available: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: "Rs 899",
    image: "images/laptop1.jpg",
    available: true,
  },
  {
    id: 3,
    name: "Google Pixel 8",
    price: "Rs 799",
    image: "images/monitor1.jpg",
    available: true,
  },
  {
    id: 4,
    name: "OnePlus 12",
    price: "Rs 699",
    image: "images/laptop3.jpg",
    available: true,
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    price: "Rs 649",
    image: "images/mobile5.jpg",
    available: true,
  },
]

const featuredProducts = [
  {
    id: 6,
    name: 'MacBook Pro 16"',
    price: "Rs 2499",
    image: "images/mobile2.jpg",
    available: true,
  },
  {
    id: 7,
    name: "Dell XPS 15",
    price: "Rs 1999",
    image: "images/laptop2.jpg",
    available: true,
  },
  {
    id: 8,
    name: "HP Pavilion 16",
    price: "Rs 1299",
    image: "images/monitor2.jpg",
    available: true,
  },
  {
    id: 9,
    name: "ASUS ROG Gaming",
    price: "Rs 1899",
    image: "images/mobile4.jpg",
    available: true,
  },
  {
    id: 10,
    name: "Lenovo ThinkPad",
    price: "Rs 1299",
    image: "images/laptop4.jpg",
    available: true,
  },
]

// Initialize navbar active state
document.addEventListener("DOMContentLoaded", () => {
  // Load and display products
  loadProducts("new-arrivals-grid", newArrivalsProducts)
  loadProducts("featured-grid", featuredProducts)

  // Update cart count from localStorage
  updateCartCount()

  // Set active navbar link
  setActiveNavLink()

  // Mobile menu functionality
  setupMobileMenu()
})

// Mobile menu toggle
function setupMobileMenu() {
  if (window.__mobileMenuInitialized) return
  window.__mobileMenuInitialized = true

  const hamburger = document.getElementById("hamburger")
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
  const closeMenu = document.getElementById("closeMenu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  if (!hamburger || !mobileMenuOverlay) return

  const setMenuState = (isOpen) => {
    hamburger.classList.toggle("active", isOpen)
    mobileMenuOverlay.classList.toggle("active", isOpen)
    document.body.classList.toggle("menu-open", isOpen)
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false")
  }

  hamburger.addEventListener("click", () => {
    const nextState = !mobileMenuOverlay.classList.contains("active")
    setMenuState(nextState)
  })

  if (closeMenu) {
    closeMenu.addEventListener("click", () => setMenuState(false))
  }

  mobileMenuOverlay.addEventListener("click", (e) => {
    if (e.target === mobileMenuOverlay) {
      setMenuState(false)
    }
  })

  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuState(false))
  })

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenuState(false)
    }
  })
}

function loadProducts(containerId, products) {
  const container = document.getElementById(containerId)

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    const priceValue = Number.parseFloat(String(product.price).replace(/[^0-9.]/g, "")) || 0
    const productName = JSON.stringify(product.name)
    const productImage = JSON.stringify(product.image)
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <span class="availability-badge">${product.available ? "In Stock" : "Out of Stock"}</span>
                <div class="product-buttons">
                  <button class="btn btn-primary" onclick="viewProductDetails(${product.id})">View Details</button>
                  <button class="btn btn-secondary" onclick='quickAddCartHome(${product.id}, ${productName}, ${priceValue}, ${productImage})'>Add to Cart</button>
                </div>
            </div>
        `
    container.appendChild(productCard)
  })
}

function quickAddCartHome(productId, productName, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ id: productId, name: productName, price, image, quantity: 1 })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

function viewProductDetails(productId) {
  window.location.href = `html/product-details.html?id=${productId}`
}

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").includes(currentPage) || (currentPage === "" && link.textContent === "Home")) {
      link.classList.add("active")
    }
  })
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartCountElement = document.getElementById("cart-count")
  if (cartCountElement) {
    cartCountElement.textContent = cartCount
  }
}

// Cart functionality
function addToCart(productId, productName, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: Number.parseFloat(price.replace("Rs ", "")),
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  alert(`${productName} added to cart!`)
}
