$.getJSON('/json/highscore-translate.json', highscoreTranslate);


function highscoreTranslate(translate) {

	// Loops through the first object in highscore-translate.json-file
	for (let language in translate) {

		// Creates a variable 'lang' to hold the propertyValue from 'translate'
		let lang = translate[language];

		// Creates two *-tags with class names "sv" and "en" from highscore-translate.json-file
		let h2 = $('<h2 class="' + language + '"</h2>');
		let p1 = $('<p class="' + language + '"</p>');
		let p2 = $('<p class="' + language + '"</p>')
        let p3 = $('<p class="' + language + '"</p>')

		// Appends index[0] and... index[3] from highscore-translate.json in previous created variables
		h2.append(lang[0]);
		p1.append(lang[1]);
		p2.append(lang[2]);
		p3.append(lang[3]);

		// Appends the *-tags to the classes in highscore section
		$('.highscore-title').append(h2);
		$('.rank').append(p1);
		$('.name').append(p2);
		$('.breakout-points').append(p3);

	}

	// Class 'en' is by default hidden
	$('.en').hide();

	// When 'svflag' is clicked on 'sv' is shown and 'en' hidden
	$('.svflag').click(function () {
		$('.sv').show();
		$('.en').hide();
	});

	// When 'enflag' is clicked on 'en' is shown and 'sv' hidden
	$('.ukflag').click(function () {
		$('.sv').hide();
		$('.en').show();
	})


}

