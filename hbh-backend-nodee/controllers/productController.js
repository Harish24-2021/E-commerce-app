const db = require("../models/db");
const jwt = require("jsonwebtoken");

// Get all users
const getProducts = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  // Verify token

  jwt.verify(token, process.env.JWT_SECRETEKEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Access denied. Invalid token.");
    }
    const userId = decoded.sub;

    const query =
      `SELECT * FROM products LEFT JOIN cart ON products.id = cart.product_id AND cart.user_id = ?`;
    db.query(query,[userId], (err, results) => {
      if (err) {
        console.error("Error fetching users:", err.message);
        res.status(500).send("Error fetching users");
        return;
      }
      res.json(results);
    });
  });
};

module.exports = { getProducts };
