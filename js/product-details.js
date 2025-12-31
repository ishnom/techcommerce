// Product details page
document.addEventListener("DOMContentLoaded", () => {
  loadProductDetails()
  updateCartCount()
  setupMobileMenu()
})

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

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay) {
        hamburger.classList.remove("active")
        mobileMenuOverlay.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      mobileMenuOverlay.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  })
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const cartCount = document.getElementById("cart-count")
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
}

const productDatabase = {
  1: {
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=400&fit=crop",
    description:
      "Experience the ultimate iPhone with the latest A17 Pro chip, advanced camera system, and stunning Super Retina XDR display.",
    available: true,
    specs: [
      "6.1-inch Super Retina XDR display",
      "A17 Pro chip with 6-core CPU",
      "Advanced dual-camera system",
      "Face ID for secure authentication",
      "IP68 water resistance",
      "All-day battery life",
    ],
  },
  2: {
    name: "Samsung Galaxy S24",
    price: 899,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=400&fit=crop",
    description:
      "Samsung's flagship smartphone with cutting-edge display technology and powerful processing capabilities.",
    available: true,
    specs: [
      "6.2-inch Dynamic AMOLED 2X display",
      "Snapdragon 8 Gen 3 processor",
      "Triple camera system with 50MP main sensor",
      "Gorilla Glass Victus 2 protection",
      "Fast 25W charging",
      "All-day+ battery life",
    ],
  },
  3: {
    name: "Google Pixel 8",
    price: 799,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=400&fit=crop",
    description: "Google's premium smartphone with the latest Tensor chip and advanced AI-powered camera features.",
    available: true,
    specs: [
      "6.3-inch OLED display",
      "Google Tensor G3 chip",
      "Advanced computational photography",
      "Magic Eraser feature",
      "Best Selfie feature",
      "Secure Pixel Pass authentication",
    ],
  },
  4: {
    name: "OnePlus 12",
    price: 699,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1606933248051-5ce98c4ddb0f?w=500&h=400&fit=crop",
    description:
      "OnePlus delivers flagship performance with their fast-charging technology and smooth user experience.",
    available: true,
    specs: [
      "6.7-inch AMOLED display",
      "Snapdragon 8 Gen 3 processor",
      "Hasselblad camera system",
      "120W SUPERVOOC charging",
      "50MP main camera",
      "OxygenOS with Android 14",
    ],
  },
  5: {
    name: "Xiaomi 14 Ultra",
    price: 649,
    originalPrice: 749,
    image: "https://images.unsplash.com/photo-1516589335887-da6b29b8f966?w=500&h=400&fit=crop",
    description: "Xiaomi's flagship with exceptional camera quality and value for money in the premium segment.",
    available: true,
    specs: [
      "6.73-inch AMOLED display",
      "Snapdragon 8 Gen 3 processor",
      "Leica optical lens system",
      "Night mode performance",
      "120W charging support",
      "IP69K rating",
    ],
  },
  6: {
    name: 'MacBook Pro 16"',
    price: 2499,
    originalPrice: 2699,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop",
    description: "The ultimate pro laptop with M3 Max chip, stunning Liquid Retina display, and all-day battery.",
    available: true,
    specs: [
      "16-inch Liquid Retina XDR display",
      "Apple M3 Max chip",
      "32GB unified memory",
      "1TB SSD storage",
      "Up to 22-hour battery life",
      "Thunderbolt ports for connectivity",
    ],
  },
  7: {
    name: "Dell XPS 15",
    price: 1999,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1588872657840-790ff3ec0f0b?w=500&h=400&fit=crop",
    description: "Premium Windows laptop with stunning InfinityEdge display and powerful Intel processor.",
    available: true,
    specs: [
      "15.6-inch FHD+ display",
      "Intel Core i7 processor",
      "NVIDIA GeForce RTX graphics",
      "32GB RAM",
      "1TB SSD storage",
      "Premium aluminum chassis",
    ],
  },
  8: {
    name: "HP Pavilion 16",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1588872657840-790ff3ec0f0b?w=500&h=400&fit=crop",
    description: "Great value laptop for everyday computing with excellent performance.",
    available: true,
    specs: [
      "16-inch FHD display",
      "Intel Core i7 processor",
      "16GB RAM",
      "512GB SSD storage",
      "Long battery life",
      "Lightweight design",
    ],
  },
  9: {
    name: "ASUS ROG Gaming",
    price: 1899,
    originalPrice: 2099,
    image: "https://images.unsplash.com/photo-1595225476933-018acacdaf60?w=500&h=400&fit=crop",
    description: "High-performance gaming laptop with powerful RTX graphics and high refresh rate display.",
    available: true,
    specs: [
      "16-inch 165Hz display",
      "Intel Core i9 processor",
      "NVIDIA RTX 4070 graphics",
      "32GB DDR5 RAM",
      "1TB NVMe SSD",
      "Advanced cooling system",
    ],
  },
  10: {
    name: "Lenovo ThinkPad",
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop",
    description: "Business laptop with legendary durability, excellent keyboard, and reliable performance.",
    available: true,
    specs: [
      "14-inch FHD display",
      "Intel Core i7 vPro processor",
      "16GB RAM",
      "512GB SSD",
      "Military-grade durability",
      "Premium keyboard",
    ],
  },
  11: {
    name: 'LG UltraWide 38"',
    price: 1299,
    originalPrice: 1499,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    description: "Immersive ultrawide gaming and productivity monitor with curved display and HDR support.",
    available: true,
    specs: [
      "38-inch curved UWQHD display",
      "3840 x 1600 resolution",
      "144Hz refresh rate",
      "1ms response time",
      "USB-C connectivity",
      "HDR10 support",
    ],
  },
  12: {
    name: "Dell U2723DE",
    price: 499,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    description: "Professional monitor for accurate color reproduction and detailed design work.",
    available: true,
    specs: [
      "27-inch IPS display",
      "2560 x 1440 resolution",
      "60Hz refresh rate",
      "Professional color calibration",
      "USB-C with 65W power delivery",
      "Height adjustable stand",
    ],
  },
  13: {
    name: 'ASUS ProArt 32"',
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    description: "High-end professional monitor for content creators with 99% Adobe RGB coverage.",
    available: true,
    specs: [
      "32-inch 4K IPS display",
      "3840 x 2160 resolution",
      "60Hz refresh rate",
      "99% Adobe RGB coverage",
      "Hardware calibration capable",
      "Full connectivity options",
    ],
  },
  14: {
    name: "BenQ SW240",
    price: 399,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    description: "Portable editing monitor perfect for on-location work with exceptional color accuracy.",
    available: true,
    specs: [
      "24-inch IPS display",
      "1920 x 1200 resolution",
      "Professional color accuracy",
      "USB-C connection",
      "Built-in carrying handle",
      "Wide color gamut",
    ],
  },
  15: {
    name: "Samsung M7",
    price: 699,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
    description: "Smart monitor with built-in streaming and gaming features.",
    available: true,
    specs: [
      "32-inch 4K display",
      "3840 x 2160 resolution",
      "Built-in AppleTV",
      "HDMI 2.1 support",
      "120Hz refresh rate",
      "Smart TV experience",
    ],
  },
}

