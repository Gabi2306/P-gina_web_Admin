// Import necessary modules (assuming they are in separate files)
import * as DB from "./db.js"
import * as UI from "./ui.js"
import * as Auth from "./auth.js"

// Client Module
const Client = (() => {
  // Private variables and functions
  function showProductDetails(productId) {
    const product = DB.getProduct(productId)

    if (product) {
      const supplier = DB.getSupplier(product.supplier)

      const detailsHtml = `
                <div class="product-detail">
                    <div class="product-detail-image">
                        <img src="${product.image || "https://via.placeholder.com/300"}" alt="${product.name}">
                    </div>
                    <div class="product-detail-info">
                        <h2>${product.name}</h2>
                        <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                        <p class="product-detail-description">${product.description}</p>
                        <p><strong>Categoría:</strong> ${product.category}</p>
                        <p><strong>Proveedor:</strong> ${supplier ? supplier.name : "No especificado"}</p>
                        <p><strong>Disponibilidad:</strong> ${product.stock > 0 ? `${product.stock} unidades` : "Agotado"}</p>
                        
                        ${
                          product.stock > 0
                            ? `
                            <div class="product-detail-actions">
                                <div class="quantity-control">
                                    <button class="btn btn-sm btn-danger decrease-detail-quantity">-</button>
                                    <input type="number" id="detail-quantity" value="1" min="1" max="${product.stock}">
                                    <button class="btn btn-sm btn-primary increase-detail-quantity">+</button>
                                </div>
                                <button class="btn btn-primary add-to-cart-detail" data-id="${product.id}">
                                    <i class="fas fa-cart-plus"></i> Añadir al Carrito
                                </button>
                            </div>
                        `
                            : `
                            <div class="product-detail-actions">
                                <button class="btn btn-danger" disabled>Agotado</button>
                            </div>
                        `
                        }
                    </div>
                </div>
            `

      document.getElementById("product-detail-content").innerHTML = detailsHtml
      UI.showModal("product-detail-modal")

      // Add event listeners for quantity controls
      const decreaseBtn = document.querySelector(".decrease-detail-quantity")
      const increaseBtn = document.querySelector(".increase-detail-quantity")
      const quantityInput = document.getElementById("detail-quantity")

      if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener("click", () => {
          const quantity = Number.parseInt(quantityInput.value)
          if (quantity > 1) {
            quantityInput.value = quantity - 1
          }
        })

        increaseBtn.addEventListener("click", () => {
          const quantity = Number.parseInt(quantityInput.value)
          if (quantity < product.stock) {
            quantityInput.value = quantity + 1
          }
        })

        // Add to cart button
        const addToCartBtn = document.querySelector(".add-to-cart-detail")
        addToCartBtn.addEventListener("click", () => {
          const quantity = Number.parseInt(quantityInput.value)

          if (quantity > 0 && quantity <= product.stock) {
            DB.addToCart({
              productId: product.id,
              quantity: quantity,
            })

            UI.closeModal("product-detail-modal")
            alert("Producto añadido al carrito.")
          }
        })
      }
    }
  }

  function showPurchaseDetails(saleId) {
    const sale = DB.getSale(saleId)

    if (sale) {
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
                <div class="purchase-details">
                    <div class="purchase-info">
                        <p><strong>ID de Compra:</strong> ${sale.id}</p>
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

      document.getElementById("purchase-detail-content").innerHTML = detailsHtml
      UI.showModal("purchase-detail-modal")
    }
  }

  // Public methods
  return {
    initCatalogPage: () => {
      // Add to cart buttons
      const addToCartBtns = document.querySelectorAll(".add-to-cart")
      addToCartBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const product = DB.getProduct(productId)

          if (product && product.stock > 0) {
            DB.addToCart({
              productId: product.id,
              quantity: 1,
            })

            alert("Producto añadido al carrito.")
          }
        })
      })

      // Search catalog
      const searchCatalogBtn = document.getElementById("search-catalog-btn")
      searchCatalogBtn.addEventListener("click", () => {
        const searchTerm = document.getElementById("search-catalog").value.toLowerCase()
        const products = DB.getProducts()
        const filteredProducts = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm),
        )

        const productGrid = document.querySelector(".product-grid")
        productGrid.innerHTML = ""

        filteredProducts.forEach((product) => {
          const productCard = document.createElement("div")
          productCard.className = "product-card"
          productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.image || "https://via.placeholder.com/150"}" alt="${product.name}">
                        </div>
                        <div class="product-details">
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-price">$${product.price.toFixed(2)}</div>
                            <p class="product-description">${product.description.substring(0, 60)}...</p>
                            <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                                <i class="fas fa-cart-plus"></i> Añadir al Carrito
                            </button>
                        </div>
                    `
          productGrid.appendChild(productCard)
        })

        // Reattach event listeners
        const addToCartBtns = document.querySelectorAll(".add-to-cart")
        addToCartBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            const productId = this.getAttribute("data-id")
            const product = DB.getProduct(productId)

            if (product && product.stock > 0) {
              DB.addToCart({
                productId: product.id,
                quantity: 1,
              })

              alert("Producto añadido al carrito.")
            }
          })
        })
      })
    },

    initCartPage: () => {
      // Go to catalog button
      const goToCatalogBtn = document.querySelector(".go-to-catalog")
      if (goToCatalogBtn) {
        goToCatalogBtn.addEventListener("click", (e) => {
          e.preventDefault()
          UI.loadPage("catalogo")
        })
      }

      // Increase quantity buttons
      const increaseQuantityBtns = document.querySelectorAll(".increase-quantity")
      increaseQuantityBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const product = DB.getProduct(productId)
          const cart = DB.getCart()
          const cartItem = cart.find((item) => item.productId === productId)

          if (product && cartItem && cartItem.quantity < product.stock) {
            DB.updateCartItem(productId, cartItem.quantity + 1)
            UI.loadPage("carrito")
          }
        })
      })

      // Decrease quantity buttons
      const decreaseQuantityBtns = document.querySelectorAll(".decrease-quantity")
      decreaseQuantityBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const cart = DB.getCart()
          const cartItem = cart.find((item) => item.productId === productId)

          if (cartItem && cartItem.quantity > 1) {
            DB.updateCartItem(productId, cartItem.quantity - 1)
            UI.loadPage("carrito")
          }
        })
      })

      // Remove from cart buttons
      const removeFromCartBtns = document.querySelectorAll(".remove-from-cart")
      removeFromCartBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const productId = this.getAttribute("data-id")
          const product = DB.getProduct(productId)

          if (confirm(`¿Está seguro de eliminar "${product.name}" del carrito?`)) {
            DB.removeFromCart(productId)
            UI.loadPage("carrito")
          }
        })
      })

      // Clear cart button
      const clearCartBtn = document.querySelector(".clear-cart")
      if (clearCartBtn) {
        clearCartBtn.addEventListener("click", () => {
          if (confirm("¿Está seguro de vaciar el carrito?")) {
            DB.clearCart()
            UI.loadPage("carrito")
          }
        })
      }

      // Checkout button
      const checkoutBtn = document.querySelector(".checkout")
      if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
          UI.showModal("checkout-modal")
        })
      }

      // Checkout form
      const checkoutForm = document.getElementById("checkout-form")
      if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
          e.preventDefault()

          const cart = DB.getCart()
          if (cart.length === 0) {
            alert("El carrito está vacío.")
            return
          }

          // Calculate total
          let total = 0
          const items = []

          cart.forEach((item) => {
            const product = DB.getProduct(item.productId)
            if (product) {
              total += product.price * item.quantity
              items.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
              })
            }
          })

          // Create sale
          const user = Auth.getCurrentUser()
          const sale = {
            customerId: user.id,
            items: items,
            total: total,
            shippingAddress: {
              address: document.getElementById("checkout-address").value,
              city: document.getElementById("checkout-city").value,
              zip: document.getElementById("checkout-zip").value,
            },
            paymentMethod: document.getElementById("checkout-payment").value,
          }

          DB.addSale(sale)
          DB.clearCart()

          UI.closeModal("checkout-modal")
          alert("¡Compra realizada con éxito!")
          UI.loadPage("mis-compras")
        })
      }

      // Cancel checkout button
      const cancelCheckoutBtn = document.getElementById("cancel-checkout")
      if (cancelCheckoutBtn) {
        cancelCheckoutBtn.addEventListener("click", () => {
          UI.closeModal("checkout-modal")
        })
      }

      // Payment method change
      const paymentMethodSelect = document.getElementById("checkout-payment")
      if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener("change", function () {
          const creditCardDetails = document.getElementById("credit-card-details")

          if (this.value === "credit_card" || this.value === "debit_card") {
            creditCardDetails.style.display = "block"
          } else {
            creditCardDetails.style.display = "none"
          }
        })
      }
    },

    initMyPurchasesPage: () => {
      // Go to catalog button
      const goToCatalogBtn = document.querySelector(".go-to-catalog")
      if (goToCatalogBtn) {
        goToCatalogBtn.addEventListener("click", (e) => {
          e.preventDefault()
          UI.loadPage("catalogo")
        })
      }

      // View purchase details buttons
      const viewPurchaseDetailsBtns = document.querySelectorAll(".view-purchase-details")
      viewPurchaseDetailsBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const saleId = this.getAttribute("data-id")
          showPurchaseDetails(saleId)
        })
      })
    },

    initProfilePage: () => {
      // Profile form
      const profileForm = document.getElementById("profile-form")
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault()

        const user = Auth.getCurrentUser()
        const name = document.getElementById("profile-name").value
        const password = document.getElementById("profile-password").value
        const confirmPassword = document.getElementById("profile-confirm").value

        // Validate inputs
        if (!name) {
          alert("Por favor, ingrese su nombre.")
          return
        }

        if (password && password !== confirmPassword) {
          alert("Las contraseñas no coinciden.")
          return
        }

        // Update user
        const users = JSON.parse(localStorage.getItem("users") || "[]")
        const userIndex = users.findIndex((u) => u.id === user.id)

        if (userIndex !== -1) {
          users[userIndex].name = name

          if (password) {
            users[userIndex].password = password
          }

          localStorage.setItem("users", JSON.stringify(users))
          localStorage.setItem("currentUser", JSON.stringify(users[userIndex]))

          // Update UI
          document.getElementById("user-name").textContent = name

          alert("Perfil actualizado con éxito.")

          // Clear password fields
          document.getElementById("profile-password").value = ""
          document.getElementById("profile-confirm").value = ""
        }
      })
    },
  }
})()
