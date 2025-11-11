package com.mybanqueapp.bankapp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mybanqueapp.bankapp.model.Account;
import com.mybanqueapp.bankapp.model.Transaction;
import com.mybanqueapp.bankapp.model.TransfertRequest;
import com.mybanqueapp.bankapp.model.Users;
import com.mybanqueapp.bankapp.repository.UserRepository;
import com.mybanqueapp.bankapp.service.AccountService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AccountController {

	@Autowired
	private AccountService accountservice ;
	
	@Autowired
	private UserRepository userRep ;
	
	
	@PostMapping("/account/deposit")
	public Account DepositController(@RequestBody Transaction transaction) {		
		return accountservice.deposit(transaction , transaction.getAmount(), transaction.getLibelle());
	}
	
	@PostMapping("/account/withdraw")
	public Account WithdrawController(@RequestBody Transaction transaction) {

		return accountservice.withdraw(transaction , transaction.getAmount() , transaction.getLibelle());
	}
	
	
	@PostMapping("/account/transfert/money")
	public Account WithdrawController(@RequestBody TransfertRequest trReq  ) {
		//System.out.println(trReq.getAccount_id());
		return accountservice.TransfertMoney(trReq.getAccount_id(),  trReq.getRib() , trReq.getLibelle() , trReq.getAmount());
	}
	
	
	
	/*
	@GetMapping("/account/{accountId}")
	public Account FindAccountController(@PathVariable Long accountId) {		
		return accountservice.showAccountById(accountId);
	}
This is very important !!!	

{
  "amount": 100,
  "account": {
    "accountId": 1
  }
}

	*/
	@GetMapping("/account/{userid}")
	public Account FindAccountUserController(@PathVariable Long userid) {		
		Users userdb = userRep.findById(userid).orElse(null);
		return accountservice.showAccountByUserId(userdb);
	}
	
	
	
}
