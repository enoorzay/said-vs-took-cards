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

function selectRoom(){
	var selected = document.getElementById("Rooms").selectedIndex;
	socket.emit('room', selected);
	resetContextMenu();
}

initMenu();
//var menu = document.getElementById('contextmenu');
//newSelect.size = 10;
//menu.appendChild(newSelect);


