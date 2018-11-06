var startFlag = false;
var ranTemp;
var result = 0;
var totalTime = 30;
var timing = totalTime;
var wrong = false;
var wrongIndex = -1;

window.onload = function()
{
	var moleList = new Array();
	var stateMessage = document.getElementById('state');
	var time = document.getElementById('time');
	var score = document.getElementById('score');

    for(var i = 59; i >= 0; i--)
    {
		var radio = document.getElementsByTagName('button');
		moleList.push(radio[i]);
	};

    function random()
    {
		var tempMole = parseInt(Math.random() * 60);
		return tempMole;
	}

    document.getElementById('start').onclick = function()
    {
		if(startFlag === false)
			startGame();
		else
			endGame();
	}

    function startGame()
    {
		startFlag = true;
		timeCount();
		ranTemp = random();
		moleList[ranTemp].className = "moleAfter";
		result = 0;
		score.value = result;
		stateMessage.textContent = "Playing";
        for(var i = moleList.length - 1; i >= 0; i--)
        {
            moleList[i].onclick = function()
            {
				if(startFlag === false)
					return false;
                if(wrong)
                {
					moleList[wrongIndex].className = "moleBefore";
					wrong = false;
					wrongIndex = -1;
				}
				var ind = moleList.indexOf(this);
                if(ind === ranTemp)
                {
					result += 1;
					score.value = result;
					moleList[ranTemp].className = "moleBefore";
					ranTemp = random();
					moleList[ranTemp].className = "moleAfter";
				}
                else
                {
					moleList[ind].className = "moleWrong";
					result--;
                    if(result < 0)
                    {
						score.value = 0;
						result = 0;
						stateMessage.textContent = "Come on!";
					}
					else
						score.value = result;
					wrong = true;
					wrongIndex = ind;
				}
			}
		}
	}

    function endGame()
    {
		if(time.value >= 1)
			startFlag = false;
		startFlag = false;
		stateMessage.textContent = "Game Over";
		clearInterval(timer);
		time.value = "0";
		timing = totalTime;
		alert("Game Over!\nYour final score is " + result);
		score.value = "0";
		moleList[ranTemp].className = "moleBefore";
        if(wrong)
        {
			wrong = false;
			moleList[wrongIndex].className = "moleBefore";
			wrongIndex = -1;
		}
	}

    function timeCount()
    {
		timer = setInterval(timeCounting, 1000);
	}

    function timeCounting()
    {
		timing --;
		time.value = timing;
		if(timing === -1)
			endGame();
	}
}