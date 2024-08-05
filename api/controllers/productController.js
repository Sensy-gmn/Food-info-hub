// controllers/productController.js
const pool = require('../config/dbConfig');

exports.addProduct = async (req, res) => {
    const { barcode, name, description, userId } = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query(
            'INSERT INTO products (barcode, name, description, userId) VALUES (?, ?, ?, ?)',
            [barcode, name, description, userId]
        );
        conn.release();
        res.status(201).json({ id: result.insertId, barcode, name, description, userId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM products');
        conn.release();
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
