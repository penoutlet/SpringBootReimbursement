package com.samjones.dao;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

@Entity
public class User {

	@Id
	@GeneratedValue
	Long id;
	
	@Column(unique = true)
	private String email;
	private String password;
	private Integer roleId;
	private Boolean loggedIn;
	
	@OneToMany(cascade = CascadeType.ALL) @JoinColumn(name="userId")
	List<Reimbursement> reimbursements;
	
	
	public List<Reimbursement> getReimbursements() {
		return reimbursements;
	}

	public void setReimbursements(List<Reimbursement> reimbursements) {
		this.reimbursements = reimbursements;
	}



	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getLoggedIn() {
		return loggedIn;
	}

	public void setLoggedIn(Boolean loggedIn) {
		this.loggedIn = loggedIn;
	}


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}


	
	@Override
	public String toString() {
		return "User [id=" + id + ", email=" + email + ", password=" + password + ", roleId=" + roleId + ", loggedIn="
				+ loggedIn + ", reimbursements=" + reimbursements + "]";
	}

	public User() {
	}

	
}
