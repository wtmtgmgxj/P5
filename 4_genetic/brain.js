var outputSpace=4;
function Neuron(){

	this.input={};
	this.output;


	
}


function Brain(){

	this.averageCost=0 ;
	this.totalAttempts=0;
	this.lastCircle;
	this.lastCost=0;
	this.lastDirection;


this.setVariables=function(cost,circle){
	
	console.log("TOTAL ATTEMPTS "+this.totalAttempts+".   AVG COST"+ this.averageCost+".  LAST COST--"+this.lastCost);
		this.lastCircle=circle;
		
		var totalCosts=this.averageCost*this.totalAttempts;
	this.totalAttempts++;
	totalCosts+=cost;
	this.averageCost=totalCosts/this.totalAttempts;
	
	this.lastCost=cost;
}

this.getNextMove=function(circle,destination,obstacles,boundary,time){

	
	console.log(circle.attractionToDestination+".  AAAAAA  "+circle.attractionToObstacles);

	var direction;
	var xTendency=circle.attractionToDestination*Math.sign(destination.x-circle.x);
	 xTendency+=circle.attractionToObstacles*Math.sign(this.closestObstacle(circle,obstacles).x-circle.x);

	 var yTendency=circle.attractionToDestination*Math.sign(destination.y-circle.y);
	 yTendency+=circle.attractionToObstacles*Math.sign(this.closestObstacle(circle,obstacles).y-circle.y);
	
	 if(Math.abs(xTendency)>Math.abs(yTendency)){
	 	if(xTendency>0){
	 		direction=1;
	 	}else {
	 		direction=0;
	 	}

	 }else if(Math.abs(xTendency)<Math.abs(yTendency)){//Y TEndency is greater 
	if(yTendency>0){
	 		direction=3;
	 	}else {
	 		direction=2;
	 	}

	 }else if(xTendency===0){//HANDBRAKE since x and y tendency both are 0
	 	direction=5;
	 }else{// both x and y amount to something but are non 0// CHOOSE RANDDOM
	 	var newDir=Math.floor(random(5));
	 	if(newDir<2){//Xdirection
	 		if(Math.sign(xTendency)===-1){
	 			direction=0
	 		}else{
	 			direction=1;
	 		}
	 	}else{
	 		if(Math.sign(yTendency)===-1){
	 			direction=2
	 		}else{
	 			direction=3;
	 		}

	 	}

	 }	



	var x=direction;

	var a;
		if (x===0)
			{a = LEFT_ARROW
			}
		else if (x===1)
			{a = RIGHT_ARROW
			}
		else if (x===2)
			{a = UP_ARROW
			}
		else if (x===3)
			{a = DOWN_ARROW
			}
		else if (x===4)
			{a =32
			}
	
	this.lastDirection=a;
	return a;



	}


//METHOD
this.closestObstacle=function(circle,obstacles){
var minDist=10000000;
var closestObstacle;


for(var i=0;i<noOfObstacles;i++){
	var distance=this.distCalc(circle,obstacles[i]);
	//console.log('DISTANCE----->'+distance+"      MIDIST--"+minDist);
	if(distance<minDist){
		minDist=distance;
		closestObstacle=obstacles[i];
	}

}
return closestObstacle;
}


//METHOD
this.distCalc=function(circle,obstacle){
	var top=obstacle.y;
	var bottom=top+obstacle.height;
	var left=obstacle.x;
	var right=left+obstacle.width;

	var dx = Math.max(left - circle.x, 0, circle.x - right);
  var dy = Math.max(top - circle.y, 0, circle.y - bottom);
  return Math.sqrt(dx*dx + dy*dy);



}


//METHOD
this.calculateCostFunction=function(circle,destination,obstacles,boundary,time){

targetDistance=Math.sqrt(Math.pow((circle.x - destination.x),2)+ Math.pow((circle.y - destination.y),2));

var obstacle=this.closestObstacle(circle,obstacles);

var obstDist=this.distCalc(circle,obstacle);
console.log("Obstacle Distance.  "+obstDist);


//OBS Distance cost must decrease rapidly as we move away and increase rapidly as we come closer
// a method that can get this is y= e^(-1.5(x-10))// WHERE 10 might be the distance you surely want to maintain,
//at x=10 ,y=e at x=9 its greater and increases exponentially

costForObstacle=Math.exp((-1.5)*(obstDist-30));

//TARGET DISTANCE IS linear and obstacle is exponential, means we wnat to reach target distance but dotn want to collide

console.log('COST FOR OBSTACLE ' +costForObstacle+'.    '+"cost for targetDistance"+targetDistance);


var cost=targetDistance+costForObstacle;

return cost;
	
}



}


