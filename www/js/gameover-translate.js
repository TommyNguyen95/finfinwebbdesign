$.getJSON('/json/gameover.json', gameovertranslate);

function gameovertranslate(data){

	if(language === "swedish"){
        console.log(data);
        $('.brhighscore').text(data[0].sv);
        console.log($('.brhighscore').text(data[0].sv));
        
	}
	else if(language === "english"){
        $('.brhighscore').text(data["highscorelist"].en);
    }
}


$('.svflag').click(function(){
    language="swedish";
    $.getJSON('/json/gameover.json', gameovertranslate);
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/gameover.json', gameovertranslate);
});
