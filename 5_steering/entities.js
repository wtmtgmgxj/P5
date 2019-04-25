function Vehicle(){

	this.mass=random(minVehicleMass,maxVehicleMass);
	this.pos=createVector(random(width),random(height))
	this.sizefactor=1*map(this.mass,0,300,1,10);
	this.velocity=createVector(random(-1,1),random(-1,1));
	this.acceleration=createVector(0,0);
	this.maxVelocity=5;
	this.maxAcceleration=1;
	this.target;
	this.targetApproachRange=5;// if target within this radius scale down acceleration 
	
	this.move=function(){
		//this.pos=p5.Vector.add(this.pos,this.velocity);
		
		if(this.target){



		
			var desired=p5.Vector.sub(this.target.pos,this.pos);// Subtract position from target
			

		// Scale to maximum speed
		desired.setMag(this.maxVelocity);
		// Steering = Desired minus velocity
    	var steer=p5.Vector.sub(desired, this.velocity);
    		

    	var distToTarget =p5.Vector.sub(this.target.pos,this.pos).mag();
    	
    	 if(distToTarget<this.targetApproachRange){
    	 	var newMag=map(distToTarget,0,this.targetApproachRange,0,steer.mag());
    	 	if(newMag<0.02)
    	 		{newMag=0;
    	 		this.velocity=createVector(0,0);
    	 		//this.eat(this.target);//TODO
    	  		}
    	    steer.setMag(newMag);//SLOWING DOWN WHILE APPROACHING TARGET
    	 }
    	 //console.log("NewSteer: "+steer);
    	

    	//this.pos=p5.Vector.add(this.pos,steer);
    	this.feelForce(steer);
		}



	}
	this.feelForce= function(force){




		this.acceleration=force.setMag(force.mag()/this.mass);
		this.acceleration=this.acceleration.setMag( Math.min(this.acceleration.mag(),this.maxAcceleration));
		//console.log("NewAcc: "+this.acceleration);



		this.velocity=p5.Vector.add(this.velocity,this.acceleration);
		this.pos=p5.Vector.add(this.pos,this.velocity);

	}



	this.setTarget= function(target){
		this.target=target;

	}
	this.show= function(){
		push();
		translate(this.pos.x, this.pos.y);


		//rotate(random(0,PI*2));
		//rotate(PI/2);
		rotate(this.velocity.heading()+PI/2);
		var from=color(0,255,0);
		var to=color(255,0,0);
		console.log(this.mass,minVehicleMass,maxVehicleMass);
		fill(lerpColor(from,to,map(this.mass,minVehicleMass,maxVehicleMass,0,1)))
		triangle(0, 0, -5*this.sizefactor, 10*this.sizefactor, 5*this.sizefactor, 10*this.sizefactor);
		
		
		pop();
	}


}




function Target(){
this.pos=createVector(random(width),random(height))
this.radius=5;

this.show= function(){
		push();
		translate(this.pos.x, this.pos.y);


		

		fill(0,0,255);
		ellipse(0, 0,2*this.radius,2*this.radius);

		pop();
	}




}