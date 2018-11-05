$.getJSON('/json/gameover.json', text);

function text(data){

	if(language === "swedish"){
        $('.brhighscore').text(data["highscorelist"].sv);
        console.log($('.brhighscore').text(data["highscorelist"].sv));
        // $('.col-form-label').text(data["points"].sv);
        // $('.modal-footer').text(data["submit"].sv);
	}
	else if(language === "english"){
        $('.brhighscore').text(data["breakout"].en);
        // $('.col-form-label').text(data["points"].en);
        // $('.modal-footer').text(data["submit"].en);
		
	}
}


$('.svflag').click(function(){
    language="swedish";
    $.getJSON('/json/gameover.json', text);
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/gameover.json', text);
});
