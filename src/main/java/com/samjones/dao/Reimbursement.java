package com.samjones.dao;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Reimbursement {

	@Id
	@GeneratedValue
	private Long reimbursementId;
	private Double amount;
	private Date submittedAt;
	private Date resolvedAt;
	private String description;
	private Boolean isApproved;
	private Long userId;
	
	public Boolean getIsApproved() {
		return isApproved;
	}

	public void setIsApproved(Boolean isApproved) {
		this.isApproved = isApproved;
	}



	public Long getReimbursementId() {
		return reimbursementId;
	}

	public void setReimbursementId(Long reimbursementId) {
		this.reimbursementId = reimbursementId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Date getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(Date submittedAt) {
		this.submittedAt = submittedAt;
	}

	public Date getResolvedAt() {
		return resolvedAt;
	}

	public void setResolvedAt(Date resolvedAt) {
		this.resolvedAt = resolvedAt;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
//	@Column
	
	public Reimbursement() {
		// TODO Auto-generated constructor stub
	}
	
	
}
