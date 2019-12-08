package com.samjones;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
//@RequestMapping("/")
public class HomeController {

	@GetMapping
	public String getHomePage() {
		return "home";
	}
	
	@GetMapping("/login")
	public String getLoginPage() {
		return "login-page";
	}
	
	@GetMapping("/register")
	public String getRegistrationPage() {
		return "register";
	}
}
