package com.example.demo.security.util;


    import io.jsonwebtoken.Jwts;
    import io.jsonwebtoken.SignatureAlgorithm;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Component;
    
    import java.util.Date;
    
    @Component
    public class JwtTokenUtil {
    
        @Value("${jwt.secret}")
        private String jwtSecret;
    
        @Value("${jwt.expiration.ms}")
        private long jwtExpirationMs;
    
        // Generate JWT token
        public String generateToken(String username) {
            return Jwts.builder()
                    .setSubject(username)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(SignatureAlgorithm.HS512, jwtSecret)
                    .compact();
        }
    }
        

