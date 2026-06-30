package com.lalitha.loanflow.controller;

import com.lalitha.loanflow.dto.LoginRequest;
import com.lalitha.loanflow.dto.LoginResponse;
import com.lalitha.loanflow.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {

        if ("admin".equals(request.getUsername()) &&
                "admin123".equals(request.getPassword())) {

            String token = jwtUtil.generateToken("admin", "ADMIN");
            return ResponseEntity.ok(new LoginResponse(token, "ADMIN"));
        }

        if ("officer".equals(request.getUsername()) &&
                "officer123".equals(request.getPassword())) {

            String token = jwtUtil.generateToken("officer", "LOAN_OFFICER");
            return ResponseEntity.ok(new LoginResponse(token, "LOAN_OFFICER"));
        }

        return ResponseEntity.status(401).build();
    }
}