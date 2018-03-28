socket = io();

function initMenu(){
	var availrooms;
	var newSelect=document.getElementById("Rooms")

	socket.on('avail_rooms',function(data) {
		console.log(data);
		availrooms = data.description;
	//document.getElementById("container").innerHTML=data.description;
	});

	// fill menu
	index=0;
	for(element in availrooms){
		var opt = document.createElement("option");
		opt.value= index;
		opt.innerHTML = element; // whatever property it has

		// then append it to the select element
		newSelect.appendChild(opt);
		index++;
	}
	while(index< 10){
		var opt = document.createElement("option");
		opt.value= index;
		opt.innerHTML = ("Available Room");
		newSelect.appendChild(opt);
		index++;
	}
}
function resetContextMenu(){
	var contextmenu = document.getElementById("contextmenu");
	while (contextmenu.hasChildNodes()) {
		contextmenu.removeChild(contextmenu.lastChild);
	}
}

function getRoomMenu(){
	resetContextMenu();
	var username = "";
	while (username.length <= 0){
		
		username = prompt("Enter nickname: ");
	}
	socket.emit('setUsername', username);
	socket.on('connectToRoom',function(data) {
		document.getElementById("topbar").innerHTML=data;
	});
	var usrlist = document.createElement("list");
	
	socket.on('users_here',function(data) {
		var users_here = data;
		usrlist.innerHTML = "";
		var listelements = "";
		for (var i=0; i < users_here.length;i++){
			listelements += "<li>" + users_here[i] + "</li>";
			
			console.log(users_here[i]);
		}
		usrlist.innerHTML = listelements;
		contextmenu.appendChild(usrlist);

	});
	
	
}
function selectRoom(){
	var selected = document.getElementById("Rooms").selectedIndex;
	var contextmenu = document.getElementById("contextmenu");
	socket.emit('room', selected);
	getRoomMenu();

		
}

initMenu();
//var menu = document.getElementById('contextmenu');
//newSelect.size = 10;
//menu.appendChild(newSelect);


