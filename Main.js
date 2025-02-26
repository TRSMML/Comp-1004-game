//save file//
var secs = 0;
var mins = 0;
var hrs  = 0;
var days = 0;
//end of save file//

//running variables//
var timeString = "00:00:00"
var saveFile = {}
//end of running variables//


function formatTime(time){
	if (time < 10){
		return "0" + time;
	}
	else{
		return time;
	}
}

function Timerinc(){
	secs += 1;
	if (secs == 60){
		secs = 0;
		mins += 1;
	}
	if (mins == 60){
		mins = 0;
		hrs += 1;
	}
	if (hrs == 60){
		hrs = 0;
		days += 1;
	}
	timeString=formatTime(days)+":"+formatTime(hrs)+":"+formatTime(mins)+":"+formatTime(secs);
	document.getElementById("Timer").textContent = timeString;
}

// const loadbutton = document.getElementById("load");
// loadbutton.addEventListener("click", load(){
	// import data from './save.json' assert {type:'json'};
	// console.log(data);
	// console.log("merp");
// });

function load(){
	fetch('./save.json')
		.then(response => {
			if (!response.ok){
				throw new Error('ERROR: NETWORK RESPONSE NOT OK');
			}
			return response.json();
		})
		.then(data => {
			//console.log(data);
			return data;
		});
}

// async function loadYouPOS(){
	// const response = await fetch('./save.json');
	
	// return response.json();
//}

// async function setTime(){
	// data = await loadYouPOS();
	
	// console.log(data.seconds);
	
	// secs = data.seconds;
	// mins = data.minutes;
	// hrs  = data.hours;
	// days = data.days;
//}

function loadButton(){
	//load();
	//setTime();
	//test = localStorage.getItem("test")
	secs = Number(localStorage.getItem("secs"));
	mins = Number(localStorage.getItem("mins"));
	hrs  = Number(localStorage.getItem("hrs"));
	days = Number(localStorage.getItem("days"));
}

function saveButton(){
	localStorage.setItem("secs",(secs));
	localStorage.setItem("mins",mins);
	localStorage.setItem("hrs",hrs);
	localStorage.setItem("days",days);
}

setInterval(function(){
	Timerinc();
},1000);