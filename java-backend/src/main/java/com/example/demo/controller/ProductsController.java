package com.example.demo.controller;

import com.example.demo.entity.Products;
import com.example.demo.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;




import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {


    @Autowired
    private ProductsRepository productRepository;

    // Create Product
    @PostMapping
    public ResponseEntity<Products> createProduct(@RequestBody Map<String, Object> request) {
        Products product = new Products(
            (String) request.get("name"),
            Double.parseDouble(request.get("price").toString()),
            Integer.parseInt(request.get("quantity").toString()),
            (String) request.get("image")
        );
        productRepository.save(product);
        return ResponseEntity.status(201).body(product);
    }

    // Fetch Amazon Products
    
    public ResponseEntity<List<Products>> fetchAmazonProducts(@RequestParam String categoryId, @RequestParam int page) {
        String apiUrl = "https://real-time-amazon-data.p.rapidapi.com/products-by-category";
        String apiKey = System.getenv("RAPID_API_KEY");

        // Query parameters
        String query = String.format(
            "?category_id=%s&page=%d&country=IN&sort_by=RELEVANCE&product_condition=ALL",
            categoryId, page
        );

        // Set up headers and make the API call
        RestTemplate restTemplate = new RestTemplate();
        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("x-rapidapi-host", "real-time-amazon-data.p.rapidapi.com");
        headers.set("x-rapidapi-key", apiKey);

        org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);
        ResponseEntity<Map> response = restTemplate.exchange(apiUrl + query, org.springframework.http.HttpMethod.GET, entity, Map.class);

        List<Map<String, Object>> productsData = (List<Map<String, Object>>) ((Map<String, Object>) response.getBody().get("data")).get("products");

        // Save products to the database
        for (Map<String, Object> productData : productsData) {
            Products product = new Products(
                (String) productData.get("product_title"),
                Double.parseDouble(productData.get("product_price").toString().replace("₹", "")),
                0,
                (String) productData.get("product_photo")
            );
            productRepository.save(product);
        }

        // Return all saved products
        return ResponseEntity.ok(productRepository.findAll());
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<Products>> getProducts() {
        List<Products> products =productRepository.findAll(); 
        return ResponseEntity.ok(products);
    }
    
}


