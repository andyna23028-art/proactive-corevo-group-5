// index.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import authRouter from './routes/authRoutes.js';
import profileRouter from './routes/profileRoutes.js';

// ✅ TAMBAH IMPORT UNTUK HANDLE FILE PATH
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ========================================
// SETUP __dirname UNTUK ES MODULES
// ========================================
// Catatan: Di CommonJS bisa langsung pakai __dirname
// Tapi di ES Modules harus dibuat manual seperti ini

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Contoh hasil:
// __dirname = C:\Users\ACER\Documents\project-stupen\proactive-corevo-group-5

const app = express();
const port = process.env.PORT || 4000;

// ========================================
// AUTO-CREATE FOLDER UPLOADS/PROFILES
// ========================================
// Fungsi: Buat folder otomatis saat server start
// Jadi tidak perlu manual buat folder lagi

const uploadDir = path.join(__dirname, 'uploads', 'profiles');
// uploadDir = C:\Users\ACER\...\uploads\profiles

// Cek apakah folder sudah ada
if (!fs.existsSync(uploadDir)) {
    // Kalau belum ada, buat foldernya
    // { recursive: true } = buat parent folder juga
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Folder uploads/profiles berhasil dibuat');
} else {
    console.log('✅ Folder uploads/profiles sudah ada');
}

// ========================================
// MIDDLEWARE
// ========================================

// ✅ CORS harus SEBELUM helmet
// CORS = Cross-Origin Resource Sharing
// Biar frontend (port 3000) bisa akses backend (port 4000)
app.use(cors());

// ✅ HELMET dengan konfigurasi khusus untuk serve images
// Helmet = Security middleware
// crossOriginResourcePolicy = Izinkan load gambar dari different origin
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Parse JSON dari request body
app.use(express.json());

// Morgan = Logger untuk development (log setiap request)
app.use(morgan('dev'));

// ========================================
// SERVE STATIC FILES (PENTING!)
// ========================================

// ✅ CARA LAMA (tidak reliable):
// app.use('/uploads', express.static('uploads'));

// ✅ CARA BARU (lebih reliable, pakai absolute path):
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Penjelasan:
// Setiap request ke /uploads/profiles/foto.jpg
// Express akan cari file di folder: C:\Users\ACER\...\uploads\profiles\foto.jpg

// ✅ MIDDLEWARE LOG untuk debugging
// Setiap request ke /uploads akan di-log
app.use('/uploads', (req, res, next) => {
    console.log('📁 Request static file:', req.url);
    next();
});

// ========================================
// SWAGGER DOKUMENTASI ROUTE
// ========================================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }'
}));

// ========================================
// API ROUTES
// ========================================
app.use('/api/auth', authRouter);
app.use('/api', profileRouter);

// ========================================
// ROOT ENDPOINT
// ========================================
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to API Server ProActive',
        documentation: '/api-docs'
    });
});

// ========================================
// START SERVER
// ========================================
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
    console.log(`📁 Static files served from: ${path.join(__dirname, 'uploads')}`);
});
