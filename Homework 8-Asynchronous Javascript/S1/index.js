$(function()
{
	var sum;

	$('#button').mouseenter(function()
	{
		sum = 0;
		$('.unread').hide();
		$('.unread').attr('class','unread hide');
		$('.liButton').attr('class','liButton enable');
		$('#info-bar').attr('class','disable');
		$('#info-bar').text('');
	});

	$('.liButton').click(function()
	{
		if($(this).is('.enable'))
		{
			var that = this;
			$(this).find('.unread').show();
			$(this).find('.unread').attr('class','unread show');
			$(this).find('.unread').text('...');
			$('.liButton').not(this).attr('class','liButton disable');
			$.get('/',function(data,status){
				if(status == 'success'){
					sum += parseInt(data);
					$(that).find('.unread').text(data);
					$(that).attr('class','liButton disable');
					$('.liButton').has('.hide').attr('class','liButton enable');
					if(!$('.liButton').is('.enable'))
						$('#info-bar').attr('class','enable');
				}
			});
		}
	});

	$('#info-bar').click(function()
	{
		if($(this).is('.enable'))
		{
			$(this).text(sum);
			$(this).attr('class','disable');
		}
	});

});

