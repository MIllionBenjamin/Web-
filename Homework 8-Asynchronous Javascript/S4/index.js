$(document).ready(function(){
	var count = 0;
	$('#at-plus-container').mouseenter(function(event){
		event.stopPropagation();
		$('span').hide();
		$('#info-bar').text('');
		$('#sum').text('');
		$('#info-bar').unbind('click');
		$('#info-bar').attr("class", "disable");
		$('.liButton').removeClass('noshow');
		buttonAble();
		$('.icon').unbind('click').bind('click', iconClick);
		count = 0;
	});

	function buttonClick(event){
		$(event.target).children().show();
		$(event.target).children().text('...');
		buttonDisable();
		$(event.target).attr("class", "liButton able");
		$.get('/', function(data, status){
			if(status == 'success'){
				$(event.target).attr("class", "liButton disable noshow");
				buttonAble();
				$(event.target).unbind('click', buttonClick);
				$(event.target).children().text(data);
				if(check()){
					infoAble();
				}
			}
		});
	}

	function buttonDisable(){
		for(var i = 1; i <= 5; i++){
			if(!$('.liButton:nth-child('+i+')').hasClass('noshow'))
				$('.liButton:nth-child('+i+')').attr("class", "liButton disable");
		}
		$('.liButton').unbind('click');
		$('#info-bar').unbind('click', infoClick);		
	}

	function buttonAble(){
		for(var i = 1; i <= 5; i++){
			if(!$('.liButton:nth-child('+i+')').hasClass('noshow')){
				$('.liButton:nth-child('+i+')').attr("class", "liButton able");
				$('.liButton:nth-child('+i+')').unbind('click').bind('click', buttonClick);
			}
			else{
				$('.liButton:nth-child('+i+')').unbind('click', buttonClick);
			}
		}		
	}

	function infoAble(){
		$('#info-bar').attr("class", "able");
		$('#info-bar').unbind('click');
		$('#info-bar').bind('click', infoClick);
	}

	function check(){
		for(var i = 1; i <= 5; i++){
			if($('.liButton:nth-child('+i+')').children().text() == "")
				return false;
		}
		return true;
	}

	function infoClick(event){
		var sum = 0;
		for(var i = 1; i <= 5; i++){
			sum += parseInt($('.liButton:nth-child('+i+')').children().text());
			$('.liButton:nth-child('+i+')').attr("class", "liButton able");
		}
		var temp = $('#order').text();
		$('#info-bar').html('<div id="order">'+temp+'<br/></div><div>'+sum+'</div>');
		$('#info-bar').attr("class", "disable");
		$('.icon').unbind('click').bind('click', iconClick);
		buttonAble();
	}

	function iconClick(event){
		$(event.target).unbind('click', iconClick).bind('click');
		count = 0;
		$('#click').attr("class", "icon");
		event.stopPropagation();
		var order = [];
		for(var j = 0; j < 5; j++){
			var temp = Math.round(Math.random() * 4);
			order[j] = temp;
			for(var d = 0; d < j; d++){
				if(order[d] == temp)
					j -=1;
			}
		}
		var orderResult = tostring(order);
		$('#info-bar').html('<div id="order">'+orderResult+'</div>');
		var callbacks = [];
		for(var i = 0; i < 4; i++){
			(function(i){
				callbacks[i] = function(err){
					getRandom($($('.liButton')[order[i + 1]]), callbacks[i + 1]);
				}
			})(i);
		}
		callbacks[4] = function(err){
			infoClick();
		}
		getRandom($($('.liButton')[order[0]]), callbacks[0]);
	}

	function tostring(array){
		var res = "";
		for(var i = 0; i < 5; i++){
			res += String.fromCharCode(65 + array[i]);
			if(i < 4)
				res += ",";
		}
		return res;
	}

	function getRandom(target, callback){
		$(target).children().show().text("...");
		buttonDisable();
		$(target).attr("class", "liButton able");
		$('#click').attr("class", "icon");
		$.get('/', function(data, status){
			if(status == 'success'){
				$(target).attr("class", "liButton disable noshow");
				buttonAble();
				$(target).unbind('click', buttonClick);
				$(target).children().text(data);
				count += 1;
				if(count >= 5){
					infoAble();
				}
				if(callback){
					callback();
				}
			}
		});
	}

});