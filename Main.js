//save file//
var secs = 0;
var mins = 0;
var hrs  = 0;
var days = 0;
//end of save file//
var saveJSON = {	//this attrocity is so I don't have to rework all the save file code (even if it isn't that big currently)
	secsonds: secs,
	minutes: mins,
	hours: hrs,
	dayss: days
}
//running variables//
var timeString = "00:00:00"
var saveFile = {}
//end of running variables//

//makes sure all parts of the time display have 2 digits (cause, well, that's how clocks work)
function formatTime(time){
	if (time < 10){			//if less that 10,
		return "0" + time;	//then put "0" at the start so it looks like a clock
	}
	else{					//if not,
		return time;		//do nothing, it's aready fine
	}
}

function Timerinc(){	//increments then updates clock (runs once a second)
	secs += 1;			//increment seconds
	if (secs == 60){	//"every sixty seconds in Africa, a minute passes" - Big man tyrone
		secs = 0;		//jokes aside, this just checks if secs is 60, if so reset secs and increment mins
		mins += 1;
	}
	if (mins == 60){	//if mins is 60, set to 0 and increment hrs
		mins = 0;
		hrs += 1;
	}
	if (hrs == 24){		//if hrs is 24, set to 0 and increment days
		hrs = 0;
		days += 1;
	}
	timeString=formatTime(days)+":"+formatTime(hrs)+":"+formatTime(mins)+":"+formatTime(secs);	//format time to display
	document.getElementById("Timer").textContent = timeString;									//update time display
}

function loadButton(){								//loads the save data from localStorage
	secs = Number(localStorage.getItem("secs"));
	mins = Number(localStorage.getItem("mins"));
	hrs  = Number(localStorage.getItem("hrs"));
	days = Number(localStorage.getItem("days"));
}

function saveButton(){								//saves the save data to localStorage
	localStorage.setItem("secs",(secs));
	localStorage.setItem("mins",mins);
	localStorage.setItem("hrs",hrs);
	localStorage.setItem("days",days);
}

// function exportButton(){
	// var JSONed = JSON.stringify(saveJSON);								//stringifies object that "stores" the save data
	// var exportBlob = new Blob([JSONed], {type: "application/json"});	//puts json in a Blob
	// var url = URL.createObjectURL(exportBlob);							//gives blob a url
	// var dwnldElement = document.createElement('dwnldElement');			//creates element on page to be "clicked" by later code
	
	// dwnldElement.download = 'save.json';	//sets name
	// dwnldElement.href = url;				//sets url
	// dwnldElement.id = saveJSON;				//sets id
	
	// document.body.appendChild(dwnldElement);//appends document with element that allows downloading
	// dwnldElement.click();					//simulates click on element
	// document.querySelector('#' + dwnldElement.id).remove();
//}

function exportButton(){
	const blob = new Blob([JSON.stringify(saveJSON,null,2)], {type: 'application/json'});
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	
	a.href = url;
	a.download = "save.json";
	a.click();
	URL.revokeObjectURL(url);
}

var  textArray = [["Text1","Text2","Text3"],		//will store all text in the game that appears, changes, or disappears in some capacity
				   "This should never Show","This should never Show","This should never Show"];

function action(options,choice){					//will perform the action associated with each choice, and update behind the scenes values accordingly
	document.getElementById("textTest").textContent = textArray[options][choice];
}

setInterval(function(){	//functions that should run once a second
	Timerinc();
},1000);