function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))

  const product = productDatabase[productId]

  if (!product) {
    document.body.innerHTML = "<h1>Product not found</h1><p><a href='products.html'>Back to Products</a></p>"
    return
  }

  document.getElementById("product-title").textContent = product.name
  
  // Use mobile5.jpg for product ID 2 (Samsung Galaxy S24), otherwise use database image
  const productImageSrc = productId === 2 ? "../images/mobile5.jpg" : product.image
  document.getElementById("product-image").src = productImageSrc
  
  document.getElementById("product-price").textContent = "Rs " + product.price
  document.getElementById("original-price").textContent = "Rs " + product.originalPrice
  document.getElementById("product-desc").textContent = product.description
  document.getElementById("breadcrumb-product").textContent = product.name

  // Load specifications
  const specsList = document.getElementById("specifications-list")
  specsList.innerHTML = ""
  product.specs.forEach((spec) => {
    const li = document.createElement("li")
    li.textContent = spec
    specsList.appendChild(li)
  })

  // Load related products
  loadRelatedProducts(productId)
}

function loadRelatedProducts(currentProductId) {
  const relatedGrid = document.getElementById("related-products-grid")
  relatedGrid.innerHTML = ""

  const relatedImages = ["../images/mobile2.jpg", "../images/mobile3.jpg", "../images/mobile4.jpg", "../images/mobile5.jpg"]
  let relatedCount = 0
  
  for (const id in productDatabase) {
    if (Number.parseInt(id) !== currentProductId) {
      const product = productDatabase[id]
      const card = document.createElement("div")
      card.className = "product-card"
      // Cycle through images: use modulo to repeat image pattern for all products
      const imageIndex = relatedCount % relatedImages.length
      card.innerHTML = `
        <img src="${relatedImages[imageIndex]}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price">Rs ${product.price}</div>
          <span class="availability-badge">${product.available ? "In Stock" : "Out of Stock"}</span>
          <div class="product-buttons">
            <button class="btn btn-primary" onclick="viewProductDetails(${id})">View Details</button>
          </div>
        </div>
      `
      relatedGrid.appendChild(card)
      relatedCount++
    }
  }
}

function increaseQuantity() {
  const input = document.getElementById("quantity")
  input.value = Math.min(Number.parseInt(input.value) + 1, 10)
}

function decreaseQuantity() {
  const input = document.getElementById("quantity")
  input.value = Math.max(Number.parseInt(input.value) - 1, 1)
}

function addProductToCart() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))
  const product = productDatabase[productId]
  const quantity = Number.parseInt(document.getElementById("quantity").value)

  if (!product) return

  const cart = JSON.parse(localStorage.getItem("cart")) || []
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
  alert(`Added ${quantity} x ${product.name} to cart!`)
  document.getElementById("quantity").value = "1"
}

function addToWishlist() {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = Number.parseInt(urlParams.get("id"))
  const product = productDatabase[productId]

  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
  if (!wishlist.find((item) => item.id === productId)) {
    wishlist.push({ id: productId, name: product.name })
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }

  alert(`${product.name} added to wishlist!`)
}

function viewProductDetails(productId) {
  window.location.href = `product-details.html?id=${productId}`
}
