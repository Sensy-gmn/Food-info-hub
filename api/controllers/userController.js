// controllers/userController.js
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");

// Fonction de sérialisation pour convertir BigInt en chaîne de caractères
function serialize(obj) {
  return JSON.stringify(obj, (_, value) =>
    typeof value === "bigint" ? value.toString() : value
  );
}

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
    res
      .status(201)
      .json(
        serialize({ id: result.insertId, username, email, role, created_at })
      );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, username, email, role, created_at, updated_at FROM users"
    );
    conn.release();
    res.status(200).json(serialize(rows));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
