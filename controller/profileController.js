// routes/profileRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import { getUserById, updateUserProfile } from '../models/userModel.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// ========================================
// KONFIGURASI MULTER UNTUK UPLOAD FOTO
// ========================================

// 1. Setup tempat penyimpanan file
const storage = multer.diskStorage({
    // Tentukan folder tujuan
    destination: (req, file, cb) => {
        cb(null, 'uploads/profiles/');
    },
    
    // Tentukan nama file yang akan disimpan
    filename: (req, file, cb) => {
        // Format: userId-timestamp.jpg
        // Contoh: 123-1702371234567.jpg
        const fileName = `${req.userId}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

// 2. Filter untuk validasi tipe file (hanya JPG/JPEG)
const fileFilter = (req, file, cb) => {
    // Daftar tipe file yang dibolehkan
    const allowedTypes = ['image/jpeg', 'image/jpg'];
    
    // Cek apakah tipe file valid
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);  // File diterima
    } else {
        cb(new Error('Only JPG/JPEG files are allowed'), false);  // File ditolak
    }
};

// 3. Buat instance multer dengan konfigurasi
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024  // Maksimal 5MB
    }
});

// ========================================
// ROUTE: GET /api/profile
// Fungsi: Ambil data profil user yang sedang login
// ========================================
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        console.log('=== GET Profile dipanggil ===');
        console.log('User ID dari token JWT:', req.userId);
        
        // Ambil data user dari database berdasarkan ID
        const user = await getUserById(req.userId);
        
        // Jika user tidak ditemukan
        if (!user) {
            console.log('User tidak ditemukan di database');
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        console.log('Data user berhasil diambil:', user.username);
        
        // Kirim response dengan data profil
        res.json({
            success: true,
            data: {
                name: user.full_name || user.username,
                title: user.title || '',
                department: user.department || '',
                location: user.location || '',
                joinedDate: user.joined_date || '',
                manager: user.manager || '',
                dateJoined: user.joined_date || '',
                email: user.email,
                phone: user.phone || '',
                dateOfBirth: user.date_of_birth || '',
                employeeId: user.employee_id || '',
                bio: user.bio || '',
                profilePicture: user.profile_picture || ''
            }
        });
        
    } catch (error) {
        console.error('Error saat ambil data profile:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// ========================================
// ROUTE: PUT /api/profile
// Fungsi: Update profil user (dengan upload foto)
// ========================================
router.put('/profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
    try {
        console.log('=== PUT Profile dipanggil ===');
        console.log('User ID dari token JWT:', req.userId);
        console.log('Data dari form:', req.body);
        console.log('File yang diupload:', req.file);
        
        // Ambil data dari request body (data form)
        const profileData = {
            name: req.body.name,
            title: req.body.title,
            department: req.body.department,
            location: req.body.location,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            bio: req.body.bio,
            manager: req.body.manager
        };

        // Jika ada file foto yang diupload, tambahkan path-nya
        if (req.file) {
            profileData.profilePicture = `/uploads/profiles/${req.file.filename}`;
            console.log('Path foto profil:', profileData.profilePicture);
        }
        
        console.log('Data yang akan diupdate:', profileData);
        
        // Update data ke database
        const updatedUser = await updateUserProfile(req.userId, profileData);
        
        // Jika gagal update
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'Failed to update profile'
            });
        }
        
        console.log('Profile berhasil diupdate untuk user:', updatedUser.username);
        
        // Kirim response sukses dengan data terbaru
        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                name: updatedUser.full_name || updatedUser.username,
                title: updatedUser.title || '',
                department: updatedUser.department || '',
                location: updatedUser.location || '',
                joinedDate: updatedUser.joined_date || '',
                manager: updatedUser.manager || '',
                dateJoined: updatedUser.joined_date || '',
                email: updatedUser.email,
                phone: updatedUser.phone || '',
                dateOfBirth: updatedUser.date_of_birth || '',
                employeeId: updatedUser.employee_id || '',
                bio: updatedUser.bio || '',
                profilePicture: updatedUser.profile_picture || ''
            }
        });
        
    } catch (error) {
        console.error('Error saat update profile:', error);
        
        // Handle error khusus dari multer (validasi file)
        if (error.message === 'Only JPG/JPEG files are allowed') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        
        // Handle error umum lainnya
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

export default router;
