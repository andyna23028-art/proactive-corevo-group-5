import pkg from 'pg';
const { Pool } = pkg;

// Membuat koneksi ke database
const pool = new Pool({
    user: 'postgres',
    password: 'fullstackjs',
    host: 'localhost',
    database: 'proactive',
    port: 5432,
});

// Test koneksi database
pool.connect((err, client, release) => {
    if(err){
        return console.error('Koneksi Error, ada yang salah dalam konfigurasi', err.stack)
    }
    console.log('Database sudah terkoneksi');
    release();
});

export default pool;
