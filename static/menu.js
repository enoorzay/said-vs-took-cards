socket = io();

function selectRoom(){
	console.log('hiwas');
}
var availrooms;
//var newSelect=document.createElement('select');
var newSelect=document.getElementById("Rooms")

socket.on('avail_rooms',function(data) {
	console.log(data);
	availrooms = data.description;
	//document.getElementById("container").innerHTML=data.description;
});
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
//var menu = document.getElementById('contextmenu');
//newSelect.size = 10;
//menu.appendChild(newSelect);


