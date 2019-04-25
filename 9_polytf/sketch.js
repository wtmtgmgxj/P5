var canvasLength=700;
var canvasWidth=700;
var fps=30;
var bgcolor;
var time=0;



var points=[];


//LEARNING INPUTS
//mx +b
let m;//TENSORFLOW VAR M
let b;//TENSORFLOW VAR B
var learningrate=0.5;
// var optimizer=tf.train.adagrad(learningrate);
var optimizer=tf.train.sgd(learningrate);


function setup(){
createCanvas(canvasLength, canvasWidth);
frameRate(fps);
bgcolor=color(0,0,0);

m=tf.variable(tf.scalar(1));
b=tf.variable(tf.scalar(0.5));




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
		var liney;
		linex=[-1,1];
		tf.tidy(()=>{
		liney=predict(linex).dataSync();
		});
		//console.log(liney);
		x0=map(linex[0],-1,1,0,canvasLength);
		x1=map(linex[1],-1,1,0,canvasLength);
		y0=map(liney[0],-1,1,canvasWidth,0);
		y1=map(liney[1],-1,1,canvasWidth,0);
		stroke(255);
		strokeWeight(2);
		//console.log("XoXOXOXOXOXOX ---------"+x0,y0,x1,y1);

		line(x0,y0,x1,y1);	

}





function predict(x){
	const xs=tf.tensor1d(x);
	//Y=MX+B, is my regression 
	const ys= xs.mul(m).add(b);
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



