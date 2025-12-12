// models/userModel.js
import pool from '../config/db.js';

// ========================================
// FUNGSI: Ambil data user berdasarkan ID
// ========================================
export const getUserById = async (userId) => {
    try {
        console.log('Mencari user dengan ID:', userId);
        
        // Query untuk ambil data user
        const query = `
            SELECT 
                id, 
                username, 
                email, 
                full_name, 
                title, 
                department, 
                location, 
                joined_date, 
                manager, 
                phone, 
                date_of_birth, 
                employee_id, 
                bio, 
                profile_picture
            FROM users 
            WHERE id = $1
        `;
        
        // Jalankan query
        const result = await pool.query(query, [userId]);
        
        console.log('User ditemukan:', result.rows.length > 0 ? 'Ya' : 'Tidak');
        
        // Return data user pertama (atau undefined jika tidak ada)
        return result.rows[0];
        
    } catch (error) {
        console.error('Error di getUserById:', error);
        throw error;
    }
};

// ========================================
// FUNGSI: Update profil user
// ========================================
export const updateUserProfile = async (userId, profileData) => {
    try {
        console.log('Update profil untuk user ID:', userId);
        console.log('Data yang akan diupdate:', profileData);
        
        // ✅ BUILD QUERY DINAMIS
        // Hanya update field yang ada datanya
        const fields = [];  // Array untuk menyimpan field yang akan diupdate
        const values = [];  // Array untuk menyimpan value
        let paramIndex = 1; // Index untuk parameter ($1, $2, dst)
        
        // Cek setiap field, jika ada data maka tambahkan ke query
        if (profileData.name !== undefined) {
            fields.push(`full_name = $${paramIndex++}`);
            values.push(profileData.name);
        }
        
        if (profileData.title !== undefined) {
            fields.push(`title = $${paramIndex++}`);
            values.push(profileData.title);
        }
        
        if (profileData.department !== undefined) {
            fields.push(`department = $${paramIndex++}`);
            values.push(profileData.department);
        }
        
        if (profileData.location !== undefined) {
            fields.push(`location = $${paramIndex++}`);
            values.push(profileData.location);
        }
        
        if (profileData.phone !== undefined) {
            fields.push(`phone = $${paramIndex++}`);
            values.push(profileData.phone);
        }
        
        if (profileData.dateOfBirth !== undefined) {
            fields.push(`date_of_birth = $${paramIndex++}`);
            values.push(profileData.dateOfBirth);
        }
        
        if (profileData.bio !== undefined) {
            fields.push(`bio = $${paramIndex++}`);
            values.push(profileData.bio);
        }
        
        if (profileData.manager !== undefined) {
            fields.push(`manager = $${paramIndex++}`);
            values.push(profileData.manager);
        }
        
        // ✅ HANDLE PROFILE PICTURE
        if (profileData.profilePicture !== undefined) {
            fields.push(`profile_picture = $${paramIndex++}`);
            values.push(profileData.profilePicture);
        }
        
        // Tambahkan userId di akhir
        values.push(userId);
        
        // Buat query UPDATE
        const query = `
            UPDATE users 
            SET ${fields.join(', ')}
            WHERE id = $${paramIndex}
            RETURNING 
                id, 
                username, 
                email, 
                full_name, 
                title, 
                department, 
                location, 
                joined_date, 
                manager, 
                phone, 
                date_of_birth, 
                employee_id, 
                bio, 
                profile_picture
        `;
        
        console.log('Query SQL:', query);
        console.log('Values:', values);
        
        // Jalankan query update
        const result = await pool.query(query, values);
        
        console.log('User berhasil diupdate');
        
        // Return data user yang sudah diupdate
        return result.rows[0];
        
    } catch (error) {
        console.error('Error di updateUserProfile:', error);
        throw error;
    }
};
