window.onload = function(e){
//	var tickets = getTickets();
	getTickets();
	getUserInfo();
}




function getUserInfo(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/TestProj/html/Employee-view.do",true);
	xhr.send();
	
	xhr.onreadystatechange = function(){
		let user = JSON.parse(xhr.responseText);
		console.log(user)
		setValues(user);
	}
}
function getTickets(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/TestProj/html/Employee-find.do",true);
	xhr.send();
	ticks = '';
	xhr.onreadystatechange = function(){
		
		if(xhr.readyState==4 && xhr.status==200){
			ticks = xhr.responseText;
			ticks = (JSON.parse(ticks))
			showPendingTicks(ticks)
			return ticks;
		}
	}
}
let form = document.getElementById("reimbursementForm")
let radios = document.getElementsByClassName("radios")
function getFancyRadios(fancyRadios){
    let checked=""
    for(i=0;i<fancyRadios.length;i++){
      if(fancyRadios[i].checked){
      checked += fancyRadios[i].value
      }
    }
    // console.log(checked)
    return checked;
  }
form.addEventListener("submit", function(e){
  //  e.preventDefault()
    let description = document.getElementById("descriptionInput").value;
    let reimburse_amount = document.getElementById("reimbursement-amount").value
    let reimbursement_type = getFancyRadios();

    let reimbursement = {}
    reimbursement.description = description;
    reimbursement.amount = reimburse_amount;
    reimbursement.type = reimbursement_type;
    // alert(reimbursement)
    console.log(reimbursement)
    appendReimbursement(reimbursement)
})

function addListeners(){
    let option1 = document.getElementById("option1")
    let option2 = document.getElementById("option2")
    let option3 = document.getElementById("option3")
    let option4 = document.getElementById("option4")
    option1.addEventListener("click", function(){
       option2.classList.remove("rounded-circle");
       option3.classList.remove("rounded-circle")
       option4.classList.remove("rounded-circle")
       option1.classList.add("rounded-circle")
    })
    option2.addEventListener("click", function(){
      option1.classList.remove("rounded-circle")
      option3.classList.remove("rounded-circle")
      option4.classList.remove("rounded-circle")
     option2.classList.add("rounded-circle")
    })
    
    option3.addEventListener("click", function(){
      option1.classList.remove("rounded-circle")
      option2.classList.remove("rounded-circle")
      option4.classList.remove("rounded-circle")
     option3.classList.add("rounded-circle")
    })
  
    
    option4.addEventListener("click", function(){
      option1.classList.remove("rounded-circle")
      option2.classList.remove("rounded-circle")
      option3.classList.remove("rounded-circle")
     option4.classList.add("rounded-circle")
    })
  
  }
  addListeners()

  function appendReimbursement(tickets){
	  let ts = new Date();
	  var count = 0;
	  let status ="";
	  let statusEle;
	  let ticketArea = document.getElementById("tickets");
	  ticketArea.innerHTML = '';
		
	  for(i=0; i<tickets.length;i++){
//		  console.log(tickets[i].statusId);
		  count++;
		  if(tickets[i].statusId=="0"){
				status = "Pending";
				statusEle = `<div class='border border-warning small-border-box'> ${status} </div> `;
			} else if(tickets[i].statusId=="1") {
				status = "Approved";
				statusEle = `<div class='border border-success small-border-box'> ${status} </div> `;
				
			} else {
				status = "Denied"
					statusEle = `<div class='border border-danger small-border-box'> ${status} </div> `;
				
			}
		  let date = ts.toDateString(tickets[i].submitted)
		  let longCard = `<div class="card text-center ticket-panel panel" style="width: 60rem;">
			  <div class="card-body">
			  ${statusEle}
			  <h5 class="card-title">$${tickets[i].amount}</h5>
			  <h6 class="card-subtitle mb-2 text-muted"><b> Ticket ID: </b> ${tickets[i].reimbId}</h6>
			  <button  class="btn btn-warning expand-description-btn rounded desc-btn" data-toggle="collapse" data-target = "#${'panel' + i}"> Description </button>
              <div style="height:30px" class="text-center collapse description-panel" id="${'panel' + i}"> 
                
			  <p class="card-text"> <b>Description:</b> ${tickets[i].description}</p>
			  <p class="card-text border> Created at: ${tickets[i].submitted} | date </p>
			  </div>
			  </div>
			  </div>`;
//		  let ticketsTable = document.getElementById("tickets-table");
//		  let row = ticketsTable.insertRow(0);
////		  let cell = row.insertCell()
//		  row.innerHTML = longCard;
		
//		  ticketArea.innerHTML = longCard;
//		  ticketArea.prepend(longCard);
		    ticketArea.insertAdjacentHTML('afterbegin', longCard );
		  
	  }

	  }
  
  function setValues(user){
	  document.getElementById("username").innerHTML = user.userName;
	  document.getElementById("firstname").innerHTML = user.firstName;
	  document.getElementById("lastname").innerHTML = user.lastName;
	  document.getElementById("userid").innerHTML = user.userId;
	  console.log("Email " + user.email)
	  document.getElementById("email").innerHTML = user.email;
		 
  }
  
  // from the web
//  function timeConverter(UNIX_timestamp){
//	  var a = new Date(UNIX_timestamp * 1000);
//	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//	  var year = a.getFullYear();
//	  var month = months[a.getMonth()];
//	  var date = a.getDate();
//	  var hour = a.getHours();
//	  var min = a.getMinutes();
//	  var sec = a.getSeconds();
//	  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//	  return time;
//	}
  
  let pendingButton = document.getElementById("viewPending")
  pendingButton.addEventListener("click", (e)=>{
  	console.log("Pending clicked")

  	let tx = showPendingTicks(ticks)
  	console.log("Filtered tickets: " + JSON.stringify(tx));
  })

  let allButton = document.getElementById("viewAll")
  allButton.addEventListener("click", (e)=>{
  	appendReimbursement(ticks);
  });

  let approvedButton = document.getElementById("viewApproved")
  approvedButton.addEventListener("click", (e)=>{
  	let tx = showApprovedTicks(ticks);
  })

  let deniedButton = document.getElementById("viewDenied")
  deniedButton.addEventListener("click", (e)=>{
  	let tx = showDeniedTicks(ticks);
  })
  
  function showPendingTicks(tickets){
	console.log(tickets);
	let pendingTx = []
	
	for(let i=0;i<tickets.length;i++){
		console.log(tickets[i].statusId)
		if(tickets[i].statusId=="0"){
			pendingTx.push(tickets[i]);
			continue;
//			console.log("Pending tx: " + pendingTx)
		}
	}
		appendReimbursement(pendingTx);
	}
function showApprovedTicks(tickets){
	let approvedTx=[]
	for(let i=0;i<tickets.length;i++){
		console.log(tickets[i].statusId)
		if(tickets[i].statusId=="1"){
			approvedTx.push(tickets[i]);
			continue;
//			console.log("Pending tx: " + pendingTx)
		}
	}
	appendReimbursement(approvedTx);
}

function showDeniedTicks(tickets){
	let deniedTx=[]
	for(let i=0;i<tickets.length;i++){
		console.log(tickets[i].statusId)
		if(tickets[i].statusId=="2"){
			deniedTx.push(tickets[i]);
			continue;
//			console.log("Pending tx: " + pendingTx)
		}
	}
	appendReimbursement(deniedTx);
}