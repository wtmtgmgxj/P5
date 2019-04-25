


function Rules(){

}

Rules.prototype.squareBounce = function(obstacle,boundary){
	
		if (obstacle.x+obstacle.width>boundary.right)
		obstacle.xVel=obstacle.xVel*-1;
	if (obstacle.x<boundary.left)
		obstacle.xVel=obstacle.xVel*-1;
	if (obstacle.y+obstacle.height>boundary.bottom)
		obstacle.yVel=obstacle.yVel*-1;
	if (obstacle.y<boundary.top)
		obstacle.yVel=obstacle.yVel*-1;
	
}


Rules.prototype.withinBoundary = function(circle,boundary){
	
	if (circle.x+circle.diameter/2>boundary.right)
		return false;
	if (circle.x-circle.diameter/2<boundary.left)
		return false;
	if (circle.y+circle.diameter/2>boundary.bottom)
		return false;
	if (circle.y-circle.diameter/2<boundary.top)
		return false;
	return true
}

Rules.prototype.bounce = function(circle,boundary){
	
		if (circle.x+circle.diameter/2>boundary.right)
		circle.x=circle.x-2;
	if (circle.x-circle.diameter/2<boundary.left)
		circle.x=circle.x+2;
	if (circle.y+circle.diameter/2>boundary.bottom)
		circle.y=circle.y-2;
	if (circle.y-circle.diameter/2<boundary.top)
		circle.y=circle.y+2;
	
}
Rules.prototype.collide = function(circle,obstacle){
	var top=obstacle.y;
	var bottom=top+obstacle.height;
	var left=obstacle.x;
	var right=left+obstacle.width;


	//IF within y Range and x Touches from either side, Collide	
		if(top<circle.y+circle.diameter/2 && bottom>circle.y-circle.diameter/2 ){
			if(left<circle.x+circle.diameter/2 && right>circle.x-circle.diameter/2){
				return true;
			}
		}
	
	return false;
		
	
}


Rules.prototype.touched = function(circle,dest){
	//console.log(circle.x+".   "+dest.x+".  "+circle.y+".  "+dest.y);

if (Math.abs(circle.x-dest.x)<circle.diameter/2+dest.diameter/2
	&& Math.abs(circle.y-dest.y)<circle.diameter/2+dest.diameter/2
	)
	return true;


	return false;
}

