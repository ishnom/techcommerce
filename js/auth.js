// Authentication form handling
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount()
})

function handleLogin(event) {
  event.preventDefault()

  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  // Clear previous errors
  clearErrors()

  // Validate form
  let isValid = true

  if (!email) {
    showError("emailError", "Email is required")
    isValid = false
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email")
    isValid = false
  }

  if (!password) {
    showError("passwordError", "Password is required")
    isValid = false
  } else if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters")
    isValid = false
  }

  if (isValid) {
    // Store user info in localStorage
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: email,
        name: email.split("@")[0],
      }),
    )

    alert("Login successful! Welcome back!")
    window.location.href = "../index.html"
  }
}

function handleSignup(event) {
  event.preventDefault()

  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  // Clear previous errors
  clearErrors()

  // Validate form
  let isValid = true

  if (!name) {
    showError("nameError", "Name is required")
    isValid = false
  } else if (name.length < 3) {
    showError("nameError", "Name must be at least 3 characters")
    isValid = false
  }

  if (!email) {
    showError("emailError", "Email is required")
    isValid = false
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email")
    isValid = false
  }

  if (!password) {
    showError("passwordError", "Password is required")
    isValid = false
  } else if (password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters")
    isValid = false
  }

  if (isValid) {
    // Store user info in localStorage
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        email: email,
        name: name,
      }),
    )

    alert("Account created successfully! Please login.")
    window.location.href = "login.html"
  }
}

function handleForgotPassword(event) {
  event.preventDefault()

  const email = document.getElementById("email").value.trim()

  // Clear previous errors
  clearErrors()

  // Validate email
  if (!email) {
    showError("emailError", "Email is required")
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email")
  } else {
    alert("Password reset link has been sent to " + email)
    window.location.href = "login.html"
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message")
  errorElements.forEach((element) => {
    element.textContent = ""
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
