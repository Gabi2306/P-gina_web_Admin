// UI Module
const UI = (() => {
  // Public methods
  const uiModule = {
    init: function () {
      console.log("UI module initialized")

      // Add modal styles
      const style = document.createElement("style")
      style.textContent = `
        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
          background-color: #fff;
          margin: 10% auto;
          padding: 0;
          border-radius: 8px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          width: 80%;
          max-width: 600px;
          animation: modalFadeIn 0.3s;
        }
        
        @keyframes modalFadeIn {
          from {opacity: 0; transform: translateY(-20px);}
          to {opacity: 1; transform: translateY(0);}
        }
        
        .modal-header {
          padding: 15px 20px;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-header h3 {
          margin: 0;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .close {
          color: #aaa;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
        
        .close:hover {
          color: #333;
        }
        
        .form-actions {
          margin-top: 20px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        
        .quantity-control {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .quantity-control button {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
        }
        
        .badge {
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .badge-success {
          background-color: #2ecc71;
          color: white;
        }
        
        .badge-warning {
          background-color: #f39c12;
          color: white;
        }
        
        .badge-danger {
          background-color: #e74c3c;
          color: white;
        }
        
        .text-right {
          text-align: right;
        }
        
        .cart-actions {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
        
        .order-summary {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
        
        #credit-card-details {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #ddd;
        }
        
        .text-danger {
          color: #e74c3c;
        }
        
        .text-warning {
          color: #f39c12;
        }
        
        .fw-bold {
          font-weight: bold;
        }
        
        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            margin: 5% auto;
          }
          
          .cart-actions {
            flex-direction: column;
            gap: 10px;
          }
          
          .cart-actions button {
            width: 100%;
          }
        }
      `
      document.head.appendChild(style)

      // Setup sidebar toggle
      const sidebarToggle = document.getElementById("sidebar-toggle")
      const sidebar = document.querySelector(".sidebar")

      if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", () => {
          sidebar.classList.toggle("expanded")

          // Add overlay for mobile
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
              if (overlay) {
                overlay.remove()
              }
            }
          }
        })
      }

      // Setup menu navigation
      const menuItems = document.querySelectorAll(".menu li")
      menuItems.forEach((item) => {
        item.addEventListener("click", function () {
          const page = this.getAttribute("data-page")
          if (page) {
            UI.loadPage(page)
          }
        })
      })

      // Add mobile header for small screens
      if (window.innerWidth <= 768) {
        const mobileHeader = document.createElement("div")
        mobileHeader.className = "mobile-header"
        mobileHeader.innerHTML = `
          <button class="mobile-toggle">
            <i class="fas fa-bars"></i>
          </button>
          <h3>Licorería Premium</h3>
          <div></div>
        `

        const mainContent = document.querySelector(".main-content")
        if (mainContent) {
          mainContent.insertBefore(mobileHeader, mainContent.firstChild)

          const mobileToggle = document.querySelector(".mobile-toggle")
          if (mobileToggle && sidebar) {
            mobileToggle.addEventListener("click", () => {
              sidebar.classList.add("expanded")

              const overlay = document.createElement("div")
              overlay.className = "sidebar-overlay active"
              document.body.appendChild(overlay)

              overlay.addEventListener("click", function () {
                sidebar.classList.remove("expanded")
                this.remove()
              })
            })
          }
        }
      }

      // Check if user is logged in
      if (window.Auth && Auth.isLoggedIn()) {
        document.getElementById("login-container").classList.add("hidden")
        document.getElementById("app-container").classList.remove("hidden")

        const user = Auth.getCurrentUser()
        document.getElementById("user-name").textContent = user.name
        document.getElementById("user-role").textContent = user.role === "admin" ? "Administrador" : "Cliente"

        if (user.role === "admin") {
          document.getElementById("admin-menu").style.display = "block"
          document.getElementById("client-menu").style.display = "none"
          this.loadPage("inicio")
        } else {
          document.getElementById("admin-menu").style.display = "none"
          document.getElementById("client-menu").style.display = "block"
          this.loadPage("inicio-cliente")
        }
      }
    },

    loadPage: function (pageName) {
      console.log("Loading page:", pageName)
      const contentContainer = document.getElementById("content-container")
      if (!contentContainer) {
        console.error("Content container not found")
        return
      }

      // Highlight active menu item
      const menuItems = document.querySelectorAll(".menu li")
      menuItems.forEach((item) => {
        if (item.getAttribute("data-page") === pageName) {
          item.classList.add("active")
        } else {
          item.classList.remove("active")
        }
      })

      // Get current user
      const user = window.Auth.getCurrentUser()
      if (!user) {
        console.error("No user logged in")
        return
      }

      // Load appropriate page based on user role
      if (user.role === "admin") {
        contentContainer.innerHTML = this.createAdminPage(pageName)
      } else {
        contentContainer.innerHTML = this.createClientPage(pageName)
      }

      // Initialize page-specific scripts
      if (pageName === "productos" && window.Admin) {
        Admin.initProductsPage()
      } else if (pageName === "proveedores" && window.Admin) {
        Admin.initSuppliersPage()
      } else if (pageName === "clientes" && window.Admin) {
        Admin.initCustomersPage()
      } else if (pageName === "ventas" && window.Admin) {
        Admin.initSalesPage()
      } else if (pageName === "registro-usuarios" && window.Admin) {
        Admin.initUserRegistrationPage()
      } else if (pageName === "inventario" && window.Admin) {
        Admin.initInventoryReportPage()
      } else if (pageName === "catalogo" && window.Client) {
        Client.initCatalogPage()
      } else if (pageName === "carrito" && window.Client) {
        Client.initCartPage()
      } else if (pageName === "mis-compras" && window.Client) {
        Client.initMyPurchasesPage()
      } else if (pageName === "perfil" && window.Client) {
        Client.initProfilePage()
      } else if (pageName === "inicio-cliente" && window.Client) {
        Client.initClientDashboard()
      }

      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        const sidebar = document.querySelector(".sidebar")
        if (sidebar) sidebar.classList.remove("expanded")

        const overlay = document.querySelector(".sidebar-overlay")
        if (overlay) overlay.remove()
      }
    },

    showModal: (modalId) => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = "block"

        const closeBtn = modal.querySelector(".close")
        if (closeBtn) {
          closeBtn.addEventListener("click", () => {
            modal.style.display = "none"
          })
        }

        window.addEventListener("click", (event) => {
          if (event.target === modal) {
            modal.style.display = "none"
          }
        })
      }
    },

    closeModal: (modalId) => {
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.style.display = "none"
      }
    },

    // Función para formatear moneda en pesos colombianos
    formatCurrency: (value) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(value);
    },
    
    // Función para obtener información de stock formateada para la visualización
    formatStockInfo: (product) => {
      if (typeof product.stock === 'object') {
        let stockClass = "";
        
        // Determinar clase CSS basada en el nivel de stock
        if (product.stock.bottles <= product.stock.minStock / 2) {
          stockClass = "text-danger fw-bold";
        } else if (product.stock.bottles <= product.stock.minStock) {
          stockClass = "text-warning fw-bold";
        }
        
        return {
          display: `${product.stock.bottles} unidades (${product.stock.boxes} cajas)<br>
                    <small>${product.stock.unit} - ${product.stock.location}</small>`,
          class: stockClass,
          count: product.stock.bottles
        };
      } else {
        // Retrocompatibilidad para productos con stock como número
        let stockClass = "";
        if (product.stock < 5) {
          stockClass = "text-danger fw-bold";
        } else if (product.stock < 10) {
          stockClass = "text-warning fw-bold";
        }
        
        return {
          display: `${product.stock} unidades`,
          class: stockClass,
          count: product.stock
        };
      }
    },

    createAdminPage: function (pageName) {
      console.log("Creating admin page:", pageName)
      switch (pageName) {
        case "inicio":
          return this.createAdminDashboard()
        case "ventas":
          return this.createSalesPage()
        case "productos":
          return this.createProductsPage()
        case "clientes":
          return this.createCustomersPage()
        case "proveedores":
          return this.createSuppliersPage()
        case "registro-usuarios":
          return this.createUserRegistrationPage()
        case "inventario":
          return this.createInventoryReportPage()
        default:
          return '<div class="card"><div class="card-body">Página no encontrada</div></div>'
      }
    },

    createClientPage: function (pageName) {
      console.log("Creating client page:", pageName)
      switch (pageName) {
        case "inicio-cliente":
          return this.createClientDashboard()
        case "catalogo":
          return this.createCatalogPage()
        case "carrito":
          return this.createCartPage()
        case "mis-compras":
          return this.createMyPurchasesPage()
        case "perfil":
          return this.createProfilePage()
        default:
          return '<div class="card"><div class="card-body">Página no encontrada</div></div>'
      }
    },

    createAdminDashboard: () => {
      const products = window.DB.getProducts()
      const customers = window.DB.getCustomers()
      const sales = window.DB.getSales()

      // Calculate total sales
      const totalSales = sales.reduce((total, sale) => total + sale.total, 0)
      
      // Calcular valor total del inventario
      const totalInventoryValue = window.DB.getTotalInventoryValue();

      // Get recent sales
      const recentSales = sales.slice(0, 5)
      
      // Obtener productos con bajo stock
      const lowStockProducts = window.DB.getLowStockProducts();

      return `
        <h1>Panel de Administración - Licorería Premium</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Bienvenido al Sistema de Gestión</h3>
          </div>
          <div class="card-body">
            <p>Este sistema le permite administrar todos los aspectos de su tienda de licores premium:</p>
            <ul style="margin-left: 20px; margin-bottom: 15px;">
              <li>Gestión completa de inventario de licores, vinos y cervezas</li>
              <li>Seguimiento de ventas y análisis de tendencias</li>
              <li>Administración de clientes y sus preferencias</li>
              <li>Control de proveedores y pedidos</li>
              <li>Generación de reportes y estadísticas</li>
            </ul>
            <p>Utilice el menú lateral para navegar entre las diferentes secciones del sistema.</p>
          </div>
        </div>
        
        <div class="dashboard-widgets">
          <div class="widget widget-sales">
            <div class="widget-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="widget-content">
              <div class="widget-title">Ventas Totales</div>
              <div class="widget-value">${window.DB.formatCurrency(totalSales)}</div>
            </div>
          </div>
          
          <div class="widget widget-products">
            <div class="widget-icon">
              <i class="fas fa-wine-bottle"></i>
            </div>
            <div class="widget-content">
              <div class="widget-title">Productos</div>
              <div class="widget-value">${products.length}</div>
            </div>
          </div>
          
          <div class="widget widget-customers">
            <div class="widget-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="widget-content">
              <div class="widget-title">Clientes</div>
              <div class="widget-value">${customers.length}</div>
            </div>
          </div>
          
          <div class="widget widget-orders">
            <div class="widget-icon">
              <i class="fas fa-boxes"></i>
            </div>
            <div class="widget-content">
              <div class="widget-title">Valor Inventario</div>
              <div class="widget-value">${window.DB.formatCurrency(totalInventoryValue)}</div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Ventas Recientes</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${recentSales
                    .map((sale) => {
                      const customer = window.DB.getCustomer(sale.customerId)
                      return `
                        <tr>
                          <td>${sale.id}</td>
                          <td>${customer ? customer.name : "Cliente Desconocido"}</td>
                          <td>${new Date(sale.date).toLocaleString()}</td>
                          <td>${window.DB.formatCurrency(sale.total)}</td>
                          <td>
                            <button class="btn btn-sm btn-primary view-sale" data-id="${sale.id}">
                              <i class="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      `
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Productos con Bajo Stock</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Stock Actual</th>
                    <th>Stock Mínimo</th>
                    <th>Ubicación</th>
                    <th>Proveedor</th>
                  </tr>
                </thead>
                <tbody>
                  ${lowStockProducts
                    .map((product) => {
                      const supplier = window.DB.getSupplier(product.supplier);
                      
                      // Preparar información de stock
                      let stockInfo;
                      let minStockInfo;
                      let stockClass = "";
                      let locationInfo;
                      
                      if (typeof product.stock === 'object') {
                        stockInfo = `${product.stock.bottles} unidades`;
                        minStockInfo = `${product.stock.minStock} unidades`;
                        locationInfo = product.stock.location;
                        
                        // Determinar clase CSS basada en el nivel de stock
                        if (product.stock.bottles <= product.stock.minStock / 2) {
                          stockClass = "text-danger fw-bold";
                        } else if (product.stock.bottles <= product.stock.minStock) {
                          stockClass = "text-warning fw-bold";
                        }
                      } else {
                        stockInfo = `${product.stock} unidades`;
                        minStockInfo = "10 unidades";
                        locationInfo = "Almacén Principal";
                        
                        if (product.stock < 5) {
                          stockClass = "text-danger fw-bold";
                        } else if (product.stock < 10) {
                          stockClass = "text-warning fw-bold";
                        }
                      }
                      
                      return `
                        <tr>
                          <td>${product.name}</td>
                          <td>${window.DB.formatCurrency(product.price)}</td>
                          <td class="${stockClass}">${stockInfo}</td>
                          <td>${minStockInfo}</td>
                          <td>${locationInfo}</td>
                          <td>${supplier ? supplier.name : "Proveedor Desconocido"}</td>
                        </tr>
                      `
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `
    },

    createSalesPage: () => {
      const sales = window.DB.getSales()

      return `
        <h1>Gestión de Ventas</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Todas las Ventas</h3>
          </div>
          <div class="card-body">
            <div class="form-row mb-3">
              <div class="form-col">
                <label for="sales-start-date">Fecha Inicio</label>
                <input type="date" id="sales-start-date" class="form-control">
              </div>
              <div class="form-col">
                <label for="sales-end-date">Fecha Fin</label>
                <input type="date" id="sales-end-date" class="form-control">
              </div>
              <div class="form-col d-flex align-items-end">
                <button id="period-sales-btn" class="btn btn-primary">
                  <i class="fas fa-calendar"></i> Filtrar por Período
                </button>
              </div>
              <div class="form-col d-flex align-items-end">
                <button id="category-sales-btn" class="btn btn-secondary">
                  <i class="fas fa-chart-pie"></i> Ver por Categoría
                </button>
              </div>
            </div>
            
            <div id="period-summary"></div>
            <div id="category-summary"></div>
            
            <div class="search-box">
              <input type="text" id="search-sales" placeholder="Buscar por cliente...">
              <button id="search-sales-btn"><i class="fas fa-search"></i></button>
            </div>
            
            <div class="table-container">
              <table id="sales-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${sales
                    .map((sale) => {
                      const customer = window.DB.getCustomer(sale.customerId)
                      return `
                        <tr>
                          <td>${sale.id}</td>
                          <td>${customer ? customer.name : "Cliente Desconocido"}</td>
                          <td>${new Date(sale.date).toLocaleString()}</td>
                          <td>${window.DB.formatCurrency(sale.total)}</td>
                          <td>
                            <button class="btn btn-sm btn-primary view-sale" data-id="${sale.id}">
                              <i class="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      `
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div id="sale-details-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Detalles de la Venta</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body" id="sale-details-content">
              <!-- Sale details will be loaded here -->
            </div>
          </div>
        </div>
      `
    },

    createProductsPage: () => {
      const products = window.DB.getProducts()
      const suppliers = window.DB.getSuppliers()

      return `
        <h1>Gestión de Productos</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Productos</h3>
            <div>
              <button id="low-stock-btn" class="btn btn-sm btn-warning me-2">
                <i class="fas fa-exclamation-circle"></i> Ver Bajo Stock
              </button>
              <button id="add-product-btn" class="btn btn-sm btn-primary">
                <i class="fas fa-plus"></i> Nuevo Producto
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="search-box">
              <input type="text" id="search-products" placeholder="Buscar producto...">
              <button id="search-products-btn"><i class="fas fa-search"></i></button>
            </div>
            
            <div class="table-container">
              <table id="products-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Proveedor</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${products
                    .map((product) => {
                      const supplier = window.DB.getSupplier(product.supplier);
                      
                      // Preparar información de stock
                      const stockInfo = UI.formatStockInfo(product);
                      
                      return `
                        <tr>
                          <td>${product.name}</td>
                          <td>${product.description}</td>
                          <td>${window.DB.formatCurrency(product.price)}</td>
                          <td class="${stockInfo.class}">${stockInfo.display}</td>
                          <td>${supplier ? supplier.name : "Proveedor Desconocido"}</td>
                          <td>
                            <button class="btn btn-sm btn-primary edit-product" data-id="${product.id}">
                              <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">
                              <i class="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      `
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `
    },

    createCustomersPage: () => {
      const customers = window.DB.getCustomers()

      return `
        <h1>Gestión de Clientes</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Clientes Registrados</h3>
          </div>
          <div class="card-body">
            <div class="search-box">
              <input type="text" id="search-customers" placeholder="Buscar cliente...">
              <button id="search-customers-btn"><i class="fas fa-search"></i></button>
            </div>
            
            <div class="table-container">
              <table id="customers-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Fecha de Registro</th>
                    <th>Compras</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${customers
                    .map((customer) => {
                      const customerSales = window.DB.getCustomerSales(customer.id)
                      const totalSpent = customerSales.reduce((total, sale) => total + sale.total, 0)

                      return `
                        <tr>
                          <td>${customer.name}</td>
                          <td>${customer.email}</td>
                          <td>${new Date(customer.createdAt).toLocaleDateString()}</td>
                          <td>
                            ${customerSales.length} compras
                            <br>
                            <small>Total: ${window.DB.formatCurrency(totalSpent)}</small>
                          </td>
                          <td>
                            <button class="btn btn-sm btn-primary view-customer-sales" data-id="${customer.id}">
                              <i class="fas fa-eye"></i> Ver Compras
                            </button>
                          </td>
                        </tr>
                      `
                    })
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div id="customer-sales-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Compras del Cliente</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body" id="customer-sales-content">
              <!-- Customer sales will be loaded here -->
            </div>
          </div>
        </div>
      `
    },

    createSuppliersPage: () => {
      const suppliers = window.DB.getSuppliers()

      return `
        <h1>Gestión de Proveedores</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Proveedores</h3>
            <button id="add-supplier-btn" class="btn btn-sm btn-primary">
              <i class="fas fa-plus"></i> Nuevo Proveedor
            </button>
          </div>
          <div class="card-body">
            <div class="search-box">
              <input type="text" id="search-suppliers" placeholder="Buscar proveedor...">
              <button id="search-suppliers-btn"><i class="fas fa-search"></i></button>
            </div>
            
            <div class="table-container">
              <table id="suppliers-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Contacto</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${suppliers
                    .map(
                      (supplier) => `
                      <tr>
                        <td>${supplier.name}</td>
                        <td>${supplier.contact}</td>
                        <td>${supplier.phone}</td>
                        <td>${supplier.address}</td>
                        <td>
                          <button class="btn btn-sm btn-primary edit-supplier" data-id="${supplier.id}">
                            <i class="fas fa-edit"></i>
                          </button>
                          <button class="btn btn-sm btn-danger delete-supplier" data-id="${supplier.id}">
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div id="supplier-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="supplier-modal-title">Nuevo Proveedor</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body">
              <form id="supplier-form">
                <input type="hidden" id="supplier-id">
                
                <div class="form-group">
                  <label for="supplier-name">Nombre</label>
                  <input type="text" id="supplier-name" required>
                </div>
                
                <div class="form-group">
                  <label for="supplier-contact">Contacto</label>
                  <input type="text" id="supplier-contact" required>
                </div>
                
                <div class="form-group">
                  <label for="supplier-phone">Teléfono</label>
                  <input type="text" id="supplier-phone" required>
                </div>
                
                <div class="form-group">
                  <label for="supplier-address">Dirección</label>
                  <input type="text" id="supplier-address" required>
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary">Guardar</button>
                  <button type="button" class="btn btn-danger" id="cancel-supplier">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `
    },

    createUserRegistrationPage: function () {
      return `
        <h1>Registro de Usuarios</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Registrar Nuevo Usuario</h3>
          </div>
          <div class="card-body">
            <form id="admin-register-form">
              <div class="form-group">
                <label for="admin-register-name">Nombre Completo</label>
                <input type="text" id="admin-register-name" placeholder="Ingrese el nombre" required>
              </div>
              
              <div class="form-group">
                <label for="admin-register-email">Correo Electrónico</label>
                <input type="email" id="admin-register-email" placeholder="Ingrese el correo" required>
              </div>
              
              <div class="form-group">
                <label for="admin-register-password">Contraseña</label>
                <input type="password" id="admin-register-password" placeholder="Ingrese la contraseña" required>
              </div>
              
              <div class="form-group">
                <label for="admin-register-confirm">Confirmar Contraseña</label>
                <input type="password" id="admin-register-confirm" placeholder="Confirme la contraseña" required>
              </div>
              
              <div class="form-group">
                <label for="admin-register-role">Tipo de Usuario</label>
                <select id="admin-register-role" required>
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              
              <div id="admin-register-error" class="error-message"></div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Registrar Usuario</button>
              </div>
            </form>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Usuarios Registrados</h3>
          </div>
          <div class="card-body">
            <div class="search-box">
              <input type="text" id="search-users" placeholder="Buscar usuario...">
              <button id="search-users-btn"><i class="fas fa-search"></i></button>
            </div>
            
            <div class="table-container">
              <table id="users-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Fecha de Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.getAllUsers()
                    .map(
                      (user) => `
                    <tr>
                      <td>${user.name}</td>
                      <td>${user.email}</td>
                      <td>${user.role === "admin" ? "Administrador" : "Cliente"}</td>
                      <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `
    },
    
    // Página de reportes de inventario
    createInventoryReportPage: function() {
      return `
        <h1>Reporte de Inventario</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Generación de Reportes</h3>
          </div>
          <div class="card-body">
            <p>Utilice esta herramienta para generar reportes detallados del inventario actual.</p>
            <button id="generate-inventory-report" class="btn btn-primary">
              <i class="fas fa-file-alt"></i> Generar Reporte
            </button>
          </div>
        </div>
        
        <div id="inventory-report">
          <!-- El reporte generado se mostrará aquí -->
        </div>
      `;
    },

    // Helper function to get all users
    getAllUsers: () => JSON.parse(localStorage.getItem("users") || "[]"),

    createClientDashboard: () => {
      const user = window.Auth.getCurrentUser()
      const customerSales = window.DB.getCustomerSales(user.id)
      const totalSpent = customerSales.reduce((total, sale) => total + sale.total, 0)

      return `
        <h1>Bienvenido a Licorería Premium, ${user.name}</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Nuestra Tienda</h3>
          </div>
          <div class="card-body">
            <p>Bienvenido a la tienda en línea de Licorería Premium, su destino para bebidas alcohólicas de alta calidad:</p>
            <ul style="margin-left: 20px; margin-bottom: 15px;">
              <li>Amplia selección de whiskies, vodkas, rones, tequilas y más</li>
              <li>Vinos de las mejores regiones vinícolas del mundo</li>
              <li>Cervezas artesanales y de importación</li>
              <li>Licores y destilados premium</li>
              <li>Ofertas especiales y descuentos para clientes frecuentes</li>
            </ul>
            <p>Explore nuestro catálogo para descubrir nuestra selección premium de bebidas alcohólicas.</p>
          </div>
        </div>
        
        <div class="dashboard-widgets">
          <div class="widget widget-orders">
            <div class="widget-icon">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div class="widget-content">
              <div class="widget-title">Mis Compras</div>
              <div class="widget-value">${customerSales.length}</div>
            </div>
          </div>
          
          <div class="widget widget-sales">
            <div class="widget-icon">
              <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="widget-content">
              <div class="widget-title">Total Gastado</div>
              <div class="widget-value">${window.DB.formatCurrency(totalSpent)}</div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Productos Destacados</h3>
          </div>
          <div class="card-body">
            <div class="product-grid">
              ${window.DB.getProducts()
                .slice(0, 4)
                .map(
                  (product) => `
                  <div class="product-card">
                    <div class="product-image">
                      <img src="${product.image || "https://via.placeholder.com/150"}" alt="${product.name}">
                    </div>
                    <div class="product-details">
                      <h3 class="product-title">${product.name}</h3>
                      <div class="product-price">${window.DB.formatCurrency(product.price)}</div>
                      <p class="product-description">${product.description.substring(0, 60)}...</p>
                      ${typeof product.stock === 'object' && product.stock.bottles > 0 || typeof product.stock === 'number' && product.stock > 0 ?
                        `<button class="btn btn-primary add-to-cart" data-id="${product.id}">
                          <i class="fas fa-cart-plus"></i> Añadir al Carrito
                        </button>` :
                        `<button class="btn btn-danger" disabled>
                          Agotado
                        </button>`
                      }
                    </div>
                  </div>
                `,
                )
                .join("")}
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Mis Compras Recientes</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Productos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${customerSales
                    .slice(0, 3)
                    .map(
                      (sale) => `
                      <tr>
                        <td>${new Date(sale.date).toLocaleString()}</td>
                        <td>${window.DB.formatCurrency(sale.total)}</td>
                        <td>${sale.items.length} productos</td>
                        <td>
                          <button class="btn btn-sm btn-primary view-purchase-details" data-id="${sale.id}">
                            <i class="fas fa-eye"></i> Ver Detalles
                          </button>
                        </td>
                      </tr>
                    `,
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div id="purchase-detail-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Detalles de la Compra</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body" id="purchase-detail-content">
              <!-- Purchase details will be loaded here -->
            </div>
          </div>
        </div>
      `
    },

    createCatalogPage: () => {
      const products = window.DB.getProducts()

      return `
        <h1>Catálogo de Licores Premium</h1>
        
        <div class="search-box">
          <input type="text" id="search-catalog" placeholder="Buscar producto...">
          <button id="search-catalog-btn"><i class="fas fa-search"></i></button>
        </div>
        
        <div class="product-grid">
          ${products
            .map(
              (product) => {
                // Obtener información de stock
                const stockInfo = UI.formatStockInfo(product);
                const isAvailable = stockInfo.count > 0;
                
                return `
                <div class="product-card">
                  <div class="product-image">
                    <img src="${product.image || "https://via.placeholder.com/150"}" alt="${product.name}">
                  </div>
                  <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${window.DB.formatCurrency(product.price)}</div>
                    <p class="product-description">${product.description.substring(0, 60)}...</p>
                    ${isAvailable ? 
                      `<button class="btn btn-primary add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Añadir al Carrito
                      </button>` :
                      `<button class="btn btn-danger" disabled>
                        Agotado
                      </button>`
                    }
                  </div>
                </div>
              `
            })
            .join("")}
        </div>
        
        <div id="product-detail-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3 id="product-detail-title">Detalles del Producto</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body" id="product-detail-content">
              <!-- Product details will be loaded here -->
            </div>
          </div>
        </div>
      `
    },

    createCartPage: () => {
      const cart = window.DB.getCart()
      let total = 0

      // Calculate total
      cart.forEach((item) => {
        const product = window.DB.getProduct(item.productId)
        if (product) {
          total += product.price * item.quantity
        }
      })

      return `
        <h1>Mi Carrito</h1>
        
        ${
          cart.length === 0
            ? `
            <div class="card">
              <div class="card-body">
                <p>Tu carrito está vacío.</p>
                <a href="#" class="btn btn-primary go-to-catalog">Ir al Catálogo</a>
              </div>
            </div>
          `
            : `
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Productos en el Carrito</h3>
              </div>
              <div class="card-body">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${cart
                        .map((item) => {
                          const product = window.DB.getProduct(item.productId)
                          const subtotal = product ? product.price * item.quantity : 0

                          return product
                            ? `
                              <tr>
                                <td>${product.name}</td>
                                <td>${window.DB.formatCurrency(product.price)}</td>
                                <td>
                                  <div class="quantity-control">
                                    <button class="btn btn-sm btn-danger decrease-quantity" data-id="${product.id}">-</button>
                                    <span>${item.quantity}</span>
                                    <button class="btn btn-sm btn-primary increase-quantity" data-id="${product.id}">+</button>
                                  </div>
                                </td>
                                <td>${window.DB.formatCurrency(subtotal)}</td>
                                <td>
                                  <button class="btn btn-sm btn-danger remove-from-cart" data-id="${product.id}">
                                    <i class="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            `
                            : ""
                        })
                        .join("")}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="text-right"><strong>Total:</strong></td>
                        <td>${window.DB.formatCurrency(total)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div class="cart-actions">
                  <button class="btn btn-danger clear-cart">Vaciar Carrito</button>
                  <button class="btn btn-primary checkout">Proceder al Pago</button>
                </div>
              </div>
            </div>
          `
        }
        
        <div id="checkout-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Finalizar Compra</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body">
              <form id="checkout-form">
                <div class="form-group">
                  <label for="checkout-address">Dirección de Envío</label>
                  <input type="text" id="checkout-address" required>
                </div>
                
                <div class="form-row">
                  <div class="form-col">
                    <label for="checkout-city">Ciudad</label>
                    <input type="text" id="checkout-city" value="Santa Marta" required>
                  </div>
                  
                  <div class="form-col">
                    <label for="checkout-zip">Código Postal</label>
                    <input type="text" id="checkout-zip" value="47001" required>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="checkout-payment">Método de Pago</label>
                  <select id="checkout-payment" required>
                    <option value="">Seleccionar método de pago</option>
                    <option value="credit_card">Tarjeta de Crédito</option>
                    <option value="debit_card">Tarjeta de Débito</option>
                    <option value="paypal">PayPal</option>
                    <option value="nequi">Nequi</option>
                    <option value="daviplata">Daviplata</option>
                  </select>
                </div>
                
                <div id="credit-card-details">
                  <div class="form-group">
                    <label for="card-number">Número de Tarjeta</label>
                    <input type="text" id="card-number" placeholder="XXXX XXXX XXXX XXXX">
                  </div>
                  
                  <div class="form-row">
                    <div class="form-col">
                      <label for="card-expiry">Fecha de Expiración</label>
                      <input type="text" id="card-expiry" placeholder="MM/AA">
                    </div>
                    
                    <div class="form-col">
                      <label for="card-cvv">CVV</label>
                      <input type="text" id="card-cvv" placeholder="XXX">
                    </div>
                  </div>
                </div>
                
                <div class="order-summary">
                  <h4>Resumen del Pedido</h4>
                  <p>Total: <strong>${window.DB.formatCurrency(total)}</strong></p>
                </div>
                
                <div class="form-actions">
                  <button type="submit" class="btn btn-success">Confirmar Pedido</button>
                  <button type="button" class="btn btn-danger" id="cancel-checkout">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      `
    },

    createMyPurchasesPage: () => {
      const user = window.Auth.getCurrentUser()
      const customerSales = window.DB.getCustomerSales(user.id)

      return `
        <h1>Mis Compras</h1>
        
        ${
          customerSales.length === 0
            ? `
            <div class="card">
              <div class="card-body">
                <p>No has realizado ninguna compra aún.</p>
                <a href="#" class="btn btn-primary go-to-catalog">Ir al Catálogo</a>
              </div>
            </div>
          `
            : `
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Historial de Compras</h3>
              </div>
              <div class="card-body">
                <div class="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Productos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${customerSales
                        .map(
                          (sale) => `
                          <tr>
                            <td>${new Date(sale.date).toLocaleString()}</td>
                            <td>${window.DB.formatCurrency(sale.total)}</td>
                            <td>${sale.items.length} productos</td>
                            <td><span class="badge badge-success">Completado</span></td>
                            <td>
                              <button class="btn btn-sm btn-primary view-purchase-details" data-id="${sale.id}">
                                <i class="fas fa-eye"></i> Ver Detalles
                              </button>
                            </td>
                          </tr>
                        `,
                        )
                        .join("")}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          `
        }
        
        <div id="purchase-detail-modal" class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Detalles de la Compra</h3>
              <span class="close">&times;</span>
            </div>
            <div class="modal-body" id="purchase-detail-content">
              <!-- Purchase details will be loaded here -->
            </div>
          </div>
        </div>
      `
    },

    createProfilePage: () => {
      const user = window.Auth.getCurrentUser()

      return `
        <h1>Mi Perfil</h1>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Información Personal</h3>
          </div>
          <div class="card-body">
            <form id="profile-form">
              <div class="form-group">
                <label for="profile-name">Nombre</label>
                <input type="text" id="profile-name" value="${user.name}" required>
              </div>
              
              <div class="form-group">
                <label for="profile-email">Correo Electrónico</label>
                <input type="email" id="profile-email" value="${user.email}" readonly>
              </div>
              
              <div class="form-group">
                <label for="profile-password">Nueva Contraseña</label>
                <input type="password" id="profile-password" placeholder="Dejar en blanco para mantener la actual">
              </div>
              
              <div class="form-group">
                <label for="profile-confirm">Confirmar Nueva Contraseña</label>
                <input type="password" id="profile-confirm" placeholder="Confirmar nueva contraseña">
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">Actualizar Perfil</button>
              </div>
            </form>
          </div>
        </div>
      `
    },
  }

  // Expose the module globally
  window.UI = uiModule

  return uiModule
})()