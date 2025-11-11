package com.mybanqueapp.bankapp.service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.spec.SecretKeySpec;

@Service
public class JwtService {

    // Secret key used to sign the token (keep it private!)
	private static final String SECRET = "q8F7m!v3ZxP9@tL2#bN6rK1sD4wE0yH5"; // your secure string

	private static final Key SECRET_KEY = new SecretKeySpec(
	        SECRET.getBytes(StandardCharsets.UTF_8),
	        SignatureAlgorithm.HS256.getJcaName()
	);
    // Token validity: e.g., 24 hours
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // ✅ Generate Token for a user
    public String generateToken(Long userid , String email , String nom , String  prenom) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userid", userid);
        claims.put("email", email);
        claims.put("nom", nom);
        claims.put("prenom", prenom);
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)             // username or user id
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

 // ✅ Extract username (subject)
    public String extractUsername(String token) {
        try {       	
            return extractClaim(token, Claims::getSubject); // clean standard way
        } catch (Exception e) {
            return null; // token invalid → return null instead of crashing
        }
    }


    // ✅ Extract any claim (e.g., expiration)
    public <T> T extractClaim(String token, Function<io.jsonwebtoken.Claims, T> claimsResolver) {
        final io.jsonwebtoken.Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private io.jsonwebtoken.Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ Validate token
    public boolean isTokenValid(String token, String email) {
        final String extractedUsername = extractUsername(token);
        return (extractedUsername.equals(email) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        return extractClaim(token, claims -> claims.getExpiration()).before(new Date());
    }
}
