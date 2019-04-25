function Wall(x,y,size){
	Square.call(x,y,size);
	this.colour=color(70,25,7);
	this.walkable=1;
}

function Grass(x,y,size){
	Square.call(x,y,size);
	this.colour=color(0,255,0);
	this.walkable=0;
}


function Square(x,y,size){
	this.x=x;
	this.y=y;
	this.size=size;
	this.colour



	this.show=function(myColour){

		var from=color(0,255,0);
		var to=color(255,0,0);

		if(myColour){
			from=myColour;
			to=myColour;
		}
		// this.colour=lerpColor(from,to,map(this.x,0,1400,0,1))



		fill(this.colour);
		rect(x,y,size,size);

	}




}

function Ground(){

	
	this.squares		

	


	//OTHER PARAMS
	this.pos=createVector(random(width/20),random(height))
	this.sizefactor=1*map(this.mass,0,maxVehicleMass,1,3);
	this.velocity=createVector(random(-1,1),random(-1,1));
	this.acceleration=createVector(0,0);
	
	




	this.initialize=function(length,width,squareSize){
		this.squares=[];
		for (var i=0;i<length-squareSize/2;i+=squareSize){
			for(var j=0;j<width-squareSize/2;j+=squareSize){

				var sq= new Square(i,j,squareSize);
				sq.colour=color(255,255,255);
				this.squares.push(sq);
				sq.show();
			}
		}


	}

	this.show=function(){
		console.log("this.squares.length");
		for (var i=0;i<this.squares.length;i++){
			this.squares[i].colour=color(random(255),random(255),random(255));;
			this.squares[i].show();
			}


	}

	



	// this.show= function(){
	// 	//this.health-=1;
	// 	push();
	// 	translate(this.pos.x, this.pos.y);


	// 	//rotate(random(0,PI*2));
	// 	//rotate(PI/2);
	// 	rotate(this.velocity.heading()+PI/2);
	// 	var from=color(0,255,0);
	// 	var to=color(255,0,0);
		
	// 	fill(lerpColor(from,to,map(this.mass,minVehicleMass,maxVehicleMass,0,1)))

	// 	if(this.health<1){
			
	// 		fill(color(0,0,255));

	// 	}
	// 	triangle(0, 0, -5*this.sizefactor, 10*this.sizefactor, 5*this.sizefactor, 10*this.sizefactor);
	// 	// console.log(this.health);
		
	// 	pop();
	// }


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


