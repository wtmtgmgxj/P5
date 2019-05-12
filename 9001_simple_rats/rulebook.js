var cad=5;// CLOSEST ALLOWED DISTANCE TO WALL
var matingdistance=5;
var maxKidsPerPregnancy=4;
function Rules(){}


Rules.prototype.mouseBounce = function(mouse,wallSquare){

		var dx = Math.max(wallSquare.left - mouse.pos.x, 0, mouse.pos.x - wallSquare.right);
 	    var dy = Math.max(wallSquare.top - mouse.pos.y, 0, mouse.pos.y - wallSquare.bottom);

 	    var dist =Math.sqrt(dx*dx + dy*dy);
 	    if(dist<cad){
 	    	if(dx < cad || dy< cad ){
	 	    	
				if(dy<dx){
				mouse.velocity.x=mouse.velocity.x*-1;
				}else if(dx < dy){
					mouse.velocity.y=mouse.velocity.y*-1;
				}
				// console.log('DISTANCE',dx,dy,mouse.velocity);


			}	
 	    }

}


Rules.prototype.miceSquareChecks = function(mice,ground){

for (var i=0;i<ground.totalSquaresInRow;i++){
			for (var j=0;j<ground.totalSquaresInCol;j++){
				for(var k=0;k<mice.length;k++){
					var currMouse= mice[k];
					var currSquare=ground.squares[i][j];
					if(currSquare instanceof Wall){
						// MOVE THIS OUTSIDE FOR LOOP IF THINGS GET SLOWER
						rules.mouseBounce(currMouse,currSquare);
					}
				}
			}
		}

}


Rules.prototype.apply = function(mice,ground){
	
		rules.miceSquareChecks(mice,ground);
		rules.miceMateChecks(mice);


}

Rules.prototype.miceMateChecks = function(mice){

	for(var k=0;k<mice.length;k++){
		for(var l=0;l<mice.length;l++){
			if(k!=l && mice[k].canMate() && mice[l].canMate() && mice[k].sexCompatible(mice[l])){
				var dist =mice[k].pos.dist(mice[l].pos);
				if(dist<matingdistance){
					mice[k].startMating();
					mice[l].startMating();
				}
			}

		}

		//FOR EACH MOUSE ALSO CHECK IF THEY ARE EXPECTING
		if(mice[k].isPregnant && mice[k].wantsToDeliverBabies()){
			var noOfKids=floor(random (maxKidsPerPregnancy));

			rules.produceKids(noOfKids,mice[k].pos,mice);
			mice[k].successFullDelivery();
		}


	}

}

Rules.prototype.produceKids = function(noOfKids,pos,mice){
	for(var i=0;i<noOfKids;i++){
		var kid;
			if(random(100)>50){
				kid=new MaleMouse();
			}else{
				kid=new FemaleMouse();
			}
		kid.pos=pos;
		kid.pos.add(random(10),random(10));
		mice.push(kid);

	}

}



