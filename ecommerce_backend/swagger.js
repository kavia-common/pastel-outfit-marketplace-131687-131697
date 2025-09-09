const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pastel Outfit Ecommerce API',
      version: '1.0.0',
      description:
        'REST API for products, authentication, shopping cart, orders, and Stripe checkout.'
    },
    tags: [
      { name: 'Health', description: 'Service health' },
      { name: 'Auth', description: 'Authentication & user accounts' },
      { name: 'Users', description: 'User profile & history' },
      { name: 'Products', description: 'Product catalog management' },
      { name: 'Cart', description: 'Shopping cart operations' },
      { name: 'Orders', description: 'Order processing & management' },
      { name: 'Checkout', description: 'Stripe checkout and payments' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        ApiError: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            message: { type: 'string', example: 'Something went wrong' }
          }
        }
      }
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Local dev' }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
