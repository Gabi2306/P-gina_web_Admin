// Main App Module
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded")

  // Inicializar módulos en el orden correcto
  if (window.DB && typeof window.DB.init === "function") {
    console.log("Initializing DB module")
    window.DB.init()
  } else {
    console.error("DB module not available")
  }

  if (window.Auth && typeof window.Auth.init === "function") {
    console.log("Initializing Auth module")
    window.Auth.init()
  } else {
    console.error("Auth module not available")
  }

  if (window.UI && typeof window.UI.init === "function") {
    console.log("Initializing UI module")
    window.UI.init()
  } else {
    console.error("UI module not available")
  }

  console.log("Módulos inicializados")

  // Configurar el botón de login (adicional al que ya está en Auth.init)
  const loginBtn = document.getElementById("login-btn")
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      console.log("Login button clicked from app.js")
      if (window.Auth && typeof window.Auth.login === "function") {
        window.Auth.login()
      } else {
        console.error("Auth.login not available")
      }
    })
  } else {
    console.error("Login button not found")
  }

  // Configurar el botón de logout (adicional al que ya está en Auth.init)
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      console.log("Logout button clicked from app.js")
      if (window.Auth && typeof window.Auth.logout === "function") {
        window.Auth.logout()
      } else {
        console.error("Auth.logout not available")
      }
    })
  }

  // Agregar event listeners para los elementos del menú
  const menuItems = document.querySelectorAll(".menu li")
  menuItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log("Menu item clicked:", this.getAttribute("data-page"))
      const page = this.getAttribute("data-page")
      if (page && window.UI && typeof window.UI.loadPage === "function") {
        window.UI.loadPage(page)
      } else {
        console.error("UI.loadPage not available or page attribute missing")
      }
    })
  })

  // Configurar el toggle del sidebar para dispositivos móviles
  const sidebarToggle = document.getElementById("sidebar-toggle")
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      const sidebar = document.querySelector(".sidebar")
      if (sidebar) {
        sidebar.classList.toggle("expanded")

        // Agregar overlay para móviles
        if (window.innerWidth <= 768) {
          if (sidebar.classList.contains("expanded")) {
            const overlay = document.createElement("div")
            overlay.className = "sidebar-overlay active"
            document.body.appendChild(overlay)

            overlay.addEventListener("click", function () {
              sidebar.classList.remove("expanded")
              this.remove()
            })
          } else {
            const overlay = document.querySelector(".sidebar-overlay")
            if (overlay) overlay.remove()
          }
        }
      }
    })
  }

  // Agregar header móvil si es necesario
  if (window.innerWidth <= 768) {
    const mainContent = document.querySelector(".main-content")
    if (mainContent && !document.querySelector(".mobile-header")) {
      const mobileHeader = document.createElement("div")
      mobileHeader.className = "mobile-header"
      mobileHeader.innerHTML = `
        <button class="mobile-toggle">
          <i class="fas fa-bars"></i>
        </button>
        <h3>Licorería Premium</h3>
        <div></div>
      `

      mainContent.insertBefore(mobileHeader, mainContent.firstChild)

      const mobileToggle = document.querySelector(".mobile-toggle")
      if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
          const sidebar = document.querySelector(".sidebar")
          if (sidebar) {
            sidebar.classList.add("expanded")

            const overlay = document.createElement("div")
            overlay.className = "sidebar-overlay active"
            document.body.appendChild(overlay)

            overlay.addEventListener("click", function () {
              sidebar.classList.remove("expanded")
              this.remove()
            })
          }
        })
      }
    }
  }

  // Check if user is already logged in
  console.log("Checking if user is logged in")
  if (window.Auth && typeof window.Auth.isLoggedIn === "function" && window.Auth.isLoggedIn()) {
    console.log("User is logged in")
    document.getElementById("login-container").classList.add("hidden")
    document.getElementById("app-container").classList.remove("hidden")

    const user = window.Auth.getCurrentUser()
    document.getElementById("user-name").textContent = user.name
    document.getElementById("user-role").textContent = user.role === "admin" ? "Administrador" : "Cliente"

    if (user.role === "admin") {
      document.getElementById("admin-menu").style.display = "block"
      document.getElementById("client-menu").style.display = "none"
      if (window.UI && typeof window.UI.loadPage === "function") {
        window.UI.loadPage("inicio")
      }
    } else {
      document.getElementById("admin-menu").style.display = "none"
      document.getElementById("client-menu").style.display = "block"
      if (window.UI && typeof window.UI.loadPage === "function") {
        window.UI.loadPage("inicio-cliente")
      }
    }
  } else {
    console.log("User is not logged in")
  }
})
