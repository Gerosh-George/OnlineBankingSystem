package com.bank.Banking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.Banking.dao.AccRepository;
import com.bank.Banking.dao.CustomerRepository;
import com.bank.Banking.model.Account;
import com.bank.Banking.model.Customer;
import java.util.Random;

import javax.swing.text.AbstractDocument.BranchElement;

@Service
public class AccountService {
	@Autowired
	AccRepository accRepo;
	
	@Autowired
	CustomerRepository custRepo;
	
	public Account createAccount(Account account, String userid) {
		long generatedNumber = 0;
		Random rand = new Random();
		generatedNumber = 999999 + rand.nextLong(1000000);
		while(accRepo.findById(generatedNumber).isPresent())
		{
			generatedNumber = 999999 + rand.nextLong(1000000);
		}
		Customer u = custRepo.findById(userid).get();
		String branch = account.getBranch();
		String ifsc = branch.substring(0, 3) + (int)(branch.charAt(branch.length()-1)) + (int)(branch.charAt(branch.length()-2));
		account.setUser(u);
		account.setAccno(generatedNumber);
		account.setIfsc(ifsc);
		return accRepo.save(account);
	}
}