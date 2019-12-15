package com.samjones;

import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.samjones.dao.EmployeeDAO;
import com.samjones.dao.Reimbursement;
import com.samjones.dao.ReimbursementDAO;
import com.samjones.dao.User;

@Controller
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeDAO employeeDAO;
	
	@Autowired
	private ReimbursementDAO reimbDAO;
	
	@GetMapping("/{id}")
	public String getEmployeeView(Map model, @PathVariable Long id) {
		User user = employeeDAO.findById(id).get();
		
		String email = user.getEmail();
		List<Reimbursement> tickets = reimbDAO.findByUserId(id);
		System.out.println("User inside emp cont: " + user.toString());
		if(user.getLoggedIn()==true) {
			model.put("email", email);
			model.put("tickets", tickets);
			return "employee-view";
		}
		
		return "login-page";
	}
	
	@GetMapping("/data/{id}")
	@ResponseBody
	public User getEmployeeData(@PathVariable Long id) {
		return employeeDAO.findById(id).get();
	}

	
	@GetMapping("/all")
	@ResponseBody
	public List<User> allUsers(){
		return employeeDAO.findAll();
	}
	
	//tinkering with cookies
//	@GetMapping("/cookie")
	@ResponseBody
	public Cookie getCookie() {
		Cookie cook = new Cookie("key","value");
		cook.setHttpOnly(true);
		cook.setSecure(true);
		return cook;
	}
	
	@PostMapping("/add")
	@ResponseBody
	public HttpStatus addUser(@RequestBody User user) {
		try {
			user.setRoleId(0);
			user.setLoggedIn(false);
			employeeDAO.save(user);
		} catch(Exception e) {
			e.printStackTrace();
			return HttpStatus.CONFLICT;
		}
		return HttpStatus.CREATED;
		
	}
	
	
//	@GetMapping("/{id}")
//	@ResponseBody
//	public User findOneUser(@PathVariable Long id) throws Exception {
//		try {
//			return employeeDAO.findById(id).get();
//			
//		} catch(Exception e) {
//			//tring to modify the stacktrace so it doesn't appear in the response...
//			Exception exc = new ResourceNotFoundException();
////			StackTraceElement[] stacks = new StackTraceElement[0];
//			exc.setStackTrace(null);
//						throw exc;
//		}
//	}
}
