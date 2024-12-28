package com.example.demo.controller;

import java.lang.reflect.Array;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;

@RestController
@RequestMapping("/api/cartData")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping
    public ResponseEntity<String> updateCartData(@RequestBody List<Map<String,Object>> request,Authentication authentication) {
        String userId = authentication.getName(); // Typically, the username field stores userId
        System.out.println(request);
        //iterate over request array and in each object in it get the productId and quantity
       for(Map<String,Object> item : request) {
        if (!item.containsKey("productId") || !item.containsKey("quantity")) {
            return ResponseEntity.badRequest().body("Invalid request: Missing fields");
        }
        String productId = (String) item.get("productId");
        int quantity = (int) item.get("quantity");
        //update the cart data in the database
        int updatedRows = cartRepository.updateCartQuantityByProductId(userId, productId, quantity);

        if(updatedRows == 0) {
            Cart cart = new Cart(userId, productId, quantity);
            cartRepository.save(cart);
        }
       }
            
         return ResponseEntity.ok("Cart data updated successfully");

    }

}
