var canvasLength=1400;
var canvasWidth=700;
var fps=100;
var bgcolor;
var time=0;

CanvasBoundary = {
	left: 0,
	right: canvasLength,
	top: 0,
	bottom: canvasWidth 
}




var rules;
var obstacleBounceRuleOn=true;



var totalGenerations=123;
var currentGeneration=0;
var vehicles=[];
var obstacles=[];
var targets=[];
var totalTargets=1;
var totalVehicles=1;
var totalObstacles=20;
var minVehicleMass=0.1;
var maxVehicleMass=200;

function setup(){
//debugger;	
createCanvas(canvasLength, canvasWidth);
frameRate(fps);
bgcolor=color(0,0,0);

rules= new Rules();



for(var i=0;i<totalVehicles;i++){
	vehicles[i]= new Vehicle();
}
for(var i=0;i<totalTargets;i++){
	targets[i]= new Target();
}
for(var i=0;i<totalObstacles;i++){
	obstacles[i]= new Obstacle();
}
bindTarget(vehicles,targets);
bindObstacles(vehicles,obstacles);


}

function draw(){
	time++;
	background(bgcolor);
	

	 moveObjects(vehicles);
	 showObjects(vehicles);
	 moveObjects(obstacles);
	 showObjects(obstacles);
	 showObjects(targets);

	 //console.log("TARGET ATTRACTION" +vehicles[0].targetAttraction);
	 //console.log("OBST ATTRACTION" +vehicles[0].obstAttraction);


	// if(false){
	// 	currentGeneration++;
	// 	clearObjects(vehicles);
	// }	
	





}


function clearObjects(objectArr){
	for(var i=0;i<objectArr.length;i++){

			objectArr.splice(i,1);			
		
	}

}

function showObjects(objectArr){
	for(var i=0;i<objectArr.length;i++){

		objectArr[i].show();
	}

}
function moveObjects(objectArr){
	for(var i=0;i<objectArr.length;i++){

		objectArr[i].move();
	}

}


function bindTarget(vehicles,targets){
	for(var i=0;i<vehicles.length;i++){
		var targetIndex=floor(random(targets.length));
		//targetIndex=i;
		vehicles[i].setTarget(targets[targetIndex]);
	}

}

function bindObstacles(vehicles,obstalces){
	for(var i=0;i<vehicles.length;i++){
		vehicles[i].setAllObstacles(obstalces);
	}

}







