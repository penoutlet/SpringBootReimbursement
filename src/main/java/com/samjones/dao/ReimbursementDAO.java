package com.samjones.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//@RestResource
public interface ReimbursementDAO extends JpaRepository<Reimbursement, Long> {

	List<Reimbursement> findByUserId(Long userId);
}
