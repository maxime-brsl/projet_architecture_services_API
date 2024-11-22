package com.miage.RealDeal.Security;

import org.springframework.stereotype.Component;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;


@Component
public class JwtUtil {

    private final String secret = "secret";

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean validateToken(String token, String username) {
        String extractedUsername = Jwts.parser().setSigningKey(secret)
                .parseClaimsJws(token).getBody().getSubject();
        return username.equals(extractedUsername);
    }
}

