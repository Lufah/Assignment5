
	var apple;
	var basket;
	var basketLeft = 210;
	var basketTop = 420;
	var appleLeft = Math.floor((Math.random() * 470));
	var appleTop = 0;
	var dy = Math.floor((Math.random() * 10) + 1);
	var applesMissed = 0;
	var applesCaught = 0;
	var time = 0;
	var caught = false;
	var maxMisses = 3;


	window.onload = function(){
		var button = document.getElementById("button");
		button.onclick = start;
		document.onkeydown = keyListener;
		getApple();
	}

	function start() {
		button.disabled = true;
		appleDrop();
		getScore();
		if (caught && applesMissed < maxMisses) {
			getNewApple();
			caught = false;
			start();
		} else if (appleTop < 470 && applesMissed < maxMisses) {
			timer = setTimeout('start()', 50);
		} else if (appleTop >= 470 && applesMissed < maxMisses) {
			applesMissed++;
			miss();
		} else {
			gameOver();
		}
	}

	function keyListener(e) {
		basket = document.getElementById("basket");
		//left arrow key
		if (e.keyCode == 37 && basketLeft > 0){
			basketLeft -= 10;
			basket.style.left = basketLeft + 'px';
		}
		//up arrow key
		if (e.keyCode == 38 && basketTop > 0){
			basketTop -= 10;
			basket.style.top = basketTop + 'px';
		}
		//right arrow key
		if (e.keyCode == 39 && basketLeft < 411){
			basketLeft += 10;
			basket.style.left = basketLeft + 'px';
		}
		//down arrow key
		if (e.keyCode == 40 && basketTop < 411) {
			basketTop += 10;
			basket.style.top = basketTop + 'px';
		}
	}

	function getApple() {
		apple = document.getElementById("apple");
		apple.style.left = appleLeft + 'px';
		apple.style.top = appleTop + 'px';
	}

	function appleDrop() {
		appleTop += dy;
		apple.style.top = appleTop + 'px';
		isCaught();
	}

	function isCaught() {
		if ((appleTop + 30 >= basketTop + 50 && appleTop <= basketTop + 80)
			&& (appleLeft + 30 >= basketLeft && appleLeft <= basketLeft + 80)){
			elimApple;
			caught = true;
			applesCaught++;
			var appleScore = document.getElementById("applesCaught");
			appleScore.innerHTML = "Apples Caught: " + applesCaught;
		}
	}

	function elimApple() {
		apple = document.getElementById("apple");
		apple.innerHTML = "";
	}

	function getScore() {
		time++;
		var score = document.getElementById("score");
		score.innerHTML = "Score: " + time;
	}

	function miss() {
		appleCount = document.getElementById("applesMissed");
		appleCount.innerHTML = "Apples Missed: " + applesMissed;
		elimApple();
		getNewApple();
		start();
	}

	function getNewApple() {
		apple = document.getElementById("apple");
		var rand = Math.floor((Math.random() * 470));
		appleLeft = rand;
		appleTop = 0;
		apple.style.left = appleLeft + 'px';
		apple.style.top = appleTop + 'px';

		apple.innerHTML = "<img src='apple.png'>";
		dy = Math.floor((Math.random() * 10) + 1);
	}

	function gameOver() {
		clearTimeout(timer);
		elimApple();
		basket = document.getElementById("basket");
		basket.innerHTML = "";
		var end = document.getElementById("end");
		end.innerHTML = "Game Over<br>Your Score: " + time + " X " + applesCaught
						+ " = " + (time * applesCaught);
	}
