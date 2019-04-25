var canvasLength=1400;//LEFT TO RIGHT
var canvasWidth=700;
var circle;
var destination;
var obstacles=[];
var noOfObstacles=3;
var brain;	
var rules;
var time=0;

var fps=60;



SquareBoundary = {
	left: 0,
	right: canvasLength,
	top: 0,
	bottom: canvasWidth 
}

function setup() {
  createCanvas(canvasLength, canvasWidth);
  
  frameRate(fps);
    circle= new Circle();
    brain= new Brain();
    destination= new Destination();
    for(var i=0;i<noOfObstacles;i++){
    	 obstacles.push(new Obstacle());
    }
    
    rules= new Rules();  
    
}

function draw() {
background(153);time++;


 for(var i=0;i<noOfObstacles;i++){
  
obstacles[i].show();
obstacles[i].move();// IN THIS ORDER
}
circle.move(null,brain);
circle.show();
destination.move();
destination.show();

if(!rules.withinBoundary(circle,SquareBoundary)){
			circle.yVel=0;circle.xVel=0;
			
	}

rules.bounce(destination,SquareBoundary);
	

if(rules.touched(circle,destination)){
			circle.yVel=0;circle.xVel=0;
			noLoop();
			console.log("WON")
	}

for(var i=0;i<noOfObstacles;i++){
	rules.squareBounce(obstacles[i],SquareBoundary);
 
	if(rules.collide(circle,obstacles[i])){
				circle.yVel=0;circle.xVel=0;
				noLoop();
				console.log("Lost")
		}
	}
  
}

// function keyPressed() {
//  //circle.move(keyCode);

// }

function Destination(){

this.x=random(width -10,width);
this.y=random(10 ,height);
this.velocityFactor=10;
this.xVel=0;
this.yVel=0;
this.diameter=80;

this.move = function(){
	this.xVel=random(2)-1;
	this.yVel=random(2)-1;		//random of -1,0,1

		
	}

this.show = function(){
		this.x=this.x+(this.xVel*this.velocityFactor);
		this.y=this.y+(this.yVel*this.velocityFactor);
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}


}

function Circle(){

	this .x=random(10,20);//width
	this .y=random(10,height);
	this.xVel=0;
	this.yVel=0;
	this.velocityFactor=6;
	this.diameter=20;

	this.move = function(keyCode,brain){
	
		if(brain){

		x=brain.getNextMove(this,destination, obstacles,SquareBoundary,time);
		
		keyCode=x;	
		}

			if (keyCode === LEFT_ARROW) {
				this.xVel=-1;this.yVel=0;

	  		} else if (keyCode === RIGHT_ARROW) {
	    		this.xVel=1;this.yVel=0;
	  		}else if (keyCode === UP_ARROW) {
	    		this.yVel=-1;this.xVel=0;
	  		}else if (keyCode === DOWN_ARROW) {
	    		this.yVel=1;this.xVel=0;
	  		}else if (keyCode === 32){//SPACE
	  			this.yVel=0;this.xVel=0;
	   		}	

		
		

	 	//ellipse(this.x, this.y, this.diameter, this.diameter);
	}




	this.show = function(){
		this.x=this.x+(this.xVel*this.velocityFactor);
		this.y=this.y+(this.yVel*this.velocityFactor);
		fill(255);
	 	ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}


function Obstacle(){

	
	this.width=random(50,100);
	this.height=random(50,100);
	this.x=random(30,canvasLength-this.width);
	this.y=random(10,height-this.height);
	this.r=random(256);
	this.g=random(256);
	this.b=random(256);
	this.xVel=0;
	this.yVel=0;
	this.velocityFactor=4
	this.counter=random(50);// TIME for which velocity is maintained
	
	this.move= function(){
		//console.log(this.x,this.y,this.counter);
		
		if (this.counter<1)
			{this.counter=random(50)
			this.xVel=(random(2)-1)*this.velocityFactor;
			this.yVel=(random(2)-1)*this.velocityFactor;	
		}else{
			this.x=this.x+this.xVel;
			this.y=this.y+this.yVel;
			this.counter--;
		}


	}

	this.show = function(){
		
		fill(this.r,this.g,this.b);
	 	rect(this.x,this.y ,this.width , this.height);
	}
}





