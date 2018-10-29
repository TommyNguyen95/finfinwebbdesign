let language="swedish";

function text(data){
    let x=1;

    for(let games in data){

        let game= data[games];

        if(language==="swedish"){
            $('.game-text'+x).text(game.sv);
        }
        else if(language==="english"){
            $('.game-text'+x).text(game.en);
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

$.getJSON('/json/game-text.json', text);
