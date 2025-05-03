// Database Module
const DB = (() => {
  // Initialize database
  function initDatabase() {
    // Initialize products if not exists
    if (!localStorage.getItem("products")) {
      const defaultProducts = [
        {
          id: "prod1",
          name: "Whisky Johnnie Walker Black Label",
          description: "Whisky escocés premium, añejado por 12 años con notas de vainilla y especias.",
          price: 89.99,
          stock: 15,
          image: "https://via.placeholder.com/300x300.png?text=Johnnie+Walker",
          category: "Whisky",
          supplier: "supp1",
        },
        {
          id: "prod2",
          name: "Vodka Grey Goose",
          description: "Vodka premium francés, destilado cinco veces para máxima pureza.",
          price: 59.99,
          stock: 20,
          image: "https://via.placeholder.com/300x300.png?text=Grey+Goose",
          category: "Vodka",
          supplier: "supp2",
        },
        {
          id: "prod3",
          name: "Ron Zacapa 23 Años",
          description: "Ron guatemalteco premium añejado mediante sistema de solera hasta 23 años.",
          price: 79.99,
          stock: 8,
          image: "https://via.placeholder.com/300x300.png?text=Zacapa+23",
          category: "Ron",
          supplier: "supp3",
        },
        {
          id: "prod4",
          name: "Tequila Don Julio Reposado",
          description: "Tequila reposado premium, añejado 8 meses en barricas de roble blanco americano.",
          price: 69.99,
          stock: 12,
          image: "https://via.placeholder.com/300x300.png?text=Don+Julio",
          category: "Tequila",
          supplier: "supp4",
        },
        {
          id: "prod5",
          name: "Vino Malbec Catena Zapata",
          description: "Vino tinto argentino de alta gama con notas de frutas negras y especias.",
          price: 45.99,
          stock: 24,
          image: "https://via.placeholder.com/300x300.png?text=Catena+Zapata",
          category: "Vino",
          supplier: "supp5",
        },
        {
          id: "prod6",
          name: "Champagne Moët & Chandon",
          description: "Champagne francés brut imperial, elegante y con notas de frutas blancas.",
          price: 65.99,
          stock: 10,
          image: "https://via.placeholder.com/300x300.png?text=Moet+Chandon",
          category: "Champagne",
          supplier: "supp6",
        },
        {
          id: "prod7",
          name: "Gin Hendrick's",
          description: "Gin escocés premium con infusión de pepino y pétalos de rosa.",
          price: 49.99,
          stock: 18,
          image: "https://via.placeholder.com/300x300.png?text=Hendricks",
          category: "Gin",
          supplier: "supp7",
        },
        {
          id: "prod8",
          name: "Cerveza Delirium Tremens",
          description: "Cerveza belga de alta fermentación, triple rubia con 8.5% de alcohol.",
          price: 12.99,
          stock: 36,
          image: "https://via.placeholder.com/300x300.png?text=Delirium",
          category: "Cerveza",
          supplier: "supp8",
        },
        {
          id: "prod9",
          name: "Licor Baileys Original",
          description: "Crema de whisky irlandés con sabor a chocolate y vainilla.",
          price: 29.99,
          stock: 22,
          image: "https://via.placeholder.com/300x300.png?text=Baileys",
          category: "Licor",
          supplier: "supp9",
        },
        {
          id: "prod10",
          name: "Cognac Hennessy XO",
          description: "Cognac francés extra añejo con notas de frutas maduras y especias.",
          price: 199.99,
          stock: 5,
          image: "https://via.placeholder.com/300x300.png?text=Hennessy+XO",
          category: "Cognac",
          supplier: "supp10",
        },
        {
          id: "prod11",
          name: "Mezcal Unión",
          description: "Mezcal artesanal joven con notas ahumadas y herbales.",
          price: 54.99,
          stock: 14,
          image: "https://via.placeholder.com/300x300.png?text=Mezcal+Union",
          category: "Mezcal",
          supplier: "supp4",
        },
        {
          id: "prod12",
          name: "Whisky Macallan 12 años",
          description: "Whisky escocés single malt añejado en barricas de jerez.",
          price: 109.99,
          stock: 7,
          image: "https://via.placeholder.com/300x300.png?text=Macallan+12",
          category: "Whisky",
          supplier: "supp1",
        },
        {
          id: "prod13",
          name: "Tequila Patrón Silver",
          description: "Tequila premium de agave azul, suave y cristalino con notas cítricas.",
          price: 59.99,
          stock: 18,
          image: "https://via.placeholder.com/300x300.png?text=Patron+Silver",
          category: "Tequila",
          supplier: "supp4",
        },
        {
          id: "prod14",
          name: "Vino Rioja Reserva",
          description: "Vino tinto español con 36 meses de crianza, elegante y complejo.",
          price: 38.99,
          stock: 30,
          image: "https://via.placeholder.com/300x300.png?text=Rioja+Reserva",
          category: "Vino",
          supplier: "supp5",
        },
        {
          id: "prod15",
          name: "Whisky Jack Daniel's",
          description: "Whisky americano filtrado en carbón de arce con sabor suave y ahumado.",
          price: 45.99,
          stock: 25,
          image: "https://via.placeholder.com/300x300.png?text=Jack+Daniels",
          category: "Whisky",
          supplier: "supp1",
        },
        {
          id: "prod16",
          name: "Cerveza Chimay Azul",
          description: "Cerveza trapense belga, oscura y potente con 9% de alcohol.",
          price: 14.99,
          stock: 40,
          image: "https://via.placeholder.com/300x300.png?text=Chimay+Azul",
          category: "Cerveza",
          supplier: "supp8",
        },
        {
          id: "prod17",
          name: "Champagne Veuve Clicquot",
          description: "Champagne francés con notas de frutas y brioche, elegante y equilibrado.",
          price: 75.99,
          stock: 12,
          image: "https://via.placeholder.com/300x300.png?text=Veuve+Clicquot",
          category: "Champagne",
          supplier: "supp6",
        },
        {
          id: "prod18",
          name: "Ron Diplomatico Reserva Exclusiva",
          description: "Ron venezolano premium con notas de caramelo, vainilla y frutas secas.",
          price: 49.99,
          stock: 15,
          image: "https://via.placeholder.com/300x300.png?text=Diplomatico",
          category: "Ron",
          supplier: "supp3",
        },
        {
          id: "prod19",
          name: "Gin Bombay Sapphire",
          description: "Gin inglés con 10 botánicos y proceso de infusión al vapor.",
          price: 34.99,
          stock: 22,
          image: "https://via.placeholder.com/300x300.png?text=Bombay+Sapphire",
          category: "Gin",
          supplier: "supp7",
        },
        {
          id: "prod20",
          name: "Licor Grand Marnier",
          description: "Licor francés de coñac y esencia de naranja amarga.",
          price: 42.99,
          stock: 16,
          image: "https://via.placeholder.com/300x300.png?text=Grand+Marnier",
          category: "Licor",
          supplier: "supp9",
        },
      ]

      localStorage.setItem("products", JSON.stringify(defaultProducts))
    }

    // Initialize suppliers if not exists
    if (!localStorage.getItem("suppliers")) {
      const defaultSuppliers = [
        {
          id: "supp1",
          name: "Diageo Premium Spirits",
          contact: "contacto@diageo.com",
          phone: "123-456-7890",
          address: "Calle Principal 123, Edimburgo, Escocia",
        },
        {
          id: "supp2",
          name: "Bacardi Global Imports",
          contact: "ventas@bacardi.com",
          phone: "987-654-3210",
          address: "Avenida Central 456, Hamilton, Bermudas",
        },
        {
          id: "supp3",
          name: "Rum Enterprises Inc.",
          contact: "info@rumenterprises.com",
          phone: "555-123-4567",
          address: "Calle del Ron 789, Guatemala City, Guatemala",
        },
        {
          id: "supp4",
          name: "Tequila Premium Imports",
          contact: "ventas@tequilaimports.com",
          phone: "333-444-5555",
          address: "Avenida Jalisco 101, Guadalajara, México",
        },
        {
          id: "supp5",
          name: "Vinos del Mundo S.A.",
          contact: "info@vinosdelmundo.com",
          phone: "222-333-4444",
          address: "Ruta del Vino 202, Mendoza, Argentina",
        },
        {
          id: "supp6",
          name: "Champagne Luxury Imports",
          contact: "luxury@champagneimports.com",
          phone: "111-222-3333",
          address: "Avenue du Champagne 303, Reims, Francia",
        },
        {
          id: "supp7",
          name: "Premium Spirits Distribution",
          contact: "distribution@premiumspirits.com",
          phone: "777-888-9999",
          address: "Gin Lane 404, Edimburgo, Escocia",
        },
        {
          id: "supp8",
          name: "Belgian Beer Imports",
          contact: "sales@belgianbeers.com",
          phone: "666-777-8888",
          address: "Beer Street 505, Bruselas, Bélgica",
        },
        {
          id: "supp9",
          name: "Global Liqueurs Ltd.",
          contact: "info@globalliqueurs.com",
          phone: "444-555-6666",
          address: "Liqueur Road 606, Dublín, Irlanda",
        },
        {
          id: "supp10",
          name: "French Spirits Exporters",
          contact: "export@frenchspirits.com",
          phone: "999-000-1111",
          address: "Cognac Boulevard 707, Cognac, Francia",
        },
        {
          id: "supp11",
          name: "Destilados Mexicanos S.A.",
          contact: "ventas@destmex.com",
          phone: "555-666-7777",
          address: "Avenida Agave 808, Jalisco, México",
        },
        {
          id: "supp12",
          name: "Italian Wine Exporters",
          contact: "export@italianwines.com",
          phone: "123-789-4560",
          address: "Via del Vino 909, Toscana, Italia",
        },
      ]

      localStorage.setItem("suppliers", JSON.stringify(defaultSuppliers))
    }

    // Initialize users if not exists
    if (!localStorage.getItem("users")) {
      const defaultUsers = [
        {
          id: "user1",
          name: "Admin Principal",
          email: "admin@licoreria.com",
          password: "admin123",
          role: "admin",
          createdAt: new Date(2023, 0, 15).toISOString(),
        },
        {
          id: "user2",
          name: "Juan Pérez",
          email: "juan@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 1, 20).toISOString(),
        },
        {
          id: "user3",
          name: "María García",
          email: "maria@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 2, 10).toISOString(),
        },
        {
          id: "user4",
          name: "Carlos Rodríguez",
          email: "carlos@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 3, 5).toISOString(),
        },
        {
          id: "user5",
          name: "Ana Martínez",
          email: "ana@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 4, 15).toISOString(),
        },
        {
          id: "user6",
          name: "Roberto Sánchez",
          email: "roberto@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 5, 22).toISOString(),
        },
        {
          id: "user7",
          name: "Laura López",
          email: "laura@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 6, 8).toISOString(),
        },
        {
          id: "user8",
          name: "Vendedor Principal",
          email: "vendedor@licoreria.com",
          password: "admin123",
          role: "admin",
          createdAt: new Date(2023, 7, 1).toISOString(),
        },
        {
          id: "user9",
          name: "Pedro Gómez",
          email: "pedro@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 8, 12).toISOString(),
        },
        {
          id: "user10",
          name: "Sofía Ramírez",
          email: "sofia@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 9, 5).toISOString(),
        },
        {
          id: "user11",
          name: "Javier Torres",
          email: "javier@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 10, 18).toISOString(),
        },
        {
          id: "user12",
          name: "Lucía Fernández",
          email: "lucia@ejemplo.com",
          password: "cliente123",
          role: "cliente",
          createdAt: new Date(2023, 11, 7).toISOString(),
        },
      ]

      localStorage.setItem("users", JSON.stringify(defaultUsers))
    }

    // Initialize sales if not exists
    if (!localStorage.getItem("sales")) {
      const defaultSales = [
        {
          id: "sale1",
          customerId: "user2",
          items: [
            { productId: "prod1", quantity: 1, price: 89.99 },
            { productId: "prod5", quantity: 2, price: 45.99 },
          ],
          total: 181.97,
          date: new Date(2023, 7, 15).toISOString(),
          shippingAddress: {
            address: "Calle 123 #45-67",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale2",
          customerId: "user3",
          items: [
            { productId: "prod6", quantity: 1, price: 65.99 },
            { productId: "prod7", quantity: 1, price: 49.99 },
          ],
          total: 115.98,
          date: new Date(2023, 7, 20).toISOString(),
          shippingAddress: {
            address: "Avenida Principal 456",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale3",
          customerId: "user4",
          items: [{ productId: "prod10", quantity: 1, price: 199.99 }],
          total: 199.99,
          date: new Date(2023, 8, 5).toISOString(),
          shippingAddress: {
            address: "Plaza Central 789",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale4",
          customerId: "user5",
          items: [{ productId: "prod8", quantity: 6, price: 12.99 }],
          total: 77.94,
          date: new Date(2023, 8, 10).toISOString(),
          shippingAddress: {
            address: "Calle Secundaria 321",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "paypal",
        },
        {
          id: "sale5",
          customerId: "user6",
          items: [
            { productId: "prod2", quantity: 1, price: 59.99 },
            { productId: "prod9", quantity: 1, price: 29.99 },
          ],
          total: 89.98,
          date: new Date(2023, 8, 15).toISOString(),
          shippingAddress: {
            address: "Avenida Norte 654",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale6",
          customerId: "user7",
          items: [
            { productId: "prod3", quantity: 1, price: 79.99 },
            { productId: "prod4", quantity: 1, price: 69.99 },
            { productId: "prod11", quantity: 1, price: 54.99 },
          ],
          total: 204.97,
          date: new Date(2023, 8, 20).toISOString(),
          shippingAddress: {
            address: "Calle Sur 987",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale7",
          customerId: "user2",
          items: [{ productId: "prod12", quantity: 1, price: 109.99 }],
          total: 109.99,
          date: new Date(2023, 9, 1).toISOString(),
          shippingAddress: {
            address: "Calle 123 #45-67",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale8",
          customerId: "user3",
          items: [{ productId: "prod5", quantity: 3, price: 45.99 }],
          total: 137.97,
          date: new Date(2023, 9, 5).toISOString(),
          shippingAddress: {
            address: "Avenida Principal 456",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "paypal",
        },
        {
          id: "sale9",
          customerId: "user4",
          items: [{ productId: "prod8", quantity: 12, price: 12.99 }],
          total: 155.88,
          date: new Date(2023, 9, 10).toISOString(),
          shippingAddress: {
            address: "Plaza Central 789",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale10",
          customerId: "user5",
          items: [
            { productId: "prod6", quantity: 2, price: 65.99 },
            { productId: "prod9", quantity: 1, price: 29.99 },
          ],
          total: 161.97,
          date: new Date(2023, 9, 15).toISOString(),
          shippingAddress: {
            address: "Calle Secundaria 321",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale11",
          customerId: "user9",
          items: [
            { productId: "prod13", quantity: 1, price: 59.99 },
            { productId: "prod15", quantity: 1, price: 45.99 },
          ],
          total: 105.98,
          date: new Date(2023, 10, 3).toISOString(),
          shippingAddress: {
            address: "Avenida Este 123",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale12",
          customerId: "user10",
          items: [
            { productId: "prod17", quantity: 2, price: 75.99 },
            { productId: "prod20", quantity: 1, price: 42.99 },
          ],
          total: 194.97,
          date: new Date(2023, 10, 12).toISOString(),
          shippingAddress: {
            address: "Calle Oeste 456",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale13",
          customerId: "user11",
          items: [{ productId: "prod14", quantity: 3, price: 38.99 }],
          total: 116.97,
          date: new Date(2023, 11, 5).toISOString(),
          shippingAddress: {
            address: "Avenida Sur 789",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "paypal",
        },
        {
          id: "sale14",
          customerId: "user12",
          items: [
            { productId: "prod16", quantity: 4, price: 14.99 },
            { productId: "prod19", quantity: 1, price: 34.99 },
          ],
          total: 94.95,
          date: new Date(2023, 11, 18).toISOString(),
          shippingAddress: {
            address: "Plaza Norte 321",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale15",
          customerId: "user2",
          items: [{ productId: "prod18", quantity: 1, price: 49.99 }],
          total: 49.99,
          date: new Date(2023, 12, 1).toISOString(),
          shippingAddress: {
            address: "Calle 123 #45-67",
            city: "Ciudad Ejemplo",
            zip: "12345",
          },
          paymentMethod: "debit_card",
        },
      ]

      localStorage.setItem("sales", JSON.stringify(defaultSales))
    }

    // Initialize cart if not exists
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([]))
    }
  }

  // Generate unique ID
  function generateId() {
    return "id_" + Math.random().toString(36).substr(2, 9)
  }

  // Public methods
  const dbModule = {
    init: () => {
      console.log("DB module initialized")
      initDatabase()
    },

    // Products
    getProducts: () => JSON.parse(localStorage.getItem("products") || "[]"),

    getProduct: function (id) {
      const products = this.getProducts()
      return products.find((product) => product.id === id) || null
    },

    addProduct: function (product) {
      const products = this.getProducts()
      product.id = generateId()
      products.push(product)
      localStorage.setItem("products", JSON.stringify(products))
      return product
    },

    updateProduct: function (id, updatedProduct) {
      const products = this.getProducts()
      const index = products.findIndex((product) => product.id === id)

      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct }
        localStorage.setItem("products", JSON.stringify(products))
        return products[index]
      }

      return null
    },

    deleteProduct: function (id) {
      const products = this.getProducts()
      const filteredProducts = products.filter((product) => product.id !== id)
      localStorage.setItem("products", JSON.stringify(filteredProducts))
    },

    // Suppliers
    getSuppliers: () => JSON.parse(localStorage.getItem("suppliers") || "[]"),

    getSupplier: function (id) {
      const suppliers = this.getSuppliers()
      return suppliers.find((supplier) => supplier.id === id) || null
    },

    addSupplier: function (supplier) {
      const suppliers = this.getSuppliers()
      supplier.id = generateId()
      suppliers.push(supplier)
      localStorage.setItem("suppliers", JSON.stringify(suppliers))
      return supplier
    },

    updateSupplier: function (id, updatedSupplier) {
      const suppliers = this.getSuppliers()
      const index = suppliers.findIndex((supplier) => supplier.id === id)

      if (index !== -1) {
        suppliers[index] = { ...suppliers[index], ...updatedSupplier }
        localStorage.setItem("suppliers", JSON.stringify(suppliers))
        return suppliers[index]
      }

      return null
    },

    deleteSupplier: function (id) {
      const suppliers = this.getSuppliers()
      const filteredSuppliers = suppliers.filter((supplier) => supplier.id !== id)
      localStorage.setItem("suppliers", JSON.stringify(filteredSuppliers))
    },

    // Customers (Users with role 'cliente')
    getCustomers: () => {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      return users.filter((user) => user.role === "cliente")
    },

    getCustomer: (id) => {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      return users.find((user) => user.id === id) || null
    },

    // Sales
    getSales: () => JSON.parse(localStorage.getItem("sales") || "[]"),

    getSale: function (id) {
      const sales = this.getSales()
      return sales.find((sale) => sale.id === id) || null
    },

    getCustomerSales: function (customerId) {
      const sales = this.getSales()
      return sales.filter((sale) => sale.customerId === customerId)
    },

    addSale: function (sale) {
      const sales = this.getSales()
      sale.id = generateId()
      sale.date = new Date().toISOString()
      sales.push(sale)
      localStorage.setItem("sales", JSON.stringify(sales))

      // Update product stock
      sale.items.forEach((item) => {
        const product = this.getProduct(item.productId)
        if (product) {
          this.updateProduct(product.id, {
            stock: product.stock - item.quantity,
          })
        }
      })

      return sale
    },

    // Cart
    getCart: () => JSON.parse(localStorage.getItem("cart") || "[]"),

    addToCart: function (item) {
      const cart = this.getCart()
      const existingItem = cart.find((i) => i.productId === item.productId)

      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        cart.push(item)
      }

      localStorage.setItem("cart", JSON.stringify(cart))
      return cart
    },

    updateCartItem: function (productId, quantity) {
      const cart = this.getCart()
      const index = cart.findIndex((item) => item.productId === productId)

      if (index !== -1) {
        cart[index].quantity = quantity
        localStorage.setItem("cart", JSON.stringify(cart))
      }

      return cart
    },

    removeFromCart: function (productId) {
      const cart = this.getCart()
      const filteredCart = cart.filter((item) => item.productId !== productId)
      localStorage.setItem("cart", JSON.stringify(filteredCart))
      return filteredCart
    },

    clearCart: () => {
      localStorage.setItem("cart", JSON.stringify([]))
    },
  }

  // Expose the module globally
  window.DB = dbModule

  return dbModule
})()

  