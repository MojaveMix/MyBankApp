package com.mybanqueapp.bankapp.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mybanqueapp.bankapp.model.Account;
import com.mybanqueapp.bankapp.model.Transaction;
@Repository
public interface TransactionRepository  extends JpaRepository<Transaction, Long> {

	List<Transaction> findByAccount(Account account);
    List<Transaction> findTop5ByAccountOrderByDateDesc(Account account);

	
}
