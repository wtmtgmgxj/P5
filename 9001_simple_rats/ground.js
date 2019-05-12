function Wall(x,y,sqX,sqY,size){
	Square.call(this, x,y,sqX,sqY,size);
	this.colour=color(193, 154, 107);
	this.walkable=false;

}




function Glass(x,y,sqX,sqY,size){
	Square.call(this, x,y,sqX,sqY,size);
	this.colour=color(127,200,255,127);
	this.walkable=false;

}


function Grass(x,y,sqX,sqY,size){
	Square.call(this,x,y,sqX,sqY,size);
	this.colour=color(50,255,50);
	this.walkable=true;
}


function Square(x,y,sqX,sqY,size){
	
	this.xP=sqX;
	this.yP=sqY;
	this.x=x;
	this.y=y;
	this.size=size;
	this.colour
	this.left=x;
	this.top=y;
	this.right=x+size;
	this.bottom=y+size;



	this.show=function(myColour){
		var defaultColor=color(25,200,25);

		var from=color(0,255,0);
		var to=color(255,0,0);

		if(myColour){
			from=myColour;
			to=myColour;
			this.colour=lerpColor(from,to,map(this.x,0,1400,0,1))
		}
		if(this.colour===undefined)
			this.colour=defaultColor;
		



		fill(this.colour);
		noStroke();
		rect(x,y,size,size);

	}




}

function Ground(){

	
	this.squares;
	this.totalSquaresInRow;
	this.totalSquaresInCol;
		

	


	//OTHER PARAMS
	this.pos=createVector(random(width/20),random(height))
	this.sizefactor=1*map(this.mass,0,maxMass,1,3);
	this.velocity=createVector(random(-1,1),random(-1,1));
	this.acceleration=createVector(0,0);
	
	




	this.addWall=function(sq,thickness){
		if(sq === undefined){return;}

		// console.log("THIS",sq);
		
		var left=max(0,sq.xP-thickness);
		var right=min(sq.xP+thickness,this.totalSquaresInRow-1);// FIND WHY THIS BUG
		var top=max(0,sq.yP-thickness);
		var bottom=min(sq.yP+thickness,this.totalSquaresInCol);

		for(var i=left;i<=right;i++){
			for(var j=top;j<=bottom;j++){
				
				if(this.squares[i][j]===undefined){continue;}
				var orgSq=this.squares[i][j];
				this.squares[i][j]=new Wall(orgSq.x,orgSq.y,orgSq.xP,orgSq.yP,orgSq.size);

			}
		
		}

	}

	this.addGlass=function(sq,thickness){
		if(sq === undefined){return;}

		// console.log("THIS",sq);
		
		var left=max(0,sq.xP-thickness);
		var right=min(sq.xP+thickness,this.totalSquaresInRow-1);// FIND WHY THIS BUG
		var top=max(0,sq.yP-thickness);
		var bottom=min(sq.yP+thickness,this.totalSquaresInCol);

		for(var i=left;i<=right;i++){
			for(var j=top;j<=bottom;j++){
				
				if(this.squares[i][j]===undefined){continue;}
				var orgSq=this.squares[i][j];
				this.squares[i][j]=new Glass(orgSq.x,orgSq.y,orgSq.xP,orgSq.yP,orgSq.size);

			}
		
		}

	}





	this.findSquare=function(x,y){
		for (var i=0;i<this.totalSquaresInRow;i++){
			for (var j=0;j<this.totalSquaresInCol;j++){
			var currSquare=this.squares[i][j];
			
				if(x>= currSquare.x && y>=currSquare.y
					&& x<currSquare.x+currSquare.size
					&& y<currSquare.y+currSquare.size)

					return currSquare;

			}
		}

	}



	this.initialize=function(length,width,squareSize){
		this.squares=[];
		var i,j,sqI,sqJ;
		
		for ( i=0,sqI=0; i<length-squareSize/2; i+=squareSize, sqI++){
			this.squares[sqI]=[];
		
			for(var j=0,sqJ=0;j<width-squareSize/2;j+=squareSize,sqJ++){

				var sq= new Grass(i,j,sqI,sqJ,squareSize);
				
				this.squares[sqI][sqJ]=sq;
				sq.show();

				
			}
		}
		this.totalSquaresInRow=sqI;
		this.totalSquaresInCol=sqJ;

	}

	this.show=function(){
		
		for (var i=0;i<this.totalSquaresInRow;i++){
			for (var j=0;j<this.totalSquaresInCol;j++){
			// this.squares[i].colour=color(random(255),random(255),random(255));;
			this.squares[i][j].show();
			}
		}


	}

	this.showGlass=function(){
		
		for (var i=0;i<this.totalSquaresInRow;i++){
			for (var j=0;j<this.totalSquaresInCol;j++){
			// this.squares[i].colour=color(random(255),random(255),random(255));;
			if(this.squares[i][j] instanceof Glass){
				this.squares[i][j].show();	
				}
			
			}
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


