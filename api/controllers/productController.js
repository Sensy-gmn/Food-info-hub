// controllers/productController.js
const pool = require("../config/dbConfig");

// Création d'un produit ------------------------------------------ POST
exports.addProduct = async (req, res) => {
  const { barcode, name, description, category_ID, user_ID } = req.body;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO products (barcode, name, description, category_ID, user_ID) VALUES (?, ?, ?, ?, ?)",
      [barcode, name, description, category_ID, user_ID]
    );
    conn.release();
    res.status(201).json({
      id: result.insertId,
      barcode,
      name,
      description,
      category_ID,
      user_ID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération de tous les produits ----------------------------------- GET
exports.getProducts = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM products");
    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération d'un produit par son ID ----------------------------------- GET
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM products WHERE id = ?", [id]);
    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modification d'un produit ------------------------------------------ PUT
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { barcode, name, description, category_ID, user_ID } = req.body;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      "UPDATE products SET barcode = ?, name = ?, description = ?, category_ID = ?, user_ID = ? WHERE id = ?",
      [barcode, name, description, category_ID, user_ID, id]
    );
    conn.release();
    res.status(200).json({
      id,
      barcode,
      name,
      description,
      category_ID,
      user_ID,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
