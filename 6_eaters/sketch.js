var canvasLength=1400;
var canvasWidth=700;
var fps=100;
var bgcolor;






var vehicles=[];
var targets=[];
var totalTargets=1;
var totalVehicles=1;
var minVehicleMass=0.1;
var maxVehicleMass=100;

function setup(){
createCanvas(canvasLength, canvasWidth);
frameRate(fps);
bgcolor=color(0,0,0);

for(var i=0;i<totalVehicles;i++){
	vehicles[i]= new Vehicle();
}
for(var i=0;i<totalTargets;i++){
	targets[i]= new Target();
}
bind(vehicles,targets);
bindAllTargets(vehicles,targets);

}

function draw(){
	background(bgcolor);
	clearBadObjects(vehicles);

	moveObjects(vehicles);
	showObjects(vehicles);
	showObjects(targets);
	



}


function clearBadObjects(objectArr){
	for(var i=0;i<objectArr.length;i++){

		if(objectArr[i].health<1){
			objectArr.splice(i,1);			
		}
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


function bind(vehicles,targets){
	for(var i=0;i<vehicles.length;i++){
		var targetIndex=floor(random(targets.length));
		targetIndex=i;
		vehicles[i].setTarget(targets[targetIndex]);
	}

}

function bindAllTargets(vehicles,targets){
	for(var i=0;i<vehicles.length;i++){
		vehicles[i].setAllTargets(targets);
	}
}






