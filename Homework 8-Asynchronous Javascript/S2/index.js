$(document).ready(function(){
	var count = 0;
	$('#at-plus-container').mouseenter(function(event){
		event.stopPropagation();
		$('.liButton').removeClass('noshow');
		buttonAble();
		$('span').hide();
		$('#info-bar').text('');
		$('#info-bar').unbind('click');
		$('#info-bar').attr("class", "disable");
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
		$('#info-bar').text(sum);
		$('#info-bar').attr("class", "disable");
		$('.icon').unbind('click').bind('click', iconClick);
		buttonAble();
	}

	function iconClick(event){
		$(event.target).unbind('click', iconClick).bind('click');
		count = 0;
		$('#click').attr("class", "icon");
		event.stopPropagation();
		var callbacks = [];
		function finish(err){
			infoClick();
		}
		for(var i = 0; i < 4; i++){
			(function(i){
				callbacks[i] = function(err){
					getRandom($($('.liButton')[i + 1]), callbacks[i + 1]);
				}
			})(i);
		}
		callbacks[4] = finish;
		getRandom($($('.liButton')[0]), callbacks[0]);
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
				if(callback){
					callback();
				}
			}
		});
	}

});
