
function addNewReimb(userObject) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/employee/add",true);
  
  xhr.setRequestHeader("content-type", "application/json");
  xhr.send(userObject);
	
	xhr.onreadystatechange = function(){
		// let response = JSON.parse(xhr.responseText);
		console.log(response);
	}

}

let signUpForm = document.getElementById("registerForm");
signUpForm.addEventListener("submit", function(e){
  e.preventDefault();
  let email = document.getElementById("emailInput").value;
  let password = document.getElementById("passwordInput").value;
let userObj = {};


userObj.email = email;
  userObj.password = password;
alert(JSON.stringify(userObj))

  addNewReimb(userObj);

});


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

// function cardsHover(){
//   for(let i = 0; i<cards.length;i++){
  
//   cards[i].addEventListener("mouseenter",function(){
//     this.style.opacity = 1;
//   })

//   cards[i].addEventListener("mouseleave",function(){
//     this.style.opacity = .6;
//   })
// }
// }
// cardsHover()