import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation - ProActive',
      version: '1.0.0',
      description: 'Dokumentasi API ProActive',
      contact: {
        name: 'Wildan Habibi',
        email: 'habibiwildan872@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/authRoutes.js'] // Path ke file yang ada JSDoc comments
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export default swaggerSpecs;
