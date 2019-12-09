//import { config } from './api.confi?g';
let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e){
	e.preventDefault()
	let email = document.getElementById("emailInput").value
	let password = document.getElementById("passwordInput").value

	let loginCreds = {}
	loginCreds.email = email;
	loginCreds.password = password;
//	alert("password is " + password);
	console.log(loginCreds);
	sendLogin(loginCreds);

})

function sendLogin(loginCreds){
  let xhr = new XMLHttpRequest();
  xhr.open("POST","http://localhost:8080/loginAttempt", true)
  xhr.setRequestHeader("content-type","application/json");
  xhr.send(JSON.stringify(loginCreds));
  xhr.onreadystatechange = function (){
    if(xhr.readyState==4 && xhr.status==200){
      if(xhr.responseText){
        window.location.replace(`/employee/${xhr.responseText}`);
      } else {
        alert("Login attempt failed");
      }

    }
  }
}
// the code below should really be in a module
let navLinks = document.getElementsByClassName("nav-link")
let cards = document.getElementsByClassName("card")

function navHover(){
  for(let i = 0; i<navLinks.length;i++){
    // console.log(item)
  
   
    navLinks[i].addEventListener("mouseenter",function(){
      this.style.opacity = 1;
    })
    
    
  
    navLinks[i].addEventListener("mouseleave", function(){
      this.style.opacity = .6;
    })
  }
}
navHover()

function cardsHover(){
  for(let i = 0; i<cards.length;i++){
  
  cards[i].addEventListener("mouseenter",function(){
    this.style.opacity = 1;
  })

  cards[i].addEventListener("mouseleave",function(){
    this.style.opacity = .6;
  })
}
}
cardsHover()