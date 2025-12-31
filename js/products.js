// Product data for all categories
const allProducts = {
  newArrivals: [
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
  ],
  featuredProducts: [
    {
      id: 5,
      name: 'MacBook Pro 16"',
      price: "Rs 2499",
      image: "images/mobile2.jpg",
      available: true,
    },
    {
      id: 6,
      name: "Dell XPS 15",
      price: "Rs 1999",
      image: "images/laptop2.jpg",
      available: true,
    },
    {
      id: 7,
      name: "HP Pavilion 16",
      price: "Rs 1299",
      image: "images/monitor2.jpg",
      available: true,
    },
    {
      id: 8,
      name: "ASUS ROG Gaming",
      price: "Rs 1899",
      image: "images/mobile4.jpg",
      available: true,
    },
  ],
  mobilePhones: [
    {
      id: 9,
      name: "iPhone 15 Pro",
      price: "Rs 999",
      image: "images/mobile1.jpg",
      available: true,
    },
    {
      id: 10,
      name: "Samsung Galaxy S24",
      price: "Rs 899",
      image: "images/mobile2.jpg",
      available: true,
    },
    {
      id: 11,
      name: "Google Pixel 8",
      price: "Rs 799",
      image: "images/mobile3.jpg",
      available: true,
    },
    {
      id: 12,
      name: "OnePlus 12",
      price: "Rs 699",
      image: "images/mobile4.jpg",
      available: true,
    },
    {
      id: 13,
      name: "Xiaomi 14 Ultra",
      price: "Rs 649",
      image: "images/mobile5.jpg",
      available: true,
    },
    {
      id: 14,
      name: "iPhone 15",
      price: "Rs 799",
      image: "images/mobile6.jpg",
      available: true,
    },
    {
      id: 15,
      name: "Samsung Galaxy Z Fold",
      price: "Rs 1799",
      image: "images/mobile1.jpg",
      available: true,
    },
    {
      id: 16,
      name: "Motorola Edge 50",
      price: "Rs 599",
      image: "images/mobile2.jpg",
      available: true,
    },
  ],
  laptops: [
    {
      id: 17,
      name: 'MacBook Pro 16"',
      price: "Rs 2499",
      image: "images/laptop1.jpg",
      available: true,
    },
    {
      id: 18,
      name: "Dell XPS 15",
      price: "Rs 1999",
      image: "images/laptop2.jpg",
      available: true,
    },
    {
      id: 19,
      name: "HP Pavilion 16",
      price: "Rs 1299",
      image: "images/laptop3.jpg",
      available: true,
    },
    {
      id: 20,
      name: "ASUS ROG Gaming",
      price: "Rs 1899",
      image: "images/laptop4.jpg",
      available: true,
    },
    {
      id: 21,
      name: "Lenovo ThinkPad",
      price: "Rs 1299",
      image: "images/laptop1.jpg",
      available: true,
    },
    {
      id: 22,
      name: "MacBook Air 15",
      price: "Rs 1499",
      image: "images/laptop2.jpg",
      available: true,
    },
    {
      id: 23,
      name: "Dell Inspiron 16",
      price: "Rs 899",
      image: "images/laptop3.jpg",
      available: true,
    },
    {
      id: 24,
      name: "ASUS VivoBook Pro",
      price: "Rs 1199",
      image: "images/laptop4.jpg",
      available: true,
    },
  ],
  monitors: [
    {
      id: 25,
      name: 'LG UltraWide 38"',
      price: "Rs 1299",
      image: "images/monitor1.jpg",
      available: true,
    },
    {
      id: 26,
      name: "Dell U2723DE",
      price: "Rs 499",
      image: "images/monitor2.jpg",
      available: true,
    },
    {
      id: 27,
      name: 'ASUS ProArt 32"',
      price: "Rs 899",
      image: "images/monitor3.jpg",
      available: true,
    },
    {
      id: 28,
      name: "BenQ SW240",
      price: "Rs 399",
      image: "images/monitor4.jpg",
      available: true,
    },
    {
      id: 29,
      name: "Samsung M7",
      price: "Rs 699",
      image: "images/monitor1.jpg",
      available: true,
    },
    {
      id: 30,
      name: 'Dell S3221QS 32"',
      price: "Rs 599",
      image: "images/monitor2.jpg",
      available: true,
    },
    {
      id: 31,
      name: "LG 27GN950-B",
      price: "Rs 799",
      image: "images/monitor3.jpg",
      available: true,
    },
    {
      id: 32,
      name: 'ASUS PA247CV 24"',
      price: "Rs 349",
      image: "images/monitor4.jpg",
      available: true,
    },
  ],
}

