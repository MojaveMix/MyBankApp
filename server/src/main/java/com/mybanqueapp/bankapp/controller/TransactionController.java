package com.mybanqueapp.bankapp.controller;




import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mybanqueapp.bankapp.model.Account;
import com.mybanqueapp.bankapp.model.Transaction;
import com.mybanqueapp.bankapp.repository.AccountRepository;
import com.mybanqueapp.bankapp.service.TransactionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TransactionController {

	
	@Autowired
	private TransactionService tranServ;
	
	@Autowired
	private AccountRepository accountRepo ;
	
	
	
	@GetMapping("/transactions/{accountId}")
	public List<Transaction> ShowAllTransaction(@PathVariable Long accountId){
		Account account = accountRepo.findById(accountId).orElse(null);	
		return tranServ.AllTransactionById(account);
	}
	
	
	
}
