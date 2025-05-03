// Auth Module
const Auth = (() => {
  // Private variables and functions
  const MAX_LOGIN_ATTEMPTS = 3
  const loginAttempts = {}

  // Initialize users if not exists
  function initUsers() {
    if (!localStorage.getItem("users")) {
      const defaultAdmin = {
        id: "admin1",
        name: "Administrador",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("users", JSON.stringify([defaultAdmin]))
    }
  }

  // Get users from localStorage
  function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]")
  }

  // Save users to localStorage
  function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users))
  }

  // Check if email exists
  function emailExists(email) {
    const users = getUsers()
    return users.some((user) => user.email === email)
  }

  // Generate unique ID
  function generateId() {
    return "id_" + Math.random().toString(36).substr(2, 9)
  }

  // Public methods
  const authModule = {
    init: function () {
      console.log("Auth module initialized")
      initUsers()

      // Setup login button
      const loginBtn = document.getElementById("login-btn")
      if (loginBtn) {
        loginBtn.addEventListener("click", () => {
          console.log("Login button clicked from Auth.init")
          this.login()
        })
      }

      // Setup login form submission on Enter key
      const loginForm = document.getElementById("login-container")
      if (loginForm) {
        loginForm.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            this.login()
          }
        })
      }

      // Setup logout button
      const logoutBtn = document.getElementById("logout-btn")
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          this.logout()
        })
      }
    },

    login: () => {
      console.log("Login function called")
      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value
      const userType = document.getElementById("login-type").value
      const errorElement = document.getElementById("login-error")

      // Validate inputs
      if (!email || !password) {
        errorElement.textContent = "Por favor, complete todos los campos."
        return
      }

      // Check login attempts
      if (loginAttempts[email] && loginAttempts[email] >= MAX_LOGIN_ATTEMPTS) {
        errorElement.textContent = "Cuenta bloqueada. Demasiados intentos fallidos."
        return
      }

      // Find user
      const users = getUsers()
      const user = users.find((u) => u.email === email && u.password === password)

      if (!user) {
        // Increment login attempts
        loginAttempts[email] = (loginAttempts[email] || 0) + 1
        const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts[email]

        errorElement.textContent = `Credenciales incorrectas. ${remainingAttempts} intentos restantes.`
        return
      }

      // Check user role
      if (userType === "admin" && user.role !== "admin") {
        errorElement.textContent = "No tiene permisos de administrador."
        return
      }

      // Reset login attempts
      loginAttempts[email] = 0

      // Set current user
      localStorage.setItem("currentUser", JSON.stringify(user))

      console.log("User logged in:", user)

      // Show appropriate UI
      document.getElementById("login-container").classList.add("hidden")
      document.getElementById("app-container").classList.remove("hidden")

      // Update UI based on user role
      document.getElementById("user-name").textContent = user.name
      document.getElementById("user-role").textContent = user.role === "admin" ? "Administrador" : "Cliente"

      if (user.role === "admin") {
        document.getElementById("admin-menu").style.display = "block"
        document.getElementById("client-menu").style.display = "none"
        // Load admin dashboard
        if (window.UI && typeof window.UI.loadPage === "function") {
          window.UI.loadPage("inicio")
        } else {
          console.error("UI.loadPage is not available")
        }
      } else {
        document.getElementById("admin-menu").style.display = "none"
        document.getElementById("client-menu").style.display = "block"
        // Load client dashboard
        if (window.UI && typeof window.UI.loadPage === "function") {
          window.UI.loadPage("inicio-cliente")
        } else {
          console.error("UI.loadPage is not available")
        }
      }
    },

    register: (name, email, password, role = "cliente") => {
      // Validate inputs
      if (!name || !email || !password) {
        return {
          success: false,
          message: "Por favor, complete todos los campos.",
        }
      }

      // Check if email exists
      if (emailExists(email)) {
        return {
          success: false,
          message: "Este correo ya está registrado.",
        }
      }

      // Create new user
      const newUser = {
        id: generateId(),
        name,
        email,
        password,
        role: role, // Role can be specified, defaults to "cliente"
        createdAt: new Date().toISOString(),
      }

      // Add user to storage
      const users = getUsers()
      users.push(newUser)
      saveUsers(users)

      return {
        success: true,
        message: "Usuario registrado exitosamente.",
        user: newUser,
      }
    },

    logout: () => {
      // Clear current user
      localStorage.removeItem("currentUser")

      // Show login screen
      document.getElementById("app-container").classList.add("hidden")
      document.getElementById("login-container").classList.remove("hidden")

      // Clear login form
      document.getElementById("login-email").value = ""
      document.getElementById("login-password").value = ""
      document.getElementById("login-error").textContent = ""
    },

    getCurrentUser: () => JSON.parse(localStorage.getItem("currentUser") || "null"),

    isLoggedIn: function () {
      return !!this.getCurrentUser()
    },

    isAdmin: function () {
      const user = this.getCurrentUser()
      return user && user.role === "admin"
    },
  }

  // Expose the module globally
  window.Auth = authModule

  return authModule
})()
