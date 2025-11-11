package com.mybanqueapp.bankapp.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mybanqueapp.bankapp.model.Users;
import com.mybanqueapp.bankapp.repository.UserRepository;

@Service
public class UserService {

	@Autowired
    private UserRepository userRepo ;

	public List<Users> allUsersService(){
		return userRepo.findAll();
	}
	
	
	public Users CreateUserService(Users user){
		return userRepo.save(user) ;
	}
	
	
	
	public Optional<Users> findUserByIdServ(Long id){
		return userRepo.findById(id);
	}
	
	
	public Users UpdateUserService(Users newUser){
		Optional<Users> user = userRepo.findById(newUser.getId());
		
		if(user.isPresent()) {
			Users ExistingUser = user.get();
			ExistingUser.setUsername(newUser.getUsername());
			ExistingUser.setEmail(newUser.getEmail());
			return userRepo.save(ExistingUser) ;
			
		}else {
            throw new RuntimeException("User not found with id " + newUser.getId());
		}
				
	}
	
	
	public Users findUserService(String email){
		return userRepo.findByEmail(email) ;
	}
	
	
	
}
