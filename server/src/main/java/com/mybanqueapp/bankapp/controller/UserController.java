package com.mybanqueapp.bankapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mybanqueapp.bankapp.model.Users;
import com.mybanqueapp.bankapp.service.JwtService;
import com.mybanqueapp.bankapp.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {
 
	@Autowired
	private UserService serv ;
	

	
	@Autowired
	private  JwtService jwtservice ;
	
	
	
	@GetMapping("/users/all")
	public List<Users> getAllUsers(){
		return serv.allUsersService();
	}
	
	
	@GetMapping("/user/{username}")
	public Users getAllUsers(@PathVariable String username){
		return serv.findUserService(username);
	}
	
	
	@GetMapping("/user/id/{id}")
	public Users findUserByIdContr(@PathVariable Long id){
		 return serv.findUserByIdServ(id)
		            .orElseThrow(() -> new RuntimeException("User not found"));
		 }
	
	
	
	
	
	
	@PostMapping("/create/user")
	public Users CreateUserController(@RequestBody Users user){
		System.out.println(user);
		return serv.CreateUserService(user);
	}
	
	
	@PutMapping("/update/user")
	public Users UpdateUserController(@RequestBody Users user){
		return serv.UpdateUserService(user);
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody Users user) {
	    // Find user by email
	    Users userdb = serv.findUserService(user.getEmail());

	    if (userdb == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body("User not found");
	    }

	    // Compare password (normally you should hash it)
	    if (userdb.getPassword().equals(user.getPassword())) {
	    	String token = jwtservice.generateToken(
	    			userdb.getId(),
	    	        userdb.getEmail(),
	    	        userdb.getNom(),
	    	        userdb.getPrenom()
	    	);
	        return ResponseEntity.ok(Map.of("token", token));
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body("Invalid credentials");
	    }
	}

	
}
