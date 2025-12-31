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
  const hamburger = document.getElementById("hamburger")
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
  const closeMenu = document.getElementById("closeMenu")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      mobileMenuOverlay.classList.toggle("active")
      document.body.style.overflow = mobileMenuOverlay.classList.contains("active") ? "hidden" : "auto"
    })
  }

  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      hamburger.classList.remove("active")
      mobileMenuOverlay.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  // Close menu when clicking outside
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay) {
        hamburger.classList.remove("active")
        mobileMenuOverlay.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Close menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      mobileMenuOverlay.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  })
}

function loadProducts(containerId, products) {
  const container = document.getElementById(containerId)

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${product.price}</div>
                <span class="availability-badge">${product.available ? "In Stock" : "Out of Stock"}</span>
                <button class="btn btn-primary" onclick="viewProductDetails(2)">View Details</button>
            </div>
        `
    container.appendChild(productCard)
  })
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
