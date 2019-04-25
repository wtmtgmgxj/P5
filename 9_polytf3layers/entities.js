function Point(vector,z,w){
	this.pos=vector;// SHOW DIAGRAM VIA THIS
	this.radius=5;
	this.mappedX=z;
	this.mappedY=w;


	this.show=function(){

		push();translate(this.pos.x, this.pos.y);


		stroke(255);
		ellipse(0, 0,2*this.radius,2*this.radius);
		pop();
	}

}