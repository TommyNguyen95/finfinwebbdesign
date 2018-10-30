$.getJSON('/json/game-text.json', text);
let language="swedish";

function text(data){
    let x=1;

    for(let games in data){

        let gameText = data[games];

        if(language === "swedish"){
            $('.game-text'+ x).text(gameText.sv);
        }
        else if(language === "english"){
            $('.game-text'+ x).text(gameText.en);
        }

        x++;       
    }
}


$('.svflag').click(function(){
    language="swedish";
    $.getJSON('/json/game-text.json', text);
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/game-text.json', text);
});
