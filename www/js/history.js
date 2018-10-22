$.getJSON('/json/history.json', languageToggle);


function languageToggle(translate){

	for( let language in translate){

		let lang = translate[language];

		let textUL1 = $('<p class="' + language + '"</p>');
		let textUL2 = $('<p class="' + language + '"</p>');


		textUL1.append('<p>' + lang[0] + '</p>');
		textUL2.append('<p>' + lang[1] + '</p>');

		
		$('.text1').append(textUL1);
		$('.text2').append(textUL2);

	}

	$('.en').hide();

	$('.svflag').click(function(){
		$('.sv').show();
		$('.en').hide();
	});

	$('.ukflag').click(function(){
		$('.sv').hide();
		$('.en').show();
	})


}

