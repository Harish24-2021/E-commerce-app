package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {

    @Autowired
    private JdbcTemplate jdbcTemplate;  // Autowired JdbcTemplate

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getProducts(Authentication authentication) {
        String userId = authentication.getName(); // Get the username from the JWT token

        // Raw SQL query to get product details and cart quantity
        String sql = "SELECT p.id AS id, p.name AS name, p.price,p.image as image, p.quantity AS quantity, "
                   + "COALESCE(c.quantity, 0) AS cartQuantity "
                   + "FROM products p "
                   + "LEFT JOIN cart c ON p.id = c.product_id AND c.user_id = ?";

        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, userId);

        return ResponseEntity.ok(result);
    }
}
