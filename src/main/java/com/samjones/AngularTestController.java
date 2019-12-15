package com.samjones;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AngularTestController {
	
	@GetMapping("/angular")
	public String test() {
		return "index";
	}
}
