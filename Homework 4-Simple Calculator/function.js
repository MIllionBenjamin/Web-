/* 17343107 Wang Mingye Homework 4 */

var sentence = "0";

onload = function()
{
    document.getElementById("displayArea").value = 0;
}

function input(notation)
{
    if(sentence == "0")
        sentence = "";
    sentence += notation;
    document.getElementById("displayArea").value = sentence;
}

function backspace()
{
    sentence = sentence.substring(0, sentence.length - 1);
    if(sentence == "")
        sentence = "0";
    document.getElementById("displayArea").value = sentence;
}

function clearAll()
{
    sentence = "0";
    document.getElementById("displayArea").value = sentence;
}

function compute()
{
    try
    {
        var result = eval(sentence);
        document.getElementById("displayArea").value = result;
        sentence = "0";
	}
    catch(SyntaxError)
    {
        alert("Input error!");
        clearAll();
    }
}