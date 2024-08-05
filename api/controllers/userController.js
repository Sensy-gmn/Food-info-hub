// controllers/userController.js
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");

// Fonction de sérialisation pour convertir BigInt en chaîne de caractères
function serialize(obj) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

// Création d'un utilisateur ------------------------------------------ POST
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res
      .status(400)
      .json({ error: "Username, email, password and role are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );
    conn.release();
    const created_at = new Date();
    res
      .status(201)
      .json(
        JSON.parse(
          serialize({ id: result.insertId, username, email, role, created_at })
        )
      );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupération de tous les utilisateurs ------------------------------------------ GET
exports.getUsers = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, username, email, role, created_at, updated_at FROM users"
    );
    conn.release();
    res.status(200).json(JSON.parse(serialize(rows)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modification d'un utilisateur ------------------------------------------ PUT
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  if (!username || !email || !role) {
    return res
      .status(400)
      .json({ error: "Username, email and role are required" });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      { username, email, role },
      id,
    ]);
    conn.release();
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Suppression d'un utilisateur ------------------------------------------ DELETE
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM users WHERE id = ?", [id]);
    conn.release();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
