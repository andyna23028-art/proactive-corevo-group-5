import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
// import route from './routes/authRoutes.js';
import router from './routes/authRoutes.js';


const app = express()
const port = process.env.PORT || 4000

app.use(helmet())
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

// Swagger dokumentasi route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
}));

// routes
app.use('/api/auth', router)

// route endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to API Server ProActive',
        documentation: '/api-docs'
    });
})

// start server 
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});