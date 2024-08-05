// controllers/productController.js
const pool = require("../config/dbConfig");

// Création d'une catégorie ------------------------------------------ POST
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO category (name) VALUES (?)", [
      name,
    ]);
    conn.release();
    res.status(201).json({
      id: result.insertId,
      name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération de toutes les catégories ----------------------------------- GET
exports.getCategory = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM category");
    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération du nom d'une catégorie par son ID ----------------------------------- GET
exports.getCategoryNameById = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT name FROM category WHERE id = ?", [
      id,
    ]);
    conn.release();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modification d'une catégorie ------------------------------------------ PUT
exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(
      "UPDATE category SET name = ? WHERE id = ?",
      [name, id]
    );

    conn.release();
    res.status(200).json({
      id,
      name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
