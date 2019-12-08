/**
 * 
 */

window.onload = function(e){

	getTickets();
	getUserInfo();
//	var ticks = getTickets();
	
}
function getTickets(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/TestProj/html/Finance-manager.do", true);
	xhr.send()
//	ticks = '';
	ticks = '';
	xhr.onreadystatechange = function(){
		if(xhr.readyState==4 && xhr.status==200){
			ticks = JSON.parse(xhr.responseText);
//			appendTickets(ticks);
			showPendingTicks(ticks);
		
		}
	}
	
}
function getUserInfo(){
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:8080/TestProj/html/Employee-view.do",true);
	xhr.send();
	
	xhr.onreadystatechange = function(){
		let user = JSON.parse(xhr.responseText);
		console.log('User ' + user)
		setValues(user);
	}
}
function setValues(user){
	  document.getElementById("username").innerHTML = user.userName;
	  document.getElementById("firstname").innerHTML = user.firstName;
	  document.getElementById("lastname").innerHTML = user.lastName;
	  document.getElementById("userid").innerHTML = user.userId;
	  document.getElementById("email").innerHTML = user.email;
	  
	  
}
let radios = document.getElementsByClassName("fancy-radios")

//addListeners(radios,ticks)
//addListeners(radios);
//var ticks = getTickets();

let pendingButton = document.getElementById("viewPending")
pendingButton.addEventListener("click", (e)=>{
	console.log("Pending clicked")
//	console.log("Ticks inside the button cb: " + ticks)
	let tx = showPendingTicks(ticks)
	console.log("Filtered tickets: " + JSON.stringify(tx));
})

let allButton = document.getElementById("viewAll")
allButton.addEventListener("click", (e)=>{
	appendTickets(ticks);
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
		appendTickets(pendingTx);
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
		appendTickets(approvedTx);
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
		appendTickets(deniedTx);
}
function getSubmissionDate(timestamp){
	let date = new Date(timestamp*1000);
	let hours = date.getHours();
	let minutes = "0" + date.getMinutes();
	let seconds = "0" + date.getSeconds();
	let dateSub = date.getDate();
	
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = date.getFullYear();
	  var month = months[date.getMonth()];
	let formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + " on " + month + dateSub + year;
	return new Date(timestamp * 1e3).toISOString().slice(-13, -5);
}
	function appendTickets(array){
		console.log("working")
		let ticketDiv = document.getElementById("ticketDiv");
		ticketDiv.innerHTML = '';
		let status = "";
		let statusEle = ``;
		for(i=0;i<array.length;i++){
			let submittedAt = new Date(array[i].submitted); 
			console.log(new Date(array[i].submitted))
//			let submittedAt = timeConverter(array[i].submitted);

			if(array[i].statusId=="0"){
					status = "Pending";
					statusEle = `<button class="btn btn-warning expand-description-btn rounded desc-btn collapsed" data-toggle="collapse" data-target="#${'panel' + i}" aria-expanded="false">${status}</button>`
						
				} else if(array[i].statusId=="1") {
					status = "Approved";
					statusEle = `<button class="btn btn-success expand-description-btn rounded desc-btn collapsed" data-toggle="collapse" data-target="#${'panel' + i}" aria-expanded="false">${status}</button>`
						
				} else {
					status = "Denied"
//						statusEle = `<div class='border border-danger small-border-box'> ${status} </div> `;
					statusEle = `<button class="btn btn-danger expand-description-btn rounded desc-btn collapsed" data-toggle="collapse" data-target="#${'panel' + i}" aria-expanded="false">${status}</button>`
					
				}
		 
			//<button  class="btn btn-warning expand-description-btn rounded desc-btn" data-toggle="collapse" data-target = "#${'panel' + i}"> Details </button>
            
			let card = `    <div class="card center text-center col-lg-10 panel" style="width: 60rem">
                <small> Reimbursement </small>
            <div class="card-body text-center">
            ${statusEle}
			         <form action="Update.do" method="POST">
			<input type="hidden" name="reimbIdInput" value='${array[i].reimbId}'> 
			      
                <div style="height:30px" class="text-center collapse description-panel" id="${'panel' + i}"> 
                        <div class="container text-center">
                        <div class="row text-center">
                        <div class="col-md-3">
                        <div class="border border-success">
                        <div class="card-title small-border-box box-text col-sm">
					Author ID: ${array[i].author}
					<hr>
                </div>
                <div  class=" small-border-box box-text"> Amount: ${array[i].amount} <hr> </div>
                <div class="small-border-box box-text"> Submitted: ${submittedAt} </div>
                </div> 
                </div>
                <div class="col-md-6 ticket-description-panel">
                        <label style="margin-top:15px;"> Description </label>
                                <p class="description" style="margin-top:8px;">${array[i].description}</p>
				</div>
				</div>
				</div>
				<div class="row center">
                            <div class="btn-group-toggle radios" data-toggle="buttons">
                         <label class="btn btn-danger">  
                        <input type="radio" value="deny" name="approveOrDenyInput"class="btn btn-danger approve-deny-btn" required="required"> Deny
                         </label>
                           <label class="btn btn-success">  
                       
                         <input type="radio" value="approve" name="approveOrDenyInput"  class="btn btn-success approve-deny-btn"> Approve
                         </label>
                         </div>
				<div class="modal-footer" style="text-align:center;">
				
				<input type="submit" style="display:inline-block;"class="btn btn-primary center" value="Submit"> 
				</div>
                    </div>   
				</form>
                
                </div>
            </div> `

			
			ticketDiv.insertAdjacentHTML("afterbegin", card); 
		}
					

			}			
		// from the web
	function timeConverter(UNIX_timestamp){
		  var a = new Date(UNIX_timestamp * 1000);
		  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		  var year = a.getFullYear();
		  var month = months[a.getMonth()];
		  var date = a.getDate();
		  var hour = a.getHours();
		  var min = a.getMinutes();
		  var sec = a.getSeconds();
		  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		  return time;
		}

	
