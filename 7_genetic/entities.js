function Vehicle(){

	this.mass=random(minVehicleMass,maxVehicleMass);
	this.pos=createVector(random(width/20),random(height))
	this.sizefactor=1*map(this.mass,0,maxVehicleMass,1,3);
	this.velocity=createVector(random(-1,1),random(-1,1));
	this.acceleration=createVector(0,0);
	
	this.target;
	this.obstacle;
	this.allObstacles;
	this.terminated=false;
	

	//GENETIC POOL PARAMETERS
	
	this.maxVelocity=5;
	this.maxAcceleration=1;
	this.targetAttraction=5;
	this.obstAttraction=-100000;

	//SCORE PARAMETERS
	this.health=1000;
	this.closestEverDistanceToTarget=100000000;
	this.timeTaken;


		
	this.calculateClosestToTarget=function(){
		var distance=p5.Vector.sub(this.pos, this.target.pos);
		if(distance.mag()<this.closestEverDistanceToTarget)
			this.closestEverDistanceToTarget=distance.mag();

	}

	this.calcSizeFactor=function(){
		//console.log(this.mass);
		this.sizefactor=1*map(this.mass,0,maxVehicleMass,1,5);
	}


	this.terminatingNow=function(){
		
		

		var distance=p5.Vector.sub(this.pos, this.target.pos);
		if(distance.mag()<20){
			this.terminated=true;
			this.timeTaken=time;// TIME VARIABLE FROM SKETCHJS, DONT REALLY KNWO HOW TO CODE In JAVASCRIPT
			}
		else if(this.health<0){
			this.terminated=true;
			this.timeTaken=-1;// SINCE ITS BAD TO DIE
		}

		
		
		


		return this.terminated;

	}


	this.move=function(){

		if( this.terminated || this.terminatingNow()){
				
				this.acceleration.setMag(0);
    	 		this.velocity.setMag(0);
    	 }


		
		this.findAndSetClosestObstacle();
		this.calculateClosestToTarget();


		var targetForce=this.attractTarget();
		var obstForce=this.attractObstacle();
		var desired=p5.Vector.add(targetForce,obstForce);
		var steer=p5.Vector.sub(desired, this.velocity);
		this.feelForce(steer);

		

		rules.vehicleBounce(this,CanvasBoundary);
		if(rules.collide(this,this.obstacle)){
			this.health=-1;
			//this.mass+=1000;
			//noLoop();
		}
		

		


	}
	


//FUNCTION
	this.findAndSetClosestObstacle=function(){
		var minDist=10000000;
		var closestObstacle;


	for(var i=0;i<this.allObstacles.length;i++){
	var distance=this.distCalc(this.allObstacles[i]);
	//console.log('DISTANCE----->'+distance+"      MIDIST--"+minDist);
	if(distance<minDist){
		minDist=distance;
		closestObstacle=this.allObstacles[i];
		}

	}
	this.obstacle=closestObstacle;
	this.obstacle.setRedColor();


	}



//FUNCTION
	this.distCalc=function(obstacle){
	var top=obstacle.y;
	var bottom=top+obstacle.height;
	var left=obstacle.x;
	var right=left+obstacle.width;

	var dx = Math.max(left - this.pos.x, 0, this.pos.x - right);
  var dy = Math.max(top - this.pos.y, 0, this.pos.y - bottom);
  //console.log("Distance metrics "+top+":"+bottom+":"+left+":"+right+".  "+dx+":"+dy);
  return Math.sqrt(dx*dx + dy*dy);



}





	//gives the vector after calculating target attraction
	this.attractTarget=function(){


			var desired=p5.Vector.sub(this.target.pos,this.pos);// Subtract position from target
			var attraction=p5.Vector.sub(desired, this.velocity);

  				//IMP CODE
  				var distance=desired.mag();
  				attraction.setMag(this.targetAttraction);
  				

  				

    	return attraction;

	}

	this.attractObstacle=function(){
		//debugger;

			var obstalceVector=createVector((this.obstacle.x+this.obstacle.x+this.obstacle.width)/2,(this.obstacle.y+this.obstacle.y+this.obstacle.height)/2);
			var desired=p5.Vector.sub(obstalceVector,this.pos);// Subtract position from target
			var attraction=p5.Vector.sub(desired, this.velocity);

  				//IMP CODE
				var distance=desired.mag();
					

  				attraction.setMag(this.obstAttraction/(distance*distance));
  				
    	return attraction;

	}

	

	this.feelForce= function(force){

		if(this.terminated)
			return;


		this.acceleration=force.setMag(force.mag()/this.mass);
		this.acceleration=this.acceleration.setMag( Math.min(this.acceleration.mag(),this.maxAcceleration));
		//console.log("NewAcc: "+this.acceleration);



		this.velocity=p5.Vector.add(this.velocity,this.acceleration);
		this.pos=p5.Vector.add(this.pos,this.velocity);

	}



	this.setTarget= function(target){
		this.target=target;

	}

	this.setAllObstacles= function(obstacles){
		this.allObstacles=obstacles;

	}
	
	


	this.show= function(){
		//this.health-=1;
		push();
		translate(this.pos.x, this.pos.y);


		//rotate(random(0,PI*2));
		//rotate(PI/2);
		rotate(this.velocity.heading()+PI/2);
		var from=color(0,255,0);
		var to=color(255,0,0);
		
		fill(lerpColor(from,to,map(this.mass,minVehicleMass,maxVehicleMass,0,1)))

		if(this.health<1){
			
			fill(color(0,0,255));

		}
		triangle(0, 0, -5*this.sizefactor, 10*this.sizefactor, 5*this.sizefactor, 10*this.sizefactor);
		// console.log(this.health);
		
		pop();
	}


}




function Target(){
this.pos=createVector(width-random((width/3)),random(height))
this.radius=5;
this.id=random(12);

this.show= function(){
		push();
		translate(this.pos.x, this.pos.y);
		

		fill(0,0,255);
		ellipse(0, 0,2*this.radius,2*this.radius);

		pop();
	}

}










function Obstacle(){

	
	this.width=random(50,100);
	this.height=random(50,100);
	this.x=random(width/18,canvasLength-this.width);
	this.y=random(10,height-this.height);
	this.r=random(256);
	this.g=random(256);
	this.b=random(256);
	this.xVel=0;
	this.yVel=0;
	this.velocityFactor=4
	this.counter=random(100);// TIME for which velocity is maintained
	
	this.move= function(){
		//console.log(this.x,this.y,this.counter);
		
		if (this.counter<1)
			{this.counter=random(100)
			this.xVel=(random(2)-1)*this.velocityFactor;
			this.yVel=(random(2)-1)*this.velocityFactor;	
		}else{
			this.x=this.x+this.xVel;
			this.y=this.y+this.yVel;
			this.counter--;
		}

		rules.obstacleBounce(this,CanvasBoundary);


	}

	this.show = function(){
		
		fill(this.r,this.g,this.b);
		//console.log("I am Obstalce "+this.x+"::"+this.y+"::"+this.width+"::"+this.height);
	 	rect(this.x,this.y ,this.width , this.height);
	}

	//FUNCTION
	this.setRedColor=function(){

		this.r=255;
		this.g=0;
		this.b=0;

	}

}


