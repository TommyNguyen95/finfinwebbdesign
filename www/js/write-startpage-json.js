
$.getJSON('/json/startpage.json', write);

let language="swedish";

function write(data){
    let x=1;

    for(let games in data){

        let game= data[games];

        if(language==="swedish"){
            $('.gname'+x).text(game.sv);
        }
        else if(language==="english"){
            $('.gname'+x).text(game.en);
        }

        x++;       
    }
}


$('.svflag').click(function(){
    language="swedish";
    $.getJSON('/json/startpage.json', write);
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/startpage.json', write);
});

