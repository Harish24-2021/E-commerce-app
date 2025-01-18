const db = require('../models/db');
const jwt = require('jsonwebtoken');


const updateCart=((req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    // Verify token
  
    jwt.verify(token, process.env.JWT_SECRETEKEY,(err,decoded)=>{
        if (err) {
            return res.status(403).send("Access denied. Invalid token.");
        }
        const user_id = decoded.username;
    
  
    const {product_id,quantity}=req.body;
    console.log(product_id, user_id,quantity)
    const query ='UPDATE cart  SET quantity = ? WHERE product_id = ? AND user_id = ?' 
    db.query(query,[quantity,product_id,user_id], (err,results)=>{
    
        if(err){
           return res.json({message:err.message});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found in cart' }
            
            );
            
          }

          console.log(results.affectedRows)
        return res.json('Cart updated successfully');
    })
})
    
})
module.exports = updateCart
