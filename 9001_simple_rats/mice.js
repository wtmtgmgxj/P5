var minMass=0.1;
var maxMass=200;
var minVelocity=0.1;
var maxVelocity=20;
var minAcc=0.1;
var maxAcc=2;
var minTargetAcc=1;
var maxTargetAcc=200;
var canvLen=canvasLength;// RENAME TO SHOW IN THIS FILE
var canvWid=canvasWidth;
var changeTargetTime=100;
var timeFreezeWhileSex=50;
var pregnancyTime=150;

function MaleMouse(){//BUCK
	Mouse.call(this);
	this.colour=color(10,40,50);
	this.ConstTimeBeforeNextMate=timeFreezeWhileSex;
}

function FemaleMouse(){//DOES
	Mouse.call(this);
	this.colour=color(255,255,255);
	this.ConstTimeBeforeNextMate=timeFreezeWhileSex+pregnancyTime;
	this.isPregnant;
}


function Mouse(){

	this.time=0;
	this.cannotMateForTime=0;// MOUSE CANNOT MATE TILL THIS IS 0 or NEGATIVE
	this.timeFreeze;// HAPPENS WHEN YOU ARE HAVING SEX, 0 otherwise; // PERSON STOPS MOVING

	this.mass=random(minMass,maxMass);
	this.maxVelocity=random(minVelocity,maxVelocity);
	this.maxAcceleration=random(minAcc,maxAcc);
	this.targetAttraction=random(minTargetAcc,maxTargetAcc);

	this.pos=createVector(random(canvLen/4,canvLen/2),random(canvWid/4,canvWid/2))
	this.sizefactor=1*map(this.mass,0,maxMass,1,3);
	this.velocity=createVector(random(-1,1),random(-1,1));
	this.acceleration=createVector(0,0);
	this.terminated=false;


	this.target=createVector(random(canvLen/2,canvLen),random(canvWid/2,canvWid));

	this.move=function(){

		if(this.timeFreeze>0){
			return;
		}


		this.changeTarget();


		// console.log("MOUSE POSITION",this.pos);
		if( this.terminated){
				
				this.acceleration.setMag(0);
    	 		this.velocity.setMag(0);
    	 }


		//NICE TO HAVE FEATURE FOR DIFFICULTY LEVEL HIGH
		// this.findAndSetClosestObstacle();
		


		var targetForce=this.attractTarget();
		var obstForce=this.attractObstacle();
		var desired=p5.Vector.add(targetForce,obstForce);
		var steer=p5.Vector.sub(desired, this.velocity);
		this.feelForce(steer);

		

		// rules.vehicleBounce(this,CanvasBoundary);
		// if(rules.collide(this,this.obstacle)){
		// 	this.health=-1;
		// 	//this.mass+=1000;
		// 	//noLoop();
		// }

	}

	this.changeTarget=function(){
		// console.log(this.time);
		if(floor(this.time%random(changeTargetTime))==0)
		{
			this.target=createVector(random(0,canvLen),random(0,canvWid));
		}

	}




	this.feelForce= function(force){

		if(this.terminated)
			return;


		this.acceleration=force.setMag(force.mag()/this.mass);
		this.acceleration=this.acceleration.setMag(Math.min(this.acceleration.mag(),this.maxAcceleration));
		this.velocity=p5.Vector.add(this.velocity,this.acceleration);
		this.velocity=this.velocity.setMag(Math.min(this.velocity.mag(),this.maxVelocity));
		this.pos=p5.Vector.add(this.pos,this.velocity);

	}


//gives the vector after calculating target attraction
	this.attractTarget=function(){

			var desired=p5.Vector.sub(this.target,this.pos);// Subtract position from target
			var attraction=p5.Vector.sub(desired, this.velocity);
				attraction.setMag(this.targetAttraction);
		   	return attraction;
	}

	this.attractObstacle=function(){
		return createVector(0,0);
	}


	this.show= function(){
		
		//EXISTENCE PARAMETERS
		this.time++;
		
		if(this.cannotMateForTime>0)
		this.cannotMateForTime--;
		
		if(this.timeFreeze>0)
		this.timeFreeze--;

		


		fill(41);
		stroke(4);
		circle(this.target.x,this.target.y,8);
		
		push();
		translate(this.pos.x, this.pos.y);

		rotate(this.velocity.heading()+PI/2);
		var from=color(0,255,0);
		var to=color(255,0,0);
		
		// fill(lerpColor(from,to,map(this.mass,minMass,maxMass,0,1)))
		fill(this.colour)
		triangle(0, 0, -5*this.sizefactor, 10*this.sizefactor, 5*this.sizefactor, 10*this.sizefactor);
		
		pop();
	}


	this.canMate=function(){
		return this.cannotMateForTime<1;
	}
	this.sexCompatible=function(other){
		if(this instanceof MaleMouse && other instanceof FemaleMouse)
			return true;
		if(this instanceof FemaleMouse && other instanceof MaleMouse)
			return true;
		return false;

	}
	this.startMating=function(){
		this.cannotMateForTime=this.ConstTimeBeforeNextMate;// DIFFERENT FOR MALE AND FEMALE
		this.timeFreeze=timeFreezeWhileSex;
		if(this instanceof FemaleMouse){
			this.isPregnant=true;
		}

	}
	this.wantsToDeliverBabies=function(){
		return this.cannotMateForTime==2;
	}
	this.successFullDelivery=function(){
		this.isPregnant=false;

	}
	
	
	



}