$.getJSON('/json/history.json', languageToggle);


function languageToggle(translate){

	let wholeTextUL = $('<ul/>');
	for( let language in translate){

		let lang = translate[language];

		let textUL = $('<ul class="' + language + '"/>');

		for ( text of lang){

			textUL.append('<p>' + text + '</p>');

			wholeTextUL.append(textUL);

		}

	}


	$('.text1').append(wholeTextUL);

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

