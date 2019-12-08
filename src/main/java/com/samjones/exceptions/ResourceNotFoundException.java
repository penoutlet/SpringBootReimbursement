package com.samjones.exceptions;

public class ResourceNotFoundException extends RuntimeException {
	@Override
	public void setStackTrace(StackTraceElement[] stackTrace) {
		// TODO Auto-generated method stub
		StackTraceElement stack = new StackTraceElement("EmployeeController", "findOneUser", "EmployeeController.java", 71);
		stackTrace = new StackTraceElement[1];
		stackTrace[0] = stack;

		
		super.setStackTrace(stackTrace);
	}
//	public String message(
	public ResourceNotFoundException() {
		// TODO Auto-generated constructor stub
		super("No user found");
	}
	
	private String trace;

	public String getTrace() {
		return trace;
	}

	public void setTrace(String trace) {
		this.trace = trace;
	}

	public ResourceNotFoundException(String trace) {
		this();
		this.trace = trace;
	}
	
	

}
