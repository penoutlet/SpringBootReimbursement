package com.samjones;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.samjones.dao.EmployeeDAO;
import com.samjones.dao.LoginDTO;
import com.samjones.dao.User;

@Controller
@RequestMapping("/loginAttempt")
public class LoginController {

	@Autowired
	private EmployeeDAO employeeDAO;
	@PostMapping
	@ResponseBody
	public Long login(@RequestBody LoginDTO login, HttpServletRequest req) {
		HashMap<String, String> responseModel = new HashMap<>();
		User foundUser = employeeDAO.findByEmail(login.getEmail());
		if(foundUser!=null) {
			if(foundUser.getPassword().equals(login.getPassword())) {
				foundUser.setLoggedIn(true);
				employeeDAO.save(foundUser);
				return foundUser.getId();
			}
			
			//throw an exception
//			throw new PasswordIncorrectException();
			return null;
		}
		
//		throw new ResourceNotFoundException();
		return null;
		
	}
	
	
//	@PostMapping("/loginAttempt")
//	public String forwardToEmployeePage(@RequestBody LoginDTO login) throws ServletException, IOException {
//		User foundUser = employeeDAO.findByEmail(login.getEmail());
//		if(foundUser!=null) {
//			if(foundUser.getPassword().equals(login.getPassword())) {
//			
////			res.sendRedirect("/employee");
////			req.getRequestDispatcher("/employee").forward(req, res);
////			req.getRequestDispatcher("/employee").for;
////			EmployeeController.getEmployeeView();
//			return "employee-view";
//			}
//		}
//		
//		return "login-page";
//	}
	
}
