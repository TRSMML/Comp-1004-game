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
	const blob = new Blob([JSON.stringify(saveJSON,null,2)], {type: 'application/json'});	//creates blob containing json data
	const url = URL.createObjectURL(blob);													//creates temporary URL for json data
	const a = document.createElement('a');													//creates element on page to be "clicked" later
	
	a.href = url;																			//makes element link to URL of json
	a.download = "save.json";																//sets file name of downloaded file
	a.click();																				//simulates click on the element
	URL.revokeObjectURL(url);																//deletes url for json file as we're done with it now
}

const pickOpts = {
	types:[
	{
		description: "Json File",
		accept: {
			"json/*":[".json"],
		},
	},
	],
	multiple: false,
	startIn: "downloads",
};

let importTest;
// async function importButton(){
	// [importJSON] = await window.showOpenFilePicker(pickOpts);
	// const fileData = await importJSON.getFile();
	// reader = new FileReader();
	
	// let helpme = "NULL";
	
	// reader.addEventListener(
		// "load",
		// () => {
			// helpme = reader.result;
		// },
		// false,
	// );
	
	// reader.readAsText(fileData);
	// console.log(helpme);
	// alert("This feature, despite my best efforts, does not work. Sorry");
// }

function importButton() {
	const [file] = document.querySelector("input[type=file]").files;	//gets the file from the input element
	const reader = new FileReader();									//initialises a file reader
	
	reader.addEventListener(					//checks for when reader is run
    "load",										
    () => {										
       plain = reader.result;					//stores plaintext result of reader to variable
	   JSONed = JSON.parse(plain);				//parses plaintext to json
	   
	   saveJSON["seconds"]	= JSONed["seconds"]	//loads save data into game
		saveJSON["minutes"]	= JSONed["minutes"]
		saveJSON["hours"] 	= JSONed["hours"]
		saveJSON["days"]	= JSONed["days"]
    },
    false,
  );
  
	if (file) {
		reader.readAsText(file);
	}
}

var scene = 0;
var stats = [10,10,10,0,0];//Food,Motivation,Social,Work,Home
var max   = [20,20,20,20,20];
var min   = [0,0,0,0,0];
var  textArray = 	[["(MONDAY): You wake up in the Morning",
					["Make Food","Browse on Phone","Get to work early"],
					[[3,0,0,0,1],[0,2,0,0,0],[0,0,0,0,0]],
					[2,2,1]],
					[["You decide to get to work early, what harm could that do? On your desk is a pile of paperwork that needs to be completed by Friday, although some of your coworkers are also in early."],
					["get started","watch videos","talk with coworkers"],
					[[-1,-1,-1,2,0],[-1,1,0,0,0],[0,0,3,0,0]],
					[2,2,2]],
					[["Most of your coworkers are in by now, as is more work due for Friday"],
					["Do Work","Watch videos","talk with coworkers"],
					[[-1,-1,-1,2,0],[-1,1,0,0,0],[0,0,3,0,0]],
					[3,3,3]],
					[["Before you know it, lunch time has arived"],
					["Continue Working","Get something to eat","Watch videos"],
					[[-1,-1,-1,2,0],[3,1,0,0,0],[0,1,0,0,0]],
					[4,4,4]],
					[["Your work day is almost done"],
					["Do Work","Watch videos","talk with coworkers"],
					[[-1,-1,-1,2,0],[-1,1,0,0,0],[0,0,3,0,0]],
					[5,5,5]],
					[["You make your way back home"],
					["Make Dinner","Play Games","Get to sleep early"],
					[[3,0,0,0,1],[-1,3,1,0,0],[0,2,0,0,0]],
					[6,6,7]],
					[["Before you go to bed, anything else left to do?"],
					["Clean any dishes","play games","nope, time for bed!"],
					[[-1,-1,0,0,-3],[-1,3,1,0,0],[0,2,0,0,0]],
					[7,7,7]],
					[["This is the end for now, thanks for playing!"],
					["","",""],
					[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]],
					[0,0,0]]]

function action(choice){		//will perform the action associated with each choice, and update behind the scenes values accordingly
	for (let i = 0; i < stats.length; i++){
		stats[i] += textArray[scene][2][choice][i];	//add and subtract based on player action
		//keep stats in bounds
		if (stats < 0){
			stats = 0;
		};
		if (stats > 20){
			stats = 20;
		};
	}
	scene = textArray[scene][3][choice];									//change scene
	document.getElementById("FlavorText").innerHTML = textArray[scene][0];	//update Text
	document.getElementById("B1").innerHTML = textArray[scene][1][0];		//update buttons:
	document.getElementById("B2").innerHTML = textArray[scene][1][1];
	document.getElementById("B3").innerHTML = textArray[scene][1][2];
}

setInterval(function(){	//functions that should run once a second
	Timerinc();
},1000);