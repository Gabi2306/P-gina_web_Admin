// Admin Module
const Admin = (() => {
    // Private variables and functions
    // Assuming DB and UI are globally available or imported elsewhere.
    // If not, you'll need to import or define them here.
    // For example:
    // import * as DB from './db.js';
    // import * as UI from './ui.js';
    // import * as Auth from './auth.js';
  
    // Mock implementations for DB, UI, and Auth (for demonstration purposes)
    const DB = {
      getProduct: (id) => {
        const products = JSON.parse(localStorage.getItem("products") || "[]")
        return products.find((p) => p.id === id)
      },
      getSupplier: (id) => {
        const suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
        return suppliers.find((s) => s.id === id)
      },
      getSale: (id) => {
        const sales = JSON.parse(localStorage.getItem("sales") || "[]")
        return sales.find((s) => s.id === id)
      },
      getCustomer: (id) => {
        const customers = JSON.parse(localStorage.getItem("customers") || "[]")
        return customers.find((c) => c.id === id)
      },
      getCustomerSales: (customerId) => {
        const sales = JSON.parse(localStorage.getItem("sales") || "[]")
        return sales.filter((s) => s.customerId === customerId)
      },
      getProducts: () => {
        return JSON.parse(localStorage.getItem("products") || "[]")
      },
      getSuppliers: () => {
        return JSON.parse(localStorage.getItem("suppliers") || "[]")
      },
      deleteProduct: (id) => {
        let products = JSON.parse(localStorage.getItem("products") || "[]")
        products = products.filter((p) => p.id !== id)
        localStorage.setItem("products", JSON.stringify(products))
      },
      deleteSupplier: (id) => {
        let suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
        suppliers = suppliers.filter((s) => s.id !== id)
        localStorage.setItem("suppliers", JSON.stringify(suppliers))
      },
      updateProduct: (id, product) => {
        const products = JSON.parse(localStorage.getItem("products") || "[]")
        const index = products.findIndex((p) => p.id === id)
        if (index !== -1) {
          products[index] = { ...products[index], ...product, id: id }
          localStorage.setItem("products", JSON.stringify(products))
        }
      },
      updateSupplier: (id, supplier) => {
        const suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
        const index = suppliers.findIndex((s) => s.id === id)
        if (index !== -1) {
          suppliers[index] = { ...suppliers[index], ...supplier, id: id }
          localStorage.setItem("suppliers", JSON.stringify(suppliers))
        }
      },
      addProduct: (product) => {
        const products = JSON.parse(localStorage.getItem("products") || "[]")
        product.id = Math.random().toString(36).substring(2, 15)
        products.push(product)
        localStorage.setItem("products", JSON.stringify(products))
      },
      addSupplier: (supplier) => {
        const suppliers = JSON.parse(localStorage.getItem("suppliers") || "[]")
        supplier.id = Math.random().toString(36).substring(2, 15)
        suppliers.push(supplier)
        localStorage.setItem("suppliers", JSON.stringify(suppliers))
      },
    }
  
    const UI = {
      showModal: (modalId) => {
        const modal = document.getElementById(modalId)
        if (modal) {
          modal.style.display = "block"
        }
      },
      closeModal: (modalId) => {
        const modal = document.getElementById(modalId)
        if (modal) {
          modal.style.display = "none"
        }
      },
      loadPage: (page) => {
        // Use the real UI.loadPage function if available
        if (window.UI && typeof window.UI.loadPage === "function") {
          window.UI.loadPage(page)
        } else {
          console.log("Loading page:", page)
        }
      },
    }
  
    const Auth = {
      register: (name, email, password, role) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]")
  
        // Check if user already exists
        if (users.find((user) => user.email === email)) {
          return { success: false, message: "El correo electrónico ya está registrado." }
        }
  
        const newUser = {
          id: Math.random().toString(36).substring(2, 15),
          name: name,
          email: email,
          password: password,
          role: role,
          createdAt: new Date().toISOString(),
        }
  
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
  
        return { success: true, message: "Usuario registrado exitosamente." }
      },
    }
  
    function showProductDetails(productId) {
      const product = DB.getProduct(productId)
  
      if (product) {
        document.getElementById("product-id").value = product.id
        document.getElementById("product-name").value = product.name
        document.getElementById("product-description").value = product.description
        document.getElementById("product-price").value = product.price
        document.getElementById("product-stock").value = product.stock
        document.getElementById("product-category").value = product.category
        document.getElementById("product-supplier").value = product.supplier
        document.getElementById("product-image").value = product.image || ""
  
        document.getElementById("product-modal-title").textContent = "Editar Producto"
        UI.showModal("product-modal")
      }
    }
  
    function showSupplierDetails(supplierId) {
      const supplier = DB.getSupplier(supplierId)
  
      if (supplier) {
        document.getElementById("supplier-id").value = supplier.id
        document.getElementById("supplier-name").value = supplier.name
        document.getElementById("supplier-contact").value = supplier.contact
        document.getElementById("supplier-phone").value = supplier.phone
        document.getElementById("supplier-address").value = supplier.address
  
        document.getElementById("supplier-modal-title").textContent = "Editar Proveedor"
        UI.showModal("supplier-modal")
      }
    }
  
    function showSaleDetails(saleId) {
      const sale = DB.getSale(saleId)
  
      if (sale) {
        const customer = DB.getCustomer(sale.customerId)
        let itemsHtml = ""
  
        sale.items.forEach((item) => {
          const product = DB.getProduct(item.productId)
          if (product) {
            itemsHtml += `
              <tr>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${(product.price * item.quantity).toFixed(2)}</td>
              </tr>
            `
          }
        })
  
        const detailsHtml = `
          <div class="sale-details">
            <div class="sale-info">
              <p><strong>ID de Venta:</strong> ${sale.id}</p>
              <p><strong>Cliente:</strong> ${customer ? customer.name : "Cliente Desconocido"}</p>
              <p><strong>Fecha:</strong> ${new Date(sale.date).toLocaleString()}</p>
              <p><strong>Total:</strong> $${sale.total.toFixed(2)}</p>
            </div>
            
            <h4>Productos</h4>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right"><strong>Total:</strong></td>
                    <td>$${sale.total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        `
  
        document.getElementById("sale-details-content").innerHTML = detailsHtml
        UI.showModal("sale-details-modal")
      }
    }
  
    function showCustomerSales(customerId) {
      const customer = DB.getCustomer(customerId)
      const customerSales = DB.getCustomerSales(customerId)
  
      if (customer) {
        let salesHtml = ""
  
        if (customerSales.length === 0) {
          salesHtml = "<p>Este cliente no ha realizado compras aún.</p>"
        } else {
          salesHtml = `
            <div class="customer-info">
              <p><strong>Cliente:</strong> ${customer.name}</p>
              <p><strong>Correo:</strong> ${customer.email}</p>
              <p><strong>Total de Compras:</strong> ${customerSales.length}</p>
            </div>
            
            <h4>Historial de Compras</h4>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${customerSales
                    .map(
                      (sale) => `
                    <tr>
                      <td>${sale.id}</td>
                      <td>${new Date(sale.date).toLocaleString()}</td>
                      <td>$${sale.total.toFixed(2)}</td>
                      <td>
                        <button class="btn btn-sm btn-primary view-customer-sale" data-id="${sale.id}">
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
          `
        }
  
        document.getElementById("customer-sales-content").innerHTML = salesHtml
        UI.showModal("customer-sales-modal")
  
        // Add event listeners for viewing sale details
        const viewSaleButtons = document.querySelectorAll(".view-customer-sale")
        viewSaleButtons.forEach((button) => {
          button.addEventListener("click", function () {
            const saleId = this.getAttribute("data-id")
            UI.closeModal("customer-sales-modal")
            showSaleDetails(saleId)
          })
        })
      }
    }
  
    // Public methods
    return {
      initProductsPage: () => {
        // Add Product button
        const addProductBtn = document.getElementById("add-product-btn")
        if (addProductBtn) {
          addProductBtn.addEventListener("click", () => {
            // Clear form
            document.getElementById("product-form").reset()
            document.getElementById("product-id").value = ""
            document.getElementById("product-modal-title").textContent = "Nuevo Producto"
            UI.showModal("product-modal")
          })
        }
  
        // Edit Product buttons
        const editProductBtns = document.querySelectorAll(".edit-product")
        editProductBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const productId = this.getAttribute("data-id")
            showProductDetails(productId)
          })
        })
  
        // Delete Product buttons
        const deleteProductBtns = document.querySelectorAll(".delete-product")
        deleteProductBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const productId = this.getAttribute("data-id")
            const product = DB.getProduct(productId)
  
            if (confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
              DB.deleteProduct(productId)
              UI.loadPage("productos")
            }
          })
        })
  
        // Product Form Submit
        const productForm = document.getElementById("product-form")
        if (productForm) {
          productForm.addEventListener("submit", (e) => {
            e.preventDefault()
  
            const productId = document.getElementById("product-id").value
            const product = {
              name: document.getElementById("product-name").value,
              description: document.getElementById("product-description").value,
              price: Number.parseFloat(document.getElementById("product-price").value),
              stock: Number.parseInt(document.getElementById("product-stock").value),
              category: document.getElementById("product-category").value,
              supplier: document.getElementById("product-supplier").value,
              image: document.getElementById("product-image").value,
            }
  
            if (productId) {
              // Update existing product
              DB.updateProduct(productId, product)
            } else {
              // Add new product
              DB.addProduct(product)
            }
  
            UI.closeModal("product-modal")
            UI.loadPage("productos")
          })
        }
  
        // Cancel Product button
        const cancelProductBtn = document.getElementById("cancel-product")
        if (cancelProductBtn) {
          cancelProductBtn.addEventListener("click", () => {
            UI.closeModal("product-modal")
          })
        }
  
        // Search Products
        const searchProductsBtn = document.getElementById("search-products-btn")
        if (searchProductsBtn) {
          searchProductsBtn.addEventListener("click", () => {
            const searchTerm = document.getElementById("search-products").value.toLowerCase()
            const products = DB.getProducts()
            const filteredProducts = products.filter(
              (product) =>
                product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
            )
  
            const tbody = document.querySelector("#products-table tbody")
            tbody.innerHTML = ""
  
            filteredProducts.forEach((product) => {
              const supplier = DB.getSupplier(product.supplier)
              const row = document.createElement("tr")
              row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${supplier ? supplier.name : "Proveedor Desconocido"}</td>
                <td>
                  <button class="btn btn-sm btn-primary edit-product" data-id="${product.id}">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn-sm btn-danger delete-product" data-id="${product.id}">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              `
              tbody.appendChild(row)
            })
  
            // Reattach event listeners
            const editProductBtns = document.querySelectorAll(".edit-product")
            editProductBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const productId = this.getAttribute("data-id")
                showProductDetails(productId)
              })
            })
  
            const deleteProductBtns = document.querySelectorAll(".delete-product")
            deleteProductBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const productId = this.getAttribute("data-id")
                const product = DB.getProduct(productId)
  
                if (confirm(`¿Está seguro de eliminar el producto "${product.name}"?`)) {
                  DB.deleteProduct(productId)
                  UI.loadPage("productos")
                }
              })
            })
          })
        }
      },
  
      initSuppliersPage: () => {
        // Add Supplier button
        const addSupplierBtn = document.getElementById("add-supplier-btn")
        if (addSupplierBtn) {
          addSupplierBtn.addEventListener("click", () => {
            // Clear form
            document.getElementById("supplier-form").reset()
            document.getElementById("supplier-id").value = ""
            document.getElementById("supplier-modal-title").textContent = "Nuevo Proveedor"
            UI.showModal("supplier-modal")
          })
        }
  
        // Edit Supplier buttons
        const editSupplierBtns = document.querySelectorAll(".edit-supplier")
        editSupplierBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const supplierId = this.getAttribute("data-id")
            showSupplierDetails(supplierId)
          })
        })
  
        // Delete Supplier buttons
        const deleteSupplierBtns = document.querySelectorAll(".delete-supplier")
        deleteSupplierBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const supplierId = this.getAttribute("data-id")
            const supplier = DB.getSupplier(supplierId)
  
            if (confirm(`¿Está seguro de eliminar el proveedor "${supplier.name}"?`)) {
              DB.deleteSupplier(supplierId)
              UI.loadPage("proveedores")
            }
          })
        })
  
        // Supplier Form Submit
        const supplierForm = document.getElementById("supplier-form")
        if (supplierForm) {
          supplierForm.addEventListener("submit", (e) => {
            e.preventDefault()
  
            const supplierId = document.getElementById("supplier-id").value
            const supplier = {
              name: document.getElementById("supplier-name").value,
              contact: document.getElementById("supplier-contact").value,
              phone: document.getElementById("supplier-phone").value,
              address: document.getElementById("supplier-address").value,
            }
  
            if (supplierId) {
              // Update existing supplier
              DB.updateSupplier(supplierId, supplier)
            } else {
              // Add new supplier
              DB.addSupplier(supplier)
            }
  
            UI.closeModal("supplier-modal")
            UI.loadPage("proveedores")
          })
        }
  
        // Cancel Supplier button
        const cancelSupplierBtn = document.getElementById("cancel-supplier")
        if (cancelSupplierBtn) {
          cancelSupplierBtn.addEventListener("click", () => {
            UI.closeModal("supplier-modal")
          })
        }
  
        // Search Suppliers
        const searchSuppliersBtn = document.getElementById("search-suppliers-btn")
        if (searchSuppliersBtn) {
          searchSuppliersBtn.addEventListener("click", () => {
            const searchTerm = document.getElementById("search-suppliers").value.toLowerCase()
            const suppliers = DB.getSuppliers()
            const filteredSuppliers = suppliers.filter(
              (supplier) =>
                supplier.name.toLowerCase().includes(searchTerm) ||
                supplier.contact.toLowerCase().includes(searchTerm) ||
                supplier.phone.toLowerCase().includes(searchTerm) ||
                supplier.address.toLowerCase().includes(searchTerm),
            )
  
            const tbody = document.querySelector("#suppliers-table tbody")
            tbody.innerHTML = ""
  
            filteredSuppliers.forEach((supplier) => {
              const row = document.createElement("tr")
              row.innerHTML = `
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
              `
              tbody.appendChild(row)
            })
  
            // Reattach event listeners
            const editSupplierBtns = document.querySelectorAll(".edit-supplier")
            editSupplierBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const supplierId = this.getAttribute("data-id")
                showSupplierDetails(supplierId)
              })
            })
  
            const deleteSupplierBtns = document.querySelectorAll(".delete-supplier")
            deleteSupplierBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const supplierId = this.getAttribute("data-id")
                const supplier = DB.getSupplier(supplierId)
  
                if (confirm(`¿Está seguro de eliminar el proveedor "${supplier.name}"?`)) {
                  DB.deleteSupplier(supplierId)
                  UI.loadPage("proveedores")
                }
              })
            })
          })
        }
      },
  
      initCustomersPage: () => {
        // View Customer Sales buttons
        const viewCustomerSalesBtns = document.querySelectorAll(".view-customer-sales")
        viewCustomerSalesBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const customerId = this.getAttribute("data-id")
            showCustomerSales(customerId)
          })
        })
  
        // Search Customers
        const searchCustomersBtn = document.getElementById("search-customers-btn")
        if (searchCustomersBtn) {
          searchCustomersBtn.addEventListener("click", () => {
            const searchTerm = document.getElementById("search-customers").value.toLowerCase()
            const customers = DB.getCustomers()
            const filteredCustomers = customers.filter(
              (customer) =>
                customer.name.toLowerCase().includes(searchTerm) || customer.email.toLowerCase().includes(searchTerm),
            )
  
            const tbody = document.querySelector("#customers-table tbody")
            tbody.innerHTML = ""
  
            filteredCustomers.forEach((customer) => {
              const customerSales = DB.getCustomerSales(customer.id)
              const totalSpent = customerSales.reduce((total, sale) => total + sale.total, 0)
  
              const row = document.createElement("tr")
              row.innerHTML = `
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${new Date(customer.createdAt).toLocaleDateString()}</td>
                <td>
                  ${customerSales.length} compras
                  <br>
                  <small>Total: $${totalSpent.toFixed(2)}</small>
                </td>
                <td>
                  <button class="btn btn-sm btn-primary view-customer-sales" data-id="${customer.id}">
                    <i class="fas fa-eye"></i> Ver Compras
                  </button>
                </td>
              `
              tbody.appendChild(row)
            })
  
            // Reattach event listeners
            const viewCustomerSalesBtns = document.querySelectorAll(".view-customer-sales")
            viewCustomerSalesBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const customerId = this.getAttribute("data-id")
                showCustomerSales(customerId)
              })
            })
          })
        }
      },
  
      initSalesPage: () => {
        // View Sale buttons
        const viewSaleBtns = document.querySelectorAll(".view-sale")
        viewSaleBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const saleId = this.getAttribute("data-id")
            showSaleDetails(saleId)
          })
        })
  
        // Search Sales
        const searchSalesBtn = document.getElementById("search-sales-btn")
        if (searchSalesBtn) {
          searchSalesBtn.addEventListener("click", () => {
            const searchTerm = document.getElementById("search-sales").value.toLowerCase()
            const sales = DB.getSales()
            const filteredSales = sales.filter((sale) => {
              const customer = DB.getCustomer(sale.customerId)
              return customer && customer.name.toLowerCase().includes(searchTerm)
            })
  
            const tbody = document.querySelector("#sales-table tbody")
            tbody.innerHTML = ""
  
            filteredSales.forEach((sale) => {
              const customer = DB.getCustomer(sale.customerId)
              const row = document.createElement("tr")
              row.innerHTML = `
                <tr>
                  <td>${sale.id}</td>
                  <td>${customer ? customer.name : "Cliente Desconocido"}</td>
                  <td>${new Date(sale.date).toLocaleString()}</td>
                  <td>$${sale.total.toFixed(2)}</td>
                  <td>
                    <button class="btn btn-sm btn-primary view-sale" data-id="${sale.id}">
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              `
              tbody.appendChild(row)
            })
  
            // Reattach event listeners
            const viewSaleBtns = document.querySelectorAll(".view-sale")
            viewSaleBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const saleId = this.getAttribute("data-id")
                showSaleDetails(saleId)
              })
            })
          })
        }
      },
  
      initUserRegistrationPage: () => {
        // Register form submission
        const registerForm = document.getElementById("admin-register-form")
        if (registerForm) {
          registerForm.addEventListener("submit", (e) => {
            e.preventDefault()
  
            const name = document.getElementById("admin-register-name").value
            const email = document.getElementById("admin-register-email").value
            const password = document.getElementById("admin-register-password").value
            const confirmPassword = document.getElementById("admin-register-confirm").value
            const role = document.getElementById("admin-register-role").value
            const errorElement = document.getElementById("admin-register-error")
  
            // Validate passwords match
            if (password !== confirmPassword) {
              errorElement.textContent = "Las contraseñas no coinciden."
              return
            }
  
            // Register user
            const result = Auth.register(name, email, password, role)
  
            if (result.success) {
              // Clear form
              registerForm.reset()
              errorElement.textContent = ""
  
              // Show success message and reload page to update user list
              alert(result.message)
              UI.loadPage("registro-usuarios")
            } else {
              errorElement.textContent = result.message
            }
          })
        }
  
        // Delete user buttons
        const deleteUserBtns = document.querySelectorAll(".delete-user")
        deleteUserBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const userId = this.getAttribute("data-id")
            const users = JSON.parse(localStorage.getItem("users") || "[]")
            const user = users.find((u) => u.id === userId)
  
            if (user && user.role === "admin" && users.filter((u) => u.role === "admin").length <= 1) {
              alert("No se puede eliminar el último administrador del sistema.")
              return
            }
  
            if (confirm(`¿Está seguro de eliminar al usuario "${user.name}"?`)) {
              // Remove user
              const filteredUsers = users.filter((u) => u.id !== userId)
              localStorage.setItem("users", JSON.stringify(filteredUsers))
  
              // Reload page
              UI.loadPage("registro-usuarios")
            }
          })
        })
  
        // Search users
        const searchUsersBtn = document.getElementById("search-users-btn")
        if (searchUsersBtn) {
          searchUsersBtn.addEventListener("click", () => {
            const searchTerm = document.getElementById("search-users").value.toLowerCase()
            const users = JSON.parse(localStorage.getItem("users") || "[]")
            const filteredUsers = users.filter(
              (user) => user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm),
            )
  
            const tbody = document.querySelector("#users-table tbody")
            tbody.innerHTML = ""
  
            filteredUsers.forEach((user) => {
              const row = document.createElement("tr")
              row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role === "admin" ? "Administrador" : "Cliente"}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-sm btn-danger delete-user" data-id="${user.id}">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              `
              tbody.appendChild(row)
            })
  
            // Reattach event listeners
            const deleteUserBtns = document.querySelectorAll(".delete-user")
            deleteUserBtns.forEach((btn) => {
              btn.addEventListener("click", function () {
                const userId = this.getAttribute("data-id")
                const users = JSON.parse(localStorage.getItem("users") || "[]")
                const user = users.find((u) => u.id === userId)
  
                if (user && user.role === "admin" && users.filter((u) => u.role === "admin").length <= 1) {
                  alert("No se puede eliminar el último administrador del sistema.")
                  return
                }
  
                if (confirm(`¿Está seguro de eliminar al usuario "${user.name}"?`)) {
                  // Remove user
                  const filteredUsers = users.filter((u) => u.id !== userId)
                  localStorage.setItem("users", JSON.stringify(filteredUsers))
  
                  // Reload page
                  UI.loadPage("registro-usuarios")
                }
              })
            })
          })
        }
      },
    }
  })()
  