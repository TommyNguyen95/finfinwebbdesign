$.getJSON('/json/history.json', languageToggle);


function languageToggle(translate){

	// Loops through the first object in history.json-file
	for( let language in translate){

		// Creates a variable 'lang' to hold the propertyValue from 'translate'
		let lang = translate[language];

		// Creates two p-tags with class names "sv" and "en" from history.json-file
		let textP1 = $('<p class="' + language + '"</p>');
		let textP2 = $('<p class="' + language + '"</p>');

		// Appends index[0] and index[1] from history.json in previous created variables
		textP1.append('<p>' + lang[0] + '</p>');
		textP2.append('<p>' + lang[1] + '</p>');

		// Appends the p-tags to the classes text1 and text2, in history section
		$('.text1').append(textP1);
		$('.text2').append(textP2);

	}
	
	// Class 'en' is by default hidden
	$('.en').hide();

	// When 'svflag' is clicked on 'sv' is shown and 'en' hidden
	$('.svflag').click(function(){
		$('.sv').show();
		$('.en').hide();
	});

	// When 'enflag' is clicked on 'en' is shown and 'sv' hidden
	$('.ukflag').click(function(){
		$('.sv').hide();
		$('.en').show();
	})


}

