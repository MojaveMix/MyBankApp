package com.mybanqueapp.bankapp.model;

public class TransfertRequest {
	   private Long account_id; 
	    private String rib;
	    private String libelle;
	    private double amount;
	    
	    
		public String getRib() {
			return rib;
		}
		public void setRib(String rib) {
			this.rib = rib;
		}
		public String getLibelle() {
			return libelle;
		}
		public void setLibelle(String libelle) {
			this.libelle = libelle;
		}
		public double getAmount() {
			return amount;
		}
		public void setAmount(double amount) {
			this.amount = amount;
		}
		public Long getAccount_id() {
			return account_id;
		}
		public void setAccount_id(Long account_id) {
			this.account_id = account_id;
		}

}
