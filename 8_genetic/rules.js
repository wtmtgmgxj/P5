function Rules(){

}

Rules.prototype.obstacleBounce = function(obstacle,boundary){
	
		if(!obstacleBounceRuleOn)
			return;

		if (obstacle.x+obstacle.width>boundary.right)
		obstacle.xVel=obstacle.xVel*-1;
	if (obstacle.x<boundary.left)
		obstacle.xVel=obstacle.xVel*-1;
	if (obstacle.y+obstacle.height>boundary.bottom)
		obstacle.yVel=obstacle.yVel*-1;
	if (obstacle.y<boundary.top)
		obstacle.yVel=obstacle.yVel*-1;
	
}



Rules.prototype.obstacleObstacleBounce = function(obstacle,obs2){
	

	if (obstacle.x+obstacle.width>boundary.right)
		obstacle.xVel=obstacle.xVel*-1;
	if (obstacle.x<boundary.left)
		obstacle.xVel=obstacle.xVel*-1;
	if (obstacle.y+obstacle.height>boundary.bottom)
		obstacle.yVel=obstacle.yVel*-1;
	if (obstacle.y<boundary.top)
		obstacle.yVel=obstacle.yVel*-1;
	
}




Rules.prototype.vehicleBounce = function(vehicle,boundary){
		var grace=0;

		v=vehicle.acceleration;
		if (vehicle.pos.x>boundary.right-grace);
		 v.x = v.x * -1;
	if (vehicle.pos.x<boundary.left+grace)
		v.x = v.x * -1;
	if (vehicle.pos.y>boundary.bottom-grace)
		v.y = v.y * -1;
	if (vehicle.pos.y<boundary.top+grace)
		v.y = v.y * -1;
	
}


Rules.prototype.collide = function(vehicle,obstacle,boundary){
	var top=obstacle.y;
	var bottom=top+obstacle.height;
	var left=obstacle.x;
	var right=left+obstacle.width;


	//IF VEHICLE COLLIDES WITH OBSTACLE RETURN TRUE;
	//IF within y Range and x Touches from either side, Collide	
		if(top<vehicle.pos.y && bottom>vehicle.pos.y ){
			if(left<vehicle.pos.x && right>vehicle.pos.x){
				return true;
			}
		}
		//FORGET ABOUT BOUNDARY FOR NOW



	
	return false;
		
	
}