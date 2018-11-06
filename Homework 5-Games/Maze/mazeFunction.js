var gameStart = false;
var cheat = false;

window.onload = function()
{
	var gameInfo = document.getElementById("gameInfo");
	var walls = document.getElementsByClassName("walls");

    document.getElementById("start").onmouseover = function()
    {
		gameStart = true;
		cheat = false;
		gameInfo.innerHTML = "<h2>Game Start!<h2>";

        for(var i = 0; i < walls.length; i++)
        {
            walls[i].onmouseout = function()
            {
                this.className = "walls";
            }
		};
	}

    document.getElementById("cheat").onmouseover = function()
    {
		cheat = true;
	}

    for(var i = 0; i < walls.length; i++)
    {
        walls[i].onmouseover = function()
        {
            if(gameStart)
            {
				this.className = "wallsFail";
				gameInfo.innerHTML = "<h2>You Lose!</h2>";
				gameStart = false;
			}
		}
	};

    document.getElementById("end").onmouseover = function()
    {
        if(gameStart)
        {
            if(cheat)
				gameInfo.innerHTML = "<h2>Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!</h2>";
            else
				gameInfo.innerHTML = "<h2>You Win!</h2>";
			gameStart = false;
		}
        else
			gameInfo.innerHTML = "<h2>Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!</h2>";
	}
}