function resolveImagePath(imagePath) {
  if (!imagePath) return ""
  if (imagePath.startsWith("http")) return imagePath
  if (imagePath.startsWith("../")) return imagePath
  const prefix = window.location.pathname.includes("/html/") ? "../" : ""
  return `${prefix}${imagePath}`
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop()

  if (currentPage === "index.html" || currentPage === "") {
    // Load home page products
    loadProducts("new-arrivals-grid", allProducts.newArrivals)
    loadProducts("featured-grid", allProducts.featuredProducts)
  } else if (currentPage === "products.html") {
    // Get category from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const category = urlParams.get('category') || 'all'
    filterByCategory(category)
  }

  updateCartCount()
  setupNavbarAnimations()
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

// Filter products by category
function filterByCategory(category) {
  const productsGrid = document.getElementById("products-grid")
  
  if (!productsGrid) return

  // Update active tab button
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach(btn => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active")
    }
  })

  // Clear grid
  productsGrid.innerHTML = ""

  let productsToShow = []

  // Get products based on category
  if (category === "all") {
    productsToShow = [
      ...allProducts.mobilePhones,
      ...allProducts.laptops,
      ...allProducts.monitors
    ]
  } else if (category === "mobiles") {
    productsToShow = allProducts.mobilePhones
  } else if (category === "laptops") {
    productsToShow = allProducts.laptops
  } else if (category === "monitors") {
    productsToShow = allProducts.monitors
  }

  // Display filtered products
  productsToShow.forEach((product) => {
    const card = createProductCard(product)
    productsGrid.appendChild(card)
  })
}

function loadAllProducts() {
  // Load Mobile Phones
  const mobileGrid = document.getElementById("mobile-phones-grid")
  if (mobileGrid) {
    mobileGrid.innerHTML = ""
    allProducts.mobilePhones.forEach((product) => {
      const card = createProductCard(product)
      mobileGrid.appendChild(card)
    })
  }

  // Load Laptops
  const laptopsGrid = document.getElementById("laptops-grid")
  if (laptopsGrid) {
    laptopsGrid.innerHTML = ""
    allProducts.laptops.forEach((product) => {
      const card = createProductCard(product)
      laptopsGrid.appendChild(card)
    })
  }

  // Load Monitors
  const monitorsGrid = document.getElementById("monitors-grid")
  if (monitorsGrid) {
    monitorsGrid.innerHTML = ""
    allProducts.monitors.forEach((product) => {
      const card = createProductCard(product)
      monitorsGrid.appendChild(card)
    })
  }
}

function loadProducts(containerId, products) {
  const container = document.getElementById(containerId)
  container.innerHTML = ""

  products.forEach((product) => {
    const card = createProductCard(product)
    container.appendChild(card)
  })
}

function createProductCard(product) {
  const card = document.createElement("div")
  card.className = "product-card"
  const imageSrc = resolveImagePath(product.image)
  card.innerHTML = `
    <img src="${imageSrc}" alt="${product.name}" class="product-image">
    <div class="product-info">
      <h3 class="product-name">${product.name}</h3>
      <div class="product-price">${product.price}</div>
      <span class="availability-badge">${product.available ? "In Stock" : "Out of Stock"}</span>
      <div class="product-buttons">
        <button class="btn btn-primary" onclick="viewProductDetails(2)">View Details</button>
        <button class="btn btn-secondary" onclick="quickAddCart(${product.id}, '${product.name}', ${product.price.replace('Rs ', '')})">Add to Cart</button>
      </div>
    </div>
  `
  return card
}

function quickAddCart(productId, productName, price) {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  // Get product image from database
  let productImage = ""
  for (const category in allProducts) {
    const found = allProducts[category].find((p) => p.id === productId)
    if (found) {
      productImage = resolveImagePath(found.image)
      break
    }
  }

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: price,
      image: productImage,
      quantity: 1,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  alert(`${productName} added to cart!`)
}

function setupNavbarAnimations() {
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.style.transition = "all 0.3s ease"
    })
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

function viewProductDetails(productId) {
  window.location.href = `html/product-details.html?id=${productId}`
}

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
