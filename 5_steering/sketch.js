var canvasLength=1400;
var canvasWidth=700;
var fps=100;
var bgcolor;






var vehicles=[];
var targets=[];
var totalTargets=3;
var totalVehicles=3;
var minVehicleMass=0.1;
var maxVehicleMass=50;

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

}

function draw(){
	background(bgcolor);

	moveObjects(vehicles);
	showObjects(vehicles);
	showObjects(targets);
	



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





