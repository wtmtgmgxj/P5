var canvasLength=600;
var circle;
var time=10;
var inCounter=0;
var totalCounter=0;
var myText;
var fps=300;

function setup() {
  createCanvas(canvasLength, canvasLength);
  background(153);
  frameRate(fps);
    circle= new Circle(); 
    myText= new MyText(); 
    circle.show();
}

function draw() {
	if(time==0)noLoop();
	 time --;

	var bullet=new Bullets();
	bullet.show();
	
	if(bullet.inside(circle)){
		inCounter++;
	}
	totalCounter++;
	

	myText.show(inCounter,totalCounter);



  // if (mouseIsPressed) {
  //   fill(0);
  // } else {
  //   fill(random(256),random(256),random(256));
  // }
  //ellipse(mouseX, mouseY, 80, 80);
  
}

function Circle(){

	this .x=canvasLength/2;
	this .y=canvasLength/2;
	this .diameter=canvasLength;

	this.show = function(){
		console.log(this.x);
	 	ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}


function Bullets(){

	this .x;
	this .y;
	this .radius;

	this.inside = function(c){
		var centerdistance=dist(this.x,this.y,c.x,c.y);
		if(centerdistance>c.diameter/2){
			return false;	
		}else
		return true;

	}
	this.show = function(){
		this.x=random(canvasLength);
		this.y=random(canvasLength);
		fill(random(256),random(256),random(256));
	 	ellipse(this.x, this.y, 8, 8);
	}
}

function MyText(){

this.show = function(inCounter,totalCounter){
		
	fill(0);
	text("Answer : "+(4*inCounter/totalCounter), 10, 100, 70, 80);
	console.log(4*inCounter/totalCounter);
	}

}



