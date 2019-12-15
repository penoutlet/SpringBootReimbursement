package com.samjones;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.samjones.dao.Reimbursement;
import com.samjones.dao.ReimbursementDAO;

@Controller
@RequestMapping("/reimbursement")
public class ReimbursementController {

	@Autowired
	private ReimbursementDAO reimbDAO;
	
	@GetMapping("/all")
	@ResponseBody
	public List<Reimbursement> fetchAll(){
		return this.reimbDAO.findAll();
	}
	@PostMapping("/add")
	@ResponseBody
	public HttpStatus createReimbursement(@RequestBody Reimbursement reimb) {
		reimbDAO.save(reimb);
		return HttpStatus.CREATED;
	}
	
	@GetMapping("/tickets/{userId}")
	@ResponseBody
	public List<Reimbursement> findTicketsByUserId(@PathVariable Long userId){
		
		return reimbDAO.findByUserId(userId);
	}
}
