package com.samjones.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

//@RestResource
public interface EmployeeDAO extends JpaRepository<User, Long>{

}
