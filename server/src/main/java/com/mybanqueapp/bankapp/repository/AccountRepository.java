package com.mybanqueapp.bankapp.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mybanqueapp.bankapp.model.Account;
import com.mybanqueapp.bankapp.model.Users;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>  {
    Optional<Account> findAccountByRib(String rib);
    Optional<Account> findAccountByAccountId(Long accountId);
    Account findByAccountId(Long accountId);
	Account findAccountByUser(Users user);
}
