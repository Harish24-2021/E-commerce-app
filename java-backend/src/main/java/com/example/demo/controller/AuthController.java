
package com.example.demo.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.LoginRequest;
import com.example.demo.entity.Users;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.util.JwtTokenUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // Authenticate User and Generate JWT Token
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println(loginRequest);
        Users user = userRepository.findByUsername(loginRequest.getUsername()) .orElse(null);;
       System.out.print("Authenticating");
        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            String token = jwtTokenUtil.generateToken(user.getUsername());
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            System.out.print("test");
           
            return ResponseEntity.status(401).body("Invalid ra username or password");
        }
    }
}
