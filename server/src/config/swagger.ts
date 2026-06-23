import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sofra API",
      version: "1.0.0",
      description: "Bilingual food ordering platform API",
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ["customer", "admin"] },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            category: { type: "string" },
            image: { type: "string" },
            stock: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            userId: { type: "string" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  name: { type: "string" },
                  price: { type: "number" },
                  quantity: { type: "integer" },
                },
              },
            },
            total: { type: "number" },
            status: {
              type: "string",
              enum: ["pending", "preparing", "on_the_way", "delivered", "cancelled"],
            },
            address: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Payment: {
          type: "object",
          properties: {
            _id: { type: "string" },
            orderId: { type: "string" },
            method: { type: "string" },
            amount: { type: "number" },
            status: {
              type: "string",
              enum: ["pending", "completed", "failed"],
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        DashboardStats: {
          type: "object",
          properties: {
            totalOrders: { type: "integer" },
            completedOrders: { type: "integer" },
            revenue: { type: "number" },
            totalProducts: { type: "integer" },
            totalCustomers: { type: "integer" },
            recentOrders: {
              type: "array",
              items: { $ref: "#/components/schemas/Order" },
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: { type: "object" },
            message: { type: "string" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
          },
        },
      },
    },
    paths: {
      "/api/auth/signup": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string", example: "John Doe" },
                    email: { type: "string", format: "email", example: "john@example.com" },
                    password: { type: "string", minLength: 6, example: "password123" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Account created", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
            409: { description: "Email already in use", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", format: "email", example: "admin@sofra.com" },
                    password: { type: "string", example: "123Abc@d" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Logged in", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
            401: { description: "Invalid email or password", content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } } },
          },
        },
      },
      "/api/users/profile": {
        get: {
          tags: ["Users"],
          summary: "Get current user profile",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Profile data", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
            401: { description: "Authentication required" },
          },
        },
      },
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "List all products",
          responses: {
            200: { description: "List of products", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
          },
        },
        post: {
          tags: ["Products"],
          summary: "Create a product (admin)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  required: ["name", "price", "category"],
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    category: { type: "string" },
                    stock: { type: "integer" },
                    image: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Product created" },
            401: { description: "Authentication required" },
            403: { description: "Insufficient permissions" },
          },
        },
      },
      "/api/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get a single product",
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Product data" },
            404: { description: "Product not found" },
          },
        },
        put: {
          tags: ["Products"],
          summary: "Update a product (admin)",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    description: { type: "string" },
                    price: { type: "number" },
                    category: { type: "string" },
                    stock: { type: "integer" },
                    image: { type: "string", format: "binary" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Product updated" },
            401: { description: "Authentication required" },
            403: { description: "Insufficient permissions" },
            404: { description: "Product not found" },
          },
        },
        delete: {
          tags: ["Products"],
          summary: "Delete a product (admin)",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Product deleted" },
            401: { description: "Authentication required" },
            403: { description: "Insufficient permissions" },
            404: { description: "Product not found" },
          },
        },
      },
      "/api/orders": {
        get: {
          tags: ["Orders"],
          summary: "List orders (user sees own, admin sees all)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "List of orders" },
            401: { description: "Authentication required" },
          },
        },
        post: {
          tags: ["Orders"],
          summary: "Create an order (customer)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["items", "address"],
                  properties: {
                    items: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["productId", "name", "price", "quantity"],
                        properties: {
                          productId: { type: "string" },
                          name: { type: "string" },
                          price: { type: "number" },
                          quantity: { type: "integer" },
                        },
                      },
                    },
                    address: { type: "string", example: "123 Main St, City" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Order placed" },
            401: { description: "Authentication required" },
          },
        },
      },
      "/api/orders/{id}": {
        get: {
          tags: ["Orders"],
          summary: "Get order details",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          responses: {
            200: { description: "Order details" },
            401: { description: "Authentication required" },
            403: { description: "Not authorized" },
            404: { description: "Order not found" },
          },
        },
      },
      "/api/orders/{id}/status": {
        patch: {
          tags: ["Orders"],
          summary: "Update order status (admin)",
          security: [{ bearerAuth: [] }],
          parameters: [
            { name: "id", in: "path", required: true, schema: { type: "string" } },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: {
                      type: "string",
                      enum: ["pending", "preparing", "on_the_way", "delivered", "cancelled"],
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Status updated" },
            401: { description: "Authentication required" },
            403: { description: "Insufficient permissions" },
            404: { description: "Order not found" },
          },
        },
      },
      "/api/payments/create": {
        post: {
          tags: ["Payments"],
          summary: "Process a payment (customer)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["orderId", "method"],
                  properties: {
                    orderId: { type: "string" },
                    method: { type: "string", example: "credit_card" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Payment processed" },
            401: { description: "Authentication required" },
            404: { description: "Order not found" },
          },
        },
      },
      "/api/dashboard/stats": {
        get: {
          tags: ["Dashboard"],
          summary: "Get dashboard statistics (admin)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Dashboard stats" },
            401: { description: "Authentication required" },
            403: { description: "Insufficient permissions" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
