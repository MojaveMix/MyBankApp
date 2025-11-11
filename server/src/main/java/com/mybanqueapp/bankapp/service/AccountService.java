package com.mybanqueapp.bankapp.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mybanqueapp.bankapp.model.Account;
import com.mybanqueapp.bankapp.model.Transaction;
import com.mybanqueapp.bankapp.model.Users;
import com.mybanqueapp.bankapp.repository.AccountRepository;
import com.mybanqueapp.bankapp.repository.TransactionRepository;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountrepo;
	
	@Autowired
	private TransactionRepository transactionRep;
	

	
	public Account deposit(Transaction transaction,double amount , String libelle) {	
		Optional<Account> accountOpt = accountrepo.findById(transaction.getAccount().getAccountId());
		Account acnt = accountOpt.orElseThrow(() -> new RuntimeException("Account not found"));		
	    Transaction newTransaction = new Transaction();
	    newTransaction.setAmount(amount);
	    newTransaction.setLibelle(libelle);
	    newTransaction.setType("deposit");
	    newTransaction.setAccount(acnt);
	    newTransaction.setDate(new Date());
		double newbalance = acnt.getBalance() + amount ;
		acnt.setBalance(newbalance);	
		transactionRep.save(newTransaction);
		accountrepo.save(acnt);
		return acnt;
	}
	
	
	public Account withdraw(Transaction transaction ,double amount , String libelle) {
		Optional<Account> accountOpt = accountrepo.findById(transaction.getAccount().getAccountId());
		Account acnt = accountOpt.orElseThrow(() -> new RuntimeException("Account not found"));
	    Transaction newTransaction = new Transaction();
	    newTransaction.setAmount(amount);
	    newTransaction.setLibelle(libelle);
	    newTransaction.setType("withdraw");
	    newTransaction.setAccount(acnt);
	    newTransaction.setDate(new Date());
		
		if( acnt.getBalance() > amount) {
			double newbalance = acnt.getBalance() - amount ;
			acnt.setBalance(newbalance);
		}
		transactionRep.save(newTransaction);
		accountrepo.save(acnt);
		return acnt;
	}
	
	
	public Account TransfertMoney(Long account_id , String rib, String libelle ,double amount  ) {
		
		
		Optional<Account> accountOptTransfer = accountrepo.findAccountByAccountId(account_id);
		Account acntTransfert = accountOptTransfer.orElseThrow(() -> new RuntimeException("Account not found"));
		
		
		Optional<Account> accountOptReceive = accountrepo.findAccountByRib(rib);
		Account acntReceive = accountOptReceive.orElseThrow(() -> new RuntimeException("Account not found"));
		
		
		 if (acntTransfert.getBalance() < amount) {
		        throw new RuntimeException("Insufficient balance");
		    }

		
		if( acntTransfert.getBalance() > amount) {
			double newbalance = acntReceive.getBalance() + amount ;
			double newbalanceT = acntTransfert.getBalance() - amount ;
			acntReceive.setBalance(newbalance);
			acntTransfert.setBalance(newbalanceT);
		}
		
	    Transaction newTransactionT = new Transaction();
	    Transaction newTransactionR = new Transaction();

	    newTransactionT.setAmount(amount);
	    newTransactionT.setLibelle(libelle);
	    newTransactionT.setType("transfer");
	    newTransactionT.setAccount(acntTransfert);
	    newTransactionT.setDate(new Date());
	    
	    
	    newTransactionR.setAmount(amount);
	    newTransactionR.setLibelle(libelle);
	    newTransactionR.setType("receive");
	    newTransactionR.setAccount(acntReceive);
	    newTransactionR.setDate(new Date());
	    
		
		
		transactionRep.save(newTransactionT);
		transactionRep.save(newTransactionR);
		accountrepo.save(acntTransfert);
		return acntReceive;
	}
	
	
	
	
	
	
	public Account showAccountById(Long accountId) {
		return accountrepo.findByAccountId(accountId);
	}
	

	public Account showAccountByUserId(Users user) {
		return accountrepo.findAccountByUser(user);
	}

}
