$.getJSON('/json/gameover.json', text);


function text(data){

	if(language === "swedish"){
		$('.label1').text(data["points"].sv);
        $('.label2').text(data["name"].sv);
        $('.submit-button').text(data["submit"].sv);
	}
	else if(language === "english"){
		$('.label1').text(data["points"].en);
        $('.label2').text(data["name"].en);
        $('.submit-button').text(data["submit"].en);
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


