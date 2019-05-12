var canvasLength=1400;
var canvasWidth=700;
var sidebarLength=100;
var thickness=2; // DECIDES what no of squares will beselected on DRAG
var sqSize=30;

var fps=200;
var bgcolor;
var time=0;
var totalMice=5;

CanvasBoundary = {
	left: 0,
	right: canvasLength,
	top: 0,
	bottom: canvasWidth 
}


//DONT CHANGE THESE
var gameStarted=false;

//RULES
var rules;



//GENETIC NEEDS
var matingPool=[];
var childrenPool=[];
var totalGenerations=123;
var currentGeneration=0;
var mutationPercent=1;
var generationTime=0;




var mice=[];
var obstacles=[];
var targets=[];
var totalTargets=1;
var totalObstacles=30;



var ground;

var buttons=[];


function setup(){
//debugger;	
createCanvas(canvasLength-sidebarLength+1, canvasWidth+1);
frameRate(fps);
bgcolor=color(0,0,0);
rules= new Rules();
ground= new Ground();

ground.initialize(canvasLength-sidebarLength,canvasWidth,sqSize);
showButtons();





  // button.mousePressed(changeBG);


}


//WHENEVER MOUSE IS DRAGGED DO STUFF
function mouseDragged() {
for(var i=0;i<buttons.length;i++){
			if(buttons[i].isactive){
				if(buttons[i].isDragOrClick==="DRAG"){
					buttons[i].activeBehaviour();	
				}
			}
	}
 }


 function mouseClicked() {
for(var i=0;i<buttons.length;i++){
			if(buttons[i].isactive){
				if(buttons[i].isDragOrClick==="CLICK"){
					buttons[i].activeBehaviour();	
				}
			}
	}
 }



function draw(){
	time++;
	bgcolor=color(0,0,0);
	background(bgcolor);
	
 	ground.show();

 	// console.log("ALL MOUSE",mice);
 	rules.apply(mice,ground);
 	moveObjects(mice);
	showObjects(mice);
	ground.showGlass();


}








//BUTTON BEHAVIOURS
function startBehaviour(){
	createMiceIfNotAlready();
}

function stopBehaviour(){
	killMice();
}

function glassBehaviour(){
var sq= ground.findSquare(mouseX,mouseY);
ground.addGlass(sq,thickness);
}

function wallBehaviour(){
// console.log("ADDING WALL"+ mouseX+"  "+mouseY);
var sq= ground.findSquare(mouseX,mouseY);
ground.addWall(sq,thickness);
}



//SHOW BUTTONS
function showButtons(){


var wallButton=createButton('Add Wall');
wallButton.activeBehaviour=wallBehaviour;
wallButton.mousePressed(changeState.bind(this, wallButton));
wallButton.isDragOrClick="DRAG";
buttons.push(wallButton);

var glassButton=createButton('Add Glass');
glassButton.activeBehaviour=glassBehaviour;
glassButton.mousePressed(changeState.bind(this, glassButton));
glassButton.isDragOrClick="DRAG";
buttons.push(glassButton);

var startButton=createButton('Start Game');
startButton.activeBehaviour=startBehaviour;
startButton.mousePressed(changeState.bind(this, startButton));
startButton.isDragOrClick="CLICK";
buttons.push(startButton);

var stopButton=createButton('Stop Game');
stopButton.activeBehaviour=stopBehaviour;
stopButton.mousePressed(changeState.bind(this, stopButton));
stopButton.isDragOrClick="CLICK";
buttons.push(stopButton);


//DISPLAY ABOVE BUTTONS
for(var i=0;i<buttons.length;i++){
			buttons[i].position(canvasLength-sidebarLength+20, (i+1)* 30);

	}





}



function changeState(but){


	for(var i=0;i<buttons.length;i++){
			buttons[i].style('background-color', color(255, 255,255));
			buttons[i].isactive=false;
	}

var col = color(25, 23, 200, 50);
but.style('background-color', col)
but.isactive=true;

}




















function createMiceIfNotAlready(){
	console.log("STARTING GAME");
		if(gameStarted===true)
			return;
		gameStarted=true;

		for(var i=0;i<totalMice;i++){
			if(i%2==0)
				{mice[i]= new MaleMouse();}
			else
				{mice[i]= new FemaleMouse();}
		
		}
	
}

function killMice(){
	mice=[];
	gameStarted=false;
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







