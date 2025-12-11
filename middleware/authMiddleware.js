import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

exports.verifyToken = async (req, res, next) => {
    try {
        //get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak, Token tidak ditemukan.'
            })
        }

        //verifikasi token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //ambil data user dari database
        const result = await pool.query(
            'SELECT id, email, username from users WHERE id = $1',
            [decoded.userId]
        );

        if (result.rows.length === 0){
            return res.status(401).json({
                success: false,
                message: "User tidak ditemukan"
            })
        }

        //mengambil user yang request
        req.user = result.rows[0];
        next();
        
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                success: false,
                message: "Token tidak valid"
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({
                success: false,
                message: "Token sudah kadaluarsa"
            });
        }
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

