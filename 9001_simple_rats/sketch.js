var canvasLength=1400;
var canvasWidth=700;
var fps=200;
var bgcolor;
var time=0;

CanvasBoundary = {
	left: 0,
	right: canvasLength,
	top: 0,
	bottom: canvasWidth 
}



//RULES
var rules;
var obstacleBounceRuleOn=true;


//GENETIC NEEDS
var matingPool=[];
var childrenPool=[];
var totalGenerations=123;
var currentGeneration=0;
var mutationPercent=1;
var generationTime=0;




var vehicles=[];
var obstacles=[];
var targets=[];
var totalTargets=1;
var totalVehicles=20;
var totalObstacles=30;


var minVehicleMass=0.1;
var maxVehicleMass=200;
var minVelocity=0.1;
var maxVelocity=10;
var minAcc=0.1;
var maxAcc=2;

var minTargetAcc=1;
var maxTargetAcc=200;
var minObstacleAcc=-100000;
var maxObstacleAcc=100000;

var ground;

function setup(){
//debugger;	
createCanvas(canvasLength, canvasWidth);
frameRate(fps);
bgcolor=color(0,0,0);
ground= new Ground();

ground.initialize(canvasLength,canvasWidth,20);


}

function draw(){
	time++;
	bgcolor=color(0,0,0);
	background(bgcolor);
	
 	ground.show();


}


function createChildren(){
var naturallySelected=sortOnScore(matingPool);// CHOOSE A FEW ELEMENTS ON SCORE

	console.log("BEST OF THE NATURALLY SELECTED ",naturallySelected[0]);
	
	
	var totalNeeded=matingPool.length;
	

	var children=cross(naturallySelected,totalNeeded);
	var mutatedChildren=mutate(children);
	childrenPool=mutatedChildren;

	//childrenPool=matingPool;
	matingPool=[];

}


function mutate(children){


	children.forEach(function(childVehicle){
		var rand=random(1);
		
	if(mutationPercent/100>rand)
	{
		childVehicle.mass=random(minVehicleMass,maxVehicleMass);
	
		

	//if(mutationPercent/100<random(1))
	childVehicle.maxVelocity=random(minVelocity,maxVelocity);
	
	//if(mutationPercent/100<random(1))
	childVehicle.maxAcceleration=random(minAcc,maxAcc);
	
	//if(mutationPercent/100<random(1))
	childVehicle.targetAttraction=random(minTargetAcc,maxTargetAcc);
	
	//if(mutationPercent/100<random(1))
	childVehicle.obstAttraction=random(minObstacleAcc,maxObstacleAcc);

	}

	});
	

	return children;
}

function cross(naturallySelected,totalNeeded){
	var finalChildren=[];

	for(var i=0;i<totalNeeded;i++){

			var probably1=false;
			var probably2=false;
			var choice1;
			var choice2;

			while(!probably1){
				var choice1=Math.floor(Math.random()*naturallySelected.length);
				probably1=random(naturallySelected.length+1)>choice1;
			}
			while(!probably2){
				var choice2=Math.floor(Math.random()*naturallySelected.length);
				probably2=random(naturallySelected.length+1)>choice2;
			}
			


			//GET TWO WEIGHTED RANDOM ITEMS FROM ARR
			var parent1=naturallySelected[choice1];
			var parent2=naturallySelected[choice2];

			finalChildren.push(offSpring(parent1,parent2));
	}	
	return finalChildren;
}

function offSpring(parent1,parent2){// BETTER THIS OFFSPRING
	var childVehicle= new Vehicle();
	childVehicle.mass=random(parent1.mass,parent2.mass);
	childVehicle.maxVelocity=random(parent1.maxVelocity,parent2.maxVelocity);
	childVehicle.maxAcceleration=random(parent1.maxAcceleration,parent2.maxAcceleration);
	
	childVehicle.targetAttraction=random(parent1.targetAttraction,parent2.targetAttraction);
	childVehicle.obstAttraction=random(parent1.obstAttraction,parent2.obstAttraction);

	return childVehicle;



}

function sortOnScore(theMatingPool){
	var naturallySelected=[];
	theMatingPool.forEach(function(e){
		//e.health;
		//e.closestEverDistanceToTarget=100000000;
		//e.timeTaken;
		e.totalScore=1000000/(e.closestEverDistanceToTarget) ;
		e.totalScore+=e.healthAtTerminatingState;
		e.totalScore-=e.timeTaken;

		if(e.healthAtTerminatingState>0){
			e.totalScore+=1000;
		}


		naturallySelected.push(e);
	});
	
	naturallySelected.sort(function(a,b){
		if(a.totalScore < b.totalScore) return 1;   //DESCENDIG ORDER
		if(a.totalScore >= b.totalScore) return -1;
	});

	var percent = Math.ceil(naturallySelected.length / 5);//20%  
	var leftSide = naturallySelected.splice(0,percent);
	return leftSide;

}



function initializeEverything(){// IN THIS ORDER
initializeVehicles();
initializeTargets();
initializeObstacles();

bindTarget(vehicles,targets);
bindObstacles(vehicles,obstacles);
matingPool=[];
childrenPool=[];

}


function initializeVehicles(){
	if(childrenPool.length==0){

		for(var i=0;i<totalVehicles;i++){
		vehicles[i]= new Vehicle();
		}
	}
	else{
		for(var i=0;i<childrenPool.length;i++){
		vehicles[i]= childrenPool[i];
		}

	}
}
function initializeTargets(){
	for(var i=0;i<totalTargets;i++){
	targets[i]= new Target();
	}
}

function initializeObstacles(){
	for(var i=0;i<totalObstacles;i++){
	obstacles[i]= new Obstacle();
	}
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







