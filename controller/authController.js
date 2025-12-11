import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

//Registrasi user
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Cek apakah username / email sudah terdaftar di database atau belum
        const userCheck = await pool.query(
            'SELECT * FROM users WHERE email = $1 OR username = $2',
            [email, username]
        )

        if (userCheck.rows.length > 0) {
            return res.status(400).json({
                message: 'User dengan email atau username tersebut sudah terdaftar dan digunakan'
            });
        }

        // Hash password untuk user yang baru registrasi
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // menambahkan data user yang berhasil terdaftar ke dalam database
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        const newUser = result.rows[0];

        // Generate JWT Token
        const token = jwt.sign(
            {userId: newUser.id, username: newUser.username},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRE}
        );

        res.status(201).json({
            success: true,
            message: "Pendaftaran Berhasil",
            token: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                password: newUser.password,
            }
        });
    } catch (error) {
        console.error('Registrasi Gagal', error);
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message
        });
    }
};

// Login user

export const signin = async (req, res) => {
    try {
        const {email, password} = req.body;

        //mencari user apakah sudah terdaftar

        //mencari email
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah',
            });
        }

        const user = result.rows[0];

        //verifikasi password apakah benar
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: 'Email atau password salah'
            });
        }

        //Generate JWT Token
        const token = jwt.sign(
            { userId: user.id, username: user.username},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE}
        );

        res.status(200).json({
            success: true,
            message: "Login berhasil",
            token,
            user: {
                id: user.id,
                email: user.email,
                password: user.password
            }
        });

    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

export default { signin, signup };