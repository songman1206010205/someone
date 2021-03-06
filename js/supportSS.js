function getPosTop(i){
    return 20 + i*120;
}
function getPosLeft(j){
    return 20 + j *120;
}
function noSpace(board){   
    for (var i=0;i<board.length;i++){
    	for (var j=0;j<board[i].length;j++){
    		if (board[i][j]==0)
    			return false;
    	}
    }
    return true;
}
function getNumBackgroundColor( num ){
	var bg;
	switch(num){
		case 2:
			bg="#eee4d1";
			break;
		case 4:
		    bg="#eee4c8";
			break;
		case 8:
			bg="#f2b179";
			break;
		case 16:
		    bg="#f59563";
			break;
		case 32:
			bg="#f67e5f";
			break;
		case 64:
		    bg="#f65e3b";
			break;
		case 128:
			bg="#edcf72";
			break;
		case 256:
		    bg="#edcc61";
			break;
		case 512:
			bg="#3365e5";
			break;
		case 1024:
		    bg="#09c";
			break;
		case 2048:
			bg="#06e";
			break;
		case 4096:
		    bg="#93e";
			break;
		case 8192:
		    bg="#58f";
			break;
        default: 
        	bg="brown";
	}
	return bg;
}
function getNumColor( num ){
	if (num<=4){
		return "#776e65";
	}
	else{
		return "white";
	}

}
function isGameover(){
	for( var i = 0 ;i < 4 ; i ++ ){
        for( var j = 0 ; j < 4 ; j ++ ){
        	if (board[i][j]===0)
        		return false;
        	else if  (i<3 && board[i][j]==board[i+1][j])
           	    return false;
           	else if  (j<3 && board[i][j]==board[i][j+1])
           	    return false;     	
   		};
   	};
    return true;
};
function gameover(){
	if (isGameover()){
		showGameoverAnimate();
	}

}
function moveLeft(){
	var can=false;
	var tempArr=[];
	var initAdd=false;
	var addScore=0;
	for(var i = 0 ; i < 4 ; i ++ ){
		var k=0;
		tempArr[i]=[];
		initAdd=false;
        for(var j = 0 ; j < 4 ; j ++ ){   
           if (board[i][j]!==0){
           		tempArr[i][k]=board[i][j];
           		if (!initAdd && k-1>=0 && tempArr[i][k]===tempArr[i][k-1]){
           		    	tempArr[i][k-1]+=tempArr[i][k];
           		    	addScore+=tempArr[i][k];
           		    	tempArr[i].pop();
           		    	k--;
           				initAdd=true;
           		}
           		k++;
           };		
        };
        if (tempArr[i].length>0  && tempArr[i].length<=3){
        	for (var h=0; h<4;h++){

        		if (h<tempArr[i].length){
        			if (board[i][h]!=tempArr[i][h]){
        				board[i][h]=tempArr[i][h];
        				can=true;
        			}
        		}
        		else if (board[i][h]!==0){
        			//can=true;
        			board[i][h]=0;
        		}
        		else{
        			board[i][h]=0;
        		}
        	};
        };
    };
    
    if (can){           
    	updateBoardView(addScore);
    };
	return can;
}
function moveUp(){
	var can=false;
	var tempArr=[];
	var initAdd=false;
	var addScore=0;
	for(var j = 0 ; j< 4 ; j ++ ){
		var k=0;
		tempArr=[];
		initAdd=false;
        for(var i = 0 ; i < 4 ; i ++ ){   
           if (board[i][j]!==0){
           		tempArr[k]=board[i][j];
           		if (!initAdd && k-1>=0 && tempArr[k]===tempArr[k-1]){
           		    	tempArr[k-1]+=tempArr[k];
           		    	addScore+=tempArr[k];
           		    	tempArr.pop();
           		    	k--;
           				initAdd=true;
           		}
           		k++;
           };		
        };
        if (tempArr.length>0  && tempArr.length<=3){
        	for (var h=0; h<4;h++){
        		if (h<tempArr.length){
        			if (board[h][j]!==tempArr[h]){
        				board[h][j]=tempArr[h];
        				can=true;
        			}
        		}
        		else if (board[h][j]!==0){
        			//can=true;
        			board[h][j]=0;
        		}
        		else{
        			board[h][j]=0;
        		}
        	};
        };
    };
    
    if (can){           
    	updateBoardView(addScore);
    };
	return can;
}
function moveRight(){
	var can=false;
	var tempArr=[];
	var initAdd=false;
	var addScore=0;
	var len=board[0].length;
	for(var i = 0 ; i < len ; i ++ ){
		initAdd=false;
        tempArr=[];
		board[i].reduceRight(function(prev,curv){
    		if (curv!=0){
    			if (!initAdd && prev === curv){
                    addScore+=curv;
                    can=true;
                    tempArr.shift();
                    tempArr.unshift(prev*2);
                    initAdd=true;
    			}
    			else {
    				tempArr.unshift(curv);
    			}
    		}
    		else
    			curv=prev;
   			return curv;
		},0);

		//tempArr=tempArr.reverse();

		if (tempArr.length>0 && tempArr.length<len){
			for(var k=tempArr.length-1,j=len-1;j>=0;j--,k--){
				if (k>=0){
					if (board[i][j]!==tempArr[k]){
						can=true;
						board[i][j]=tempArr[k];
					}
				}
				else if (board[i][j]!=0){
					can=true;
					board[i][j]=0;
				}
				else{
        			board[i][j]=0;
        		}
			};
		};
	}
	if (can){           
    	updateBoardView(addScore);
    };
	return can;
}
function moveDown(){
	var can=false;
	var tempArr,tempArr2=[];
	var initAdd=false;
	var addScore=0;
	var len=board.length;
	for(var j = 0 ; j < len ;  j++ ){
		initAdd=false;
        tempArr2=[board[0][j],board[1][j],board[2][j],board[3][j]];
        tempArr=[];
		tempArr2.reduceRight(function(prev,curv){
    		if (curv!=0){
    			if (!initAdd && prev === curv){
                    addScore+=curv;
                    can=true;
                    tempArr.shift();
                    tempArr.unshift(prev*2);
                    initAdd=true;
    			}
    			else {
    				tempArr.unshift(curv);
    			}
    		}
    		else
    			curv=prev;
   			return curv;
		},0);


		if (tempArr.length>0 && tempArr.length<len){
			for(var k=tempArr.length-1,i=len-1;i>=0;i--,k--){
				if (k>=0){
					if (board[i][j]!==tempArr[k]){
						can=true;
						board[i][j]=tempArr[k];
					}
				}
				else if (board[i][j]!=0){
					can=true;
					board[i][j]=0;
				}
				else{
        			board[i][j]=0;
        		}
			};
		};
	}
	if (can){           
    	updateBoardView(addScore);
    };
	return can;
}

