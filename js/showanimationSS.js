function showNumAnimate(i, j, randNum) {
    var numCell=$("#number-cell-"+i+"-"+j);
	numCell.css("background-color",getNumBackgroundColor( randNum ));
	numCell.css("color",getNumColor( randNum ));
	numCell.text(randNum);
	
	numCell.animate({
		width:"100px",
		height:"100px",
		top:getPosTop(i),
		left:getPosLeft(j)
	  },
	  600
	);
}
function showScoreAnimate(score){
    
	var oscoreDom=$("#score");
	var ascoreDom=$("#oa");
	oscoreNum=parseInt(oscoreDom.text())+score;

    ascoreDom.text("+"+score);
	ascoreDom.fadeIn(300).fadeOut(300);
	oscoreDom.text(oscoreNum);
}
function showGameoverAnimate(){
	var ascoreDom=$("#oa");
	ascoreDom.text("啊哈结束了!");
	ascoreDom.fadeIn(1000).fadeOut(3000);
}