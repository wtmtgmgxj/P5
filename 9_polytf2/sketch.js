var canvasLength=700;
var canvasWidth=700;
var fps=30;
var bgcolor;
var time=0;



var points=[];


//LEARNING INPUTS
//ax2 +bx +c + dx3
let a;//TENSORFLOW VAR M
let b,c,d,e,f;//TENSORFLOW VAR B

var learningrate=0.5;
var optimizer=tf.train.adagrad(learningrate);
// var optimizer=tf.train.sgd(learningrate);


function setup(){
createCanvas(canvasLength, canvasWidth);
frameRate(fps);
bgcolor=color(0,0,0);

a=tf.variable(tf.scalar(1));
b=tf.variable(tf.scalar(0));
c=tf.variable(tf.scalar(0));
d=tf.variable(tf.scalar(0));
e=tf.variable(tf.scalar(1));
f=tf.variable(tf.scalar(1));




}


function mouseDragged(){

	var z=map(mouseX,0,canvasLength,-1,1);
	var w=map(mouseY,0,canvasWidth,1,-1);

	var p=new Point(createVector(mouseX,mouseY),z,w);
	
	points.push(p);
	

}
function mouseClicked(){

	mouseDragged();
	

}


function draw(){
	background(bgcolor);// REMOVES PREVIOUS CRAP
	showObjects(points);
	var xx,yy;
	
	tf.tidy(()=>{



	 xx=getXs(points).dataSync();//DATA SYNC TENSORFLOW
	 yy=getYs(points).dataSync();
	
	});


	if(points.length>1){

		tf.tidy(()=>optimizer.minimize(()=>loss(predict(xx),getYs(points))));
		//optimizer.minimize(()=>loss(predict(xx),getYs(points)));

		//ys_vals=ys.dataSync();
		
		// console.log("M ");
		// m.print();
		//  console.log("B ");
		//  b.print();


	}
		// tf.memory().numTensors;
		var curveY;
		var curveX=createCurve();
		tf.tidy(()=>{
		curveY=predict(curveX).dataSync();
		});
		
		beginShape();
		noFill();
		for(let i=0;i<curveX.length;i++){
		x0=map(curveX[i],-1,1,0,canvasLength);
		y0=map(curveY[i],-1,1,canvasWidth,0);
		stroke(0,0,255);
		strokeWeight(2);
		vertex(x0,y0);
		}
		endShape();
		
		
}




function createCurve(){
	var curv=[];	
	for(var i=-1;i<1;i+=.05){
		curv.push(i);
	}
return curv;
}

function predict(x){
	const xs=tf.tensor1d(x);
	//Y=MX+B, is my regression 
	const ys= a.mul(xs.square())
				.add(b.mul(xs))
				.add(c)
				.add(xs.square().mul(xs).mul(d))
				.add(xs.square().mul(xs.square()).mul(e))
				.add(xs.square().mul(xs.square()).mul(xs).mul(f));
	return ys;

}



function loss(pred,labels){
//BOTH ARE TESNSORS
const loss=pred.sub(labels).square().mean();
// console.log("LOSSSS ");
// 		loss.print();
return loss;
}



function getXs(points){
	var x_vals=[];
	for(var i=0;i<points.length;i++){
		x_vals.push(points[i].mappedX);
	}
	return tf.tensor1d(x_vals);

}

// function corrected(yTensor){
// 	const widthTensor=tf.fill(yTensor.shape,canvasWidth);// GIVES A TENSOR OF SAME SHAPE AS ABOVE FILLED WITH CANVASWIDTH
// 	return widthTensor.sub(yTensor);

// }

function getYs(points){
	var y_vals=[];
	for(var i=0;i<points.length;i++){
		y_vals.push(points[i].mappedY);
	}
	return tf.tensor1d(y_vals);

}


function showObjects(objectArr){
	for(var i=0;i<objectArr.length;i++){

		objectArr[i].show();
	}

}



