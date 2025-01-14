
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

/**
 * Generate a JWT token for a user.
 * @param {Object} user - The user object (must include a unique identifier like `id`).
 * @returns {string} - The signed JWT token.
 */

const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username and password are required." });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = results[0];
    console.log(user.password)

      

      if (password !== user.password) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username }, // Payload
        process.env.JWT_SECRETEKEY, // Secret key
        { expiresIn: "1h" } // Token expiry
      );

      res.json({
        message: "Login successful",
        token: token,
        user: { id: user.id, email: user.email, name: user.username }
      });
    
  });
};



module.exports = { loginUser };
