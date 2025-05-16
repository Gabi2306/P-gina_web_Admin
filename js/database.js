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
          price: 299000, // Precio en pesos colombianos
          stock: {
            bottles: 15,
            boxes: 2, // Cajas (cada caja contiene 6 botellas)
            unit: "750ml", // Tamaño de la unidad
            minStock: 5, // Stock mínimo antes de alertar
            location: "Estante A-1" // Ubicación física en el almacén
          },
          image: "https://www.arflina.com/ProductoImagen/gp1412/3831.jpg",
          category: "Whisky",
          supplier: "supp1",
        },
        {
          id: "prod2",
          name: "Vodka Grey Goose",
          description: "Vodka premium francés, destilado cinco veces para máxima pureza.",
          price: 220000,
          stock: {
            bottles: 20,
            boxes: 3,
            unit: "700ml",
            minStock: 8,
            location: "Estante B-2"
          },
          image: "https://www.drinkscompany.com.co/images/products/max709_1_GREY%20GOOSE%20700ML.jpg",
          category: "Vodka",
          supplier: "supp2",
        },
        {
          id: "prod3",
          name: "Ron Zacapa 23 Años",
          description: "Ron guatemalteco premium añejado mediante sistema de solera hasta 23 años.",
          price: 280000,
          stock: {
            bottles: 8,
            boxes: 1,
            unit: "750ml",
            minStock: 3,
            location: "Vitrina Premium"
          },
          image: "https://olimpica.vtexassets.com/arquivos/ids/612729/7401005008580.jpg?v=637626516198570000",
          category: "Ron",
          supplier: "supp3",
        },
        {
          id: "prod4",
          name: "Tequila Don Julio Reposado",
          description: "Tequila reposado premium, añejado 8 meses en barricas de roble blanco americano.",
          price: 250000,
          stock: {
            bottles: 12,
            boxes: 2,
            unit: "750ml",
            minStock: 4,
            location: "Estante C-3"
          },
          image: "https://media.diageocms.com/media/mlidcbdc/pe-_0_hi_hero_image_don_julio_reposado_zoom.jpg",
          category: "Tequila",
          supplier: "supp4",
        },
        {
          id: "prod5",
          name: "Vino Malbec Catena Zapata",
          description: "Vino tinto argentino de alta gama con notas de frutas negras y especias.",
          price: 170000,
          stock: {
            bottles: 24,
            boxes: 4,
            unit: "750ml",
            minStock: 6,
            location: "Cava de Vinos - A1"
          },
          image: "https://clickandfoods.com/cdn/shop/files/D_NQ_NP_2X_650135-MLA49054838804_022022-F_1024x1024.webp?v=1702771210",
          category: "Vino",
          supplier: "supp5",
        },
        {
          id: "prod6",
          name: "Champagne Moët & Chandon",
          description: "Champagne francés brut imperial, elegante y con notas de frutas blancas.",
          price: 240000,
          stock: {
            bottles: 10,
            boxes: 1,
            unit: "750ml",
            minStock: 3,
            location: "Cava de Espumantes"
          },
          image: "https://www.houseofmalt.co.uk/wp-content/uploads/2019/10/Moet-Chandon-Champagne-New-Design-2023.jpg",
          category: "Champagne",
          supplier: "supp6",
        },
        {
          id: "prod7",
          name: "Gin Hendrick's",
          description: "Gin escocés premium con infusión de pepino y pétalos de rosa.",
          price: 185000,
          stock: {
            bottles: 18,
            boxes: 3,
            unit: "750ml",
            minStock: 5,
            location: "Estante B-1"
          },
          image: "https://static.wixstatic.com/media/91fc24_138497d5d4264030bfe4e240a3221f0d~mv2.png/v1/fill/w_480,h_480,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/91fc24_138497d5d4264030bfe4e240a3221f0d~mv2.png",
          category: "Gin",
          supplier: "supp7",
        },
        {
          id: "prod8",
          name: "Cerveza Delirium Tremens",
          description: "Cerveza belga de alta fermentación, triple rubia con 8.5% de alcohol.",
          price: 45000,
          stock: {
            bottles: 36,
            boxes: 3,
            unit: "330ml",
            minStock: 12,
            location: "Nevera 2"
          },
          image: "https://api.lalicorera.com/storage/images/cerveza/delirium-tremens-gift-pack.webp?t=1732542860000",
          category: "Cerveza",
          supplier: "supp8",
        },
        {
          id: "prod9",
          name: "Licor Baileys Original",
          description: "Crema de whisky irlandés con sabor a chocolate y vainilla.",
          price: 110000,
          stock: {
            bottles: 22,
            boxes: 3,
            unit: "750ml",
            minStock: 7,
            location: "Estante D-2"
          },
          image: "https://media.diageocms.com/media/2qnpuknu/pe-_1_hi_hero_image_baileys_original-1.jpg",
          category: "Licor",
          supplier: "supp9",
        },
        {
          id: "prod10",
          name: "Cognac Hennessy XO",
          description: "Cognac francés extra añejo con notas de frutas maduras y especias.",
          price: 750000,
          stock: {
            bottles: 5,
            boxes: 0,
            unit: "700ml",
            minStock: 2,
            location: "Vitrina Premium"
          },
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQikqwXbN302OKoBmmdcepM3nTgB3e0jjQIkA&s",
          category: "Cognac",
          supplier: "supp10",
        },
        {
          id: "prod11",
          name: "Mezcal Unión",
          description: "Mezcal artesanal joven con notas ahumadas y herbales.",
          price: 200000,
          stock: {
            bottles: 14,
            boxes: 2,
            unit: "700ml",
            minStock: 5,
            location: "Estante C-2"
          },
          image: "https://exitocol.vtexassets.com/arquivos/ids/27109280/MEZCAL-JOVEN-1741925_a.jpg?v=638786017623300000",
          category: "Mezcal",
          supplier: "supp4",
        },
        {
          id: "prod12",
          name: "Whisky Macallan 12 años",
          description: "Whisky escocés single malt añejado en barricas de jerez.",
          price: 390000,
          stock: {
            bottles: 7,
            boxes: 1,
            unit: "700ml",
            minStock: 3,
            location: "Vitrina Premium"
          },
          image: "https://api.lalicorera.com/storage/productos/licores/84958098-macallan-12-double-cask.webp?t=1727655331000",
          category: "Whisky",
          supplier: "supp1",
        },
        {
          id: "prod13",
          name: "Tequila Patrón Silver",
          description: "Tequila premium de agave azul, suave y cristalino con notas cítricas.",
          price: 220000,
          stock: {
            bottles: 18,
            boxes: 3,
            unit: "750ml",
            minStock: 6,
            location: "Estante C-1"
          },
          image: "https://jr-product-images.s3.amazonaws.com/product-images/601202.jpg",
          category: "Tequila",
          supplier: "supp4",
        },
        {
          id: "prod14",
          name: "Vino Rioja Reserva",
          description: "Vino tinto español con 36 meses de crianza, elegante y complejo.",
          price: 140000,
          stock: {
            bottles: 30,
            boxes: 5,
            unit: "750ml",
            minStock: 10,
            location: "Cava de Vinos - B2"
          },
          image: "https://carulla.vteximg.com.br/arquivos/ids/19576319/Vino-Tinto-Rioja-Reserva-X-750ml-181322_a.jpg",
          category: "Vino",
          supplier: "supp5",
        },
        {
          id: "prod15",
          name: "Whisky Jack Daniel's",
          description: "Whisky americano filtrado en carbón de arce con sabor suave y ahumado.",
          price: 160000,
          stock: {
            bottles: 25,
            boxes: 4,
            unit: "750ml",
            minStock: 8,
            location: "Estante A-2"
          },
          image: "https://jumbocolombiaio.vtexassets.com/arquivos/ids/439662/82184090510_1.jpg?v=638043747975930000",
          category: "Whisky",
          supplier: "supp1",
        },
        {
          id: "prod16",
          name: "Cerveza Chimay Azul",
          description: "Cerveza trapense belga, oscura y potente con 9% de alcohol.",
          price: 55000,
          stock: {
            bottles: 40,
            boxes: 6,
            unit: "330ml",
            minStock: 15,
            location: "Nevera 1"
          },
          image: "https://drinkscompany.com.co/images/products/max671_1_CHIMAY%20AZUL%20330MLv.jpg",
          category: "Cerveza",
          supplier: "supp8",
        },
        {
          id: "prod17",
          name: "Champagne Veuve Clicquot",
          description: "Champagne francés con notas de frutas y brioche, elegante y equilibrado.",
          price: 270000,
          stock: {
            bottles: 12,
            boxes: 2,
            unit: "750ml",
            minStock: 4,
            location: "Cava de Espumantes"
          },
          image: "https://www.drinkscompany.com.co/images/products/max159_1_CHAMPAGNE%20VEUVE%20CLICQUOT%20BRUT%20750%20ML%201.jpg",
          category: "Champagne",
          supplier: "supp6",
        },
        {
          id: "prod18",
          name: "Ron Diplomatico Reserva Exclusiva",
          description: "Ron venezolano premium con notas de caramelo, vainilla y frutas secas.",
          price: 180000,
          stock: {
            bottles: 15,
            boxes: 2,
            unit: "700ml",
            minStock: 5,
            location: "Estante D-3"
          },
          image: "https://vipsboutique.com/wp-content/uploads/2019/12/Diplomatico-Reserva-Exclusiva-VIPS.png",
          category: "Ron",
          supplier: "supp3",
        },
        {
          id: "prod19",
          name: "Gin Bombay Sapphire",
          description: "Gin inglés con 10 botánicos y proceso de infusión al vapor.",
          price: 130000,
          stock: {
            bottles: 22,
            boxes: 3,
            unit: "750ml",
            minStock: 7,
            location: "Estante B-3"
          },
          image: "https://bevgo.com.co/wp-content/uploads/2020/12/8143.jpg",
          category: "Gin",
          supplier: "supp7",
        },
        {
          id: "prod20",
          name: "Licor Grand Marnier",
          description: "Licor francés de coñac y esencia de naranja amarga.",
          price: 160000,
          stock: {
            bottles: 16,
            boxes: 2,
            unit: "700ml",
            minStock: 5,
            location: "Estante D-1"
          },
          image: "https://http2.mlstatic.com/D_NQ_NP_919537-MLA52464175849_112022-O.webp",
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
            { productId: "prod1", quantity: 1, price: 299000 },
            { productId: "prod5", quantity: 2, price: 170000 },
          ],
          total: 639000,
          date: new Date(2023, 7, 15).toISOString(),
          shippingAddress: {
            address: "Calle 123 #45-67",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale2",
          customerId: "user3",
          items: [
            { productId: "prod6", quantity: 1, price: 240000 },
            { productId: "prod7", quantity: 1, price: 185000 },
          ],
          total: 425000,
          date: new Date(2023, 7, 20).toISOString(),
          shippingAddress: {
            address: "Avenida Principal 456",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale3",
          customerId: "user4",
          items: [{ productId: "prod10", quantity: 1, price: 750000 }],
          total: 750000,
          date: new Date(2023, 8, 5).toISOString(),
          shippingAddress: {
            address: "Plaza Central 789",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale4",
          customerId: "user5",
          items: [{ productId: "prod8", quantity: 6, price: 45000 }],
          total: 270000,
          date: new Date(2023, 8, 10).toISOString(),
          shippingAddress: {
            address: "Calle Secundaria 321",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "paypal",
        },
        {
          id: "sale5",
          customerId: "user6",
          items: [
            { productId: "prod2", quantity: 1, price: 220000 },
            { productId: "prod9", quantity: 1, price: 110000 },
          ],
          total: 330000,
          date: new Date(2023, 8, 15).toISOString(),
          shippingAddress: {
            address: "Avenida Norte 654",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale6",
          customerId: "user7",
          items: [
            { productId: "prod3", quantity: 1, price: 280000 },
            { productId: "prod4", quantity: 1, price: 250000 },
            { productId: "prod11", quantity: 1, price: 200000 },
          ],
          total: 730000,
          date: new Date(2023, 8, 20).toISOString(),
          shippingAddress: {
            address: "Calle Sur 987",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale7",
          customerId: "user2",
          items: [{ productId: "prod12", quantity: 1, price: 390000 }],
          total: 390000,
          date: new Date(2023, 9, 1).toISOString(),
          shippingAddress: {
            address: "Calle 123 #45-67",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale8",
          customerId: "user3",
          items: [{ productId: "prod5", quantity: 3, price: 170000 }],
          total: 510000,
          date: new Date(2023, 9, 5).toISOString(),
          shippingAddress: {
            address: "Avenida Principal 456",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "paypal",
        },
        {
          id: "sale9",
          customerId: "user4",
          items: [{ productId: "prod8", quantity: 12, price: 45000 }],
          total: 540000,
          date: new Date(2023, 9, 10).toISOString(),
          shippingAddress: {
            address: "Plaza Central 789",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale10",
          customerId: "user5",
          items: [
            { productId: "prod6", quantity: 2, price: 240000 },
            { productId: "prod9", quantity: 1, price: 110000 },
          ],
          total: 590000,
          date: new Date(2023, 9, 15).toISOString(),
          shippingAddress: {
            address: "Calle Secundaria 321",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale11",
          customerId: "user9",
          items: [
            { productId: "prod13", quantity: 1, price: 220000 },
            { productId: "prod15", quantity: 1, price: 160000 },
          ],
          total: 380000,
          date: new Date(2023, 10, 3).toISOString(),
          shippingAddress: {
            address: "Avenida Este 123",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale12",
          customerId: "user10",
          items: [
            { productId: "prod17", quantity: 2, price: 270000 },
            { productId: "prod20", quantity: 1, price: 160000 },
          ],
          total: 700000,
          date: new Date(2023, 10, 12).toISOString(),
          shippingAddress: {
            address: "Calle Oeste 456",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "debit_card",
        },
        {
          id: "sale13",
          customerId: "user11",
          items: [{ productId: "prod14", quantity: 3, price: 140000 }],
          total: 420000,
          date: new Date(2023, 11, 5).toISOString(),
          shippingAddress: {
            address: "Avenida Sur 789",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "paypal",
        },
        {
          id: "sale14",
          customerId: "user12",
          items: [
            { productId: "prod16", quantity: 4, price: 55000 },
            { productId: "prod19", quantity: 1, price: 130000 },
          ],
          total: 350000,
          date: new Date(2023, 11, 18).toISOString(),
          shippingAddress: {
            address: "Plaza Norte 321",
            city: "Santa Marta",
            zip: "47001",
          },
          paymentMethod: "credit_card",
        },
        {
          id: "sale15",
          customerId: "user2",
          items: [{ productId: "prod18", quantity: 1, price: 180000 }],
          total: 180000,
          date: new Date(2023, 12, 1).toISOString(),
          shippingAddress: {
            address: "Calle 123 #45-67",
            city: "Santa Marta",
            zip: "47001",
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

  // Función para formatear valores en pesos colombianos
  function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }

  // Public methods
  const dbModule = {
    init: () => {
      console.log("DB module initialized")
      initDatabase()
    },

    // Función de formato de moneda disponible para otras partes de la aplicación
    formatCurrency: formatCurrency,

    // Products
    getProducts: () => JSON.parse(localStorage.getItem("products") || "[]"),

    getProduct: function (id) {
      const products = this.getProducts()
      return products.find((product) => product.id === id) || null
    },

    addProduct: function (product) {
      const products = this.getProducts()
      product.id = generateId()
      
      // Asegurar que el stock esté en el formato correcto
      if (typeof product.stock === 'number') {
        product.stock = {
          bottles: product.stock,
          boxes: Math.floor(product.stock / 6),
          unit: '750ml',
          minStock: Math.floor(product.stock * 0.3),
          location: 'Almacén Principal'
        }
      }
      
      products.push(product)
      localStorage.setItem("products", JSON.stringify(products))
      return product
    },

    updateProduct: function (id, updatedProduct) {
      const products = this.getProducts()
      const index = products.findIndex((product) => product.id === id)

      if (index !== -1) {
        // Manejar la estructura del stock correctamente
        if (updatedProduct.stock && typeof updatedProduct.stock === 'number') {
          // Si se envía stock como número, convertirlo al formato de objeto
          if (typeof products[index].stock === 'object') {
            // Mantener la estructura pero actualizar las botellas
            updatedProduct.stock = {
              ...products[index].stock,
              bottles: updatedProduct.stock,
              boxes: Math.floor(updatedProduct.stock / 6)
            }
          } else {
            // Crear estructura nueva si no existía
            updatedProduct.stock = {
              bottles: updatedProduct.stock,
              boxes: Math.floor(updatedProduct.stock / 6),
              unit: '750ml',
              minStock: Math.floor(updatedProduct.stock * 0.3),
              location: 'Almacén Principal'
            }
          }
        }
        
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
          // Si el stock es un objeto, actualizamos las botellas
          if (typeof product.stock === 'object') {
            const updatedStock = { 
              ...product.stock,
              bottles: product.stock.bottles - item.quantity,
              boxes: Math.floor((product.stock.bottles - item.quantity) / 6)
            };
            
            this.updateProduct(product.id, {
              stock: updatedStock
            });
          } else {
            // Backward compatibility para productos con stock como número
            this.updateProduct(product.id, {
              stock: product.stock - item.quantity
            });
          }
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
    
    // Obtener productos con stock bajo
    getLowStockProducts: function() {
      const products = this.getProducts();
      return products.filter(product => {
        if (typeof product.stock === 'object') {
          return product.stock.bottles <= product.stock.minStock;
        } else {
          // Compatibilidad con versiones anteriores
          return product.stock < 10;
        }
      });
    },
    
    // Obtener inventario total valorizado
    getTotalInventoryValue: function() {
      const products = this.getProducts();
      return products.reduce((total, product) => {
        const stockCount = typeof product.stock === 'object' ? 
          product.stock.bottles : product.stock;
        return total + (product.price * stockCount);
      }, 0);
    },
    
    // Obtener ventas por período
    getSalesByPeriod: function(startDate, endDate) {
      const sales = this.getSales();
      return sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate >= startDate && saleDate <= endDate;
      });
    },
    
    // Obtener ventas por categoría
    getSalesByCategory: function() {
      const sales = this.getSales();
      const products = this.getProducts();
      const categories = {};
      
      // Inicializar categorías
      products.forEach(product => {
        if (!categories[product.category]) {
          categories[product.category] = {
            count: 0,
            total: 0
          };
        }
      });
      
      // Acumular ventas por categoría
      sales.forEach(sale => {
        sale.items.forEach(item => {
          const product = this.getProduct(item.productId);
          if (product && categories[product.category]) {
            categories[product.category].count += item.quantity;
            categories[product.category].total += item.quantity * item.price;
          }
        });
      });
      
      return categories;
    }
  }

  // Expose the module globally
  window.DB = dbModule

  return dbModule
})()