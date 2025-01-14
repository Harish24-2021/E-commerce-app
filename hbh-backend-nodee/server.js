const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { getProducts } = require('./controllers/productController');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const router = express.Router()

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes)
// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});










// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// //db connection
// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
// })

// db.connect((err)=>{
//     if(err) throw err;
//     console.log('MySQL connected...');
//  }
// )

// // Routes

// app.get('/getproducts', (req, res) => {
//     db.query('SELECT * FROM products', (err, results) => {
//         if(err) throw err;
//         res.json(results);
// })})

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.get('/test-db', (req, res) => {
//     db.query('SELECT 1 + 1 AS result', (err, results) => {
//         if (err) {
//             console.error('Error testing database connection:', err.message);
//             res.status(500).send('Database connection failed');
//             return;
//         }
//         res.send('Database connection successful');
//     });
// });