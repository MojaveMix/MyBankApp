package com.mybanqueapp.bankapp.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mybanqueapp.bankapp.model.Account;
import com.mybanqueapp.bankapp.model.Transaction;
import com.mybanqueapp.bankapp.repository.TransactionRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository tranRep ;
	
	public Transaction SaveTransaction(Transaction transaction) {
		return tranRep.save(transaction);
	}
	
	public List<Transaction> AllTransactionById(Account account) {	
		return tranRep.findTop5ByAccountOrderByDateDesc(account);
	}
}
