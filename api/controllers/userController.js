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
  const { username, firstname, lastname, email, password, role } = req.body;

  if (!username || !firstname || !lastname || !email || !password || !role) {
    return res.status(400).json({
      error:
        "Username, firstname, lastname, email, password and role are required",
    });
  }

  let conn;
  try {
    conn = await pool.getConnection();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await conn.query(
      "INSERT INTO users (username, firstname, lastname, email, password, role) VALUES (?, ?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword, role]
    );
    const created_at = new Date();
    res.status(201).json(
      JSON.parse(
        serialize({
          id: result.insertId,
          username,
          firstname,
          lastname,
          email,
          role,
          created_at,
        })
      )
    );
  } catch (err) {
    res.status(500).json({ error: `Error creating user: ${err.message}` });
  } finally {
    if (conn) conn.release();
  }
};

// Récupération de tous les utilisateurs ------------------------------------------ GET
exports.getUsers = async (req, res) => {
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM users");
    conn.release();
    res.status(200).json(JSON.parse(serialize(rows)));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Modification d'un utilisateur ------------------------------------------ PUT
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, firstname, lastname, email, role } = req.body;

  if (!username || !firstname || !lastname || !email || !role) {
    return res.status(400).json({
      error: "Username, firstname, lastname, email and role are required",
    });
  }

  try {
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      { username, firstname, lastname, email, role },
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

