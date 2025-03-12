var saveJSON = {	//this object stores the save file (for real now, the old method I tried just didn't work)
	"seconds": 0,
	"minutes": 0,
	"hours": 0,
	"days": 0
};
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

function Timerinc(){				//increments then updates clock (runs once a second)
	saveJSON["seconds"] += 1;			//increment seconds
	if (saveJSON["seconds"] == 60){	//"every sixty seconds in Africa, a minute passes" - Big man tyrone
		saveJSON["seconds"] = 0;	//jokes aside, this just checks if seconds is 60, if so reset secs and increment mins
		saveJSON["minutes"] += 1;
	}
	if (saveJSON["minutes"] == 60){	//if mins is 60, set to 0 and increment hrs
		saveJSON["minutes"] = 0;
		saveJSON["hours"] += 1;
	}
	if (saveJSON["hours"] == 24){	//if hrs is 24, set to 0 and increment days
		saveJSON["hrs"] = 0;
		saveJSON["days"] += 1;
	}
	timeString=formatTime(saveJSON["days"])+":"+formatTime(saveJSON["hours"])+":"+formatTime(saveJSON["minutes"])+":"+formatTime(saveJSON["seconds"]);	//format time to display
	document.getElementById("Timer").textContent = timeString;	//update time display
}

function loadButton(){								//loads the save data from localStorage
	saveJSON["seconds"] = Number(localStorage.getItem("secs"));
	saveJSON["minutes"] = Number(localStorage.getItem("mins"));
	saveJSON["hours"]  = Number(localStorage.getItem("hrs"));
	saveJSON["days"] = Number(localStorage.getItem("days"));
}

function saveButton(){								//saves the save data to localStorage
	localStorage.setItem("secs",saveJSON["seconds"]);
	localStorage.setItem("mins",saveJSON["minutes"]);
	localStorage.setItem("hrs",saveJSON["hours"]);
	localStorage.setItem("days",saveJSON["days"]);
}

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