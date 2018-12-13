$(function(){
	var sum;
	var xhr;

	$('#button').mouseenter(function(){
		sum = 0;
		$('.unread').hide();
		$('.unread').attr('class','unread hide');
		$('.liButton').attr('class','liButton enable');
		$('#info-bar').attr('class','disable');
		$('#info-bar').text('');
	});

	$('#button').mouseleave(function(){
		if(xhr)
			xhr.abort();
	});

	$('.apb').click(function(){
		if(!$('#info-bar').is('.end')){
			for(var i = 0; i < 5; i++){
				(function(i){
					clickliButton($($('.liButton')[i]));
				})(i);
			}
		}
	});

	function clickliButton(button){
		button.find('.unread').show();
		button.find('.unread').attr('class','unread show');
		button.find('.unread').text('...');
		button.attr('class','liButton disable');
		xhr = $.post('/',function(data,status){
			if(status == 'success'){
				sum += parseInt(data);
				button.find('.unread').text(data);
				button.find('.unread').attr('class','unread finish');
				if(!($('.unread').is('.show') || $('.unread').is('.hide'))){
					$('#info-bar').text(sum);
					$('#info-bar').attr('class','disable end');
				}
			}
		});
	}
});